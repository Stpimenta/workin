import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'

import SignInContext from '../../context/SignInContext'

import * as ImagePicker from 'expo-image-picker'

import Animated, {FadeInUp} from 'react-native-reanimated'

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase/config'

import * as FileSystem from 'expo-file-system'
import CustomText from '../../components/Texts/CustomText';


export default function ThirdScreen() {

  const {setSignInContext} = useContext(SignInContext)
  
  const[permission, setPermission] = useState()
  const[image, setImage] = useState(null)
  const[uri, setUri] = useState('')

  useEffect(()=>{
    async function requestPermission(){
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setPermission(permission.status === 'granted')
    }

    requestPermission()
  }, [])

  async function pickImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if(!result.canceled){
      console.log(result.assets[0].uri)
      setImage(result.assets[0].uri)
    }
  }

  async function upload(){
    try {
      const {uri} = await FileSystem.getInfoAsync(image)
      const blob = await new Promise((resolve, reject)=> {
        const xhr = new XMLHttpRequest()

        xhr.onload = () =>{
          resolve(xhr.response)
        }

        xhr.onerror = (e) =>{
          reject(new TypeError('Network Request Failed'))
        }

        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
        xhr.send(null)
      })

      const filename = image.substring(image.lastIndexOf('/') + 1)

      const imageRef = ref(storage, user.uid)

      uploadBytes(imageRef, blob).then((snap)=>{
        getDownloadURL(ref(storage, snap.metadata.fullPath)).then((url)=>{
          setUri(url)
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function nextStep(){
    await upload().then(()=>{
      setSignInContext({
        image: uri,
        count: 4
      })
    })
  }

  function skip(){
    setSignInContext({
      count: 4
    })
  }


  return (
    <View style={styles.containerAll}>

      <Animated.View 
        style={styles.form}
        entering={FadeInUp.duration(1000).springify()}
      >
         <TouchableOpacity style={styles.avatarPicker} onPress={pickImage}>
            { image && <Image
              style={{width:200, height:200, borderRadius: 200}}
              source={{uri: image}}
            />}
          </TouchableOpacity>
         

        <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
          <CustomText text='Escolher imagem' type='bold' style={{fontSize: 12, color:'#4F80FF'}}/>
        </TouchableOpacity>

      </Animated.View>

      <View style={{flexDirection: 'row', gap: 25, marginTop: 100}}>
        <TouchableOpacity style={styles.skip} onPress={skip}>
          <CustomText text='PULAR' style={{fontSize: 14, color:'white'}} type={'bold'}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <CustomText text='PROSSEGUIR' style={styles.textButton} type={'bold'}/>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  containerAll:{
    flex:1,
    padding: 25
  },

  title:{
    fontSize:36,
    color:'#001240',
    fontWeight:'bold',
 },

 subtitle:{
    fontSize: 20,
    color:'#001240',
    fontWeight: '100',
    marginLeft: 5
 },

 progress:{
  width: '100%',
  height: 5,
  backgroundColor:'#4F80FF',
  opacity: 0.2,
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 70
 },

 form:{
  width:'100%',
  height: 250,
 },

 button:{
  flex: 3,
  height: 57, 
  backgroundColor:'#4F80FF',
  borderRadius: 10,
  alignItems:'center',
  justifyContent:'center',
  shadowColor: "#000",
  alignSelf:'center'
},

skip:{
  flex:1.5,
  height: 57, 
  backgroundColor:'#4F80FF',
  borderRadius: 10,
  alignItems:'center',
  justifyContent:'center',
  shadowColor: "#000",
  alignSelf:'flex-end',
},

textButton:{
  fontSize: 20,
  color:'white',
},

terms:{
  color:'#001240',
  textAlign:'justify'
},

avatarPicker:{
  width: 200,
  height: 200,
  borderRadius: 200,
  backgroundColor:'rgba(0, 0, 0, 0.4)',
  alignSelf:'center'
 },

 buttonImage:{
  marginLeft: 20,
  marginTop: 20
 }

})