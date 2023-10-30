import { View, Text, StyleSheet} from 'react-native';
import React, {useState, useContext, useEffect,s} from 'react';
import WorkerContext from '../../context/WorkerContext';
import FirstScreen from './FirstContract';
import SecondScreen from './SecondContract';
import ThirdScreen from './ThirdContract';
export default function Contract() {

    
    const {loading, count} = useContext(WorkerContext)
    const[progress, setProgress] = useState(0.33)

    useEffect(()=>{
        if(count == 1){
            setProgress(0.33)
        }
        if(count == 2){
            setProgress(0.66)
        }
        if(count == 3){
            setProgress(0.999)
        }
    }, [count])

    // if(loading){
    //     return(
    //       <View style={{flex:1, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
    //         <Image
    //             source={require('../../assets/logo.png')}
    //             style={{width: 200, height: 40}}
    //         />

    //         <Text>Carregando...</Text>

    //       </View>
    //     )
    //   }
    

    return(
        <View style={{flex:1, backgroundColor:'white'}}>

            {count == 1 ? (
                <FirstScreen/>
            ) : 
            count == 2 ? (
                <SecondScreen/>
            ) : 
            count == 3 ? (
                <ThirdScreen/>
            ) : null}

            
        </View>
    )
}

const Estilos = StyleSheet.create({


})