import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';


export default function Home() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> signOut(auth)}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  }
})