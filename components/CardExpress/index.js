import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useContext} from 'react'
import CustomText from '../Texts/CustomText'

import WorkerContext from '../../context/WorkerContext'
import AuthContext from '../../context/AuthContext'

import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

import uuid from 'react-native-uuid';

import { AntDesign, Foundation  } from '@expo/vector-icons'; 



export default function CardExpress({item, filters, setVisible, key}) {

   const {descricao, date, sender, receiver, setWorker, price} = useContext(WorkerContext)
   const {user} = useContext(AuthContext)



   async function teste(){

      let data = new Date(),
      dia  = data.getDate().toString().padStart(2, '0'),
      mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano  = data.getFullYear();

      const dataCorreta = dia + '/' + mes

      setVisible(true)
    const uid = uuid.v4()


      // console.log(item)

      const docRef = doc(db, 'users', user.uid)
      
      await getDoc(docRef).then((doc)=>{
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
            },
            sender:{...doc.data(), id: doc.id},
            date: dataCorreta
         })
      })

      
      console.log(receiver.price)
   }



  return (
    <TouchableOpacity style={styles.containerCard} onPress={teste} key={key}>
      <View style={styles.containerHeader}>
         <View style={styles.avatar}>
            <Image
               source={{uri: item?.data.image}}
               style={{flex:1, overflow:'hidden', borderRadius: 5}}
            />
         </View>

         <View style={{justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', gap: 8, flexWrap:'wrap'}}>
               
               {filters?.map((filtro)=> <CustomText text={filtro} style={{fontSize: 12}}/>)}
               
            </View>
            <CustomText text={item?.data.nome} type='bold' style={styles.name}/>
         </View>
      </View>

      <View style={{marginBottom: 15}}>
         <CustomText text={item?.data.descricao} style={styles.desc}/>
      </View>

      <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
         <View style={{alignItems:'center', flexDirection:'row', gap: 5}}>
            <CustomText text={item?.data.nota} style={styles.rating}/>
            <AntDesign name="star" size={16} color="#001240"/>
         </View>
         <CustomText text={`R$${item?.data.price}`} style={styles.rating}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
   containerCard:{
      width: '100%',
      paddingHorizontal: 16,
      backgroundColor:'white',
      borderRadius: 10,
      paddingVertical: 22,
      justifyContent:'space-evenly',
      borderWidth:1,
      borderColor:'rgba(222, 222, 222, 0.5)',
   },

   containerHeader:{
      flexDirection:'row',
      gap: 12,
      marginBottom: 12
   },

   avatar:{
      width: 88,
      height: 82,
      borderRadius: 0,
      overflow:'hidden'
   },

   name:{
      fontSize: 20,
      marginBottom: 20,
      color:'#001240'

   },

   desc:{
      fontSize: 14,
      color:'#001240'
   },

   rating:{
      fontSize: 20,
      color:'#001240'

   }

})