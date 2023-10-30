import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
   card:{
      width: 240,
      height: 260,
      backgroundColor:'white',
      borderRadius: 10,
      padding: 18,
      justifyContent:'space-between',
      overflow:'hidden',
      zIndex: 1,
      position:'relative',
      marginLeft: 15,
      marginRight: 15
    },
  
   cardTitle:{
      fontSize: 18,
      textAlign:'center',
      color:'#001240'
   },

   avatarMask:{
      width:'100%', 
      height: 110, 
      borderRadius: 8, 
      marginBottom: 10, 
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
      backgroundColor:'red',
      position:'absolute',
      zIndex: 1
   },

   circle:{
      position:'absolute',
      width: 110,
      height: 110,
      borderRadius: 110,
      bottom: -40,
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
      bottom: -70,
      right: -20,
      borderWidth: 2,
      borderColor: '#4F80FF',
      opacity: 0.3
    },

   filter:{
      fontSize: 16,
      position:'relative',
   }
})

export default styles