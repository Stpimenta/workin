import { View, TouchableOpacity, Image,  } from 'react-native'
import React, {useContext} from 'react'
import { useNavigation } from '@react-navigation/native';

import styles from './style'
import CustomText from '../Texts/CustomText';

import WorkerContext from '../../context/WorkerContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { AntDesign, Foundation  } from '@expo/vector-icons'; 

export default function WorkerCard({item, filters}) {

  const navigation = useNavigation()

  const {setWorker} = useContext(WorkerContext)

  async function handleNavigation(){  

    setWorker({
      receiver:{
        nome: item.data.nome,
        filtros: item.data.filtros,
        descricao: item.data.descricao,
        nota: item.data.nota,
        price: item.data.price,
        image: item.data.image,
        id: item.id,
      }
    })

    navigation.navigate('Worker')
  }


  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={()=> handleNavigation()}> 

      <View>
        <View style={styles.avatarMask}>
          <Image
            source={{uri: item ? item.data.image : 'https://img.icons8.com/?size=256&id=87293&format=png'}}
            style={styles.avatar}
          />
        </View>

        <CustomText text={item.data.nome} type='bold' style={styles.cardTitle}/>
      </View>

      <View style={{flexDirection:'row', gap: 8, flexWrap:'wrap', alignSelf:'center'}}>
        {/* 
        <CustomText text='Luthie' style={{fontSize: 12}}/>
        <CustomText text='Pias' style={{fontSize: 12}}/> */}

        {filters.map((filtro, idx)=> <CustomText text={filtro} key={idx} style={{fontSize: 12}}/>)}
      </View>


      <View style={{ flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <CustomText text='5' type='semi' style={{fontSize: 20, marginRight: 6, color:"#001240"}}/>
          <AntDesign name="star" size={16} color="#001240"/>
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <CustomText text={`${item.data.price},00`}  style={{fontSize: 18, marginRight: 6, color:"#001240"}}/>
          <Foundation name="dollar" size={24} color="#001240" />
        </View>
      </View>

    </TouchableOpacity>
  )
}