import React, { useEffect, useState } from "react";

const isEmptyString = (data) =>
  typeof data === "string" && data.trim().length === 0;

function getData(url, code) {

  if (isEmptyString(code) || isEmptyString(url)) throw Error("missing params");

  const body = {
    code
  }

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  };

  return fetch(url, options).then((data) => data.json());
}

function Callback() {
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState([]);



  useEffect(
    (unusedParam) => {

      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      console.log(code)

      console.log(`code = '${code}'`);

      setLoading(true);

      const tradeCodeForAccessTokenUrl = process.env.REACT_APP_SERVER_URL || "";

      getData(tradeCodeForAccessTokenUrl, code).then((data) => {
        console.log(data);
        console.log(data.accessToken);
        setAccessToken(data.accessToken);
        setLoading(false);
      });
      
    },
    [window.location.search]
  );

  return (
    <div className="App">
      <header className="App-header">
        { loading && "Loading"} 
        { !loading && (accessToken ? <div>{accessToken}</div> : <div>No access token</div>)}
      </header>
    </div>
  );
}

export default Callback;
