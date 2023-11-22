import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
   containerAll:{
      flex:1,
      backgroundColor:'white',
      padding: 25,
      paddingTop: 40
   },

   edit:{},

   containerName:{
      flexDirection:'row',
      alignItems:'center',
      gap: 20,
      marginTop: 15
   },

   userMask:{
      width: 90,
      height: 90,
      borderRadius: 96,
      backgroundColor:'#001240'
   },

   containerOptions:{
      flex:1,
      gap: 10,
      marginTop: 60,
      marginBottom: 80
   }

})

export default styles