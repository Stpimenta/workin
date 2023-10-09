import {useContext} from 'react'
import { Text,  View, Image, TouchableOpacity  } from 'react-native';

import {useNavigation} from '@react-navigation/native'

import WorkerContext from '../../context/WorkerContext';

import styles from './style';
import CustomText from '../Texts/CustomText';

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

      <View style={styles.circle}></View>
      <View style={styles.circle2}></View>

      <View style={{width: 90, height:'100%', borderRadius:10, overflow:'hidden'}}>
        <Image
          source={item.foto}
          style={{ flex:1}}
        />
      </View>

        <View style={{justifyContent:'space-between'}}>
          <View>
            <CustomText text={item.nome} type='bold' style={styles.title}/>
            
            <View style={{flexDirection:'row', gap:15, flexWrap:'wrap'}}>
              {arr.map(()=> <Text style={{fontSize:10}}>Eletricista</Text>)}
            </View>
          </View>

          <Text>4.3</Text>
        </View>
    </TouchableOpacity>
  );
}