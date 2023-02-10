/* eslint-disable prettier/prettier */
import {StyleSheet,Dimensions} from 'react-native';


const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({

    backgroundContainer: {
        flex: 1,
        alignItems: 'center',
        width: null,
        height: null,
        justifyContent: 'center',
        backgroundColor: '#e1c508'
      },
      Logo: {
        width: 200,
        height: 200,
        // backgroundColor:'white'
      },
      LogoContainer: {
        alignItems: 'center',
        marginBottom: 50,
        // fontSize:28
      },
      logoText: {
        // color: '#432577',
        color: '#12110e',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
        opacity: 0.7
      },
      logoText2: {
        // color: '#432577',
        color: '#12110e',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        opacity: 0.7
      },
      version: {
        color: '#12110e',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
        opacity: 0.8
      },

      PickerInput: {
        backgroundColor:'transparent',
      },
      inputContainer: {
        marginTop: 10,
      },
      input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
      },
      inputicon: {
        position: 'absolute',
        top: 10,
        left: 36,
        // imageBackground:'black'
      },
      btnEye: {
        position: 'absolute',
        top: 10,
        right: 38,
      },
      btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        // backgroundColor:'#432577',
        backgroundColor: '#411c06',
        justifyContent: 'center',
        marginTop: 30,
      },
      text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
      },
});