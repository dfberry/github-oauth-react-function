const CONFIG = {
  REACT_APP_GITHUB_OAUTH_CLIENT_ID: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
  REACT_APP_CLIENT_CALLBACK: process.env.REACT_APP_CLIENT_CALLBACK,
  REACT_APP_GITHUB_LOGIN_URL: process.env.REACT_APP_GITHUB_LOGIN_URL,
  REACT_APP_SERVER_URL_BASE: process.env.REACT_APP_SERVER_URL_BASE
}

type IProvider = 'GitHub'

export type IAppConfiguration = {
  provider: IProvider
  clientId: string
  loginUrl: string
  redirectUrl: string
  serverUrlBase: string
}

export function getAppConfig() {
  if (!CONFIG.REACT_APP_GITHUB_OAUTH_CLIENT_ID)
    throw Error('Required param not found - REACT_APP_GITHUB_OAUTH_CLIENT_ID')

  if (!CONFIG.REACT_APP_CLIENT_CALLBACK)
    throw Error('Required param not found - REACT_APP_CLIENT_CALLBACK')

  if (!CONFIG.REACT_APP_GITHUB_LOGIN_URL)
    throw Error('Required param not found - REACT_APP_GITHUB_LOGIN_URL')

  if (!CONFIG.REACT_APP_SERVER_URL_BASE) {
    throw Error('Required param not found - REACT_APP_SERVER_URL_BASE')
  }

  const appConfig: IAppConfiguration = {
    provider: 'GitHub',
    clientId: CONFIG.REACT_APP_GITHUB_OAUTH_CLIENT_ID as string,
    loginUrl: CONFIG.REACT_APP_GITHUB_LOGIN_URL as string,
    redirectUrl: CONFIG.REACT_APP_CLIENT_CALLBACK as string,
    serverUrlBase: CONFIG.REACT_APP_SERVER_URL_BASE as string
  }

  appConfig.loginUrl = `${CONFIG.REACT_APP_GITHUB_LOGIN_URL}?client_id=${
    appConfig.clientId
  }&redirect_uri=${encodeURIComponent(appConfig.redirectUrl)}&scopes=repo`

  return appConfig
}
