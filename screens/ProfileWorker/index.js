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
import { AntDesign, Foundation  } from '@expo/vector-icons'; 


export default function ProfileWorker() {


   const {isWorker} = useContext(SignInContext)
   const {user} = useContext(AuthContext)
   const[trigger, setTrigget] = useState(false)

   const[prestador, setPrestador] = useState(null)
   const[dado, setDado] = useState(false)

   useEffect(()=>{
      // pegarDado()
      pegarDadoPrestador()
   }, [trigger])

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
         <DefaultScreenWorker setTrigger={setTrigget}/>
         )
      }
      
   
   if(prestador?.isWorker == true){
         return (
            <ScrollView style={styles.containerAll}>
            {/* <TouchableOpacity style={{width: 25, height: 25, alignSelf:'flex-end'}}>
               <Image 
                  source={require('../../assets/edit.png')}
                  />
            </TouchableOpacity> */}

            <View style={styles.containerName}>
               <View style={styles.userMask}>
                  <Image source={{uri: prestador.image != '' ? prestador.image : 'https://cdn-icons-png.flaticon.com/512/666/666201.png'}} style={{width:'100%', height:'100%', borderRadius: 100}}/>
               </View>

               <View>
                  <CustomText text={prestador.nome} type='bold' style={{fontSize: 24}}/>
                  <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                     <View style={{flexDirection:'row', alignItems:'center', gap: 10}}>
                        <CustomText text={prestador?.nota} type='bold' style={{fontSize: 16}}/>
                        <AntDesign name="star" size={16} color="#001240"/>
                     </View>
                     <CustomText text={prestador?.seguidores} type='bold' style={{fontSize: 16}}/>
                  </View>
               </View>
            </View>

            <View style={styles.containerOptions}>
               <Option name='Fast' icon={require('../../assets/fast.png')} hasSwitch/>
               <Option name='Serviços' icon={require('../../assets/solicitados.png')} screen='Servicos' hasSeta/>
               <Option name='Em andamento' icon={require('../../assets/andamento.png')} screen='Andamento' hasSeta/>
            </View>
         </ScrollView>
      )
   }
}