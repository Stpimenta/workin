import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'

import SignInWorkerContext from '../../context/SignInWorkerContext';

import { useNavigation } from '@react-navigation/native';


export default function Default(){

   const navigation = useNavigation()

   return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
         <TouchableOpacity style={styles.test} onPress={()=> navigation.navigate('SignUpWorker')}>
            <Text>CADASTRO PRESTADOR</Text>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   test:{
      marginTop: 100
   }
})