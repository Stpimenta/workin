import {createContext, useState} from 'react'

const authContext = createContext({})

export function AuthProvider({children}) {

   const[userAuth, setUserAuth] = useState({
    user: null,
   })

  return (
    <authContext.Provider value={{
        ...userAuth, setUserAuth: (data)=> setUserAuth({...userAuth, ...data})
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default authContext