import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, deleteDoc, getDocs, doc } from 'firebase/firestore'
import { db } from './firebase/config'

export default function Tarefas() {

   const[tarefas, setTarefas] = useState([])
   const[nome, setNome] = useState()
   const[trigger, setTrigger] = useState(false)

   const user = getAuth()

   useEffect(()=>{
      pegarDado()
   }, [trigger])

   async function pegarDado(){

      const colRef = collection(db, 'users', user.currentUser.uid, 'tarefas')

      await getDocs(colRef).then((snap)=>{
         const arr = [];

         snap.forEach((doc)=>{

            const obj = {data: doc.data(), id: doc.id}
            arr.push(obj)
         })

         setTarefas(arr)
      })
   }


   async function criar(){
      const docRef = collection(db, 'users', user.currentUser.uid, 'tarefas')

      await addDoc(docRef, {nome: nome}).then(()=>{
         console.log('foi')
         setTrigger(!trigger)
      })
   }

   async function excluir(id){
      const docRef = doc(db, 'users', user.currentUser.uid, 'tarefas', id)

      await deleteDoc(docRef).then(()=>{
         console.log('excluiu')
         setTrigger(!trigger)
      })
   }


  return (
    <View style={{flex:1, paddingHorizontal: 15, paddingTop: 30}}>
      <View style={{flexDirection:'row', width:'100%', alignItems:'center'}}>
         <TextInput
            placeholder='Adicionar nova tarefa'
            style={{flex:1}}
            onChangeText={(txt)=> setNome(txt)}
         />

         <TouchableOpacity onPress={criar}>
            <Text>Adicionar tarefa</Text>
         </TouchableOpacity>
      </View>

      {tarefas.length == 0 ? <Text>Você ainda não tem tarefas</Text> : null}

      {tarefas?.map((item)=>{
         return(
            <View style={{marginBottom: 10}}>
               <Text>{item.data.nome}</Text>
               <TouchableOpacity onPress={()=> excluir(item.id)}>
                  <Text>Excluir</Text>
               </TouchableOpacity>
            </View>
         )
      })}
    </View>
  )
}


const styles = StyleSheet.create({

})