import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState, useContext} from 'react'
import CustomText from '../../components/Texts/CustomText'

import SignInWorkerContext from '../../context/SignInWorkerContext'

import Animated, {FadeInUp} from 'react-native-reanimated'

let arr = []
let filters = ['Eletricista', 'Encanador', 'Geladeira', 'Pias', 'Luthie', 'Ar Condicionado', 
'Lâmpada', 'Micro-ondas', 'Violão', 'Costura', 'Pintura', 'Chuveiros', ]


function Filter({name}){

   const[enable, setEnable] = useState(false)

   const selectFilter = () =>{
      setEnable(!enable)

      let index = arr.indexOf(name)

      if(arr.includes(name)){
         arr.splice(index, 1)
         console.log(arr)

      }
      else{
         arr.push(name)
         console.log(arr)
      }

   }

   return(
      <TouchableOpacity 
         style={[styles.filter, {opacity: enable ? 0.2 : 1}]}
         onPress={selectFilter}
      >
         <CustomText text={name} style={styles.textFilter}/>
      </TouchableOpacity>
   )
}


export default function SecondScreen() {

  const{setSignInWorker} = useContext(SignInWorkerContext)


   const nextStep = () =>{
      setSignInWorker({
         filters: arr,
         count: 3
      })
   }

  return (
    <View style={{flex:1, paddingHorizontal: 20}}>
      <Animated.View 
         style={styles.form}
         entering={FadeInUp.duration(1000).springify()}
      >
         
         <CustomText 
            text='Seleciona o que você faz e com o que você mexe!'
            type='bold'
            style={{fontSize: 18, marginBottom: 20}}
         />

         <ScrollView contentContainerStyle={styles.filterContainer}>
           {filters.map((item)=> <Filter key={item} name={item}/>)}

         </ScrollView>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={nextStep}>
         <CustomText text='PROSSEGUIR' type='bold' style={styles.textButton}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
   form:{
      flex:1,
   },

   button:{
      width:'100%',
      height: 57, 
      backgroundColor:'#4F80FF',
      borderRadius: 10,
      alignItems:'center',
      justifyContent:'center',
      shadowColor: "#000",
      marginTop: 50,
    },
    
    textButton:{
      fontSize: 20,
      fontWeight:'bold',
      color:'white',
    },

    filterContainer:{
      width:'100%',
      height:'100%',
      flexDirection:'row',
      flexWrap:'wrap'
    },

    filter:{
      borderWidth: 1,
      borderColor:'black',
      height: 35,
      paddingHorizontal: 10,
      borderRadius: 10,
      alignItems:'center',
      justifyContent:'center',
      marginRight: 10,
      marginBottom: 10
      
    },

    textFilter:{
      fontSize: 14,
      textAlign:'center'
    }

})