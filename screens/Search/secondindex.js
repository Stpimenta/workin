import { collection, query, where, getDocs,} from 'firebase/firestore'
import {View, TouchableOpacity, Text, TextInput,Image} from 'react-native'
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
        function Serch(txt){
            const UpperCase  = () => {
                let mais = txt.charAt(0).toUpperCase() + txt.slice(1);
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
                <TextInput
                     placeholder='Pesquise por uma cateogoria'
                     onChangeText={(txt)=> setTexto(txt)}
                     onSubmitEditing={()=>Serch(texto)}
                     style={Estilos.TextInput}
                    />
                </View>

            {/*Corpo*/}
            <View style={Estilos.VCorpo}> 
            

                    {/*card*/}
                    {prestadores?.map((item)=> (
                        <View style={{marginBottom:20,}}>
                            <TouchableOpacity style={Estilos.Vcard}>
                                <Image
                                    style={Estilos.Imgcategoria}
                                    source={{uri:item.data.image}}
                                /> 
                                <View style={Estilos.Txtcategoria}>
                                    <Text style={Estilos.Text}>{item.data.nome}</Text>
                                    <Text>{item.data.filtros[0]} {item.data.filtros[1]} {item.data.filtros[2]}</Text>
                                    
                                </View>
                                <TouchableOpacity onPress={()=>handleNavigation(item)} style={Estilos.ProsseguiImgV}>
                                    <Image
                                        style={Estilos.Prosseguir}
                                        source={require("../../assets/prosseguir.png")}
                                    /> 
                                </TouchableOpacity>
                            </TouchableOpacity>
                            <View style={Estilos.Separator}></View>
                        </View>
                        
                    ))}

                

            </View>
         
            
        </View>
    )
}


