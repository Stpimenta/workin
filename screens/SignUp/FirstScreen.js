import { View, Text, StyleSheet,  KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'

import SignInContext from '../../context/SignInContext'
import Animated, {FadeInUp} from 'react-native-reanimated'

import ControlledInput from '../../components/ControlledInput'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const schema = yup.object({
  nome: yup.string().required("Informe seu nome"),
  email: yup.string().email("Informe um e-mail válido").required("Informe seu e-mail"),
  ddd: yup.string().min(2, "DDD inválido").required("Informe seu DDD"),
  phone: yup.string().min(9, "O número deve conter 9 números").required("Informe seu telefone"),
  password: yup.string().min(6, "A senha deve conter 6 digitos.").required("Informe sua senha")
})


export default function FirstScreen() {

  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })
  const {setSignInContext} = useContext(SignInContext)


  const nextStep = (data) =>{
    const number = `+55${data.ddd}${data.phone}`

    setSignInContext({
      nome: data.nome,
      email:data.email,
      phone: number,
      password: data.password,
      count: 2
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
                name='nome'
                control={control}
                widthContainer={{width:'100%'}} 
                widthInput={{flex:1, height:50}}
                hasIcon
                icon={require('../../assets/userIcon.png')}
                desc='Seu nome'
                error={errors.nome}
            />

          <ControlledInput
                name='email'
                control={control}
                widthContainer={{width:'100%'}} 
                widthInput={{flex:1, height:50}}
                hasIcon
                icon={require('../../assets/emailicon.png')}
                desc='Seu email'
                autoCapitalize='none'
                error={errors.email}
            />

          <View style={{flexDirection:'row', gap: 10}}>
              <ControlledInput
                name='ddd'
                control={control}
                widthContainer={{width: 70}}
                widthInput={{flex:1}}
                desc='DDD'
                inputMode='numeric'
                error={errors.ddd}
              />

              <ControlledInput
                name='phone'
                control={control}
                widthContainer={{flex:1}}
                widthInput={{flex:1}}
                hasIcon
                icon={require('../../assets/wpp.png')}
                desc='Seu número'
                inputMode='numeric'
                error={errors.phone}
              />
          </View>

          <ControlledInput
              name='password'
              control={control}
              widthContainer={{width:'100%'}} 
              widthInput={{flex:1}}
              hasIcon
              icon={require('../../assets/passIcon.png')}
              desc='Sua senha'
              autoCapitalize='none'
              error={errors.password}
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
    padding: 25
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
  marginTop: 100
},

textButton:{
  fontSize: 20,
  fontWeight:'bold',
  color:'white',
},

})