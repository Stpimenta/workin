import { Image } from 'react-native'
import React from 'react'

export default function TabBarIcon({ focused, image, imageInactive}) {
   if(focused){
      return(
         <Image style={{width: 25, height: 25}} source={image}/>
      )
   }

   return(
      <Image style={{width:25, height: 25}} source={imageInactive}/>
   )
}