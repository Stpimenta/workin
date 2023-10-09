import { View, Text } from 'react-native'
import React from 'react'

import CustomText from '../../components/Texts/CustomText'

export default function Fast() {
  return (
    <View style={{flex:1, backgroundColor:'#EDF2FF', alignItems:'center', justifyContent:'center'}}>
      <CustomText text='Em manunteção' type='bold' style={{fontSize: 28}}/>
    </View>
  )
}