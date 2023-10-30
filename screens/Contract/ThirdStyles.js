

import { StyleSheet } from 'react-native';


const estilos = StyleSheet.create({
    ViewMãe:{
        flex: 1, 
        backgroundColor:'white',
    },

    VCabecalho:{
        flex:2,
        justifyContent:'center', 
        alignItems:'center',
        
    },

    Imgcontrato:{
        width:300,
        height:235,
    },

    VCorpo:{
        flex:1.2,
    },

    VBtn:{
        flex:1,
    },

    TextoPedido:{
        fontSize:30,
        paddingLeft:20,
        color:'#001240'
    },

    TextoAcompanhe:{
        fontSize:18,
        paddingLeft:20,
        paddingTop:10,
        color:'#001240'

    },

    VBtn:{
        flex:1,
        alignItems:'center', 
        paddingTop:20,
    },

    txt:{
        color:'white',
        fontSize:17,
      },

    btn:{
        height: 55,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#4F80FF',
        borderColor:'#4F80FF',
        borderRadius: 10,
      }

})

export default estilos;