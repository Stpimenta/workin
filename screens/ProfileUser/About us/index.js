import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../../../context/AuthContext'
import WorkerContext from '../../../context/WorkerContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import CustomText from '../../../components/Texts/CustomText'

import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'


export default function AboutUs() {

   const {user} = useContext(AuthContext)
   const{setWorker} = useContext(WorkerContext)
   const[favoritos, setFavoritos] = useState([])

   const navigation = useNavigation()




  return (
    <View style={styles.containerAll}>
       <Image
            source={require('../../../assets/backSignUp.png')}
            style={styles.backIcon}
         />

        <CustomText style={{fontSize: 20, color:'#001240'}} type='semi' text='A história da startup Workin é uma narrativa fascinante de inovação, resiliência e colaboração. Fundada em 2018 por um grupo de empreendedores visionários, a Workin surgiu da ideia de criar uma plataforma que revolucionasse a forma como as pessoas encontram oportunidades de trabalho e como as empresas encontram talentos excepcionais.

Os cinco membros fundadores, cada um com habilidades únicas e experiências diversas, uniram forças para transformar sua visão em realidade. Joana, com seu background em tecnologia, liderou o desenvolvimento da plataforma, enquanto Carlos, com sua expertise em marketing, trabalhou para posicionar a Workin como uma marca inovadora.

Nos primeiros meses, a equipe enfrentou desafios significativos. A captação de investimentos foi uma etapa crucial, e eles dedicaram horas intermináveis a apresentações, pitchs e reuniões com potenciais investidores. No entanto, a determinação da equipe e a solidez de sua proposta conquistaram o apoio necessário para levar a Workin ao próximo nível.

Com os recursos obtidos, a startup expandiu sua equipe e aprimorou a plataforma, tornando-a mais intuitiva e eficiente. A Workin começou a ganhar destaque no cenário de startups, recebendo reconhecimento por sua abordagem inovadora e foco na experiência do usuário.

O ano de 2020 trouxe desafios únicos para a Workin, com a pandemia global alterando drasticamente o cenário de trabalho. No entanto, em vez de se deter, a equipe viu oportunidades de crescimento em meio à adversidade. A plataforma foi adaptada para atender às novas demandas do mercado, como o aumento do trabalho remoto, e a Workin se destacou como uma solução relevante para o novo normal.

A Workin não era apenas uma plataforma de empregos; ela se tornou uma comunidade. Os membros da equipe trabalharam incansavelmente para criar eventos online, webinars e recursos interativos que conectavam profissionais e empresas de maneiras inovadoras. Essa abordagem única consolidou a posição da Workin como um ecossistema que não apenas facilitava a contratação, mas também promovia o desenvolvimento profissional e a colaboração entre os usuários.

À medida que a Workin crescia, sua responsabilidade social também se expandia. A startup implementou iniciativas para apoiar comunidades locais, promover a diversidade e inclusão no ambiente de trabalho e desenvolver programas de mentoramento para jovens profissionais. Esses esforços não apenas fortaleceram a reputação da empresa, mas também a tornaram uma força positiva no cenário empresarial.

Em 2022, a Workin alcançou um marco significativo, atingindo um milhão de usuários registrados em sua plataforma. Esse sucesso não teria sido possível sem a dedicação e a paixão dos cinco fundadores originais, que agora lideravam uma equipe talentosa e diversificada.

Olhando para o futuro, a Workin continua a inovar, lançando novos recursos e expandindo sua presença global. A empresa permanece comprometida com sua missão de conectar talentos a oportunidades e moldar o futuro do trabalho. A história da Workin é um testemunho de como uma ideia ousada, combinada com trabalho árduo e colaboração, pode transformar uma startup em uma força revolucionária no mundo dos negócios.'/>
    </View>
  )
}

const styles = StyleSheet.create({
   containerAll: {
      flex: 1,
      backgroundColor: 'white',
      padding: 25,
   },

   backIcon: {
      width: 12,
      height: 17,
      resizeMode: 'stretch',
      marginBottom: 80
   },

   containerCard: {
      paddingBottom: 30,
      borderBottomColor: 'rgba(0, 18, 64, 0.2)',
      borderBottomWidth: 1,
      marginBottom: 30
   },

   nomePrestador: {
      fontSize: 24,
      color: '#001240',
      marginBottom: 20
   },

   descricao: {
      fontSize: 16,
      color: '#001240',
      textAlign: 'justify'
   },
})