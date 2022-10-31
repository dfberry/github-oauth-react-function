
function Login() {

  const authentication = {
    provider: "GitHub",
    clientId: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
    loginUrl: "https://github.com/login/oauth/authorize",
    redirectUri: process.env.REACT_APP_CLIENT_CALLBACK
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