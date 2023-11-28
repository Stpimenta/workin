import {useContext} from 'react'
import { Text,  View, Image, TouchableOpacity  } from 'react-native';

import {useNavigation} from '@react-navigation/native'

import WorkerContext from '../../context/WorkerContext';

import styles from './style';
import CustomText from '../Texts/CustomText';

import { AntDesign, Foundation, FontAwesome   } from '@expo/vector-icons'; 



export default function WorkerCardHorizontal({item}) {

   const arr = ['Eletricista', 'Pias', 'Chuveiro']

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

      <View style={{width: 100, height:'100%', overflow:'hidden'}}>
        <Image
          source={item.foto}
          style={{ flex:1, resizeMode:'cover'}}
        />
      </View>

        <View style={{justifyContent:'space-between', paddingVertical: 10,}}>
          <View>
            <CustomText text={item.nome} type='semi' style={styles.title}/>
            
            <View style={{flexDirection:'row', gap:12, flexWrap:'wrap'}}>
              {arr.map((item)=> <CustomText text={item} style={{fontSize:10}}/>)}
            </View>
          </View>

          <View style={{ flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between', }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <CustomText text='5' style={{fontSize: 18, marginRight: 6, color:'#001240'}}/>
              <FontAwesome name="star" size={16} color="#001240"/>
            </View>

            <View style={{flexDirection:'row', alignItems:'center'}}>
              <CustomText text={`R$29,00`} type='semi' style={{fontSize: 16, marginRight: 6, color:'#001240'}}/>
            </View>
          </View>
        </View>
    </TouchableOpacity>
  );
}