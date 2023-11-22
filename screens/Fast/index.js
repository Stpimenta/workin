import { View, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image, ImageBackground, Text } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'

import { collection, onSnapshot, getDoc, doc, where, query, getDocs, setDoc } from 'firebase/firestore';

import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import { useNavigation } from '@react-navigation/native'

import CustomText from '../../components/Texts/CustomText';

import AuthContext from '../../context/AuthContext'
import WorkerContext from '../../context/WorkerContext';

import { db } from '../../firebase/config';
import CardExpress from '../../components/CardExpress';
import { Modal } from 'react-native';

import uuid from 'react-native-uuid';



export default function Fast() {

  const [location, setLocation] = useState(null)

  const [list, setList] = useState([])
  const[filterList, setFilterList] = useState(undefined)
  const [filtro, setFiltro] = useState()
  const[visible, setVisible] = useState(false)


  const { user } = useContext(AuthContext)
  const {sender, setWorker, receiver, date} = useContext(WorkerContext)


  const navigation = useNavigation()

  async function requestPermisstion() {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()
      setLocation(currentPosition)

      console.log(currentPosition)
    }
  }

  useEffect(() => {
    pegarDados()
  }, [])

  async function pegarDados() {
    const clear = []

    setList(clear)

    const colRef = collection(db, 'prestadores')
    const q = query(colRef, where('express', '==', true))

    const unshot = onSnapshot(q, (snapshot) => {

      const arr = []

      snapshot.forEach((doc) => {

        const obj = {
          data: { ...doc.data()},
          id: doc.id
        }

        arr.push(obj)
      })

      setList(arr)
    })
  }


  async function handleFilter(filtro){

    setFiltro(filtro)

    const colRef = collection(db, 'prestadores')
    const q = query(colRef, where('filtros', 'array-contains', filtro))

    await getDocs(q).then((snapshot)=>{

      const arr = []

      snapshot.forEach((doc)=>{

        const obj = {
          data: doc.data(),
          id: doc.id
        }

        arr.push(obj)
      })

      setFilterList(arr)

    })


    // var filtered = list.filter(
    //   function(e) {
    //     const filters = e.filtros

    //     return this.indexOf(e) < 0;
    //   },
    //   []
    // );


    // await getDocs(docRef).then((snapshot)=>{

    //   const arr = []

    //   snapshot.forEach((doc)=>{
    //     arr.push(doc.data())
    //   })

    //   setFilterList(arr)
    // })

  }

  async function handleAccept(){

    const uid = uuid.v4()


    const docRefPrestador = doc(db, `prestadores/${receiver.id}/servicos/${uid}`)
    const docRefUser = doc(db, `users/${user.uid}/pedidos/${uid}`)

    const contrato = {
      receiver: {...receiver},
      sender:{...sender},
      date: date,
      tipo:'Pendente',
      express: true
    }

    await setDoc(docRefPrestador, contrato).then(()=>{
      console.log('foi')
    })

    await setDoc(docRefUser, contrato).then(()=>{

      const message = {
        to: receiver.token,
        title: `fez um pedido!`,
        body: 'Confira seus servicos!',
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

    }).catch((err)=> console.log(err))

    setWorker({
      count: 3
    })

    navigation.navigate('Contract')
  }

  function handleCancel(){
    setVisible(false)
  }

  if (list.length == 0) {
    return (
      <CustomText text='Prestadores não encontrado' />
    )
  }

  return (
    <ScrollView style={styles.container}>


        
      <CustomText text='Alguns filtros para você!' style={{marginLeft: 15, marginBottom: 15, color:'#001240'}}/>

      <View style={{width: '100%', flexDirection:'row', gap: 8, paddingHorizontal: 15, marginBottom: 8}}>
        <TouchableOpacity style={styles.filter} onPress={()=> handleFilter('Encanador')}>
          <ImageBackground
            style={[styles.filter, {opacity: 0.7}]}
            resizeMode='stretch'
            source={require('../../assets/1.png')}
            imageStyle={{ borderRadius: 8 }}
          >
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter} onPress={()=> handleFilter('Eletricista')}>
          <ImageBackground
            style={styles.filter}
            resizeMode='stretch'
            source={require('../../assets/3.png')}
            imageStyle={{ borderRadius: 8 }}
          >
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={{width: '100%', flexDirection:'row', gap: 8, paddingHorizontal: 15}}>
        <TouchableOpacity style={styles.filter} onPress={()=> handleFilter('Costureiro')}>
          <ImageBackground
            style={styles.filter}
            resizeMode='stretch'
            source={require('../../assets/17.png')}
            imageStyle={{ borderRadius: 8 }}
          >
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter} onPress={()=> handleFilter('Pedreiro')}>
          <ImageBackground
            style={styles.filter}
            resizeMode='stretch'
            source={require('../../assets/4.png')}
            imageStyle={{ borderRadius: 8 }}
          >
          </ImageBackground>
        </TouchableOpacity>
      </View>

      
      <CustomText text={filtro ? filtro : 'Recomendados'} style={{color:'#001240', marginLeft: 15, marginBottom: 15, marginTop: 60}}/>
      <View style={{  paddingHorizontal: 15, gap: 30 }}>
        
        {filterList ? filterList.map((item) => <CardExpress item={item} filters={item.data.filtros.slice(0,3)} setVisible={setVisible} key={item.id}/>) : list.map((item) => <CardExpress item={item} filters={item.data.filtros.slice(0,3)} setVisible={setVisible} key={item.id}/>)}
      </View>

      
      <Modal visible={visible} transparent>
        <View style={{flex:1, backgroundColor:'rgba(0, 0, 0, 0.5)', paddingHorizontal: 15, paddingVertical: 250}}>
          <View style={{flex:1, backgroundColor:'white', borderRadius: 10, alignItems:'center', justifyContent:'center'}}>
            
            <View style={{flexDirection:'row', marginBottom: 10}}>
              <CustomText text='Contratar ' style={{color:'#001240', fontSize: 20}}/>
              <CustomText text={`${receiver.nome}?`} type='bold' style={{color:'#001240', fontSize: 20}}/>
            </View>

            <View style={{width:'100%', flexDirection:'row', paddingHorizontal: 15, gap: 5, }}>
              <TouchableOpacity style={{flex:1, backgroundColor:'red', padding: 10, borderRadius: 8}} onPress={handleCancel}>
                <CustomText text='Cancelar' type='bold' style={{textAlign: 'center', color:'white'}}/>
              </TouchableOpacity>

              <TouchableOpacity style={{flex:1, backgroundColor:'#4F80FF', padding: 10, borderRadius: 8}} onPress={handleAccept}>
                <CustomText text='Contratar' type='bold' style={{textAlign: 'center', color:'white'}}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 35
  },

  filter: {
    flex: 1,
    height: 95,
  }
})