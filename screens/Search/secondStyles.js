
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
        marginLeft:25,
        marginBottom:40,
    },


    VCorpo:{
        flex:5,
    },

    TextInput:{
        width:width-50,
        height:45,
        borderWidth:1,
        borderRadius:10,
        borderColor:'gray',
        color:'black',
        backgroundColor:'white',
        paddingLeft:10,
        flexDirection:'row',
        alignItems:'center',
    },


    Imgcategoria:{
        width:width/4,
        height:width/4,
        borderRadius:15,
    },

    Vcard:{
        flexDirection:"row",
        marginBottom:20,
        justifyContent:'center',
        marginLeft:25,
    },

    Txtcategoria:{
        marginLeft:10,
        width:200,
        fontSize:100,
        flex:5,
        
    },

    Prosseguir:{
        width:10,
        height:20,
    },

    ProsseguiImgV:{
        justifyContent:"center",
        flex:1,
        alignItems:"flex-end",
        marginRight:30,
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