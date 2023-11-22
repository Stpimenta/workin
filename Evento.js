import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Modal } from 'react-native'
import React, {useState, useEffect} from 'react'
import { addDoc, collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { FontAwesome } from '@expo/vector-icons';
import { db } from './firebase/config'

function Servicos(){

   const[nome, setNome] = useState()
   const[data, setData] = useState()
   const[nomeConvidado, setNomeConvidado] = useState()
   const[convidados, setConvidados] = useState([])
   const[eventos, setEventos] = useState([])
   const[convidadosDois, setConvidadosDois] = useState([])
 
 
   // state que controla a visibilidade de um modal (quando você clica em criar evento)
   const[visible, setVisible] = useState(false)
 
   //state que controla a visibilidade do outro modal (quando você clica em cada evento)
   const[visibleDois, setVisibleDois] = useState(true)
 
   const[trigger, setTrigger] = useState(false)
 
 
   useEffect(()=>{
     pegarDado()
   }, [trigger])
 
 
   const user = getAuth()
 
   function adicionarConvidado(){
     setConvidados((prev)=>{
       const copy = [...prev, nomeConvidado]
       return copy
     })
 
     setNomeConvidado('')
   }
 
   async function criar(){
     const evento = {
       nome: nome,
       data: data,
       convidados: convidados
     }
 
 
     const docRef = collection(db, 'users', user.currentUser.uid, 'eventos')
 
     await addDoc(docRef, evento).then(()=>{
       console.log('foi')
       setTrigger(!trigger)
       setVisible(false)
     })
 
   }
 
   async function pegarDado(){
 
     const colRef = collection(db, 'users', user.currentUser.uid, 'eventos')
 
     await getDocs(colRef).then((snap)=>{
       const arr = []
 
       snap.forEach((doc)=>{
         const obj = {data: doc.data(), id: doc.id}
         arr.push(obj)
       })
 
       setEventos(arr)
     })
   }
 
   function mostrarConvidados(convidadosFirebase){
    setConvidadosDois(convidadosFirebase)
    setVisibleDois(true)
   }
 
   async function excluir(id){
     console.log(id)
 
     const docRef = doc(db, 'users', user.currentUser.uid, 'eventos', id)
 
     await deleteDoc(docRef).then(()=>{
       console.log('deletou')
       setTrigger(!trigger)
     })
   }
 
 
 
 
 
   return(
     <ScrollView style={{flex: 1, paddingTop: 30, paddingHorizontal: 15}}>
 
         <TouchableOpacity style={styles.botao} onPress={()=> {
           setVisible(true)
           setConvidados([])
           setNomeConvidado('')
 
           console.log(eventos)
         }}>
           <Text style={{textAlign:'center', color:'white'}}>CRIAR EVENTO</Text>
         </TouchableOpacity>
 
         {eventos.length == 0 ? <Text>Você ainda não tem eventos</Text> : null}
 
         {eventos?.map((item)=>{
           return(
             <TouchableOpacity onPress={()=> mostrarConvidados(item.data.convidados)} style={{width:'100%', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 5, backgroundColor:'white'}}>
               <View style={{flexDirection:'row', justifyContent:'space-between',}}>
                 <Text>{item.data.nome}</Text>
                 <Text>{item.data.data}</Text>
               </View>
 
               <TouchableOpacity onPress={()=> excluir(item.id)}>
                 <Text>Excluir</Text>
               </TouchableOpacity>
             </TouchableOpacity>
           )
         })}
 
 
         {/* Modal que aparece quando você clicar em Criar Evento */}
         <Modal visible={visible} transparent>
           <View style={styles.modal}>
 
             <TouchableOpacity onPress={()=> setVisible(false)}>
               <Text>FECHAR</Text>
             </TouchableOpacity>
             <TextInput
               placeholder='Digite um nome para seu evento'
               style={styles.input}
               onChangeText={(txt)=> setNome(txt)}
             />
 
             <TextInput
               placeholder='Digite uma data para ele'
               style={styles.input}
               onChangeText={(txt)=> setData(txt)}
             />
 
             <View style={{width:'100%', flexDirection:'row', marginTop: 20, marginBottom: 10, alignItems:'center'}} >
 
               <TextInput
                 style={{flex:1, paddingVertical: 6}}
                 placeholder='Nome do convidado'
                 onChangeText={(txt)=> setNomeConvidado(txt)}
                 value={nomeConvidado}
               />
 
               <TouchableOpacity style={{ paddingVertical: 10, backgroundColor:'#d61e52', borderRadius: 10, paddingHorizontal: 15}} onPress={adicionarConvidado}>
                 <FontAwesome name="plus" size={16} color="white" />
               </TouchableOpacity>
             </View>
 
 
             {/* Lista de convidados que você adiciona quando for criar um evento */}
             <ScrollView style={{flex:1}}>
               {convidados.map((convidado)=> <Text>{convidado}</Text>)}
             </ScrollView>
 
 
             
             <TouchableOpacity style={styles.botao} onPress={criar}>
               <Text style={{textAlign:'center', color:'white'}}>ENVIAR</Text>
             </TouchableOpacity> 
           </View>
         </Modal>
 
 
         {/* Modal que aparece quando você aperta em cada serviço */}
         <Modal visible={visibleDois} transparent>
           <View style={{flex:1, marginVertical: 90, marginHorizontal: 30,backgroundColor:'white', padding: 20}}>
             <TouchableOpacity onPress={()=> setVisibleDois(false)}>
               <Text>Fechar</Text>
             </TouchableOpacity>
 
             <Text style={{marginBottom: 40}}>Convidados</Text>
 
 
             {/* Lista dos convidado */}
             {convidadosDois.map((item)=> <Text>{item}</Text>)}
           </View>
         </Modal>
 
     </ScrollView>
   )
 }
