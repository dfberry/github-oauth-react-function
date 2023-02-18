import { useState } from 'react';

// TBD - Need type for token
export default function useToken():any {

  // Get Token from session Storage
  const getToken = () => {
    const tokenString:string = sessionStorage.getItem('token') as string;
    return (!!tokenString) ? true : false;
  };

  // State mgmt
  const [isAuthenticated, setToken] = useState(getToken());

  // Save Token to session Storage
  const saveToken = (userToken:any) => {
    if(userToken?.token){
      sessionStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
    }
  };

  // TBD:
  const returnData = {
    setToken: saveToken,
    isAuthenticated
  }; 


  return returnData
}