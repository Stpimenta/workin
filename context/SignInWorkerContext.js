import React, {useState, createContext} from 'react'

const SignInWorkerContext = createContext({})

export function SignInWorkerProvider({children}) {

   const[signInWorker, setSignInWorker] = useState({
      CPF:'5494559595',
      filters:[],
      description:'',
      pedidos:[],
      nota: 4,
      URLimage: '',
      count: 1
   }) 

  return (
   <SignInWorkerContext.Provider value={{
      ...signInWorker, 
      setSignInWorker: (data) => setSignInWorker({...signInWorker, ...data})
   }}>
      {children}
   </SignInWorkerContext.Provider>
  )
}

export default SignInWorkerContext