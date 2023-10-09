import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import React from 'react'

import styles from './style'

import CustomText from '../../components/Texts/CustomText'
import Option from '../../components/OptionProfile/index'

export default function ProfileWorker() {
  return (
    <ScrollView style={styles.containerAll}>
      <TouchableOpacity style={{width: 25, height: 25, alignSelf:'flex-end'}}>
         <Image 
            source={require('../../assets/edit.png')}
         />
      </TouchableOpacity>

      <View style={styles.containerName}>
         <View style={styles.userMask}>

         </View>

         <View>
            <CustomText text='Rania Ogura' type='bold' style={{fontSize: 24}}/>
            <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
               <CustomText text='4.5' type='bold' style={{fontSize: 16}}/>
               <CustomText text='100' type='bold' style={{fontSize: 16}}/>
            </View>
         </View>
      </View>

      <View style={styles.containerOptions}>
         <Option name='Fast' icon={require('../../assets/fast.png')} screen='Home'/>
         <Option name='Solicitados' icon={require('../../assets/solicitados.png')}/>
         <Option name='Em andamento' icon={require('../../assets/andamento.png')}/>
      </View>
    </ScrollView>
  )
}