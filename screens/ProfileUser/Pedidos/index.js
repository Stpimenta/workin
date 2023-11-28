import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { db } from '../../../firebase/config'
import { getDoc, doc, getDocs, collection, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
import AuthContext from '../../../context/AuthContext'
import CustomText from '../../../components/Texts/CustomText'

import { Ionicons, MaterialCommunityIcons  } from '@expo/vector-icons';
import Animated, {BounceIn} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

function CardFast({item, key}){

   const[secs, setSecs] = useState(0)

   const docRef = doc(db, 'prestadores', item.data.receiver.id)
   const subDocRef = doc(db, 'prestadores', item.data.receiver.id, 'servicos', item.id)
   const subUserDocRef = doc(db, 'users', item.data.sender.id, 'pedidos', item.id)

   const[rating, setRating] = useState({
      type:'',
      number: 0
   })

   const[opacities, setOpacities] = useState({
      sobad: 0.4,
      bad: 0.4,
      neutral:0.4,
      good:0.4,
      sogood: 0.2
   })

   useEffect(() => {

      if(secs > 2) return

      const intervalID = setInterval(() =>  {
          setSecs((prev)=> prev + 1)
      }, 15000);
  
      return () => clearInterval(intervalID);
  }, []);


   async function cancel(){
      await deleteDoc(subDocRef).then(()=>{
         console.log('deletou fast')
      })

      await deleteDoc(subUserDocRef).then(()=>{
         console.log('deletou fast user')
      })
   }

   return(
      <View style={[styles.containerCard, {paddingBottom: 10}]} key={key}>
         <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom: 10}}>
            <View style={{flexDirection:'row', alignItems:'center', backgroundColor: secs >= 1 ? '#FF4C4C' : null, paddingHorizontal: 10,paddingVertical: 5,borderRadius: 10}}>
               <MaterialCommunityIcons name="lightning-bolt" size={20} color={secs >= 1 ? 'white': 'black'} />
               {secs >= 1 ? <CustomText text='Demorado' style={{color:'white', fontSize: 12}}/> : null}
            </View>


            <View style={[styles.containerType, { backgroundColor: item.data.tipo == 'Em Processo' ? '#51B13D' : item.data.tipo == 'Recusado' ? '#FF4C4C' : item.data.tipo == 'Pendente' ? '#E2F0F1' : null }]}>
               <CustomText
                  text={item.data.tipo}
                  type='bold'
                  style={[styles.tipo,
                  {
                     color: item.data.tipo == 'Pendente' ? '#717273' :
                        item.data.tipo == 'Recusado' ? 'white' :
                        item.data.tipo == 'Em Processo' ? 'white' : null
                  }
                  ]}
               />
            </View>
         </View>

         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <CustomText text={item.data.receiver.nome} type='bold' style={styles.nomePrestador} />
            <CustomText text={item.data.date} style={styles.date} />
         </View>

         {item.data.tipo == 'Em Processo' ? (
            <TouchableOpacity onPress={()=> {
               setAvaliation(item.data.receiver.nota)
               setId(item.data.receiver.id)
               setUserId(item.data.sender.id)
               setPedidoId(item.id)
               setVisible(true)
            }} style={styles.finalizar2}>
               <CustomText text='FINALIZAR' type={'bold'} style={{color:'white'}}/>
            </TouchableOpacity>
         ) : null}

         {secs >= 1 ? (
            <TouchableOpacity style={{width:'100%', paddingVertical: 10, backgroundColor:'#FF4C4C', borderRadius: 10}} onPress={cancel}>
               <CustomText text='CANCELAR' style={{color:'white', alignSelf:'center'}} type='bold'/>
            </TouchableOpacity>
         ) : null}

         
      </View>
   )
}



export default function Pedidos() {

   const [pedidos, setPedidos] = useState([])
   const [id, setId] = useState('')
   const[userId, setUserId] = useState('')
   const[pedidoId, setPedidoId] = useState('')
   const [visible, setVisible] = useState(false)
   const[avaliation, setAvaliation] = useState()
   const[rating, setRating] = useState({
      type:'',
      number: 0
   })
   const[pedidosFast, setPedidoFast] = useState([])

   const navigation = useNavigation()

   const[opacities, setOpacities] = useState({
      sobad: 0.4,
      bad: 0.4,
      neutral:0.4,
      good:0.4,
      sogood: 0.2
   })
   const[loading, setLoading] = useState(false)

   const { user } = useContext(AuthContext)

   useEffect(() => {
      pegarDado()
      pegarDadoExpress()
   }, [])

   async function pegarDado() {
      const colRef = collection(db, 'users', user.uid, 'pedidos')
      const q = query(colRef, where("express", "==", false))
      let arr = []

      await getDocs(q).then((snap) => {
         snap.forEach((doc) => {

            const obj = {data: doc.data(), id:doc.id}
            arr.push(obj)
         })

         setPedidos(arr)
      })
   }

   async function pegarDadoExpress(){
      setLoading(true)
      const colRef = collection(db, 'users', user.uid, 'pedidos')

      const q = query(colRef, where("express", "==", true))
      let arr = []

      await getDocs(q).then((snap) => {
         snap.forEach((doc) => {

            const obj = {data: doc.data(), id:doc.id}
            arr.push(obj)
         })

         setPedidoFast(arr)
         setLoading(false)
      })
   }

   async function avaliar(type, ratingF, item) {

      setOpacities({
         sobad: 0.4,
         bad: 0.4,
         neutral: 0.4,
         good: 0.4,
         sogood: 0.5
      })

      setOpacities((prev)=>{
         const copy = {...prev, [item]: 1}
         return copy 
      })

      setRating({
         type: type,
         number: ratingF
      })
   }

   async function handleAvaliation(){

      
      const docRef = doc(db, 'prestadores', id)
      const subDocRef = doc(db, 'prestadores', id, 'servicos', pedidoId)
      const subUserDocRef = doc(db, 'users', userId, 'pedidos', pedidoId)

      if(rating.type == 'soma'){

         if(avaliation == 5) return

         const soma = avaliation + rating.number
         const somaFixed = soma.toFixed(1)

         await updateDoc(docRef, {
            nota: somaFixed
         }).then(async ()=>{
            await deleteDoc(subUserDocRef).then(()=>{
               console.log('deletou')
              
            })

            await deleteDoc(subDocRef).then(()=>{
               console.log('deletou prestador')
               navigation.navigate('ProfileUser')
            })
         })   
      }

      if(rating.type == 'menos'){
         const sub = avaliation - rating.number

         await updateDoc(docRef, {
            nota: sub
         }).then(async ()=>{
            await deleteDoc(subUserDocRef).then(()=>{
               console.log('deletou')
              
            })

            await deleteDoc(subDocRef).then(()=>{
               console.log('deletou prestador')
               navigation.navigate('ProfileUser')
            })
         })
      }

      if(rating.type == 'neutral'){
         await deleteDoc(subUserDocRef).then(()=>{
            console.log('deletou')
           
         })

         await deleteDoc(subDocRef).then(()=>{
            console.log('deletou prestador')
            navigation.navigate('ProfileUser')
         })
      }
   }

   if (loading) {
      return (
         <Text>Carregando.</Text>
      )
   }

   return (
      <View style={styles.containerAll}>
         <Image
            source={require('../../../assets/backSignUp.png')}
            style={styles.backIcon}
         />

         {pedidos?.length == 0 && <CustomText text={pedidosFast?.length == 0 ? 'Você ainda não tem pedidos...' : ''}/>}


         {pedidos?.map((item) => (
            <View style={styles.containerCard} key={item.id}>
               <View style={[styles.containerType, { backgroundColor: item.data.tipo == 'Em Processo' ? '#51B13D' : item.data.tipo == 'Recusado' ? '#FF4C4C' : item.data.tipo == 'Pendente' ? '#E2F0F1' : null }]}>
                  <CustomText
                     text={item.data.tipo}
                     type='bold'
                     style={[styles.tipo,
                     {
                        color: item.data.tipo == 'Pendente' ? '#717273' :
                           item.data.tipo == 'Recusado' ? 'white' :
                           item.data.tipo == 'Em Processo' ? 'white' : null
                     }
                     ]}
                  />
               </View>

               <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <CustomText text={item.data.receiver.nome} type='bold' style={styles.nomePrestador} />
                  <CustomText text={item.data.date} style={styles.date} />
               </View>

               <CustomText text={item.data.descricao} style={styles.descricao} />

               {item.data.tipo == 'Em Processo' ? (
                     <TouchableOpacity onPress={()=> {
                        setAvaliation(item.data.receiver.nota)
                        setId(item.data.receiver.id)
                        setUserId(item.data.sender.id)
                        setPedidoId(item.id)
                        setVisible(true)
                     }} style={styles.finalizar2}>
                       <CustomText text='FINALIZAR' type={'bold'} style={{color:'white'}}/>
                     </TouchableOpacity>
                  ) : null}
            </View>
         ))}

         {pedidosFast.map((item)=>{
            return <CardFast item={item} key={item.id}/>
         })}


         <Modal visible={visible} transparent={true}>
            <View style={styles.cortina}>
               <Animated.View style={styles.containerAvaliation} entering={BounceIn.duration(500).springify()}>
                  <TouchableOpacity onPress={()=> setVisible(false)} style={styles.fechar}>
                     <Ionicons name="close" size={26} color="#001240" />
                  </TouchableOpacity>

                  <CustomText text='Avalie o serviço oferecido: ' style={styles.textAvalation} type={'semi'}/>

                  <View style={styles.containerButtons}>
                        <TouchableOpacity style={[styles.botao, {opacity: opacities.sobad}]} onPress={()=> avaliar('menos', 0.2, 'sobad')}>
                           <Image
                              source={require('../../../assets/sobad.png')}
                              style={{width: 55, height: 55}}
                           />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.botao, {opacity: opacities.bad}]} onPress={()=> avaliar('menos', 0.1, 'bad')}>
                           <Image
                              source={require('../../../assets/bad.png')}
                              style={{width: 55, height: 55}}
                           />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.botao, {opacity: opacities.neutral}]} onPress={()=> avaliar('neutral', 0, 'neutral')}>
                           <Image
                              source={require('../../../assets/neutral.png')}
                              style={{width: 55, height: 55}}
                           />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.botao, {opacity: opacities.good}]} onPress={()=> avaliar('soma',0.1, 'good')}>
                           <Image
                              source={require('../../../assets/good.png')}
                              style={{width: 55, height: 55}}
                           />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.botao, {opacity: opacities.sogood}]} onPress={()=> avaliar('soma',0.2, 'sogood')}>
                           <Image
                              source={require('../../../assets/sogood.png')}
                              style={{width: 55, height: 55}}
                           />
                        </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={handleAvaliation} style={styles.finalizar}>
                     <CustomText text='FINALIZAR' type={'bold'} style={{color:'white', fontSize: 16}}/>
                  </TouchableOpacity>
               </Animated.View>
            </View>
         </Modal>
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
      color: '#001240'
   },

   date: {
      fontSize: 20,
      opacity: 0.7,
      color: '#001240'
   },

   descricao: {
      fontSize: 16,
      color: '#001240',
      textAlign: 'justify'
   },

   containerType: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      alignSelf:'flex-end'
   },

   tipo: {
      fontSize: 12
   },

   finalizar2:{
      width:'100%',
      paddingVertical: 10,
      backgroundColor:'#001240',
      borderRadius: 10,
      justifyContent:'center',
      alignItems:'center',
      marginTop: 20
   },

   cortina:{
      flex:1,
      backgroundColor:'rgba(0, 0, 0, 0.4)',
      paddingVertical: 200,
      paddingHorizontal: 20
   },

   fechar:{
      position:'absolute',
      top: 15,
      right: 15,
   },

   containerAvaliation:{
      flex:1,
      backgroundColor:'white',
      borderRadius: 20,
      paddingHorizontal: 15,
      alignItems:'center',
      justifyContent:'center',
   },

   containerButtons:{
      width:'100%', 
      flexDirection:'row', 
      gap: 2, 
      justifyContent:'center', 
      paddingHorizontal: 20,
      marginBottom: 30
   },

   botao:{
   },

   textAvalation:{
      alignSelf:'center',
      marginBottom: 25,
      fontSize: 14,
      color:'#001240'
   },

   finalizar:{
      width:'100%',
      backgroundColor:'#4F80FF',
      alignItems:'center',
      paddingVertical: 10,
      borderRadius: 8,
      position:'absolute',
      bottom: 20,
   }


})