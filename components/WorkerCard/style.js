import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
   card:{
      width: 220,
      height: 240,
      backgroundColor:'white',
      overflow:'hidden',
      zIndex: 1,
      position:'relative',
      marginRight: 15,
      borderWidth:1,
      borderColor:'rgba(222, 222, 222, 0.5)',
      marginLeft: 15
    },
  
   cardTitle:{
      fontSize: 18,
      color:'#001240',
      marginBottom: 4,
   },

   avatarMask:{
      width:'100%', 
      height: 120, 
      overflow:'hidden',
      backgroundColor:'rgba(0, 0, 0, 0.1)'
   },

   avatar:{
      flex:1, 
      resizeMode:'stretch', 
      height:100,   
   },

   filterContainer:{
      overflow:'hidden',
      flexDirection:'row',
      flexWrap:'wrap',
      columnGap: 15,
      rowGap: 0,
      position:'absolute',
      zIndex: 1
   },

   filter:{
      fontSize: 16,
      position:'relative',
   }
})

export default styles