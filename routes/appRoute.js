import React, {useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInContext from '../context/SignInContext'

import Home from '../screens/Home/index'
import Fast from '../screens/Fast/index'
import WorkerScreen from '../screens/Worker/index'
import ProfileUser from '../screens/ProfileUser/index'
import ProfileWorker from '../screens/ProfileWorker/index'
import SignUpWorker from '../screens/SignUpWorker/index'
import DefaultScreenWorker from '../screens/SignUpWorker/default'

import TabBarIcon from '../components/TabBarIcon/index' 


function AppBottomTabs(){

  const {isWorker} = useContext(SignInContext)

  const BottomTabs = createBottomTabNavigator()

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle:{
      borderWidth: 0,
      borderTopColor:'white', 
      backgroundColor:'white',
      height: 55,
      elevation: 0
    },
    tabBarActiveTintColor:'#4F80FF',
    tabBarInactiveTintColor:'rgba(0, 18, 64, 0.15)',
  }

  return(
    <BottomTabs.Navigator screenOptions={screenOptions} initialRouteName='Home'>

      <BottomTabs.Screen
        name='PWorker'
        component={isWorker ? ProfileWorker : DefaultScreenWorker}
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
    </AppStack.Navigator>
  )
}