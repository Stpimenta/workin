import {useContext} from 'react'
import { Text,  View, Image, TouchableOpacity  } from 'react-native';

import {useNavigation} from '@react-navigation/native'

import WorkerContext from '../../context/WorkerContext';

import styles from './style';
import CustomText from '../Texts/CustomText';

import { AntDesign, Foundation  } from '@expo/vector-icons'; 


export default function WorkerCardHorizontal({item}) {

   const arr = [1, 2,3]

  const worker = useContext(WorkerContext)
  const navigation = useNavigation()


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

      <View style={{width: 90, height:'100%', borderRadius:10, overflow:'hidden'}}>
        <Image
          source={item.foto}
          style={{ flex:1}}
        />
      </View>

        <View style={{justifyContent:'space-between'}}>
          <View>
            <CustomText text={item.nome} type='bold' style={styles.title}/>
            
            <View style={{flexDirection:'row', gap:12, flexWrap:'wrap'}}>
              {arr.map(()=> <CustomText text='Eletricista' style={{fontSize:11}}/>)}
            </View>
          </View>

          <View style={{ flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <CustomText text='5' type='semi' style={{fontSize: 18, marginRight: 6, color:'#001240'}}/>
              <AntDesign name="star" size={16} color="#001240"/>
            </View>

            <View style={{flexDirection:'row', alignItems:'center'}}>
              <CustomText text='20,99' style={{fontSize: 16, marginRight: 6, color:'#001240'}}/>
              <Foundation name="dollar" size={22} color="#001240" />
            </View>
          </View>
        </View>
    </TouchableOpacity>
  );
}