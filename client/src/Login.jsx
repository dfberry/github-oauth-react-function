import { CONFIG } from './config';

function Login() {

  console.log(CONFIG);

  const authentication = {
    provider: "GitHub",
    clientId: CONFIG.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
    loginUrl: CONFIG.REACT_APP_GITHUB_LOGIN_URL,
    redirectUri: CONFIG.REACT_APP_CLIENT_CALLBACK
  }

const loginUrl = `${authentication.loginUrl}?client_id=${authentication.clientId}&redirect_uri=${encodeURIComponent(authentication.redirectUri)}&scopes=repo`;

  return (
    <div className="App">
      <header className="App-header">
      <a href={loginUrl} rel="noreferrer">{authentication.provider} Login</a>
      </header>
    </div>
  );
}

export default Login;