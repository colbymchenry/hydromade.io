import admin from 'firebase-admin'
import {getUserByUID} from "../../../lib/firebase-admin";
import axios from "axios";

export default async function handler(req, res) {

    if (!req.query?.code || !req.query?.uid) return res.status(400).json({});

    try {
        let user = await getUserByUID(req.query.uid);

        if (!user) return res.status(400).json({});

        const tokenResponse = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.query.code,
            redirect_uri: `${process.env.APP_URL}/app/marketplace`
        });

        const snaps = await admin.firestore().collection("users").where("uid", "==", req.query.uid).get();

        if (tokenResponse.data.split("&")[0].replace("access_token=", "").includes("error=")) return res.status(400).json({ message: "Failed.", reason: tokenResponse.data.split("&")[0].replace("access_token=", "") })

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
