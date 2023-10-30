import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, {useContext, useState} from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";

import SignInContext from '../../context/SignInContext'

import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {auth, db} from '../../firebase/config'

import { useNavigation } from '@react-navigation/native';

import Animated, {FadeInUp} from 'react-native-reanimated'

import terms from '../../terms';
import CustomText from '../../components/Texts/CustomText';


export default function ThirdScreen() {

  const navigation = useNavigation()

  const[id, setId] = useState(null)

  const {loading, nome, email, endereco, password, phone, setSignInContext} = useContext(SignInContext)
  const[check, setCheck] = useState(false)


  return (
    <View style={styles.containerAll}>

      <Animated.View 
        style={styles.form}
        entering={FadeInUp.duration(1000).springify()}
      >

      </Animated.View>

      <TouchableOpacity style={[styles.button, {opacity: check ? 1 : 0.5}]} disabled={check ? false : true} onPress={finishSignUp}>
        <Text style={styles.textButton}>FINALIZAR</Text>
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
  backgroundColor:'#4F80FF',
  opacity: 0.2,
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 70
 },

 form:{
  width:'100%',
  height: 250,
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

terms:{
  color:'#001240',
  textAlign:'justify'
}

})