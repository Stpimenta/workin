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

   const colRef = collection(db, 'prestadores', user.uid, 'servicos')
   const q = query(collection(db, "prestadores", user.uid, 'servicos'), where("tipo", "==", "Pendente"))
   const arr = []

   useEffect(()=>{
      onSnapshot(q, (snap)=>{
         snap.forEach((doc)=>{
            arr.push({
               data: doc.data(),
               id: doc.id
            })
         })

         setServicos(arr)
      }) 
   }, [trigger])

   async function sendNotification(item){

      const message = {
         to: item.data.sender.token,
         title: `${item.data.sender.nome} aceitou seu pedido`,
         body: 'Confira seus pedidos e seu whatssap!',
       }

      fetch('https://exp.host/--/api/v2/push/send', {
         method:'POST',
         headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(message)
       })
   }

   async function SendMessage(item){
      let msg = `Olá! eu sou ${item.data.receiver.nome}. Vi o seu pedido. Como posso ajudar? `;
      let phone = item.data.sender.telefone;
       
      let url = "whatsapp://send?text=" + msg + "&phone=" + '+5511940814091';

      Linking.openURL(url)
         .then(data => {
            console.log("WhatsApp Opened");
         })
         .catch(() => {
            alert("Make sure WhatsApp installed on your device");
         });
   }

   async function avaliarPedido(feedback, item){

      const docPrestadorRef = doc(db, 'prestadores', user.uid, 'servicos', item.id)
      const docUserRef = doc(db, 'users', item.data.sender.id, 'pedidos', item.id)

      if(feedback == 'Aceito'){
   
         await updateDoc(docPrestadorRef, {
            tipo:'Aceito'
         }).then(()=>{
            console.log('foi')
            sendNotification(item)
         })

         await updateDoc(docUserRef, {
            tipo:'Em Processo'
         }).then(()=>{
            SendMessage(item)
            
            setTrigger(!trigger)
         })
      }
      else{
         await deleteDoc(docPrestadorRef).then(()=>{
            console.log('deletou')

            const message = {
               to: item.data.sender.token,
               title: `${item.data.sender.nome} recusou seu pedido`,
               body: 'Não desanime e peça outro!',
             }
      
            fetch('https://exp.host/--/api/v2/push/send', {
               method:'POST',
               headers: {
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate',
                  'Content-Type': 'application/json',
                },
               body: JSON.stringify(message)
             })
         })
      }
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

            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
               <CustomText text='Endereço:' type='bold' style={{marginBottom: 8}}/>
               <CustomText text={`${item.data.sender.endereco.rua}, ${item.data.sender.endereco.numero} - ${item.data.sender.endereco.bairro}, ${item.data.sender.endereco.uf}`}/>
            </View>
   
            <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', gap: 10, marginTop: 20}}>
               <TouchableOpacity onPress={()=> avaliarPedido('Aceito', item)} style={styles.accept}>
                  <FontAwesome name="check" size={24} color="white" />
               </TouchableOpacity>
   
               <TouchableOpacity onPress={()=> avaliarPedido('Recusar', item)} style={styles.refuse}>
                  <FontAwesome name="close" size={24} color="white" />
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
      textAlign:'justify',
      marginBottom: 18
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
      backgroundColor:'#72F158',
      borderRadius: 10,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
   },

   refuse:{
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor:'#FF4C4C',
      borderRadius: 10,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
      
   }
})



