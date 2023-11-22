import React, {useState} from 'react'
import { View,TouchableOpacity, Image, TextInput, ScrollView,} from 'react-native';
import Estilos from './FirstStyles';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/Texts/CustomText';
import estilos from './FirstStyles';


function Tela3() {
  const prestadores = [
    {
      name: 'Cabeleleiro',
      img: 'https://i.postimg.cc/1Rb6Rfhm/Cabaleleiro.png',

      name2: 'Eletricista',
      img2:'https://i.postimg.cc/dQhrKGfN/Eletricista.png',
    },

    {
      name: 'Babá',
      img: 'https://i.postimg.cc/Cdyw3320/Bab.png',

      name2: 'Pintor',
      img2: 'https://i.postimg.cc/x846hywh/Pintura.png',
    },

    {
      name: 'Pedreiro',
      img: 'https://i.postimg.cc/MGsMCGm8/Pedreiro.png',

      name2: 'Cuidadordepets',
      img2:'https://i.postimg.cc/brSzFy3L/Cuidadordepets.png',
    },

    {
      name: 'Encanador',
      img: 'https://i.postimg.cc/K8Dg5fKj/Encanador.png',

      name2: 'Faxineiro',
      img2:'https://i.postimg.cc/wTJN1ggh/Faxineiro.png',
    },

    {
      name: 'Fotógrafo',
      img: 'https://i.postimg.cc/FKFkCScZ/Fot-grafo.png',

      name2: 'Geladeira',
      img2:'https://i.postimg.cc/zGrgW6G4/Geladeira.png',
    },

    {
      name: 'Pintor',
      img: 'https://i.postimg.cc/gJnXmPgL/Pintor.png',

      name2: 'Tubulacoes',
      img2:'https://i.postimg.cc/vZ902n32/Tubulacoes.png',
    },

    {
      name: 'Esgoto',
      img: 'https://i.postimg.cc/MHKLhGvM/Caixade-Esgosto.png',
   
      name2: 'Caixadagua',
      img2:'https://i.postimg.cc/VsDpXXVj/Caixadagua.png',
    },

    {
      name: 'Arcondicionado',
      img: 'https://i.postimg.cc/J4FF2Mm0/Arconcidicionado.png',

      name2: 'Tanque',
      img2: 'https://i.postimg.cc/nzTRYt0H/Tanque.png',
    },

    {
      name: 'Chuveiro',
      img: 'https://i.postimg.cc/bvk4nM7J/Chuveiro.png',

      name2: 'Telefone',
      img2:'https://i.postimg.cc/ZY7sW4WH/Telefone.png',
    },
  
    {
      name: 'Encanamento',
      img:'https://i.postimg.cc/fLvF2dTQ/Encanamento.png',
      
      name2: 'Costura',
      img2: 'https://i.postimg.cc/L8ZWdw6T/Costura.png',

    },

    {
      name: 'Lâmpada',
      img: 'https://i.postimg.cc/C5P2YVqv/Lambada.png',

      name2: 'Luthie',
      img2:'https://i.postimg.cc/vHTjhDJC/Luthie.png',
    },

    {
      name: 'Ralos',
      img:'https://i.postimg.cc/cCHDF5bf/Ralos.png',

      name2: 'Maquinadelavar',
      img2:'https://i.postimg.cc/pdb6PCmt/Maquinadelavar.png',
    },

    {
      name: 'Microondas',
      img: 'https://i.postimg.cc/XJn1CvKH/Microondas.png',
      name2: 'Luthie',
      img2:'https://i.postimg.cc/vHTjhDJC/Luthie.png',
      
    },

    {
      name: 'Violão',
      img: 'https://i.postimg.cc/4xwYsn5q/15.png',
      name2: 'Pintura',
      img2: 'https://i.postimg.cc/x846hywh/Pintura.png',
    },

   

  ]

  const[texto, setTexto] = useState()

  const navigation = useNavigation()

  function handleNavigation(){
    const UpperCase  = () => {
      let mais = texto.charAt(0).toUpperCase() + texto.slice(1);
      return mais
    }
    navigation.navigate('Teste', {
      filtro: UpperCase(),
    })
  }



  return (
    <View style={Estilos.ViewMãe}>

      {/*Cabeçalho*/}
        <View style={Estilos.VCabecalho}> 
          <TextInput
            placeholder='Pesquise por uma cateogoria'
            onChangeText={(txt)=> setTexto(txt)}
            onSubmitEditing={()=>handleNavigation()}
            style={Estilos.TextInput}
          />
        </View>

      {/*Corpo*/}
        <View style={estilos.VCorpo}>
          <ScrollView>
              <CustomText text ="Categorias" style={estilos.Text}/>
              {prestadores.map((item) => (
                <View style={Estilos.VCategorias}>
                  <TouchableOpacity
                      onPress={()=> navigation.navigate('Teste', {
                        filtro: item.name
                      })}>
                      <Image
                        style={Estilos.Imgcategoria}
                        source={{uri:item.img}}
                      /> 
                  </TouchableOpacity>

                  <TouchableOpacity
                      onPress={()=> navigation.navigate('Teste', {
                        filtro: item.name2
                      })}>
                      <Image
                        style={Estilos.Imgcategoria}
                        source={{uri:item.img2}}
                      /> 
                  </TouchableOpacity>

                </View>
              ))}
          </ScrollView>
        </View>

    </View>
         
  

  );
}

export default Tela3;