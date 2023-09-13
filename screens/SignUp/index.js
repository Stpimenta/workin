import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import SignInContext from '../../context/SignInContext'

import FirstScreen from './FirstScreen'
import SecondScreen from './SecondScreen'
import ThirdScreen from './ThirdScreen'

import HeaderSignUp from '../../components/HeaderSignUp'

export default function SignUp() {


    const {loading, count} = useContext(SignInContext)
    const[progress, setProgress] = useState(0.33)

    useEffect(()=>{
        if(count == 1){
            setProgress(0.33)
        }
        if(count == 2){
            setProgress(0.66)
        }
        if(count == 3){
            setProgress(0.999)
        }
    }, [count])

    if(loading){
        return(
          <View style={{flex:1, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
            <Image
                source={require('../../assets/logo.png')}
                style={{width: 200, height: 40}}
            />

            <Text>Carregando...</Text>

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
            ) : null}
        </View>
    )
}