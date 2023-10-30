import { View, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'

import { collection, getDocs, where, query, onSnapshot } from 'firebase/firestore';

import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native'

import CustomText from '../../components/Texts/CustomText';

import WorkerCard from '../../components/WorkerCard';
import WorkerCardHorizontal from '../../components/WorkerCardHorizontal';

import data from '../../data';
import data2 from '../../data2';

import AuthContext from '../../context/AuthContext'
import { db } from '../../firebase/config';
import CardExpress from '../../components/CardExpress';


export default function Home() {

  const [location, setLocation] = useState(null)

  const[list, setList] = useState([])
  const {user} = useContext(AuthContext)

  const navigation = useNavigation()

  async function requestPermisstion(){
    const {granted} = await requestForegroundPermissionsAsync()

    if(granted){
      const currentPosition = await getCurrentPositionAsync()
      setLocation(currentPosition)

      console.log(currentPosition)
    }
  }

  useEffect(()=>{
    pegarDados()
  },[])

  async function pegarDados(){
    setList([])
    const colRef = collection(db, 'prestadores')

    const unshot = onSnapshot(colRef, (snapshot)=>{
      snapshot.forEach((doc)=>{

        const obj = {
          data: {...doc.data()},
          id: doc.id
        }
  
        setList((prev)=>{
          const arrCopy = [...prev]
  
          arrCopy.push(obj)
  
          return arrCopy
  
        })
      })
    })
  }

  if(list.length == 0){
    return(
      <CustomText text='Prestadores não encontrado'/>
    )
  }


  return (
    <ScrollView style={styles.container}>

      {/* <View 
        style={{flexDirection:'row', width: '100%', justifyContent:'center', alignItems:'center', gap: 15, backgroundColor:'white', paddingVertical: 15}}
      >
        <CustomText text='Rua da pessoa.  nº33' type='semi'/>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </View> */}

      <View style={{width:'100%', paddingHorizontal: 10, marginBottom: 60, marginTop: 50}}>
        <TouchableOpacity 
          style={{width:'100%', height: 110, backgroundColor:'#A5D0FF', borderRadius: 10, padding: 15}}
          onPress={()=> {
            navigation.navigate('Noti')
          }}
        >
          <CustomText text='Torne-se um PRESTADOR de SERVIÇOS'  type='bold' style={{width: 220, fontSize: 15}}/>
        </TouchableOpacity>
      </View>


      <View style={{marginBottom: 50}}>
        <CustomText text='Próximos à você' type='semi' style={{marginLeft: 15, marginBottom: 15, color:'#001240'}}/>
        <FlatList
          data={list}
          renderItem={({item, idx})=> <WorkerCard item={item} filters={item.data.filtros.slice(0,3)}/>}
          keyExtractor={(item)=> item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>


      <View style={{paddingHorizontal: 15,}}>
        <CustomText text='Melhores avaliados' type='semi' style={{marginBottom: 10, color:'#001240'}}/>
        <CardExpress/>
      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#E5EBFB',
  }
})