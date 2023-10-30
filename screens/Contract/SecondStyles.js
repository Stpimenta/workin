

import { StyleSheet } from 'react-native';


const estilos = StyleSheet.create({
    ViewMãe:{
        flex: 1, 
        backgroundColor:'white',
    },

    VCabecalho:{
        flex:1.9,
        justifyContent:'center', 
    },

    VCorpo:{
        flex:6,
        paddingHorizontal: 25
    },

    VBtn:{
        flex:2,
    },

    TextoContrato:{
        fontSize:30,
        padding:20,
    },

    TextoNome:{
        fontSize:20,
        fontWeight:'bold',
        padding:20,
    },

    VBtn:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginBottom:20,
    },

    TxtInput:{
        borderWidth:1,
        margin:20,
        paddingBottom:"78%",
    },

    txt:{
        color:'white',
        fontWeight:'bold',
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