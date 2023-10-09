import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import React from 'react'

import styles from './style'

import CustomText from '../../components/Texts/CustomText'
import Option from '../../components/OptionProfile/index'

export default function ProfileUser() {
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

         <CustomText text='Rania Ogura' type='bold' style={{fontSize: 24}}/>
      </View>

      <View style={styles.containerOptions}>
         <Option name='Pedidos' icon={require('../../assets/pedidos.png')}/>
         <Option name='Favoritos' icon={require('../../assets/favoritos.png')}/>
         <Option name='Notificação' icon={require('../../assets/notification.png')}/>
         <Option name='Sobre nós' icon={require('../../assets/team.png')}/>
         <Option name='Ajuda' icon={require('../../assets/ajuda.png')}/>
         <Option name='Termos' icon={require('../../assets/terms.png')}/>
      </View>
    </ScrollView>
  )
}