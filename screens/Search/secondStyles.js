

import { StyleSheet } from 'react-native';


const estilos = StyleSheet.create({
    ViewMãe:{
        flex: 1, 
        backgroundColor:'white',
    },

    VCabecalho:{
        flex:1, 
        justifyContent:'flex-end',   
        marginBottom:40,
    },

    VCorpo:{
        flex:5,
    },

    TextInput:{
        width:'90%',
        height:45,
        borderWidth:1,
        borderRadius:8,
        borderColor:'gray',
        color:'black',
        backgroundColor:'white',
        paddingLeft:10,
        marginLeft:20,
    },

    Imgcategoria:{
        width:100,
        height:100,
        borderRadius:15,
    },

    Vcard:{
        flexDirection:"row",
        marginBottom:20,
        marginHorizontal:20,
    },

    Txtcategoria:{
        marginLeft:10,
        width:200,
        alignItems:"start",
        fontSize:100,
        
    },

    Prosseguir:{
        width:10,
        height:20,
        marginLeft:50,
        
    },

    ProsseguiImgV:{
        justifyContent:"center"
    },

    Text:{
        fontSize:18,
        fontWeight:'bold',
    },

    Separator:{
        height:1,
        width:'100%',
        backgroundColor:'#D3D3D3',
    },

})

export default estilos;