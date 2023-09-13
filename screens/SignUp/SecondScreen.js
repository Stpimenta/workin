import { View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import SignInContext from '../../context/SignInContext'
import {useForm} from 'react-hook-form'

import ControlledInput from '../../components/ControlledInput'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import Animated, {FadeInUp} from 'react-native-reanimated'

const schema = yup.object({
  rua: yup.string().required('Informe sua rua'),
  numero: yup.number().required('nº da sua casa'),
  bairro: yup.string().required('Informe seu bairro'),
})

export default function SecondScreen() {

  const {control, handleSubmit, setValue, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const {count, setSignInContext} = useContext(SignInContext) 

  const nextStep = (data) =>{
    setSignInContext({
      endereco:{...data},
      count: count + 1
    })
  }

  const requestAdress = async (text) =>{
    const textNoSpace = text.replace(/\D/g,'')

    await fetch(`https://viacep.com.br/ws/${textNoSpace}/json/`)
      .then((response)=> response.json())
        .then((json)=>{
          setValue('rua', json.logradouro)
          setValue('bairro', json.bairro)
          setValue('complemento', json.complemento)
          setValue('uf', json.uf)
        })
      .catch((err)=> console.log(err))
  }


  return (
    <View style={styles.containerAll}>

      <KeyboardAvoidingView enabled behavior='position'>
        <Animated.View 
          style={styles.form}
          entering={FadeInUp.duration(1000).springify()}
        >
          <ControlledInput
            name='CEP'
            control={control}
            widthContainer={{width:'100%'}}
            widthInput={{flex:1}}
            desc='Seu CEP'
            onSubmitEditing={({nativeEvent: {text}})=> requestAdress(text)}
            error={errors.cep}
          />

          <View style={{flexDirection:'row', gap: 10}}>
            <ControlledInput
              name='rua'
              control={control}
              widthContainer={{flex:1}}
              widthInput={{flex:1}}
              desc='Sua Rua'
            />

            <ControlledInput
              name='numero'
              control={control}
              widthContainer={{width:70}}
              widthInput={{flex:1, textAlign:'center'}}
              desc='Nº'
            />
          </View>

          <ControlledInput
            name='bairro'
            control={control}
            widthContainer={{width:'100%'}}
            widthInput={{flex:1}}
            desc='Seu Bairro'
          />

          <View style={{flexDirection:'row', gap: 10}}>
            <ControlledInput
              name='complemento'
              control={control}
              widthContainer={{flex:1}}
              widthInput={{flex:1}}
              desc='Complemento'
            />

            <ControlledInput
              name='uf'
              control={control}
              widthContainer={{width:70}}
              widthInput={{flex:1, textAlign:'center'}}
              desc='UF'
            />
          </View>
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

  title:{
    fontSize:36,
    color:'#001240',
    fontWeight:'bold',
 },

 subtitle:{
    fontSize: 20,
    color:'#001240',
    fontWeight: '100',
    marginLeft: 5
 },

  progress:{
    width: '100%',
    height: 5,
    backgroundColor:'blue',
    opacity: 0.2,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 70
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