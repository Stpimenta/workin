import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState} from 'react'

export default function Input({widthContainer, widthInput, hasIcon, desc, icon, margin, error, ...rest}) {

   const[focus, setFocus] = useState(false)
   const[filled, setFilled] = useState(false)

   const onCustomFocus = () =>{
         setFocus(true);
   } 

   const onCustomBlur = () =>{
      setFocus(false)
   }
   
  return (
   <>
      {error?.ref?.name == 'password' && <Text style={styles.error}>{error?.message}</Text>}
      <View 
         style={[styles.containerAll, widthContainer, {
            borderColor: error ? '#DC1637' :  focus ? '#4F80FF' : null, borderWidth: focus ? 1 : error ? 1 : null
         }]}
      >
         <TextInput 
            style={[styles.input, widthInput]} 
            placeholder={error ? error.message : desc}
            placeholderTextColor={error ? '#DC1637' : 'rgba(173, 180, 191, 0.6)'}
            onFocus={onCustomFocus}
            onBlur={onCustomBlur}
            {...rest}
         />


         {hasIcon && (
            <View style={styles.containerIcon}>
               <Image 
                  source={icon} 
                  style={styles.icon}/>
            </View>
         )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
   containerAll:{
      flexDirection:'row',
      height: 50,
      backgroundColor:'rgba(188, 196, 217, 0.15)',
      alignItems:'center',
      borderRadius: 5,
      marginBottom: 10
   },

   input:{
      height:50,
      color:'#6E737A',
      paddingHorizontal: 20
   },

   containerIcon:{
      width:50,
      height:'100%',
      alignItems:'center',
      justifyContent:'center',
   },
   
   icon:{
      width: 20,
      height: 20,
      resizeMode:'contain'
   },

   error:{
      color:'#DC1637',
      marginLeft: 4
   }
})