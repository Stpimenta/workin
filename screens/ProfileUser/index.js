import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import React, {useEffect, useContext, useState} from 'react'

import { doc, getDoc } from 'firebase/firestore'
import { db, auth} from '../../firebase/config'

import {signOut} from 'firebase/auth'

import styles from './style'

import CustomText from '../../components/Texts/CustomText'
import Option from '../../components/OptionProfile/index'

import AuthContext from '../../context/AuthContext'

import { MaterialIcons } from '@expo/vector-icons'; 


export default function ProfileUser() {

   const {user, setUserAuth} = useContext(AuthContext)
   const [dados, setDados] = useState(null)

   useEffect(()=>{
      async function pegarDado(){
         const docRef = doc(db, 'users', user.uid)

         await getDoc(docRef).then((doc)=>{
            setDados(doc.data())
            console.log(doc.data())
         })

         console.log(user.uid)
      }

      pegarDado()
   }, [])

   async function handleLogout(){

      setUserAuth({
         user: null
      })

      signOut(auth).then(()=>{
         console.log('deslogado')
      })
   }

  return (
    <ScrollView style={styles.containerAll}>
      <TouchableOpacity style={{width: 25, height: 25, alignSelf:'flex-end'}} onPress={handleLogout}>
         <MaterialIcons name="logout" size={24} color="#001240" />
      </TouchableOpacity>

      <View style={styles.containerName}>
         <View style={styles.userMask}>

         </View>

         <CustomText text={dados?.nome} type='bold' style={{fontSize: 24}}/>
      </View>

      <View style={styles.containerOptions}>
         <Option name='Pedidos' icon={require('../../assets/pedidos.png')} screen='Pedidos'/>
         <Option name='Favoritos' icon={require('../../assets/favoritos.png')}/>
         <Option name='Notificação' icon={require('../../assets/notification.png')}/>
         <Option name='Sobre nós' icon={require('../../assets/team.png')}/>
         <Option name='Ajuda' icon={require('../../assets/ajuda.png')}/>
         <Option name='Termos' icon={require('../../assets/terms.png')}/>
      </View>
    </ScrollView>
  )
}