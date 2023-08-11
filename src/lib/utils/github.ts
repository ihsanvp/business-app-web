import { Octokit } from "octokit"
import { env } from "$env/dynamic/private"

export async function getLatestRelease() {
    const octokit = new Octokit({
        auth: env.GITHUB_AUTH_TOKEN
    })
    const release = await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
        owner: "ihsanvp",
        repo: "business-app-desktop",
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    return release.data
}