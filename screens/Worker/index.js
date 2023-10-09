import { Text,  StyleSheet, View, Image, FlatList, TouchableOpacity, StatusBar  } from 'react-native';
import react, {useContext} from 'react'
import Animated, {FadeIn,} from 'react-native-reanimated'
import CustomText from '../../components/Texts/CustomText';

import WorkerContext from '../../context/WorkerContext';


export default function WorkerScreen() {

  const worker = useContext(WorkerContext)

  const arr = [1,2,3, 4, 5]


  if(worker.nome == undefined){
    return(
      <Text>Carregando...</Text>
    )
  }


  return (
    <Animated.View style={styles.container}>
      <StatusBar barStyle='dark-content'/>
      <Animated.View style={styles.containerPhoto} entering={FadeIn.duration(700)}>
          <Image
            source={worker.foto}
            style={styles.avatar}
          />

          <View style={styles.cortina}>
          </View>

          <View style={styles.nameContainer}> 
            <CustomText text={worker.nome} type='bold' style={{color: 'white', marginLeft: 25, marginBottom: 10, fontSize: 26}}/>

            <View>
              <FlatList
                data={worker.filtro}
                renderItem={({item, index})=> (
                  <View style={{marginLeft: index == 0 ? 25 : 10,  height: 30, backgroundColor:'rgba(255, 255, 255, 0.25)', justifyContent:'center', alignItems:'center', borderRadius: 10, paddingHorizontal: 25}} key={item}>
                    <CustomText text={item} style={{color:'white', fontSize: 14}}/>
                  </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={()=> <View style={{width: 0}}></View>}
              />
            </View>           
          </View>
      </Animated.View>

      <View style={styles.containerDescription}>
        <CustomText text='Descrição' type='bold' style={styles.titleDesc}/>
        <CustomText 
          text={worker.descricao}
          style={styles.descr}
        />
      </View>

      <TouchableOpacity onPress={()=> console.log(worker.filtro)} style={styles.button}>
        <CustomText text='CONTRATAR' type='bold' style={{color:'white', fontSize: 16}}/>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },

  containerPhoto:{
    flex:1.4,
    overflow:'hidden'
  },

  avatar:{
    resizeMode:'stretch',
    width:'100%',
    height:'100%',
    position:'absolute',
    zIndex: 0
  },

  cortina:{
    width:'100%', 
    height:'100%',
    backgroundColor:'#00081E', 
    opacity: 0.65, 
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

  button:{
    paddingHorizontal:20,
    paddingVertical: 20,
    backgroundColor:'#4F80FF',
    alignSelf:'flex-end',
    marginBottom: 30,
    marginRight: 25,
    borderRadius: 10
  }
  
});
