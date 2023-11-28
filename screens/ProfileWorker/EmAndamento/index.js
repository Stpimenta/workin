import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { db } from '../../../firebase/config'
import { getDoc, getDocs, doc, updateDoc, collection, deleteDoc, onSnapshot, query, where} from 'firebase/firestore'
import AuthContext from '../../../context/AuthContext'
import CustomText from '../../../components/Texts/CustomText'

import { FontAwesome } from '@expo/vector-icons'; 

export default function Servicos() {

   const[servicos, setServicos] = useState([])
   const[trigger, setTrigger] = useState(false)

   const {user} = useContext(AuthContext)

   useEffect(()=>{
      const colRef = collection(db, 'prestadores', user.uid, 'servicos')
      const q = query(collection(db, "prestadores", user.uid, 'servicos'), where("tipo", "==", "Aceito"))
      const arr = []

      onSnapshot(q, (snap)=>{
         snap.forEach((doc)=>{
            console.log(doc.data())
            arr.push({
               data: doc.data(),
               id: doc.id
            })
         })

         setServicos(arr)
      }) 
   }, [trigger])

   async function SendMessage(item){
      let msg = item.data.descricao;
      let phone = item.data.sender.telefone;
       
      let url = "whatsapp://send?text=" + msg + "&phone=" + '+551196258-0939';

      Linking.openURL(url)
         .then(data => {
            console.log("WhatsApp Opened");
         })
         .catch(() => {
            alert("Make sure WhatsApp installed on your device");
         });
   }

   async function avaliarPedido(feedback, item){

      // const docPrestadorRef = doc(db, 'prestadores', user.uid, 'servicos', item.id)
      // const docUserRef = doc(db, 'users', item.data.sender.id, 'pedidos', item.id)

      // if(feedback == 'Aceito'){
   
      //    await updateDoc(docPrestadorRef, {
      //       tipo:'Aceito'
      //    }).then(()=>{
      //       console.log('foi')
      //    })

      //    await updateDoc(docUserRef, {
      //       tipo:'Aceito'
      //    }).then(()=>{
      //       setTrigger(!trigger)
      //    })
      // }
      // else{
      //    await deleteDoc(docPrestadorRef).then(()=>{
      //       console.log('deletou')
      //    })

      //    await deleteDoc(docUserRef).then(()=>{
      //       console.log('deletou2')
      //    })
      // }
   }


  return (
    <View style={styles.containerAll}>
      <Image
         source={require('../../../assets/backSignUp.png')}
         style={styles.backIcon}
      />

      {servicos?.length == 0 && <CustomText text='Você não tem serviços'/>}


      {servicos?.map((item)=> {
         return(
            <TouchableOpacity key={item.id} style={styles.containerCard}>
   
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 20}}>
               <CustomText text={item.data.sender.nome} type='bold' style={styles.nomePrestador}/>
               <CustomText text={item.data.date} style={styles.date}/>
            </View>
   
            <CustomText text={item.data.descricao} style={styles.descricao}/>
   
            <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', gap: 25, marginTop: 20}}>
               <TouchableOpacity style={styles.accept}>
                  <CustomText text='Finalizar' type='bold' style={{color:'white'}}/>
               </TouchableOpacity>
            </View>  
         </TouchableOpacity>
         )
      })} 
    </View>
  )
}

const styles = StyleSheet.create({
   containerAll:{
      flex:1,
      backgroundColor:'white',
      padding: 25,
      paddingTop: 40
   },

   backIcon:{
      width: 12,
      height: 17,
      resizeMode: 'stretch',
      marginBottom: 60
   },

   containerCard:{
      paddingBottom: 30,
      borderBottomColor:'rgba(0, 18, 64, 0.2)',
      borderBottomWidth: 1,
   },

   nomePrestador:{
      fontSize: 24,
      color:'#001240'
   },

   date:{
      fontSize: 20,
      opacity: 0.7,
      color:'#001240'
   },

   descricao:{
      fontSize: 16,
      color:'#001240',
      textAlign:'justify'
   },

   containerType:{
      alignSelf:'flex-end', 
      marginBottom: 15,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor:'#E2F0F1',
      borderRadius: 10
   },

   type:{
      color:"#717273",
      fontSize: 12
   },

   accept:{
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor:'#001240',
      borderRadius: 10
   },

   refuse:{
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor:'#FF4C4C',
      borderRadius: 10
   }
})



