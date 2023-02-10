/* eslint-disable prettier/prettier */
import {StyleSheet,Dimensions} from 'react-native';


// const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#faf9f7',
    // paddingHorizontal: 15,
    paddingTop: (Platform.OS == 'ios') ? 0 : 0
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
BtnInsert:{
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
},


BtnSimpan:{
  backgroundColor: 'rgba(0, 230, 4, 0.86)',
  alignSelf: 'stretch',
  padding: 10,
  marginTop: 10,
  marginBottom: 10
},


BtnAdd:{
  backgroundColor: '#2E90FA',
  // widht: 100,
  padding: 10,
  marginTop: 10,
  marginBottom: 10
},

judul:{
  flex: 1,
// flexDirection: 'row',
// marginTop:0,
//  marginLeft:20,
// height:65,
// width:'100%',
// color: 'black',
    // fontSize: 10,
    // fontWeight: 'bold',
 alignItems: 'center',
justifyContent: 'center',
// backgroundColor: '#fcce00', 
},

tulisanJudul:{
  // flex: 1,
// flexDirection: 'row',
// marginTop:0,
//  marginLeft:20,
// height:65,
// width:'100%',
color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
//  alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: '#fcce00', 
},


BtnEdit:{
  backgroundColor: 'rgba(213, 0, 4, 0.75)',
  alignSelf: 'stretch',
  padding: 10,
  marginTop: 10,
  marginBottom: 10
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
    marginTop: 20,
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
    // flex: 1,
    flexDirection: 'row',
    marginTop:0,
    height:65,
    width:'100%',
    //  alignItems: 'stretch',
    // justifyContent: 'center',
    backgroundColor: '#fcce00',
  },
  btnLogout : {
    marginLeft:160,
  },

  text_label: 
  {
    color: 'black',
  },

  
});