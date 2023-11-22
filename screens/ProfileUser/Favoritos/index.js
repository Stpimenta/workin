import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../../../context/AuthContext'
import WorkerContext from '../../../context/WorkerContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import CustomText from '../../../components/Texts/CustomText'

import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'


export default function Favoritos() {

   const {user} = useContext(AuthContext)
   const{setWorker} = useContext(WorkerContext)
   const[favoritos, setFavoritos] = useState([])

   const navigation = useNavigation()

   useEffect(()=>{
      pegarDado()
   }, [])

   async function pegarDado(){
      const colRef = collection(db, 'users', user.uid, 'favoritos')

      await getDocs(colRef).then((snap)=>{

         const arr = []

         snap.forEach((doc)=>{
            const obj = {data: doc.data(), id: doc.id}
            arr.push(obj)
         })

         setFavoritos(arr)
      })
   }

   async function handleClick(item){
      setWorker({
         receiver:{
            nome: item.data.nome,
            filtros: item.data.filtros,
            descricao: item.data.descricao,
            nota: item.data.nota,
            price: item.data.price,
            image: item.data.image,
            seguidores: item.data.seguidores,
            id: item.id,
          }
      })

      navigation.navigate('Worker')
   }




  return (
    <View style={styles.containerAll}>
       <Image
            source={require('../../../assets/backSignUp.png')}
            style={styles.backIcon}
         />

         {favoritos?.map((item)=>{
            return(
               <TouchableOpacity style={styles.containerCard} key={item.id} onPress={()=> handleClick(item)}>
                  <TouchableOpacity onPress={null} style={{alignSelf:'flex-end'}}>
                     <AntDesign name="heart" size={28} color={'#FF4C4C'} />
                  </TouchableOpacity>
                  
                  <CustomText text={item.data.nome} style={styles.nomePrestador} type='bold'/>
                  <CustomText text={item.data.descricao} style={styles.descricao}/>
               </TouchableOpacity>
            )
         })}
    </View>
  )
}

const styles = StyleSheet.create({
   containerAll: {
      flex: 1,
      backgroundColor: 'white',
      padding: 25,
   },

   backIcon: {
      width: 12,
      height: 17,
      resizeMode: 'stretch',
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