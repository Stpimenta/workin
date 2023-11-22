import { View, TouchableOpacity, StyleSheet, FlatList, ScrollView, Dimensions, Image } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'

import { collection,  onSnapshot, getDoc, doc } from 'firebase/firestore';

import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native'

import CustomText from '../../components/Texts/CustomText';

import WorkerCard from '../../components/WorkerCard';
import WorkerCardHorizontal from '../../components/WorkerCardHorizontal';

import { FontAwesome } from '@expo/vector-icons'; 



import data from '../../data';
import data2 from '../../data2';

import AuthContext from '../../context/AuthContext'
import { db } from '../../firebase/config';
import CardExpress from '../../components/CardExpress';

const owo = [
  {image: require('../../assets/anuncio1.png')},
  {image: require('../../assets/anuncio2.png')},
  {image: require('../../assets/anuncio3.png')},
  {image: require('../../assets/anuncio4.png')},
  {image: require('../../assets/anuncio5.png')},
]


export default function Home() {
  const windowWidth = Dimensions.get('window').width - 30;
  const windowHeight = Dimensions.get('window').height;

  const [location, setLocation] = useState(null)

  const[list, setList] = useState([])
  const[nome, setNome] = useState('')
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
    pegarNome()
  },[])

  async function pegarDados(){
    const clear = []

    setList(clear)

    const colRef = collection(db, 'prestadores')

    const unshot = onSnapshot(colRef, (snapshot)=>{

      const arr = []

      snapshot.forEach((doc)=>{

        const obj = {
          data: {...doc.data()},
          id: doc.id
        }

        arr.push(obj)
      })

      setList(arr)
    })
  }

  async function pegarNome(){
    const docRef = doc(db, 'users', user.uid)

    await getDoc(docRef).then((doc)=>{
      setNome(doc.data())
    })
  }

  if(list.length == 0){
    return(
      <CustomText text='Prestadores não encontrado'/>
    )
  }


  return (
    <ScrollView style={styles.container}>

      <View 
        style={{flexDirection:'row', width: '100%', justifyContent:'center', alignItems:'center', gap: 15, backgroundColor:'white', marginBottom: 10}}
      >
        <CustomText text={`Rua ${nome?.endereco?.rua} nº ${nome?.endereco?.numero}`} type='semi' style={{fontSize: 12}}/>
        
      </View>



        <FlatList
          data={owo}
          renderItem={({item})=>{
            return(
              <TouchableOpacity 
              style={{width: windowWidth, height: 128, marginLeft: 15,  marginRight: 15}}
              onPress={()=> {
                navigation.navigate('Noti')
              }}
            >
             <Image source={item.image} style={{width:'100%', height:'100%', borderRadius: 10, resizeMode:'stretch'}}/>
            </TouchableOpacity> 
            )
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />


      <View style={{marginBottom: 50, marginTop: 40}}>
        <CustomText text='Próximos à você' type='semi' style={{marginLeft: 15, color:'#001240', fontSize: 12, marginBottom: 10}}/>
        <FlatList
          data={list}
          renderItem={({item})=> <WorkerCard item={item} filters={item.data.filtros.slice(0,3)}/>}
          keyExtractor={(item)=> item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>


      <View style={{paddingHorizontal: 15,}}>
        <CustomText text='Melhores avaliados' type='semi' style={{color:'#001240', fontSize: 12, marginBottom: 10}}/>
        
        {data.map((item)=>{
          return(
            <WorkerCardHorizontal item={item}/>
          )
        })}
      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    paddingTop: 35
    
  },

  homeHeader:{
    width:'100%',
    height: 230,
    backgroundColor:'#4F80FF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingTop: 25, 
    justifyContent:'center'
  },

  input:{
    width:'100%',
    paddingHorizontal: 8,
    paddingVertical: 14,
    paddingRight: 15,
    backgroundColor:'white',
    borderRadius: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
})