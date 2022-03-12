import admin from 'firebase-admin'
import {getUserByUID, runAdminQuery} from "../../../lib/firebase-admin";

export default async function handler(req, res) {

    if (!req.query?.uid) return res.status(400).json({});
    if (!req.body.theme) return res.status(400).json({theme: false});

    try {
        let user = await getUserByUID(req.query.uid);

        if (!user) return res.status(400).json({});

        await admin.firestore().collection("themes").doc(req.body.theme).delete();

        return res.json({})
    } catch (err) {
        console.error(err);
        return res.status(500).json({});
    }

}
