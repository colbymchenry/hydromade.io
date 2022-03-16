import admin from 'firebase-admin'
import {getUserByUID, runAdminQuery} from "../../../lib/firebase-admin";

export default async function handler(req, res) {

    if (!req.query?.uid) return res.status(400).json({});

    if (!req.body.name) return res.status(400).json({name: false});
    if (!req.body.repo) return res.status(400).json({repo: false});

    try {
        let user = await getUserByUID(req.query.uid);

        if (!user) return res.status(400).json({});

        await admin.firestore().collection("themes").add({
            creator: user.uid,
            name: req.body.name,
            price: req.body.price || 0,
            repo: req.body.repo,
            private: true
        });

        return res.json({})
    } catch (err) {
        console.error(err);
        return res.status(500).json({});
    }

}
