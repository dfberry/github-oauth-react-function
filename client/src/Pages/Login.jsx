import { CONFIG } from '../utils/config';

function Login() {

  console.log(CONFIG);

  const authentication = {
    provider: "GitHub",
    clientId: CONFIG.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
    loginUrl: CONFIG.REACT_APP_GITHUB_LOGIN_URL,
    redirectUri: CONFIG.REACT_APP_CLIENT_CALLBACK
  }

const loginUrl = `${authentication.loginUrl}?client_id=${authentication.clientId}&redirect_uri=${encodeURIComponent(authentication.redirectUri)}&scopes=repo`;
console.log(`loginUrl = ${loginUrl}`)

  return (
    <div >

      <a href={loginUrl} rel="noreferrer">{authentication.provider} Login</a>

    </div>
  );
}

export default Login;