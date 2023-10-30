import React, {useContext} from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Estilos from './SecondStyles';
import { updateDoc, doc, arrayUnion, setDoc, getDoc, collection} from 'firebase/firestore';
import { db } from '../../firebase/config';

import uuid from 'react-native-uuid';


import CustomText from '../../components/Texts/CustomText';
import ControlledInput from '../../components/ControlledInput';

import {useForm} from 'react-hook-form'

import WorkerContext from '../../context/WorkerContext';
import AuthContext from '../../context/AuthContext';

import { useNavigation } from '@react-navigation/native';


function Tela2() {

  const {control, handleSubmit, formState: {errors}} = useForm()

  const navigation = useNavigation()

  const{descricao, date, sender, receiver, setWorker} = useContext(WorkerContext)
  const{user} = useContext(AuthContext)

  const Next = async (data) =>{

    const uid = uuid.v4()

    const docRefPrestador = doc(db, `prestadores/${receiver.id}/servicos/${uid}`)
    const docRefUser = doc(db, `users/${user.uid}/pedidos/${uid}`)

    const contrato = {
      receiver: {...receiver},
      sender:{...sender},
      date: date,
      descricao: data.desc,
      tipo:'Pendente',
      express: false
    }


    await setDoc(docRefPrestador, contrato).then(()=>{
      console.log('foi')
    })

    await setDoc(docRefUser, contrato).then(()=>{
      setWorker({
        count: 3,
      })
    })
  }

  return (
    <View style={Estilos.ViewMãe}>

      {/*Cabeçalho*/}
        <View style={Estilos.VCabecalho}> 
          <CustomText text='Contrato' style={Estilos.TextoContrato}/>
        </View>

      {/*Corpo*/}
      <View style={Estilos.VCorpo}> 
        
            <CustomText text='Descreva brevemente seu problema: ' type='bold' style={{fontSize: 16, color:'#001240', marginBottom: 20}}/>
            <ControlledInput
                name='desc'
                control={control}
                widthContainer={{width:'100%', height: 200}} 
                widthInput={{width:'100%', height: 160}}
                desc='Descrição'
                error={errors.email}
                multiline
                textAlignVertical='top'
                
            />
          
        {/*Botão*/}
        <View style={Estilos.VBtn}> 
        <TouchableOpacity style={Estilos.btn} onPress={handleSubmit(Next)}>
            <Text style={Estilos.txt}>FINALIZAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

export default Tela2;