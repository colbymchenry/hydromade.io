import admin from 'firebase-admin'
import {getUserByUID, runAdminQuery} from "../../../lib/firebase-admin";

export default async function handler(req, res) {

    if (!req.query?.uid) return res.status(400).json({});

    try {
        let user = await getUserByUID(req.query.uid);

        if (!user) return res.status(400).json({});

        return res.json(await runAdminQuery(await admin.firestore().collection("themes").where("creator", "==", user.uid).get()));
    } catch (err) {
        console.error(err);
        return res.status(500).json({});
    }

}
