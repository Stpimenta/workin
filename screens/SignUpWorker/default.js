import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React, {useContext} from 'react'

import SignInWorkerContext from '../../context/SignInWorkerContext';

import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/Texts/CustomText';


export default function Default({setTrigger}){

   const navigation = useNavigation()

   return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'white', paddingHorizontal:25, paddingVertical: 15}}>
         <TouchableOpacity onPress={()=> setTrigger((prev)=> !prev)}>
            <CustomText text='R'/>
         </TouchableOpacity>
         
         <Image
            source={require('../../assets/default.png')}
            style={styles.image}
         />

         <CustomText
            text={'Comece a vender seus serviços!'}
            type={'bold'}
            style={{fontSize: 28, width:'100%', marginTop:20, marginBottom: 15, color:'#001240'}}
         />

         <CustomText
            text={'Pronto para começar a ter muitos clientes?'}
            style={{fontSize: 20,  width:'100%', textAlign:'justify', color:'#001240'}}

         />
         
         <TouchableOpacity style={styles.test} onPress={()=> navigation.navigate('SignUpWorker')}>
            <CustomText
               text='COMEÇAR!'
               type='bold'
               style={{fontSize: 18, color:'white'}}
            />
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   test:{
      width:'100%',
      height: 57, 
      backgroundColor:'#4F80FF',
      borderRadius: 10,
      alignItems:'center',
      justifyContent:'center',
      shadowColor: "#000",
      alignSelf:'center',
      marginTop: 80
   },

   image:{
      width: '100%',
      height: 250,
      resizeMode:'contain',
      marginLeft: -50
   }
})