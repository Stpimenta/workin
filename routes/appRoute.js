import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home/index'


function AppBottomTabs(){

  const BottomTabs = createBottomTabNavigator()

  return(
    <BottomTabs.Navigator screenOptions={{headerShown: false}}>
      <BottomTabs.Screen
        name='Home'
        component={Home}
      />
    </BottomTabs.Navigator>
  )
}

export default function AppRoute() { 

  const AppStack = createNativeStackNavigator()


  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen
        name="AppBottomTabs"
        component={AppBottomTabs}
      />
    </AppStack.Navigator>
  )
}