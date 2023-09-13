import { View, Text, Image, StyleSheet } from 'react-native'
import react from 'react'
import Form from '../../components/Form'

import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated'

export default function Login() {
  return (
    <View style={styles.containerAll}>
      <Animated.View 
         style={{flex:1, alignItems:'center', justifyContent:'center',  paddingVertical: 10, minHeight: 60}}
         entering={FadeInUp.duration(1000).springify()}
      >

       <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      </Animated.View>

      <Animated.View style={{ width:'100%'}} entering={FadeInUp.duration(1000).springify()}>
         <Text style={styles.title}>Bem-vindo!</Text>
         <Text style={styles.subtitle}>Preencha com suas informações</Text>
      </Animated.View>
      <Form/>
    </View>
  )
}

const styles = StyleSheet.create({
   containerAll:{
      padding: 30,
      flex:1,
      backgroundColor:'white'
   },

   logo:{
      width: 200,
      height: 40,
      alignSelf:'center',
   },

   title:{
      fontSize:36,
      color:'#001240',
      fontWeight:'bold',
   },

   subtitle:{
      fontSize: 20,
      color:'#001240',
      fontWeight: '100'
   },

   input:{
      paddingHorizontal: 25,
      height: 50,
      width:'100%',
      backgroundColor:'rgba(188, 196, 217, 0.15)',
      alignItems:'center',
      borderRadius: 5,
      color:'#A6ABB3'
   },

   forgetPassword:{
      alignSelf:'flex-end',
      fontSize: 10,
      color: '#001240',
      fontWeight:'300',
      opacity: 0.7,
      marginTop: 8,
      marginRight: 3
   },

   button:{
      width:'100%',
      height: 57, 
      backgroundColor:'#4F80FF',
      borderRadius: 10,
      alignItems:'center',
      justifyContent:'center',
      shadowColor: "#000",
      marginTop: 80
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