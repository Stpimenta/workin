import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import Animated, {FadeInUp} from 'react-native-reanimated'
import * as ImagePicker from 'expo-image-picker'

import {storage} from '../../firebase/config'
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'

import AuthContext from '../../context/AuthContext'
import SignInWorkerContext from '../../context/SignInWorkerContext'
import SignInContext from '../../context/SignInContext'


import CustomText from '../../components/Texts/CustomText'

import { useNavigation } from '@react-navigation/native';


export default function FourthScreen() {

    useEffect(()=>{
      async function requestPermission(){
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        setPermission(permission.status === 'granted')
      }

      requestPermission()
    }, [])

    const navigation = useNavigation()

    const[permission, setPermission] = useState(null)
    const[image, setImage] = useState(null)
    const {user} = useContext(AuthContext)
    const {setSignInWorker} = useContext(SignInWorkerContext)
    const {setSignInContext} = useContext(SignInContext)


    async function fetchImages(){
  
    }

    async function pickImage(){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })

      console.log(result.assets[0].uri)

      if(!result.canceled){
        setImage(result.assets[0].uri)
      }
    }

    

   function nextStep(){
  
    setSignInWorker({
      URLimage: image
    })

    setSignInContext({
      isWorker: true
    })

    navigation.navigate('PWorker')

   }


  return (
   <View style={styles.containerAll}>
      <Animated.View 
         style={styles.form}
         entering={FadeInUp.duration(1000).springify()}
      >

          <TouchableOpacity style={styles.avatarPicker} onPress={pickImage}>
             {image && <Image
              style={{width:200, height:200, borderRadius: 200}}
              source={{uri: image}}
            />}
          </TouchableOpacity>
         

        <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
          <CustomText text='Escolher imagem' type='bold' style={{fontSize: 12, color:'#4F80FF'}}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonImage} onPress={fetchImages}>
          <CustomText text='imagem' type='bold' style={{fontSize: 12, color:'#4F80FF'}}/>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={nextStep}>
         <Text style={styles.textButton}>PROSSEGUIR</Text>
      </TouchableOpacity>
   </View>
  )
}


const styles = StyleSheet.create({
   containerAll:{
      flex:1,
      padding: 25,
      flexDirection:'column',
      justifyContent:'space-between',
    },
  
  
   form:{
    width:'100%',
   },
  
   button:{
    width:'100%',
    height: 57, 
    backgroundColor:'#4F80FF',
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: "#000",
    marginTop: 50
  },
  
  textButton:{
    fontSize: 20,
    fontWeight:'bold',
    color:'white',
  },

  avatarPicker:{
   width: 200,
   height: 200,
   borderRadius: 200,
   backgroundColor:'rgba(0, 0, 0, 0.4)',
   alignSelf:'center'
  },

  buttonImage:{
    paddingHorizontal: 6,
    paddingVertical: 6,
    width: 150,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 10
  }
})

