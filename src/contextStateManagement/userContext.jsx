import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

// import jwt_decode from 'jwt-decode';
export const userContext = createContext()

export default function UserContextProvider(props){
       const [isUser, setIsUser] = useState(null)
       const [nameUser,setNameUser] = useState()


       // Check login user in localStorage
       useEffect(function(){
              if(localStorage.getItem('userToken')) {
                     setIsUser(localStorage.getItem('userToken'))
                     let token = localStorage.getItem('userToken');
                     if (token) {
                            token = jwtDecode(token);
                            setNameUser(token?.name)
                     }
              } 
       },[])

       return (
              <userContext.Provider value={{isUser, setIsUser , nameUser }}>
                     {props.children}
              </userContext.Provider>
       )
}