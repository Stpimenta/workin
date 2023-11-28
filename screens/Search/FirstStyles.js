

import { StyleSheet,Dimensions } from 'react-native';

const{width, height} = Dimensions.get('screen');

const estilos = StyleSheet.create({
    ViewMãe:{
        flex: 1, 
        backgroundColor:'white',
    },

    VCabecalho:{
        flex:1,
        justifyContent:'flex-end', 
        marginBottom:20,
        paddingHorizontal: 10

    },

    VCorpo:{
        flex:5,
    },

    TextInput:{
        width:width-20,
        height:45,
        borderWidth:1,
        borderRadius:6,
        borderColor:'gray',
        color:'black',
        backgroundColor:'white',
        paddingLeft:10,
        flexDirection:'row',
        alignItems:'center',
    },

    Text:{
        fontSize:25,
        marginLeft:10,
    },

    Imgcategoria:{
        width:width/2 - 15,
        height:width/3,
        borderRadius:5,
        marginTop:10,
        resizeMode:'stretch',
        marginRight:10,
    },

    VCategorias:{
        flexDirection:"row",
        paddingHorizontal: 10
    },


    

 

})

export default estilos;