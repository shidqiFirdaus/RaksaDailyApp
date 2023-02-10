/* eslint-disable prettier/prettier */
import {StyleSheet,Dimensions} from 'react-native';


// const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    //   flexDirection:"row",
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
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

  header: {
    color: 'black',
    // backgroundColor: 'red',
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },


  btnText: {
    // backgroundColor: '#0fa0d1',
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    padding:10,
  },
    containerDataUser:{
    // flexDirection:"row",
    flex:1,
    // paddingTop:20,
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    backgroundColor: '#faf9f7',
  },
  FlatListItemStyle: {
    padding: 10,
    // margin:10,
    fontSize: 18,
    height: 44,
  },
  tulisan1: {
    fontSize : 16,
    margin:5,
    flex:0.75,
    color:'#000000',   
  },
  tulisan2: {
    fontSize : 16,
    flex:0.85,
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
  tulisan_background: {
    flexDirection:"row",
    flex:1,
    // alignItems: 'center',
    // justifyContent:'center',
    // backgroundColor: '#e8dc2c'
  },
 judul_background: {
    flexDirection:"row",
    flex:1,
    marginBottom:10,
  },
 
  
  btnrumah4: {
    // backgroundColor: '#7a5f02',
    height: 50,
    margin: 10,
    borderRadius: 5,
    flex:4,
    // flexDirection:"row",
  },
  btnTextz: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  judul1: {
    fontSize : 16,
    // margin:5,
    flex:2,
  },
  judul2: {
    fontSize : 16,
    flex:4,
    // margin:5
  },
  judul3: {
    fontSize : 16,
    flex:4,
    // margin:5
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
  BtnCari:{
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom: 50,
},
btnText:{
  textAlign: 'center',
  color: 'white',
  fontSize: 16
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
});