import {StyleSheet} from 
'react-native';
export default StyleSheet.create({
  // menu_details
    menu_spk_rm_details_flex_row: {
      flexDirection: 'row', 
      marginBottom:10,
      alignItems: 'center',
      alignContent:'flex-start'
    },
    menu_spk_rm_details_text_style_1: {
      fontSize: 14,
      fontWeight: 'bold',
      color:'black'
    },
    menu_spk_rm_details_text_style_2: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'blue'
    },
    input: {
      // height: 30,a
      width: '90%',
      margin: 8,
      borderWidth: 1,
      padding: 5,
      borderRadius: 10,
      color:'black'
    },
    input_disabled: {
      // height: 30,
      margin: 8,
      borderWidth: 1,
      padding: 5,
      backgroundColor: '#f2f5fa',
      borderRadius: 10,
      color: 'black'
    },
  //

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    height: 300,
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'orange',
    flexDirection: 'column',
    padding: 0,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo_layout: {
    margin: 10,
    flex: 1
  },
  img_bg: {
    flex: 1, resizeMode: "cover", 
    justifyContent: "center"
  },
  btn: {
    backgroundColor: '#e87746',
    height: 75,
    width: 95,
    margin: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  btn_approve: {
    backgroundColor: 'green',
    height: 50,
    width: 75,
    margin: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_reject: {
    backgroundColor: 'red',
    height: 50,
    width: 75,
    margin: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn_drop: {
    backgroundColor: 'black',
    height: 50,
    width: 75,
    margin: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn_assign: {
    backgroundColor: 'blue',
    height: 50,
    width: 75,
    margin: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn_go_survey: {
    backgroundColor: 'green',
    height: 50,
    width: 75,
    margin: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn_save: {
    backgroundColor: '#855214',
    height: 50,
    // width: 100,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center'
  },

  btn_custom_1: {
    backgroundColor: '#e87746',
    height: 75,
    width: '50%',
    margin: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn_custom_manual: {
    backgroundColor: '#e87746',
    height: 75,
    width: '30%',
    margin: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },


  menu_container: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    margin: 1,
    // padding : 10,
  },
  menu_container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  menu_content: {
    flex: 1,
    // flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
  },
  menu_text: {
    fontSize:10,
    color: '#5c2600',
    fontWeight: 'bold',
    alignSelf:'center', 
  },
  bottom_tab: {
    borderWidth: 0.5,
    // borderRadius: 20,
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    alignItems:'center',
    justifyContent: 'center'
  },
  text_head: {
    fontWeight: 'bold',
    fontSize:15
  },
  card_style: {
    height: '100%',
    elevation: 30,
    borderTopEndRadius:50,
    borderTopStartRadius: 50,
  },
})