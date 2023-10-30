import { View, Text, StyleSheet,  KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import Animated, {FadeInUp} from 'react-native-reanimated'
import SignInWorkerContext from '../../context/SignInWorkerContext'

import ControlledInput from '../../components/ControlledInput'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'


export default function FirstScreen() {

  const {control, handleSubmit, formState: {errors}} = useForm()

  const{setSignInWorker} = useContext(SignInWorkerContext)

  const nextStep = (data) =>{

    let CPF = data.cpf.split(' ').join()

   setSignInWorker({
    CPF: CPF,
    count: 2, 
   })
  }

  return (
    <View style={styles.containerAll}>
      <KeyboardAvoidingView enabled behavior='position'>
        <Animated.View 
          style={styles.form}
          entering={FadeInUp.duration(1000).springify()}
        >
          <ControlledInput
                name='cpf'
                control={control}
                widthContainer={{width:'100%'}} 
                widthInput={{flex:1}}
                desc='Seu CPF'
                autoCapitalize='none'
                error={errors.email}
            /> 
        </Animated.View>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(nextStep)}>
        <Text style={styles.textButton}>PROSSEGUIR</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerAll:{
    flex:1,
    padding: 25,
    flexDirection:'column',
    justifyContent:'space-between',
  },


 form:{
  width:'100%',
 },

 button:{
  width:'100%',
  height: 57, 
  backgroundColor:'#4F80FF',
  borderRadius: 10,
  alignItems:'center',
  justifyContent:'center',
  shadowColor: "#000",
  marginTop: 50
},

textButton:{
  fontSize: 20,
  fontWeight:'bold',
  color:'white',
},

})