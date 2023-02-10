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
    backgroundColor: '#f7ce40',
  },
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
    justifyContent: 'center',
    backgroundColor: '#e1c508'
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
    // backgroundColor: '#0fa0d1',
    backgroundColor: 'red',
    height: 30,
    // margin: 5,
    padding:5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  btnText: {
    // backgroundColor: '#0fa0d1',
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    padding:10,
  },
  btnback: {
    backgroundColor: '#7a5f02',
    // color: 'blue',
    fontSize: 32,
    fontWeight: 'bold',
    // padding:10,
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
    flex:1,
  },
  tulisan2: {
    fontSize : 16,
    flex:1,
    margin:5
  },
  tulisan3: {
    fontSize : 16,
    flex:1,
    margin:5
  },
  tulisan4: {
    fontSize : 16,
    flex:1,
    margin:5,
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
  back:{
    flex:1,
    // alignItems: 'center',
    // justifyContent:'center',
    flexDirection:'row'
  },
  btnz: {
    backgroundColor: '#7a5f02',
    height: 50,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
});