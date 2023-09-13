import React, {useEffect, useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/config';

import AuthContext from '../context/AuthContext';

import AuthRoute from './authRoute';
import AppRoute from './appRoute';

export default function Routes() {

  const {user, setUserAuth} = useContext(AuthContext)

  useEffect(()=>{
    const unsubscriber = onAuthStateChanged(auth, async (authenticatedUser)=>{
      authenticatedUser ? setUserAuth({user: authenticatedUser}) : setUserAuth({user: null})
    })

    return ()=> unsubscriber()
  }, [user])

  return (
    <NavigationContainer>
      { user ? <AppRoute/> : <AuthRoute/>}
    </NavigationContainer>
  )
}