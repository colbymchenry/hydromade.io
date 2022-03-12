import admin from 'firebase-admin'
import {getUserByUID, runAdminQuery} from "../../../lib/firebase-admin";
import {CreateVercelProject, DeployVercelProject} from "../../../lib/vercel-admin";

export default async function handler(req, res) {

    if (!req.query.uid) return res.status(400).json({});

    if (!req.body.theme) return res.status(400).json({ theme: "No theme selected." })

    try {
        let user = await getUserByUID(req.query.uid);

        if (!user) return res.status(400).json({});

        let store = await (await runAdminQuery(await admin.firestore().collection("stores").where("owner", "==", req.query.uid).get()))
        if (!store.length) return res.status(400).json({ store: "No store found."})
        store = store[0];

        let theme = (await admin.firestore().collection("themes").doc(req.body.theme).get());
        if (!theme) return res.status(400).json({ theme: "Theme not found."})
        theme = theme.data();

        let vercel_project_id = store.vercel_project_id;

        if (!vercel_project_id) {
            let vercelProject = await CreateVercelProject(store.storeDomain.replace(/\./g, "-"), theme.repo.org, theme.repo.repo, [
                {
                    type: "plain",
                    key: "VITE_STORE_DOMAIN",
                    value: store.storeDomain,
                    target: ["production"]
                },
                {
                    type: "plain",
                    key: "VITE_STORE_FRONT_TOKEN",
                    value: store.accessToken,
                    target: ["production"]
                }
            ]);

            vercel_project_id = vercelProject.data.id;

            let deployment = await DeployVercelProject(vercelProject.data.id, theme.repo.repoId);
        } else {
            // update vercel project
        }

        await admin.firestore().collection("stores").doc(store.id).update({
            theme: req.body.theme,
            vercel_project_id
        });

        return res.json({})
    } catch (err) {
        console.error(err);
        console.log(err?.response?.data)
        return res.status(500).json({});
    }

}
