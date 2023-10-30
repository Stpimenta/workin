
import { StyleSheet } from 'react-native';


const estilos = StyleSheet.create({
    ViewMãe:{
        flex: 1, 
        backgroundColor:'white',
    },

    VCabecalho:{
        flex:2.3,
        justifyContent:'center', 
    },

    VCorpo:{
        flex:6, 
    },

    VBtn:{
        flex:2,
    },

    TextoContrato:{
        fontSize:30,
        padding:25,
        color:'#001240'
    },


    ViewTextoNome:{
        flexDirection:'row',
        alignItems:'center',
    },

    TextoOla:{
        fontSize:26,
        paddingLeft:25,
        color:'#001240'
    },

    TextoNome:{
        fontSize:26,
        color:'#001240'
    },


    ViewContratando:{
        flex:0.7,
        justifyContent:'center',
        marginLeft:25,
    },

    TextoContratandoEndereco:{
        fontSize:22,
        marginTop:40,
        color:'#001240'
    },

    NomeEndereco:{
        fontSize:22,
        color:'#001240'
    },

    VBtn:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginRight:20,
        marginBottom:20,
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