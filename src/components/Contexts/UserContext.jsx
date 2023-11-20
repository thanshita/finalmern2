import React, { createContext, useState } from 'react'
import Login from '../Login/Login';
import App from '../../App';
//userContext
export const userdetailscontext = createContext()
const UserContext = () => {
    const [userDetails, setUserDetails] = useState({
        email : "",password : ""
    });
    const [isCustomer, setAsCustomer] = useState(false);
  return (
    <div>
      <userdetailscontext.Provider value={{ userDetails, setUserDetails,isCustomer, setAsCustomer }}>
        <Login />
      </userdetailscontext.Provider>
    </div>
  )
}

export default UserContext
