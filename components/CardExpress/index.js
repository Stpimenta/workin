import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Texts/CustomText'

export default function CardExpress() {
  return (
    <View style={styles.containerCard}>
      <View style={styles.containerHeader}>
         <View style={styles.avatar}>

         </View>

         <View style={{justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', gap: 8, flexWrap:'wrap'}}>
               <CustomText text='Eletricista' style={{fontSize: 12}}/>
               <CustomText text='Eletricista' style={{fontSize: 12}}/>
               <CustomText text='Eletricista' style={{fontSize: 12}}/>
            </View>
            <CustomText text='Jão Rodrigues' type='bold' style={styles.name}/>
         </View>
      </View>

      <View style={{marginBottom: 15}}>
         <CustomText text='kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk' style={styles.desc}/>
      </View>

      <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
         <CustomText text='5.0' style={styles.rating}/>
         <CustomText text='R$ 28,90' style={styles.rating}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
   containerCard:{
      width: '100%',
      paddingHorizontal: 16,
      backgroundColor:'white',
      borderRadius: 10,
      paddingVertical: 22,
      justifyContent:'space-evenly'
   },

   containerHeader:{
      flexDirection:'row',
      gap: 12,
      marginBottom: 12
   },

   avatar:{
      width: 88,
      height: 82,
      backgroundColor:'green',
      borderRadius: 12
   },

   name:{
      fontSize: 22,
      marginBottom: 20
   },

   desc:{
      fontSize: 14
   },

   rating:{
      fontSize: 20
   }

})