import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import SignInContext from '../../context/SignInContext'

import { Video, ResizeMode } from 'expo-av';

import FirstScreen from './FirstScreen'
import SecondScreen from './SecondScreen'
import ThirdScreen from './ThirdScreen'
import FourthScreen from './FourthScreen'

import HeaderSignUp from '../../components/HeaderSignUp'

export default function SignUp() {


    const {loading, count} = useContext(SignInContext)
    const[progress, setProgress] = useState(0.33)

    useEffect(()=>{
        if(count == 1){
            setProgress(0.25)
        }
        if(count == 2){
            setProgress(0.50)
        }
        if(count == 3){
            setProgress(0.75)
        }
        if(count == 4){
            setProgress(1)
        }
    }, [count])

    if(loading){
        return(
          <View style={{flex:1, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
            <Image
                source={require('../../assets/icon.png')}
                style={{width: 100, height: 100}}
            />

          </View>
        )
      }

    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            
            <HeaderSignUp subtitle={''} progress={progress}/>

            {count == 1 ? (
                <FirstScreen/>
            ) : 
            count == 2 ? (
                <SecondScreen/>
            ) : 
            count == 3 ? (
                <ThirdScreen/>
            ) : 
            count == 4 ? (
                <FourthScreen/>
            ) : null}
        </View>
    )
}