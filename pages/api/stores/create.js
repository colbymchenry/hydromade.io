import admin from 'firebase-admin'
import {getUserByUID, runAdminQuery} from "../../../lib/firebase-admin";

export default async function handler(req, res) {

    if (!req.query.uid) return res.status(400).json({});
    if (!req.body.accessToken) return res.status(400).json({accessToken: "Access token required."});
    if (!req.body.storeDomain) return res.status(400).json({storeDomain: "Store domain required."});

    try {
        let user = await getUserByUID(req.query.uid);

        if (!user) return res.status(400).json({});

        let storeQuery = await (await runAdminQuery(await admin.firestore().collection("stores").where("access_token", "==", req.body.accessToken).get()))
        if (storeQuery.length) return res.status(400).json({ accessToken: "This access token is already registered to a Hydromade store."})

        storeQuery = await (await runAdminQuery(await admin.firestore().collection("stores").where("storeDomain", "==", req.body.storeDomain.toLowerCase()).get()))
        if (storeQuery.length) return res.status(400).json({ accessToken: "This domain is already registered as a Hydromade store."})

        await admin.firestore().collection("stores").add({
            owner: req.query.uid,
            storeDomain: req.body.storeDomain.toLowerCase(),
            accessToken: req.body.accessToken
        });

        return res.json({})
    } catch (err) {
        console.error(err);
        return res.status(500).json({});
    }

}
