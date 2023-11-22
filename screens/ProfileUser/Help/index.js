import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../../../context/AuthContext'
import WorkerContext from '../../../context/WorkerContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import CustomText from '../../../components/Texts/CustomText'

import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'

import { MaterialIcons } from '@expo/vector-icons'; 



export default function AboutUs() {

   const {user} = useContext(AuthContext)
   const{setWorker} = useContext(WorkerContext)
   const[favoritos, setFavoritos] = useState([])

   const navigation = useNavigation()




  return (
    <View style={styles.containerAll}>
       <Image
            source={require('../../../assets/backSignUp.png')}
            style={{width: 12,
               height: 17,
               resizeMode: 'stretch', position:'absolute', top: 35, left: 25}}
         />

         <CustomText text='Contate nosso time por esse e-mail: ' style={{marginBottom: 20, color:'#001240', }}/>

         <View style={{flexDirection:'row', alignItems:'center', gap: 10}}>
            <MaterialIcons name="email" size={24} color="#001240" />
            <CustomText text='workintcc2000@gmail.com' style={{fontSize: 20, color:'#001240'}}/>
         </View>
    </View>
  )
}

const styles = StyleSheet.create({
   containerAll: {
      flex: 1,
      backgroundColor: 'white',
      padding: 25,
      alignItems:'center',
      justifyContent:'center'
   },

   backIcon: {
      
      marginBottom: 80
   },

   containerCard: {
      paddingBottom: 30,
      borderBottomColor: 'rgba(0, 18, 64, 0.2)',
      borderBottomWidth: 1,
      marginBottom: 30
   },

   nomePrestador: {
      fontSize: 24,
      color: '#001240',
      marginBottom: 20
   },

   descricao: {
      fontSize: 16,
      color: '#001240',
      textAlign: 'justify'
   },
})