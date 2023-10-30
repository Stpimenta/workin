import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { db } from '../../../firebase/config'
import { getDoc, doc, getDocs, collection } from 'firebase/firestore'
import AuthContext from '../../../context/AuthContext'
import CustomText from '../../../components/Texts/CustomText'




function CardPedido({item}){
   return(
      <View style={styles.containerCard}>
         <View style={[styles.containerType, {backgroundColor: item.data.tipo == 'Em Processo' ? '#51B13D': item.data.tipo == 'Recusado' ? '#FF4C4C' : item.data.tipo == 'Pendente' ? '#E2F0F1' : null}]}>
            <CustomText 
               text={item.data.tipo} 
               type='bold' 
               style={[styles.tipo, 
                  {color: item.data.tipo == 'Pendente' ? '#717273' : 
                  item.data.tipo == 'Recusado' ? 'white' : 
                  item.data.tipo == 'Em Processo' ? 'white' : null
               }
               ]}
            />
         </View>

         <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 20}}>
            <CustomText text={item.data.receiver.nome} type='bold' style={styles.nomePrestador}/>
            <CustomText text={item.data.date} style={styles.date}/>
         </View>

         <CustomText text={item.data.descricao} style={styles.descricao}/>

         {item.data.tipo == 'Em Processo' ? <Text>FINALIZAR</Text> : null}
      </View>
   )
}


export default function Pedidos() {

   const[pedidos, setPedidos] = useState([])

   const {user} = useContext(AuthContext)

   useEffect(()=>{
      pegarDado()
   }, [])

   async function pegarDado(){
      const colRef = collection(db, 'users', user.uid, 'pedidos')
      const arr = []

      await getDocs(colRef).then((snap)=>{
         snap.forEach((doc)=>{
            arr.push({
               data: doc.data(),
               id: doc.id
            })
         })

         setPedidos(arr)
      }) 

   }

   if(pedidos.length == 0){
      return(
         <Text>Você ainda não tem pedidos.</Text>
      )
   }

  return (
    <View style={styles.containerAll}>
      <Image
         source={require('../../../assets/backSignUp.png')}
         style={styles.backIcon}
      />
      {pedidos?.map((item)=> <CardPedido item={item}/>)}
    </View>
  )
}

const styles = StyleSheet.create({
   containerAll:{
      flex:1,
      backgroundColor:'white',
      padding: 25,
   },

   backIcon:{
      width: 12,
      height: 17,
      resizeMode: 'stretch',
      marginBottom: 80
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
      borderRadius: 10
   },

   tipo:{
      fontSize: 12
   }


})