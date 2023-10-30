import React, {useEffect, useContext, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { doc, getDoc } from 'firebase/firestore'

import AuthContext from '../context/AuthContext'
import TabBarIcon from '../components/TabBarIcon/index' 

import Home from '../screens/Home/index'
import Fast from '../screens/Fast/index'
import ProfileUser from '../screens/ProfileUser/index'
import ProfileWorker from '../screens/ProfileWorker/index'

import WorkerScreen from '../screens/Worker/index'
import SignUpWorker from '../screens/SignUpWorker/index'
import Contract from '../screens/Contract/index'
import Pedidos from '../screens/ProfileUser/Pedidos/index'
import Servicos from '../screens/ProfileWorker/Servicos'
import Andamento from '../screens/ProfileWorker/EmAndamento'

import NotificationScreen from '../Notification'

function AppBottomTabs(){


  const BottomTabs = createBottomTabNavigator()

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle:{
      borderWidth: 0,
      borderTopColor:'white', 
      backgroundColor:'#4F80FF',
      height: 55,
      elevation: 0
    },
    tabBarActiveTintColor:'white',
    tabBarInactiveTintColor:'rgba(255, 255, 255, 0.15)',
  }

  return(
    <BottomTabs.Navigator screenOptions={screenOptions} initialRouteName='Home'>

      <BottomTabs.Screen
        name='PWorker'
        component={ProfileWorker}
        options={{
          tabBarIcon: ({focused})=> 
            <TabBarIcon 
              focused={focused} 
              image={require('../assets/tabbar/actives/profileWorker.png')}
              imageInactive={require('../assets/tabbar/inactives/profileWorkerI.png')}
            />
        }}
      />

      <BottomTabs.Screen
        name='Fast'
        component={Fast}
        options={{
          tabBarIcon: ({focused})=> 
            <TabBarIcon 
              focused={focused} 
              image={require('../assets/fast.png')}
              imageInactive={require('../assets/tabbar/inactives/fastI.png')}
            />
        }}
      />

      <BottomTabs.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({focused})=> 
            <TabBarIcon 
              focused={focused} 
              image={require('../assets/tabbar/actives/home.png')}
              imageInactive={require('../assets/tabbar/inactives/homeI.png')}
            />
        }}
      />

      <BottomTabs.Screen
        name='Search'
        component={Fast}
        options={{
          tabBarIcon: ({focused})=> 
            <TabBarIcon 
              focused={focused} 
              image={require('../assets/tabbar/actives/search.png')}
              imageInactive={require('../assets/tabbar/inactives/searchI.png')}
            />
        }}
      />

      <BottomTabs.Screen
        name='ProfileUser'
        component={ProfileUser}
        options={{
          tabBarIcon: ({focused})=> 
            <TabBarIcon 
              focused={focused} 
              image={require('../assets/tabbar/actives/profile.png')}
              imageInactive={require('../assets/tabbar/inactives/profileI.png')}
            />,
          tabBarHideOnKeyboard: true
        }}
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
      <AppStack.Screen
        name='Worker'
        component={WorkerScreen}
      />

      <AppStack.Screen
        name='SignUpWorker'
        component={SignUpWorker}
      />

      <AppStack.Screen
        name='Contract'
        component={Contract}
      />

      <AppStack.Screen
        name='Pedidos'
        component={Pedidos}
      />

      <AppStack.Screen
        name='Servicos'
        component={Servicos}
      />
      <AppStack.Screen
        name='Andamento'
        component={Andamento}
      />

    <AppStack.Screen
        name='Noti'
        component={NotificationScreen}
      />
    </AppStack.Navigator>
  )
}