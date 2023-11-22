

import { StyleSheet } from 'react-native';


const estilos = StyleSheet.create({
    ViewMãe:{
        flex: 1, 
        backgroundColor:'white',
    },

    VCabecalho:{
        flex:1,
        justifyContent:'flex-end', 
        alignItems:'center',
        marginBottom:10,
        paddingHorizontal: 10
    },

    VCorpo:{
        flex:5,
        paddingHorizontal: 10
    },

    TextInput:{
        width:'100%',
        height:45,
        borderWidth:1,
        borderRadius:10,
        borderColor:'gray',
        color:'black',
        backgroundColor:'white',
        paddingLeft:10,
        marginTop:40,
        marginHorizontal: 10
    },

    Text:{
        fontSize:25,
        fontWeight:'bold',
    },

    Imgcategoria:{
        width:165,
        height:100,
        borderRadius:5,
        marginTop:10,
        alignItems:"center",
        marginLeft:5,
        marginRight:5,
        resizeMode:'stretch'
    },

    VCategorias:{
        flexDirection:"row",
        justifyContent:"center",
    },


    

 

})

export default estilos;