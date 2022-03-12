import admin from 'firebase-admin'
import {getUserByUID, runAdminQuery} from "../../../lib/firebase-admin";
import {CreateStripeAccount, CreateStripeConnectLink, GetStripeAccount} from "../../../lib/stripe-admin";
import axios from "axios";

export default async function handler(req, res) {

    if (!req.query?.code || !req.query?.uid) return res.status(400).json({});

    console.log(req.query)

    try {
        let user = await getUserByUID(req.query.uid);

        if (!user) return res.status(400).json({});

        console.log({
            client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.query.code,
            redirect_uri: `${process.env.APP_URL}/app`
        })

        const tokenResponse = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.query.code,
            redirect_uri: `${process.env.APP_URL}/app`
        });

        const snaps = await admin.firestore().collection("users").where("uid", "==", req.query.uid).get();

        if (tokenResponse.data.split("&")[0].replace("access_token=", "") === "error=bad_verification_code") return res.status(400).json({ message: "Failed." })
        
        await admin.firestore().collection("users").doc(snaps.docs[0].id).update({
            github_access_token: tokenResponse.data.split("&")[0].replace("access_token=", "")
        })

        return res.json({
            github_access_token: tokenResponse.data.split("&")[0].replace("access_token=", "")
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({});
    }

}
