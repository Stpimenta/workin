import { View, TouchableOpacity, Image,  } from 'react-native'
import React, {useContext} from 'react'
import { useNavigation } from '@react-navigation/native';

import styles from './style'
import CustomText from '../Texts/CustomText';

import WorkerContext from '../../context/WorkerContext';

export default function WorkerCard({item}) {

  const navigation = useNavigation()

  const worker = useContext(WorkerContext)

  function handleNavigation(){

    worker.setWorker({
      nome: item.nome,
      descricao: item.descricao,
      foto: item.foto,
      nota: item.nota,
      filtro: item.filtros
    })
    navigation.navigate('Worker')
  }


  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={()=> handleNavigation()}> 
      <View style={styles.circle}></View>
      <View style={styles.circle2}></View>

      <View>
        <View style={styles.avatarMask}>
          <Image
            source={item.foto}
            style={styles.avatar}
          />
        </View>

        <CustomText text={item.nome} type='bold' style={styles.cardTitle}/>
      </View>

      <View>
        <CustomText text={item.nota} style={{fontSize: 18}}/>
      </View>

    </TouchableOpacity>
  )
}