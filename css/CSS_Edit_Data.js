/* eslint-disable prettier/prettier */
import {StyleSheet,Platform} from 'react-native';


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
labelGambar:{
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
logo: {
  width:  '80%',
  // height: '-50%',
  alignContent: "center",
  justifyContent: 'center',
  alignItems: "center",
  shadowOpacity: 10
},
logo_layout: {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
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
  tulisan : {
    fontSize:20,
    color:'#000000',
  },
  tulisan1: {
    fontSize: 16,
    color:'#000000',
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