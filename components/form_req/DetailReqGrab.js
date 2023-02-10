/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react'
import { View, Image, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView,Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Card, CardItem, Picker, Textarea, Body,Radio, List, Left, Right} from 'native-base';
import DatePicker from 'react-native-datepicker';
import styles from '../../css/CSS_DetailData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faHome, faPen, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { NavigationContext } from 'react-navigation';
import { Provider, useDispatch, useSelector } from 'react-redux';

// var arr=[]
const {width: WIDTH} = Dimensions.get('window');


export default  main_program=({route, navigation})=>{


let [remark,setremark] = useState("");
let [nama_karyawan_req, setnama_karyawan_req]      = useState(route.params.nama_karyawan);
let [nama_req, setnama_req]                        = useState(route.params.nama_req);
let [no_req, setno_req]                = useState(route.params.no_req);
let [departemen_lengkap, setdepartemen_lengkap]    = useState(route.params.dept_lengkap);
let [no_hp, setno_hp]                              = useState(route.params.hp);
let [email, setemail]              = useState(route.params.email);
let [id_req, setid_req]                            = useState(route.params.kode_karyawan_req);
let [nik, setnik]                                = useState(route.params.nik);
let [tanggal_req, settanggal_req]                  = useState(route.params.tanggal_req);
let [nama_departemen, setnama_departemen]          = useState(route.params.nama_dept);
let [keterangan, setketerangan]                    = useState(route.params.keterangan);
let [status, setstatus]                    = useState(route.params.status);

    
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


  Action_Approve = () =>
  {
        axios.post("url/prog-x/api/form_req/api_action_grab.php", {
        key : 'yuu37BVH@9(VH#*nv',
        no_req : no_req,
        remark : remark,
        action_by : kode_karyawan,
        id_req : id_req,
        action : 'Approve'
        })
        .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.data.Status == '1') {
            Alert.alert("SUCCESS", "Data Berhasil Diinput")
            navigation.replace("Menu_Req");
            // console.log(responseJson);
        }
        else {
            Alert.alert("FAILED", "Gagal")
        }
        })
        .catch(function (error) {
        Alert.alert("ERROR","Please Try again...")
        });
  }


  Action_Reject = () =>
  {
        axios.post("url/prog-x/api/form_req/api_action_grab.php", {
        key : 'yuu37BVH@9(VH#*nv',
        no_req : no_req,
        remark : remark,
        kode_karyawan : kode_karyawan,
        action_by : kode_karyawan,
        id_req : id_req,
        action : 'Reject'
        })
        .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.data.Status == '1') {
            Alert.alert("SUCCESS", "Data Berhasil Diinput")
            navigation.replace("Menu_Req");
            // console.log(responseJson);
        }
        else {
            Alert.alert("FAILED", "Gagal")
        }
        })
        .catch(function (error) {
        Alert.alert("ERROR","Please Try again...")
        });
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
                  source={require('../../img/icon-left.png')}
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

            <ScrollView>
            {/* <Text style={styles.textHi}>HI {this.state.nama_karyawan}</Text>
            <Text style={styles.textHi}>Dept {this.state.dept}</Text> */}
            <Text style = { styles.header }>Detail Request Pendaftaran Grab Corporate</Text>
            {/* <Text style = { styles.header }>{this.state.nip}</Text> */}
            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan_detail }>No Req : {no_req}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan_detail }>NIK : {nik}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan_detail }>Nama : {nama_req}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan_detail }>Departemen/Cabang : {departemen_lengkap}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan_detail }>Tanggal Request : {tanggal_req}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan_detail }>No HP : {no_hp}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan_detail }>E-mail : {email}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan_detail }>Keterangan : {keterangan}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                <TextInput
                    style={{ height: 40, borderWidth: 1, padding: 10,width: WIDTH - 55 , color: '#000000'}}
                    onChangeText={(text)=>{
                      setremark(text)
                    }}
                    value={remark}
                    placeholder="Masukan Remark"
                    keyboardType='default'
                  />
                {/* </Item> */}
            </CardItem>
           
            <CardItem>
            <TouchableOpacity
                    style={{backgroundColor: 'green', width: WIDTH - 55, padding: 10}}
                    activeOpacity={0.5}
                    onPress={() => {
                      Alert.alert(
                        'CONFIRMATION',
                        'Are you sure ?',
                        [
                          {
                            text: 'OK',
                            onPress: () => {
                                Action_Approve();
                            }
                          },
                          {
                            text: 'CANCEL',
                          },
                        ],

                        {
                          cancelable: true
                        }
                      );
                    }}
                  >
                    <View>
                      <Text style={{color: 'white', fontWeight:'bold',alignSelf:'center'}}>Approve</Text>
                    </View>
                  </TouchableOpacity>
            </CardItem>

            <CardItem>
            <TouchableOpacity
                    style={{backgroundColor: 'red', width: WIDTH - 55, padding: 10}}
                    activeOpacity={0.5}
                    onPress={() => {
                      Alert.alert(
                        'CONFIRMATION',
                        'Are you sure ?',
                        [
                          {
                            text: 'OK',
                            onPress: () => {
                                Action_Reject();
                            }
                          },
                          {
                            text: 'CANCEL',
                          },
                        ],

                        {
                          cancelable: true
                        }
                      );
                    }}
                  >
                    <View>
                      <Text style={{color: 'white', fontWeight:'bold',alignSelf:'center'}}>Reject</Text>
                    </View>
                  </TouchableOpacity>
            </CardItem>

            

                </ScrollView>
     
        
            </View>
           
        );
  }