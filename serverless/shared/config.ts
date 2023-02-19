export const CONFIG = {
    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID as string,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET as string,
    GITHUB_TOKEN_EXCHANGE_URL: process.env.GITHUB_TOKEN_EXCHANGE_URL as string,
    AZURE_REDIS_CACHE_HOSTNAME: process.env.AZURE_REDIS_CACHE_HOSTNAME as string,
    AZURE_REDIS_CACHE_KEY: process.env.AZURE_REDIS_CACHE_KEY as string,
  };

export function isConfigured(){
  if (!!CONFIG.GITHUB_OAUTH_CLIENT_ID &&
    !! CONFIG.GITHUB_OAUTH_CLIENT_SECRET &&
    !! CONFIG.GITHUB_TOKEN_EXCHANGE_URL) return true;
  
    return false;
}

export const clientIdGitHub = CONFIG.GITHUB_OAUTH_CLIENT_ID