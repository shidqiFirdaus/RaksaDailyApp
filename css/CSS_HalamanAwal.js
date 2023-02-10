/* eslint-disable prettier/prettier */
import {StyleSheet,Dimensions} from 'react-native';
import { color } from 'react-native-reanimated';


// const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    //  alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#faf9f7',
  },
  
  containerTengah: {
    flex: 1,
    // marginTop:180,
    flexDirection: 'column',
    //  alignItems: 'stretch',
    // justifyContent: 'space-between',
    backgroundColor: '#faf9f7',
  },
  namaPahlawan: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  asal: {
    fontSize: 18,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
    fontSize: 18,
  },
  btn: {
    backgroundColor: '#7a5f02',
    height: 50,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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

// container Atas
  containerAtas: {
    // flex: 1,
    flexDirection: 'row',
    marginTop:0,
    height:65,
    width:'100%',
    //  alignItems: 'stretch',
    justifyContent:'space-between',
    backgroundColor: '#fcce00',
  },
  btnLogout : {
    // marginLeft:160,
  },

  ///
  containerAtasTengah :{
       // flex: 1,
    flexDirection: 'row',
    marginTop:10,
    marginLeft:20,
    // height:65,
    // width:'100%',
    //  alignItems: 'stretch',
    // justifyContent: 'center',
    // backgroundColor: '#fcce00', 
  },

  textHi :{
    fontSize: 20,
    color:'#000000',
  },

  //menu-icon utama
  menuInput: {
      width:100,
      height:100,
      borderWidth:1,
      borderColor:'#7a5f02',
      borderRadius:18,
      // justifyContent:'center',
      // alignContent:'center',
      // marginRight:10,
      // marginLeft:70,

  },
  homeicon1 :{
    margin:15,
    // width:70,
    // height:70,
    // fontSize:100,
  },

  menu1 :{
      flexDirection: 'row',
      marginTop:100,
    //   marginLeft:50,
  },
  
  menu2 :{
    flexDirection: 'row',
    marginTop:50,
},

  pilihan1 : {
    // marginTop:100,
    // marginLeft:0,
    flex:1,
    //  justifyContent:'center',
      // alignContent:'center',
      alignItems: 'center',
  justifyContent: 'flex-start',
  },

  pilihan2 : {
    // marginTop:100,
    // marginLeft:40,
    alignItems: 'center',
  justifyContent: 'flex-start',
    flex:1,
    //  justifyContent:'center',
      // alignContent:'center',
  },
  pilihan3 : {
    // marginTop:100,
    // marginLeft:0,
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pilihan4 : {
    // marginTop:100,
    // marginLeft:0,
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  textMenu1: {
    fontSize:20,
    // marginLeft:75,
    fontWeight:'bold',
    color:'#1c3565',
  },
  textMenu2: {
    fontSize:20,
    // marginLeft:20,
    fontWeight:'bold',
    color:'#1c3565',
  },
  textMenu3: {
    fontSize:20,
    // marginLeft:80,
    fontWeight:'bold',
    color:'#1c3565',
  },
  textMenu4: {
    fontSize:20,
    // marginLeft:70,
    fontWeight:'bold',
    color:'#1c3565',
  },


});