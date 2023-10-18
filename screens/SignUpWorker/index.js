import { View } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import SignInWorkerContext from '../../context/SignInWorkerContext';

import HeaderSignUpWorker from '../../components/HeaderSignUpWorker';

import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import FourthScreen from './FourthScreen';


export default function SignUpWorker() {

   const[progress, setProgress] = useState(0.33)

   const {count} = useContext(SignInWorkerContext)

   useEffect(()=>{
      if(count == 1){
          setProgress(0.25)
      }
      if(count == 2){
          setProgress(0.50)
      }
      if(count == 3){
          setProgress(0.75)
      }
      if(count == 4){
         setProgress(0.95)
     }
  }, [count])

  return (
      <View style={{height:'100%', backgroundColor:'white'}}>
         <HeaderSignUpWorker progress={progress}/>

         {count == 1 ? (
                <FirstScreen/>
            ) : 
            count == 2 ? (
                <SecondScreen/>
            ) : 
            count == 3 ? (
                <ThirdScreen/>
            ) :
            count == 4 ? (
               <FourthScreen/>
            ) : null
         }
      </View>
  )
}