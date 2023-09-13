import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import Animated, {useAnimatedStyle, interpolate, Extrapolate} from 'react-native-reanimated'

export default function Pagination({data, x , screenWidth}) {

   const PaginationItem = ({i}) =>{

      const animationDotStyle = useAnimatedStyle(()=>{
         const widthAnimation = interpolate(x.value,
            [(i -1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
            [10, 20, 10],
            Extrapolate.CLAMP
         )

         const opacityAnimation = interpolate(x.value,
            [(i -1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
            [0.3, 1, 0.3],
            Extrapolate.CLAMP
         )

         return {
            width: widthAnimation,
            height: 10,
            backgroundColor:'#001240',
            marginHorizontal: 2,
            borderRadius: 5,
            opacity: opacityAnimation
         }
      })

      return <Animated.View style={animationDotStyle}></Animated.View>
   }

  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index)=>{
         return <PaginationItem i={index} key={index}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
   paginationContainer:{
      flexDirection:'row',
      height: 40,
      alignItems:'center',
      justifyContent:'center'
   },

   dot:{
      width: 10,
      height: 10,
      backgroundColor:'#001240',
      marginHorizontal: 2
   }
})