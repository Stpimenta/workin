import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'

import SignInWorkerContext from '../../context/SignInWorkerContext';

import { useNavigation } from '@react-navigation/native';


export default function Default(){

   const navigation = useNavigation()

   return(
      <View>
         <TouchableOpacity style={styles.test} onPress={()=> navigation.navigate('SignUpWorker')}>
            <Text>HAHAHAHAHAHHAHAHAHAHA</Text>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   test:{
      marginTop: 100
   }
})