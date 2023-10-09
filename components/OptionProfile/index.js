import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomText from '../Texts/CustomText';

export default function Options({name, icon, screen}){

  const navigation = useNavigation()

   function navigateScreen(){
      navigation.navigate(screen)
   }

  return(
      <TouchableOpacity style={styles.option} activeOpacity={0.7} onPress={navigateScreen}>
        <View style={{flexDirection:'row'}}>
          <Image  source={icon} style={styles.icon}/>
          <CustomText text={name} type='semi' style={styles.textOption}/>
        </View>

        <Image source={require('../../assets/arrowOption.png')} style={{width: 20, height: 20}}/>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  option:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'rgba(255, 255, 255, 0.7)',
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent:'space-between',
    borderRadius: 10
  },

  icon:{
    width:28,
    height: 28,
    resizeMode:'contain'
  },

  textOption:{
    fontSize: 20,
    color:'#001240',
    fontWeight:'400',
    marginLeft: 30
  }
})