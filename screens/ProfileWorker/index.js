import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import React, {useContext, useState, useEffect} from 'react'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

import styles from './style'

import CustomText from '../../components/Texts/CustomText'
import Option from '../../components/OptionProfile/index'

import SignInContext from '../../context/SignInContext'
import AuthContext from '../../context/AuthContext'

import DefaultScreenWorker from '../SignUpWorker/default'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

export default function ProfileWorker() {


   const {isWorker} = useContext(SignInContext)
   const {user} = useContext(AuthContext)

   const[prestador, setPrestador] = useState(null)
   const[dado, setDado] = useState(false)

   useEffect(()=>{
      // pegarDado()
      pegarDadoPrestador()
   }, [])

   // async function pegarDado(){
      
   //    const docRefUser = doc(db, 'users', user.uid)

   //    await getDoc(docRefUser).then((doc)=>{
   //       setUsuario(doc.data())
   //    })

   // }

   async function pegarDadoPrestador(){
      const docRefPrestador = doc(db, 'prestadores', user.uid)

      await getDoc(docRefPrestador).then((doc)=>{
         if(doc.exists()){
            setPrestador(doc.data())
            setDado(true)
         }
         else{
            setPrestador('2')
            setDado(false)
         }
      })
   }

   if(prestador == null){
      return(
         <CustomText text='Carregando'/>
      )
   }

   
   if(dado == false){
      return(
         <DefaultScreenWorker/>
         )
      }
      
   
   if(prestador?.isWorker == true){
         return (
            <ScrollView style={styles.containerAll}>
            <TouchableOpacity style={{width: 25, height: 25, alignSelf:'flex-end'}}>
               <Image 
                  source={require('../../assets/edit.png')}
                  />
            </TouchableOpacity>

            <View style={styles.containerName}>
               <View style={styles.userMask}>

               </View>

               <View>
                  <CustomText text={prestador.nome} type='bold' style={{fontSize: 24}}/>
                  <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                     <CustomText text='4.5' type='bold' style={{fontSize: 16, marginRight: 20}}/>
                     <CustomText text='100' type='bold' style={{fontSize: 16}}/>
                  </View>
               </View>
            </View>

            <View style={styles.containerOptions}>
               <Option name='Fast' icon={require('../../assets/fast.png')} screen='Home'/>
               <Option name='Serviços' icon={require('../../assets/solicitados.png')} screen='Servicos'/>
               <Option name='Em andamento' icon={require('../../assets/andamento.png')} screen='Andamento'/>
            </View>
         </ScrollView>
      )
   }
}