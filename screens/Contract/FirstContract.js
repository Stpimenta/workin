import React, {useContext} from 'react'
import { View, Text, TouchableOpacity, StatusBar} from 'react-native';
import Estilos from './FirstStyles';
import WorkerContext from '../../context/WorkerContext';
import CustomText from '../../components/Texts/CustomText';



function Tela2() {
  
  const{sender, receiver, setWorker} = useContext(WorkerContext)

  const Next = () =>{
    setWorker({
      count: 2
    })
  }

  return (
    <View style={Estilos.ViewMãe}>
      <StatusBar barStyle='light-content'/>

      {/*Cabeçalho*/}
        <View style={Estilos.VCabecalho}> 
          <CustomText text='Contrato' style={Estilos.TextoContrato}/>
        </View>

      {/*Corpo*/}
      <View style={Estilos.VCorpo}> 
          <View style={Estilos.ViewTextoNome}>
            <CustomText text='Olá, ' style={Estilos.TextoOla}/>
            <CustomText text={sender.nome} type='bold' style={Estilos.TextoNome}/>
          </View>

          <View style={Estilos.ViewContratando}>
            <CustomText text='Você está contratando:' style={Estilos.TextoContratandoEndereco}/>
            <CustomText text={receiver.nome} type='bold' style={Estilos.NomeEndereco}/>

            <CustomText text='Seu endereço:' style={Estilos.TextoContratandoEndereco}/>
            <CustomText text={sender.endereco.rua + ', ' +sender.endereco.numero} type='bold' style={Estilos.NomeEndereco}/>

          </View>
      </View>

      {/*Botão*/}
      <View style={Estilos.VBtn}> 
          <TouchableOpacity style={Estilos.btn} onPress={Next}>
            <CustomText text='Prosseguir' type='bold' style={Estilos.txt}/>
          </TouchableOpacity>
      </View>

    </View>

  );
}

export default Tela2;