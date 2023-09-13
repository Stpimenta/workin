import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import Animated, {useAnimatedStyle, withSpring, withTiming} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';

export default function CustomButton({flatListRef, flatListIndex, dataLength}) {

   const navigation = useNavigation();

   const buttonAnimationStyle = useAnimatedStyle(()=>{
      return{
         width: flatListIndex.value === dataLength - 1 ? withSpring(120) : withSpring(50)
      }
   })

   const arrowAnimationStyle = useAnimatedStyle(()=>{
      return{
         opacity: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
         transform:[{translateX: flatListIndex.value === dataLength - 1 ? withTiming(100) : withTiming(0)}]
      }
   })

   const textAnimationStyle = useAnimatedStyle(()=>{
      return {
         opacity: flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      }
   })

   const next = () =>{
      if(flatListIndex.value < dataLength - 1){
         flatListRef.current.scrollToIndex({index: flatListIndex.value + 1})
      }
      else{
         navigation.navigate('Login')
      }
   }

  return (
    <TouchableWithoutFeedback onPress={next}>
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
         <Animated.Text style={[styles.textButton, textAnimationStyle]}>Começar</Animated.Text>
         <Animated.Image source={require('../../assets/Vector.png')} style={[styles.arrow, arrowAnimationStyle]}/>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
   container:{
      backgroundColor:'#4F80FF',
      width: 50,
      height: 50,
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 50,
      overflow: 'hidden'
   },

   arrow:{
      position:'absolute'
   },

   textButton:{
      color:'white',
      fontSize: 12,
      position:'absolute',
      fontWeight:'bold'
   }
})