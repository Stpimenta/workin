import { collection, query, where, getDocs,} from 'firebase/firestore'
import {View, TouchableOpacity, Text, TextInput,Image,ScrollView} from 'react-native'
import { db } from '../../firebase/config'
import { useEffect, useState } from 'react'
import Estilos from "./secondStyles"
import { useNavigation } from '@react-navigation/native';
import React, {useContext} from 'react'
import WorkerContext from '../../context/WorkerContext';


export default function Teste({route}){

    
    var {filtro} = route.params
    const[prestadores, setPrestadores] = useState([])

    useEffect(()=>{
        pegarDados(filtro)
    }, [])

    async function pegarDados(fil){
        const colRef = collection(db, 'prestadores')
        const q = query(colRef, where('filtros', 'array-contains', fil))

        await getDocs(q).then((resposta)=>{
            const arr = []

            resposta.forEach((doc)=>{
                const obj = {data: doc.data(), id: doc.id}
                arr.push(obj)
            })

            setPrestadores(arr)
        })
    }

        const[texto, setTexto] = useState()
        function Serch(){
            const UpperCase  = () => {
                let mais = texto.charAt(0).toUpperCase() + texto.slice(1);
                return mais
            }
            pegarDados(UpperCase())
        }
        
        const {setWorker} = useContext(WorkerContext)
        const nav = useNavigation()
        async function handleNavigation(item){  
            setWorker({
              receiver:{
                nome: item.data.nome,
                filtros: item.data.filtros,
                descricao: item.data.descricao,
                nota: item.data.nota,
                price: item.data.price,
                image: item.data.image,
                id: item.id,
              }
            })
        
            nav.navigate('Worker')
        }

    return(
        
        <View style={Estilos.ViewMãe}>
            {/*Cabeçalho*/}
            <View style={Estilos.VCabecalho}> 
                <View style={Estilos.TextInput}>
                    <Image source={require('../../assets/Serchicon.png')} style={{width:30, height:30, marginRight:10,}} />
                    <TextInput
                    placeholder='Pesquise por uma categoria'
                    onChangeText={(txt)=> setTexto(txt)}
                    onSubmitEditing={()=>Serch()}
                    />
                </View>
            </View>

            {/*Corpo*/}
            <View style={Estilos.VCorpo}> 
                <ScrollView>

                    {/*card*/}
                    {prestadores?.map((item)=> (
                        <View style={{marginBottom:20,}}>
                            <TouchableOpacity style={Estilos.Vcard} onPress={()=>handleNavigation(item)}>
                                <Image
                                    style={Estilos.Imgcategoria}
                                    source={{uri:item.data.image}}
                                /> 
                                <View style={Estilos.Txtcategoria}>
                                    <Text style={Estilos.Text}>{item.data.nome}</Text>
                                    <Text>{item.data.filtros[0]} {item.data.filtros[1]} {item.data.filtros[2]}</Text>
                                    
                                </View>
                                <View  style={Estilos.ProsseguiImgV}>
                                    <Image
                                        style={Estilos.Prosseguir}
                                        source={require("../../assets/prosseguir.png")}
                                    /> 
                                </View>
                            </TouchableOpacity>
                            <View style={Estilos.Separator}></View>
                        </View>
                        
                    ))}
                </ScrollView>
                

            </View>
         
            
        </View>
    )
}


