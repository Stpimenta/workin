
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import {useForm} from 'react-hook-form'
import ControlledInput from '../ControlledInput'

import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated'

import { signInWithEmailAndPassword } from 'firebase/auth' 
import {auth} from '../../firebase/config'

import { useNavigation } from '@react-navigation/native';

export default function Form() {

   const {control, handleSubmit} = useForm()

   const navigation = useNavigation()

   const handleLogin = (data) =>{
      signInWithEmailAndPassword(auth, data.email, data.password)
         .then(()=> console.log('logado'))
         .catch(()=> console.log('error'))
   }
   
  return (
      <View style={{paddingTop:60, flex:2,justifyContent:'space-between'}}>
      <Animated.View entering={FadeInUp.duration(1000).delay(100).springify()}> 
         <ControlledInput
            name='email'
            control={control}
            widthContainer={{width:'100%'}}
            widthInput={{flex:1}}
            desc='Seu e-mail' 
            icon={require('../../assets/emailicon.png')} 
            hasIcon
            autoCapitalize='none'
         />

         <ControlledInput
            name='password'
            control={control}
            widthContainer={{width:'100%'}}
            widthInput={{flex:1}}
            desc='Seu senha' 
            icon={require('../../assets/passIcon.png')} 
            hasIcon
         />
         <Text style={styles.forgetPassword}>Esqueceu sua senha?</Text>
      </Animated.View>
      

      <Animated.View entering={FadeInDown.duration(1000).delay(200).springify()}>
         <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmit(handleLogin)}>
            <Text style={styles.textButton}>ENTRAR</Text>
         </TouchableOpacity>
         <View style={{flexDirection:'row', alignSelf:'center'}}>
            <Text>Novo por aqui?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
               <Text style={styles.textSignUp}>Cadastre-se agora!</Text>
            </TouchableOpacity>
         </View>
      </Animated.View>
      </View>
  )
}

const styles = StyleSheet.create({
   forgetPassword:{
      alignSelf:'flex-end',
      fontSize: 10,
      color: '#001240',
      fontWeight:'300',
      opacity: 0.7,
      marginTop: 0,
      marginRight: 4,
      marginBottom: 30
   },

   button:{
      width:'100%',
      height: 57, 
      backgroundColor:'#4F80FF',
      borderRadius: 10,
      alignItems:'center',
      justifyContent:'center',
      shadowColor: "#000",
      marginBottom: 5
   },

   textButton:{
      fontSize: 20,
      fontWeight:'bold',
      color:'white',
      
   },

   textSignUp:{
      color:'#4F80FF',
      fontWeight:'bold',
      marginLeft: 5
   }
})