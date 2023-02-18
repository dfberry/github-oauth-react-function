import { useState } from 'react';
import { IUser } from '../utils/types'


// TBD - Need type for token
export default function useUser():any {

  // State mgmt
  const [user, setUser] = useState<IUser>();

  // Save Token to session Storage
  const saveUser = (user:IUser) => {
    setUser(user)
  };

  // TBD:
  const returnData = {
    setUser: saveUser,
    user
  }; 


  return returnData
}