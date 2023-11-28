import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native'
import React, { useEffect, useState, useContext, useRef } from 'react'
import Animated, { FadeInUp } from 'react-native-reanimated'
import * as ImagePicker from 'expo-image-picker'

import { auth, db, storage } from '../../firebase/config'
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'

import AuthContext from '../../context/AuthContext'
import SignInWorkerContext from '../../context/SignInWorkerContext'
import SignInContext from '../../context/SignInContext'

import CustomText from '../../components/Texts/CustomText'
import { useNavigation } from '@react-navigation/native';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import * as FileSystem from 'expo-file-system'


export default function FourthScreen() {

  useEffect(() => {
    async function requestPermission() {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setPermission(permission.status === 'granted')
    }

    requestPermission()
  }, [])

  const navigation = useNavigation()

  const [permission, setPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [uri, setUri] = useState('')

  const { user } = useContext(AuthContext)
  const { setSignInContext } = useContext(SignInContext)
  const { CPF, filters, descricao, price } = useContext(SignInWorkerContext)


  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      setImage(result.assets[0].uri)
    }
  }


  async function upload() {
    try {
      const { uri } = await FileSystem.getInfoAsync(image)
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
          resolve(xhr.response)
        }

        xhr.onerror = (e) => {
          reject(new TypeError('Network Request Failed'))
        }

        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
        xhr.send(null)
      })

      const imageRef = ref(storage, user.uid)

      uploadBytes(imageRef, blob).then((snap) => {
        getDownloadURL(ref(storage, snap.metadata.fullPath)).then(async (url) => {
          const docRef = doc(db, 'prestadores', user.uid)
          const userRef = doc(db, 'users', user.uid)

          await getDoc(userRef).then(async (doc) => {
            await setDoc(docRef, {
              nome: doc.data().nome,
              telefone: doc.data().telefone,
              token: doc.data().token,
              isWorker: true,
              CPF: CPF,
              filtros: filters,
              nota: 5,
              seguidores: 0,
              express: false,
              descricao: descricao,
              price: price,
              image: url,
              contador: 0
            }).then(() => {
              console.log('cadastrou')
            })
          })

          await updateDoc(userRef, {
            isWorker: true,
            image: url
          }).then(()=>{
            console.log('atualizou')
          })

          setSignInContext({
            isWorker: true
          })

          navigation.navigate('Home')
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function nextStep() {
    await upload()
  }


  return (
    <View style={styles.containerAll}>
      <Animated.View
        style={styles.form}
        entering={FadeInUp.duration(1000).springify()}
      >

        <TouchableOpacity style={styles.avatarPicker} onPress={pickImage}>
          {image && <Image
            style={{ width: 200, height: 200, borderRadius: 200 }}
            source={{ uri: image }}
          />}
        </TouchableOpacity>


        <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
          <CustomText text='Escolher imagem' type='bold' style={{ fontSize: 12, color: '#4F80FF' }} />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={() => nextStep(uri)}>
        <Text style={styles.textButton}>FINALIZAR</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    padding: 25,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },


  form: {
    width: '100%',
  },

  button: {
    width: '100%',
    height: 57,
    backgroundColor: '#4F80FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    marginTop: 50
  },

  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  avatarPicker: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignSelf: 'center'
  },

  buttonImage: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
})


// function pegarImagem(){
//   onAuthStateChanged(auth, (user)=>{

//     //referencia do diretório
//     const listRef = ref(storage, `${user.uid}/`);

//     //método pra pegar as imagens desse diretório
//     listAll(listRef)
//       .then((res) => {
//         // esse res tem um vetor chamado items que tem todas as imagens dentro dele

//         res.items.forEach((itemRef) => {
//           // Aqui você tem a referencia de cada item.
//           // Provavelmente você tem que passar esse itemRef dentro daquele getDownloadURL()
//           // pra obter a url de verdade dele

//         });
//       }).catch((error) => {
//         // Se algum erro acontecer
//       });
//   })
// }

