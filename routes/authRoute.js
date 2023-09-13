import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from '../screens/Onboarding/index'
import Login from '../screens/Login/index';
import SignUp from '../screens/SignUp/index'

export default function AuthRoute() {

   const {Navigator, Screen} = createNativeStackNavigator()

  return (
   <Navigator screenOptions={{headerShown: false}}>
      <Screen
         name="Onboarding"
         component={Onboarding}
      />
      <Screen
         name="Login"
         component={Login}
      />
      <Screen
         name="SignUp"
         component={SignUp}
      />
   </Navigator>
  )
}
