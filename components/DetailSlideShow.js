/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react'
import { View, Image, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView,Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Card, CardItem, Picker, Textarea, Body,Radio, List, Left, Right} from 'native-base';
import DatePicker from 'react-native-datepicker';
import styles from '../css/CSS_DetailData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faHome, faPen, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { NavigationContext } from 'react-navigation';
import { Provider, useDispatch, useSelector } from 'react-redux';

// var arr=[]
const {width: WIDTH} = Dimensions.get('window');


export default  main_program=({route, navigation})=>{

  const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 1/2);
const imageWidth = dimensions.width;
const logoWidth = Math.round(dimensions.width * 9 / 16);

// let [jam_awal, setjam_awal]                       = useState(route.params.jam_mulai);
// let [row_id, setrow_id]                           = useState(route.params.row_id);
// let [jam_akhir, setjam_akhir]                     = useState(route.params.jam_mulai);
let [json_param, setjson_param]                               = useState(route.params);

    
  //ngambil dari store
  const dispatch=useDispatch();
  const full_name_karyawan = useSelector((state) => state.data_login.full_name_karyawan);
  const kode_karyawan = useSelector((state) => state.data_login.kode_karyawan);
  const nama_karyawan = useSelector((state) => state.data_login.nama_karyawan);
  // const dept = useSelector((state) => state.data_login.full_name_karyawan);
  let dept = useSelector((state) => state.data_login.dept);
  let role = dept.substring(0, 3);

   Back = () =>
  {
      navigation.replace("Halaman_Awal");
  }

    CariHistory = () =>
    {
      
      if(role == 'KNW' ||  role =='DRK'){
        alert("Anda tidak bisa menggunakan fitur ini")
      }
      else
      {
       navigation.replace("Cari_History");
      }
    }
  
    LihatData = () =>
    {
      if(role == 'KNW' ||  role =='DRK'){
        alert ("Anda tidak bisa menggunakan fitur ini");
      }
      else
      {
        navigation.replace("View_Data");
      }
    }
  
    InputData = () =>
    {
      
      if(role == 'KNW' ||  role =='DRK'){
        alert("Anda tidak bisa menggunakan fitur ini")
      }
      else
      {
        navigation.replace("Input_Data");
      }
     
    }

  Supervisor = () =>
  {
    // Alert.alert(nip)
    navigation.replace("Monitoring");
  }

  LogOut = () =>
  {
    // Alert.alert(nip)
    // this.Func_Logout();
    navigation.replace("Menu_Login");
  }


  konfirmasiLogout = () => {
      Alert.alert(
        'Confirmation',
        'Apakah anda ingin Keluar?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Ya', onPress: () => LogOut()}
        ],
        { cancelable: false }
      );
  
      }

      



    return (
            <View style = { styles.container }>
              <Header 
                // style={{backgroundColor: "#5c2600"}}
                style={{backgroundColor: "#fcce00"}}
              >
                <Left>
                  <Image
                  style={{width: 200,
                    height: 40,
                    borderRadius: 40 / 2,
                    marginLeft: 5,
                    marginTop:10,}}
                  // resizeMode='contain'
                  source={require('../img/icon-left.png')}
                  />
                </Left>
                <Body>
                  
                </Body>
                
              </Header>
              {/* <View style={styles.containerAtas}>
        <View>
       <Image
          //source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',}}
          source={require('../img/icon-left.png')}
          style={{
            width: 200,
            height: 40,
            borderRadius: 40 / 2,
            marginLeft: 5,
            marginTop:10,
          }}
        />
       </View>
        <View style={styles.btnLogout}>
       <TouchableOpacity onPress={this.konfirmasiLogout}>
       <Image
              //source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',}}
              source={require('../img/sign_out.png')}
              onPress={this.call_exit}
              style={{
                width: 30,
                height: 40,
                marginTop:10,
                marginRight:10,
                // borderRadius: 40 / 2,
                // marginRight: 15,
              }}
            />
       </TouchableOpacity>
        </View>
      </View> */}

            <View style={{marginTop: 150}}> 
              <Image
                style={{ width: imageWidth, height: imageHeight, resizeMode: 'stretch', alignSelf: 'center', marginBottom: 10 }}
                source={{ uri: json_param.url }}
              />
            </View>

            <Card style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
              <CardItem style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, height: '100%' }}>
                <Content scrollEnabled={false}>
                  <CardItem Header bordered>
                    <Content>
                      {/* <FontAwesomeIcon
                        size={30}
                        icon={faEnvelopeOpen}
                        style={{ alignSelf: 'center', marginBottom: 20 }}
                      /> */}
                      <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>{json_param.judul}</Text>
                      <Text style={{ color: 'red', marginTop: 10, fontSize: 15, fontWeight: 'bold', alignSelf: 'center' }}>Created: {json_param.date_created}</Text>
                    </Content>
                  </CardItem>

                  <CardItem Body>
                    <Content>
                      <ScrollView>
                        <Text selectable style={{ fontSize: 15 }}>{json_param.isi_pesan}</Text>
                      </ScrollView>
                    </Content>
                  </CardItem>
                </Content>
              </CardItem>
            </Card>
        
            </View>
           
        );
  }