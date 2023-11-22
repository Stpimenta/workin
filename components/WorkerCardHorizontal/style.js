import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   card:{
      height:110,
      width:'100%',
      backgroundColor:'white',
      flexDirection:'row',
      gap:20,
      marginBottom: 20,
      overflow:'hidden',
      borderWidth:1,
      borderColor:'rgba(222, 222, 222, 0.5)'
    },
  
    title:{
      fontSize:16,
      marginBottom:3,
      color:'#001240'
    },

    circle:{
      position:'absolute',
      width: 110,
      height: 110,
      borderRadius: 110,
      bottom: -50,
      right: -60,
      borderWidth: 1,
      borderColor: '#4F80FF',
      opacity: 0.2
    },
  
   circle2:{
      position:'absolute',
      width: 100,
      height: 100,
      borderRadius: 110,
      bottom: -80,
      right: -20,
      borderWidth: 2,
      borderColor: '#4F80FF',
      opacity: 0.3
    },
})

export default styles