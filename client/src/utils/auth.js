import { CONFIG  } from "./config";
import { isEmptyString } from "./objects";

export async function getToken(code) {

    try{
    console.log(`getToken`)
    const url = CONFIG.REACT_APP_SERVER_URL;
    if (!code) throw Error('missing code')
    if (!url) throw Error("missing url");
  
    const body = {
      code
    }
  
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    };
  
    console.log(options)

    const response = await fetch(url, options);

    console.log('getToken - response returned')

    if (response.ok) {
		const data = await response.json()
        console.log(`getToken ${JSON.stringify(data)}`)
		return data;
	} else {
        
		const responseErrorText = await response.text();
        console.log(`getToken error ${responseErrorText}`)
        throw Error(responseErrorText)
	}
}catch(err){
    console.log(JSON.stringify(err))
    return;
}
  }