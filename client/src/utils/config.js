export const CONFIG = {
    REACT_APP_GITHUB_OAUTH_CLIENT_ID:process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
    REACT_APP_SERVER_URL:process.env.REACT_APP_SERVER_URL,
    REACT_APP_CLIENT_CALLBACK:process.env.REACT_APP_CLIENT_CALLBACK,
    REACT_APP_GITHUB_LOGIN_URL: process.env.REACT_APP_GITHUB_LOGIN_URL
}
console.log(CONFIG);

export function getAuthConfig(){

    const authentication = {
        provider: "GitHub",
        clientId: CONFIG.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
        loginUrl: CONFIG.REACT_APP_GITHUB_LOGIN_URL,
        redirectUri: CONFIG.REACT_APP_CLIENT_CALLBACK,
        tradeUrl: CONFIG.REACT_APP_SERVER_URL
      }
    
    const loginUrl = `${authentication.loginUrl}?client_id=${authentication.clientId}&redirect_uri=${encodeURIComponent(authentication.redirectUri)}&scopes=repo`;
    console.log(`loginUrl = ${loginUrl}`)
    return { url: loginUrl , authentication };
    
}