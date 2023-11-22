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
import Search from '../screens/Search/Firstindex'

import WorkerScreen from '../screens/Worker/index'
import SignUpWorker from '../screens/SignUpWorker/index'
import Contract from '../screens/Contract/index'
import Pedidos from '../screens/ProfileUser/Pedidos/index'
import Servicos from '../screens/ProfileWorker/Servicos'
import Andamento from '../screens/ProfileWorker/EmAndamento'
import Favoritos from '../screens/ProfileUser/Favoritos'
import AboutUs from '../screens/ProfileUser/About us/index'
import Help from '../screens/ProfileUser/Help/index'
import Secondsearch from '../screens/Search/secondindex'


import NotificationScreen from '../Notification'

function AppBottomTabs(){


  const BottomTabs = createBottomTabNavigator()

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle:{
      borderWidth: 0,
      borderTopColor:'#4F80FF', 
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
        component={Search}
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

      <AppStack.Screen
        name='Favoritos'
        component={Favoritos}
      />

      <AppStack.Screen
        name='About'
        component={AboutUs}
      />

      <AppStack.Screen
        name='Help'
        component={Help}
      />

      <AppStack.Screen
        name='Teste'
        component={Secondsearch}
      />
    </AppStack.Navigator>
  )
}