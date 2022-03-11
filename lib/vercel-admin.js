import axios from "axios";


function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


export async function CreateVercelProject(name, org, repo) {
    return await axios.post("https://api.vercel.com/v8/projects", {
        name,
        framework: "vite",
        gitRepository: {
            type: "github",
            repo,
            org,
            productionBranch: 'master',
            sourceless: true,
            deployHooks: []
        }
    }, {
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`
        }
    });
}

export async function DeployVercelProject(projectId, repoId) {
    return await axios.post("https://api.vercel.com/v13/deployments", {
        name: makeid(12),
        project: projectId,
        target: "production",
        gitSource: {
            type: "github",
            repoId,
            ref: "master"
        }
    }, {
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`
        }
    });
}