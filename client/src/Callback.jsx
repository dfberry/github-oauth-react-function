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
  const [user, setUser] = useState([]);



  useEffect(
    (unusedParam) => {

      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      console.log(code)

      console.log(`code = '${code}'`);

      setLoading(true);

      const tradeCodeForuserUrl = process.env.REACT_APP_SERVER_URL || "";

      getData(tradeCodeForuserUrl, code).then((data) => {
        console.log(data);
        console.log(data.user);
        setUser(data.user);

        setLoading(false);
      });
      
    },
    [window.location.search]
  );

  return (
    <div className="App">
      <header className="App-header">
        { loading && "Loading"} 
        { !loading && (<div>{JSON.stringify(user)}</div>)}
      </header>
    </div>
  );
}

export default Callback;
