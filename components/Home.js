/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Button, Alert
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from '../css/CSS_Home';
import { faBook, faHome, faPen } from '@fortawesome/free-solid-svg-icons';
export default class Home extends React.Component 
{
  constructor(props) {
  
    super(props);
 
    this.state = {
 
      // username : this.props.navigation.state.params.username,
      // password: this.props.navigation.state.params.password,
      nip: '002',
      
 
    }
 
  }


  static navigationOptions = 
  {
    title: 'Menu',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  
  Back = () =>
  {
      this.props.navigation.navigate('HalamanAwal',{
        nip : this.state.nip,
       
    });
  }


  LihatData = () =>
  {
    // Alert.alert(this.state.id)
    this.props.navigation.navigate('Activity',{
      nip : this.state.nip,
     
  })
  }

  LihatData2 = () =>
  {
    // Alert.alert(this.state.id)
    this.props.navigation.navigate('ViewData',{
      nip : this.state.nip,
     
  })
  }

  InputData = () =>
  {
    // Alert.alert(this.state.nip)
    this.props.navigation.navigate('InputData',{
      nip : this.state.nip,
  })
  }

  LogOut = () =>
  {
    // Alert.alert(this.state.nip)
    this.props.navigation.navigate('Login_Screen')
  }

  render()
  {
    return (
     <View style={styles.container}>
       <View>
         
       </View>
        <View style={styles.containerTengah}>
        {/* <Text>{this.state.nip}</Text> */}
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={this.InputData}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Input Data</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={ this.LihatData}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Semua Data</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={ this.LihatData2}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Edit Data</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={ this.LogOut}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Logout</Text>
          </View>
        </TouchableOpacity>
        </View>
       <View style={styles.containerBawah}>
       {/* <ContainerBawah /> */}
       <View style={styles.btnrumah}>
          <TouchableOpacity
            // disabled = { this.state.disabled }
            activeOpacity={0.8}
            style={styles.BtnHome}
            onPress={this.Back}>
            <FontAwesomeIcon
              // size={24} color={'rgba(67, 37, 119,0.7)'}
              size={40}
              color={'rgba(65, 28, 6,0.7)'}
              icon={faHome}
              style={styles.homeicon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btnpen}>
          <TouchableOpacity
            // disabled = { this.state.disabled }
            activeOpacity={0.8}
            // style = { styles.BtnPen }
            onPress={this.Back}>
            <FontAwesomeIcon
              // size={24} color={'rgba(67, 37, 119,0.7)'}
              size={40}
              color={'rgba(65, 28, 6,0.7)'}
              icon={faPen}
              // style={styles.homeicon2}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btnbook}>
          <TouchableOpacity
            // disabled = { this.state.disabled }
            activeOpacity={0.8}
            // style = { styles.BtnBook}
            onPress={this.Back}>
            <FontAwesomeIcon
              // size={24} color={'rgba(67, 37, 119,0.7)'}
              size={40}
              color={'rgba(65, 28, 6,0.7)'}
              icon={faBook}
              // style={styles.homeicon3}
            />
          </TouchableOpacity>
        </View>
       </View>
      
     </View>
    );
  }
}



