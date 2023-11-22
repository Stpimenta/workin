import { TouchableOpacity, StyleSheet, View, Image, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomText from '../Texts/CustomText';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useState } from 'react';

export default function Options({name, icon, screen, hasSeta, hasSwitch}){

  const navigation = useNavigation()
  const user = getAuth()
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev)=> !prev);

   async function navigateScreen(){
      navigation.navigate(screen)
   }


   async function update(arg){
      setIsEnabled(arg)
      const docRef = doc(db, 'prestadores', user.currentUser.uid)
      if(arg == true){
        await updateDoc(docRef, {
          express: true
        }).then(()=> console.log('express ativado'))
      }
      else{
        await updateDoc(docRef, {
          express: false
        }).then(()=> console.log('express desativado'))
      }
   }

  return(
      <TouchableOpacity style={styles.option} activeOpacity={0.7} onPress={ hasSwitch ? null : navigateScreen}>
        <View style={{flexDirection:'row'}}>
          <Image  source={icon} style={styles.icon}/>
          <CustomText text={name} type='semi' style={styles.textOption}/>
        </View>

        {hasSeta && <Image source={require('../../assets/arrowOption.png')} style={{width: 20, height: 20}}/>}
        {hasSwitch &&  <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#4F80FF' : '#f4f3f4'}
              onValueChange={update}
              value={isEnabled}
            />}
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  option:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent:'space-between',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor:'rgba(222, 222, 222, 0.5)'
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