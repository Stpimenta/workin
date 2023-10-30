import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'

import * as  Notification from 'expo-notifications'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { storage } from './firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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

    const handleCallNotification = async () =>{
      const {status} = await Notification.getPermissionsAsync()

      console.log(status)
  
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
    
    async function send(){
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
    <View style={{paddingTop: 100}}>
      <TouchableOpacity onPress={send}>

         <Text>Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage}>
         <Text>IMAGEM </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getImage}>

         <Text>UPLOAD STORAGE</Text>
      </TouchableOpacity>


      { imageURL && <Image
        style={{width: 100, backgroundColor:'red', height: 100}}
        source={{uri: imageURL}}
      />}
    </View>
  )
}