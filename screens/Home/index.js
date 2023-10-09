import { View, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, {useState} from 'react'

import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native'

import CustomText from '../../components/Texts/CustomText';

import WorkerCard from '../../components/WorkerCard';
import WorkerCardHorizontal from '../../components/WorkerCardHorizontal';

import data from '../../data';
import data2 from '../../data2';


export default function Home() {

  const [location, setLocation] = useState(null)
  const navigation = useNavigation()

  async function requestPermisstion(){
    const {granted} = await requestForegroundPermissionsAsync()

    if(granted){
      const currentPosition = await getCurrentPositionAsync()
      setLocation(currentPosition)

      console.log(currentPosition)
    }
  }

  // useEffect(()=>{
  //   requestPermisstion()
  // },[])



  return (
    <ScrollView style={styles.container}>

      <View 
        style={{flexDirection:'row', width: '100%', justifyContent:'center', alignItems:'center', gap: 15, paddingTop: 30}}
      >
        <CustomText text='Rua da pessoa.  nº33' type='semi'/>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </View>

      <View style={{width:'100%', paddingHorizontal: 10, marginBottom: 60, marginTop: 50}}>
        <TouchableOpacity 
          style={{width:'100%', height: 110, backgroundColor:'#A5D0FF', borderRadius: 10, padding: 15}}
          onPress={()=> navigation.navigate('ProfileWork')}
        >
          <CustomText text='Torne-se um PRESTADOR de SERVIÇOS'  type='bold' style={{width: 220, fontSize: 15}}/>
        </TouchableOpacity>
      </View>


      <View style={{marginBottom: 50}}>
        <CustomText text='Próximos à você' type='semi' style={{marginLeft: 15, marginBottom: 15, color:'#001240'}}/>
        <FlatList
          data={data}
          renderItem={({item})=> <WorkerCard item={item} key={item.nome}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>


      <View style={{paddingHorizontal: 15,}}>
        <CustomText text='Melhores avaliados' type='semi' style={{marginBottom: 10, color:'#001240'}}/>
        {data2.map((item)=> <WorkerCardHorizontal item={item} key={item.nome}/>)}
      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#E5EBFB',
    paddingTop: 20
  }
})