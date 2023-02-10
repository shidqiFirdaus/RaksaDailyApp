/* eslint-disable prettier/prettier */
import {StyleSheet,Dimensions,Platform} from 'react-native';


// const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#faf9f7',
    // paddingHorizontal: 15,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0
},
container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //marginBottom: 15,
    // backgroundColor: 'transparent',
   },
gambar:{
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 15,
    // paddingTop: (Platform.OS == 'ios') ? 20 : 0
},
textInput:{
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 5,
    alignSelf: 'stretch',
    padding: 8,
    fontSize: 16
},
BtnCari:{
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom: 50,
},
BtnBack:{
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    // marginTop: 10,
    marginBottom: 10
},
btnText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 16
},
radio:{
    fontSize: 20,
    marginBottom:5
},
file_foto:{
  fontSize: 20,
  marginBottom:5
},
header: {
    fontSize: 25,
    textAlign: 'center',
    // marginTop: 100,
    paddingTop:10,
    marginBottom:20,
    fontWeight: 'bold',
    color:'#000000',
  },

  
  //container bawah
  containerBawah:{
    flexDirection:'row',
    backgroundColor: '#fcce00',
    marginBottom:0,
  },
 
  btnrumah: {
    // backgroundColor: 'blue',
    height: 50,
    // margin: 10,
    borderRadius: 5,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // flexDirection:"row",
  },
  btnpen: {
    // backgroundColor: 'green',
    height: 50,
    // margin: 10,
    borderRadius: 5,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // flexDirection:"row",
  },
  btnbook: {
    // backgroundColor: 'pink',
    height: 50,
    // margin: 10,
    borderRadius: 5,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // flexDirection:"row",
  },
  btnUsers: {
    // backgroundColor: '#7a5f02',
    height: 50,
    // margin: 10,
    borderRadius: 5,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // flexDirection:"row",
  },

  containerAtas: {
    flex: 1,

    justifyContent: 'center',
    marginTop:110,
    // height:65,
    // width:'100%',
    // //  alignItems: 'stretch',
    // // justifyContent: 'center',
    // backgroundColor: '#fcce00',
  },
  btnLogout : {
    marginLeft:160,
  },
  containerTengah: {
    flex: 1,
    marginTop: 80,
    // flexDirection: 'row',
    // marginBottom:100,
    // position:"fixed",
    // height:65,
    // width:'100%',
    //  alignItems: 'stretch',
    // justifyContent: 'center',
    // backgroundColor: '#fcce00',
  },
  tulisan_background: {
    flexDirection:"row",
    flex:1,
    // alignItems: 'center',
    // justifyContent:'center',
    // backgroundColor: '#e8dc2c'
  },
  btn2: {
    backgroundColor: '#7a5f02',
    // backgroundColor: 'red',
    height: 30,
    marginRight: 5,
    padding:5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tulisan1: {
    fontSize : 16,
    margin:5,
    flex:0.75,
    color:'#000000',   
  },
  tulisan2: {
    fontSize : 16,
    flex:0.75,
    margin:5,
    color:'#000000',   
  },
  tulisan3: {
    fontSize : 16,
    flex:1,
    margin:5,
    color:'#000000',   
  },
  tulisan4: {
    fontSize : 16,
    flex:1,
    margin:5,
    color:'#000000',   
  },

  judul1: {
    fontSize : 16,
    // margin:5,
    // marginLeft:20,
    flex:1,
    color: '#411c06',
    fontWeight:'bold'
  },
  judul2: {
    fontSize : 16,
    flex:1,
    // margin:5,
    color: '#411c06',
    fontWeight:'bold'
  },
  judul3: {
    fontSize : 16,
    flex:1,
    // margin:5,
    color: '#411c06',
    fontWeight:'bold'
  },
  judul4: {
    fontSize : 16,
    flex:1,
    // margin:5,
    color: '#411c06',
    fontWeight:'bold'
  },
  tulisan_background2: {
    flexDirection:"row",
    // flex:1,
    // alignItems: 'center',
    // justifyContent:'center',
    // backgroundColor: '#e8dc2c'
  },

  judul_list:
  {
    // marginTop:60,
    flex: 1
  },
  btnAdaFoto: {
    backgroundColor: '#4287f5',
    // backgroundColor: 'red',
    height: 30,
    marginRight: 5,
    padding:5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  btnNoFoto: {
    backgroundColor: '#7a5f02',
    // backgroundColor: 'red',
    height: 30,
    marginRight: 5,
    padding:5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  
});