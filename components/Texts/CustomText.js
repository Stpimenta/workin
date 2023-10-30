import { View, Text } from 'react-native'
import React, {useContext} from 'react'

import { useFonts } from 'expo-font';
import SignInContext from '../../context/SignInContext';

export default function CustomText({type, text, style}) {

   const {loading,setSignInContext} = useContext(SignInContext)


   let [fontLoaded] = useFonts({
      'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
      'MontBold': require('../../assets/fonts/Montserrat-Bold.ttf'),
      'MontSemi': require('../../assets/fonts/Montserrat-SemiBold.ttf')
   })

   if(!fontLoaded){
      return <Text></Text>
   }

   

   if(type == 'bold'){
      return (
         <Text style={[{ fontFamily:'MontBold'}, style]}>{text}</Text>
      )
   }

   if(type == 'semi'){
      return (
         <Text style={[{ fontFamily:'MontSemi'}, style]}>{text}</Text>
      )
   }

  return (
    <Text style={[{fontFamily:'Montserrat'}, style]}>
      {text}
    </Text>
  )
}