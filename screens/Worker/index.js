import { Text,  StyleSheet, View, Image, FlatList, TouchableOpacity, StatusBar  } from 'react-native';
import react, {useContext, useState} from 'react'
import Animated, {FadeIn,} from 'react-native-reanimated'
import {addDoc, collection, doc, getDoc, updateDoc} from 'firebase/firestore'
import {db} from '../../firebase/config'
import CustomText from '../../components/Texts/CustomText';

import WorkerContext from '../../context/WorkerContext';
import AuthContent from '../../context/AuthContext'

import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 



const obj = {
  sender:{},
  receiver:{},
  date:'',
  description:''
}

export default function WorkerScreen() {

  const navigation = useNavigation()

  const {receiver, setWorker} = useContext(WorkerContext)
  const {user} = useContext(AuthContent)
  const[active, setActive] = useState(false)

  async function pegarDado(){
    const docRef = doc(db, 'users', user.uid)
    

    let data = new Date(),
      dia  = data.getDate().toString().padStart(2, '0'),
      mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano  = data.getFullYear();

      const dataCorreta = dia + '/' + mes

      await getDoc(docRef).then((doc)=>{

        setWorker({
          sender: {...doc.data(), id: doc.id},
          date: dataCorreta
        })
      })
  }



  async function Contratar(){

    await pegarDado().then(()=>{
      navigation.navigate('Contract')
    })
  }

  async function favoritar(){
    const prestadorRef = doc(db, 'prestadores', receiver.id)
    const userSubRef = collection(db, 'users', user.uid, 'favoritos')
    setActive(true)

    await updateDoc(prestadorRef, {
      seguidores: parseInt(receiver.seguidores + 1)
    }).then(()=>{
      console.log('foi')
    })

    const favoritado = {...receiver}

    await addDoc(userSubRef, favoritado).then(()=>{
      console.log('foi')
    })

  }


  return (
    <Animated.View style={styles.container}>
      <StatusBar barStyle='dark-content'/>
      <Animated.View style={styles.containerPhoto} entering={FadeIn.duration(700)}>
          <Image
            source={{uri: receiver ? receiver.image : 'https://img.icons8.com/?size=256&id=87293&format=png'}}
            style={styles.avatar}
          />

          <View style={styles.cortina}>
          </View>

          <TouchableOpacity onPress={favoritar} style={{position:'absolute', top: 20, right: 20}}>
            <AntDesign name="heart" size={28} color={active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
            <Image source={require('../../assets/Vector.png')} style={{position:'absolute', width: 20, resizeMode:'contain',height:20,top: 20, left: 20, transform:[{scaleX: -1}]}}/>
          </TouchableOpacity>

          <View style={styles.nameContainer}> 
            <CustomText text={receiver.nome} type='bold' style={{color: 'white', marginLeft: 25, marginBottom: 10, fontSize: 26}}/>

            <View style={{marginBottom: 6}}>
              <FlatList
                data={receiver.filtros}
                renderItem={({item, index})=> (
                  <View style={{marginLeft: index == 0 ? 25 : 10,  height: 30, backgroundColor:'rgba(255, 255, 255, 0.30)', justifyContent:'center', alignItems:'center', borderRadius: 10, paddingHorizontal: 25}} key={item}>
                    <CustomText text={item} type='bold' style={{color:'white', fontSize: 14}}/>
                  </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>           
          </View>
      </Animated.View>

      <View style={styles.containerDescription}>
        <CustomText text='Descrição' type='bold' style={styles.titleDesc}/>
        <CustomText 
          text={receiver.descricao}
          style={styles.descr}
        />
      </View>

      <View style={{alignSelf:'flex-end', width:'100%', flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 25, alignItems:'center', paddingBottom: 25}}>
        <View>
          <CustomText text={`R$ ${receiver.price},00`} type='semi' style={styles.price}/>
        </View>

        <TouchableOpacity onPress={()=> Contratar()} style={styles.button}>
          <CustomText text='CONTRATAR' type='bold' style={{color:'white', fontSize: 16}}/>
        </TouchableOpacity>
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },

  containerPhoto:{
    flex:1.5,
    overflow:'hidden',
  },

  avatar:{
    resizeMode:'stretch',
    width:'100%',
    height:'100%',
    position:'absolute',
    zIndex: 0,
    opacity: 0.85
  },

  cortina:{
    width:'100%', 
    height:'100%',
    backgroundColor:'#00081E', 
    opacity: 0.45, 
    position:'absolute'
  },

  nameContainer:{
    width:'100%', 
    height:'100%', 
    justifyContent:'flex-end', 
    paddingBottom: 25
  },

  name:{
    fontSize: 24,
    fontWeight:'bold',
    color:'white',
    marginLeft: 25,
    marginBottom: 15
  },

  containerDescription:{
    flex:1.2,
    backgroundColor:'white',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  titleDesc:{
    color:'#001240',
    fontSize: 20,
    marginBottom: 10
  },

  descr:{
    fontSize: 16,
    color:'#001240',
    textAlign:'justify',
  },

  avaliation:{
    marginTop: 30,
  },

  price:{
    fontSize: 24,
    color:'#001240',
  },

  button:{
    paddingHorizontal:20,
    paddingVertical: 20,
    backgroundColor:'#4F80FF',
    borderRadius: 10
  }
  
});
