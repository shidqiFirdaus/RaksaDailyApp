/* eslint-disable prettier/prettier */
import {StyleSheet,Dimensions} from 'react-native';


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
    flexDirection: 'column',
    //  alignItems: 'stretch',
    justifyContent: 'center',
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
    // backgroundColor: '#7a5f02',
    height: 50,
    margin: 10,
    borderRadius: 5,
    flex:1,
    // flexDirection:"row",
  },
  btnpen: {
    // backgroundColor: '#7a5f02',
    height: 50,
    margin: 10,
    borderRadius: 5,
    flex:1,
    // flexDirection:"row",
  },
  btnbook: {
    // backgroundColor: '#7a5f02',
    height: 50,
    margin: 10,
    borderRadius: 5,
    // flex:1,
    // flexDirection:"row",
  },
});