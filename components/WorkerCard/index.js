import { View, TouchableOpacity, Image,  } from 'react-native'
import React, {useContext} from 'react'
import { useNavigation } from '@react-navigation/native';

import styles from './style'
import CustomText from '../Texts/CustomText';

import WorkerContext from '../../context/WorkerContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { AntDesign, Foundation, FontAwesome   } from '@expo/vector-icons'; 

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
        seguidores: item.data.seguidores,
        token: item.data.token,
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
            source={{uri:  item ? item.data.image : 'https://img.icons8.com/?size=256&id=87293&format=png'}}
            style={styles.avatar}
          />
        </View>
      </View>

      <View style={{flex:1,  padding: 10}}>
        <CustomText text={item.data.nome} style={styles.cardTitle} type='semi'/>
          <View style={{flexDirection:'row', gap: 8, flexWrap:'wrap'}}>
            {filters.map((filtro, idx)=> <CustomText text={filtro} key={idx} style={{fontSize: 10}}/>)}
          </View>
      </View>

      <View style={{width:'100%', flexDirection:'row', alignSelf:'flex-end', justifyContent:'space-between', paddingHorizontal: 10, paddingBottom: 10}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <CustomText text={item.data.nota} style={{fontSize: 18, marginRight: 4, color:"#001240"}}/>
          <FontAwesome name="star" size={16} color="#001240"/>
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <CustomText text={`R$${item.data.price},00`} type={'semi'} style={{fontSize: 18, marginRight: 6, color:"#001240"}}/>
        </View>
      </View>

      


      {/* <View style={{ flexDirection:'row', alignItems:'flex-end', }}>
        
      </View> */}

    </TouchableOpacity>
  )
}