
import { Octokit } from "@octokit/rest";


export async function getUser(token:string){

    if(!token) throw Error("getUserFromOctoKit: token is empty")

    const config = {
        auth: 'token '+token,
        // set custom URL for on-premise GitHub Enterprise installations
        //baseUrl: apiUrl,
        request: {
            timeout: 0
        }
    }

    const octokit = new Octokit(config);
    const user = await octokit.rest.users.getAuthenticated()
    if(user.status===200){
        return { user: user.data }
    } else {
        throw Error(`getUserFromOctokit: error requesting user ${user.status}`)
    }
    
}