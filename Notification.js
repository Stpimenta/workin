import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Modal } from 'react-native'
import React, {useState, useEffect} from 'react'

import * as  Notification from 'expo-notifications'

import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { storage } from './firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { addDoc, collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { FontAwesome } from '@expo/vector-icons';
import { db } from './firebase/config'

import Tarefas from './Tarefas'




export default function NotificationScreen() {

   const[token, setToken] = useState(null)
   const[image, setImage] = useState('')
   const[imageURL, setImageURL] = useState(null)

   Notification.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowAlert: true
      })
    })

    const handleNotificationsPermissions = async () =>{
      const {status} = await Notification.getPermissionsAsync()
  
      if(status != 'granted'){
        console.log('notificação não aceita')
        return
      }

      await Notification.getExpoPushTokenAsync().then((token)=>{
         setToken(token.data)
      })
    }

    
    const message = {
      to: 'ExponentPushToken[2iT57DKwiKaKf0-vuj1fwN]',
      title: 'Original Title',
      body: 'And here is the body!',
    }
    
    async function sendNotification(){
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
    
    async function pickImage(){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })

      if(!result.canceled){
        setImage(result.assets[0].uri)
      }
    }

    


    async function getImage(){

      const imageRef = ref(storage, '4')

      getDownloadURL(imageRef).then((snap)=>{
        setImageURL(snap)
      })
    }




  return (
      <View style={{paddingTop: 28}}>

        <TouchableOpacity onPress={sendNotification}>
          <Text>TESTAR</Text>
        </TouchableOpacity>
      </View>
  )
}


const styles = StyleSheet.create({
  botao:{
    width:'100%',
    paddingVertical: 15,
    backgroundColor:'#d61e52',
    borderRadius: 10
  },

  modal:{
    flex:1,
    backgroundColor:'white',
    marginHorizontal: 20,
    marginVertical: 90,
    borderRadius: 10,
    padding: 20,
    minHeight: 400
  },

  input:{
    width:'100%',
    borderColor:'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20
  }
})

