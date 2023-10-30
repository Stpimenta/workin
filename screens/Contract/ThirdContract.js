import React, {useContext} from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native';
import Estilos from './ThirdStyles';
import WorkerContext from '../../context/WorkerContext';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/Texts/CustomText';

function Tela3() {

  const{setWorker} = useContext(WorkerContext)
  const navigation = useNavigation()

  const Next = () =>{
    setWorker({
    count: 1
   })
   navigation.navigate('Home');
  }

  return (
    <View style={Estilos.ViewMãe}>

      {/*Cabeçalho*/}
        <View style={Estilos.VCabecalho}> 
           <Image
              style={Estilos.Imgcontrato}
              source={require("../../assets/contratoFechado.png")}
           /> 
        </View>

      {/*Corpo*/}
        <View style={Estilos.VCorpo}> 
          <CustomText text='Seu pedido foi' type='bold' style={Estilos.TextoPedido}/>
          <CustomText text='Enviado!' type='bold' style={Estilos.TextoPedido}/>

          <CustomText text='Acompanhe-o pelas notificações ou em "Pedidos" no Perfil' style={Estilos.TextoAcompanhe}/>
        </View>

      {/*Botão*/}
      <View style={Estilos.VBtn}> 
          <TouchableOpacity style={Estilos.btn} onPress={Next}>
            <CustomText text='OK' type='bold' style={Estilos.txt}/>
          </TouchableOpacity>
      </View>
    </View>

  );
}

export default Tela3;