import admin from 'firebase-admin'
import {getUserByUID, runAdminQuery} from "../../../lib/firebase-admin";
import axios from "axios";

export default async function handler(req, res) {

    if (!req.query?.uid) return res.status(400).json({});

    try {
        let user = await getUserByUID(req.query.uid);

        if (!user || !user.github_access_token) return res.status(400).json({});

        const repoResponse = await axios.get("https://api.github.com/user/repos", {
            headers: {
                Authorization: `token ${user.github_access_token}`
            }
        });

        const data = repoResponse.data.map((repoData) => {
            return {
                repoId: repoData.id,
                repo: repoData.name,
                org: repoData.full_name.split("/")[0],
                full_name: repoData.full_name,
                private: repoData.private,
                owner_avatar: repoData.owner.avatar_url
            }
        })

        return res.json(data)
    } catch (err) {
        console.error(err);
        return res.status(500).json({});
    }

}
