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
let [nama_karyawan_req, setnama_karyawan_req]                        = useState(route.params.nama_req);
let [no_req, setno_req]                          = useState(route.params.no_req);
let [nama_dept, setnama_dept]                                = useState(route.params.nama_dept);
let [nama_req, setnama_req]                        = useState(route.params.nama_req);
let [departemen_lengkap, setdepartemen_lengkap]    = useState(route.params.dept_lengkap);
let [no_telp_customer, setno_telp_customer]                              = useState(route.params.no_telp_customer);
let [nama_staff_pelapor, setnama_staff_pelapor]              = useState(route.params.nama_staff_pelapor);
let [id_req, setid_req]                            = useState(route.params.kode_karyawan_req);
let [tanggal_kejadian, settanggal_kejadian]                                = useState(route.params.tanggal_kejadian);
let [tanggal_req, settanggal_req]                  = useState(route.params.tanggal_req);
let [jam_kejadian, setjam_kejadian]          = useState(route.params.jam_kejadian);
let [no_polis, setno_polis]                    = useState(route.params.no_polis);
let [status, setstatus]                    = useState(route.params.status);
let [no_polisi, setno_polisi]                                = useState(route.params.no_polisi);
let [nama_customer, setnama_customer]                  = useState(route.params.nama_customer);
let [lokasi, setlokasi]          = useState(route.params.lokasi);
let [menerima_tips, setmenerima_tips]                    = useState(route.params.menerima_tips);
let [nominal_uang, setnominal_uang]                                = useState(route.params.nominal_uang);
let [dept_input_lengkap, setdept_input_lengkap]                  = useState(route.params.dept_lengkap_input);
let [kronologi, setkronologi]          = useState(route.params.kronologi);
let [url_foto, seturl_foto]                    = useState(route.params.url_foto);

    
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
        axios.post("url/prog-x/api/form_req/api_action.php", {
        key : 'yuu37BVH@9(VH#*nv',
        no_req : no_req,
        remark : remark,
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
        axios.post("url/prog-x/api/form_req/api_action.php", {
        key : 'yuu37BVH@9(VH#*nv',
        no_req : no_req,
        remark : remark,
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
            <Text style = { styles.header }>Detail Laporan Penolakan Tips</Text>
            {/* <Text style = { styles.header }>{this.state.nip}</Text> */}
            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan }>No Req : {no_req}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan }>Nama Staff Pelapor: {nama_staff_pelapor}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan }>Departemen/Cabang : {dept_input_lengkap}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>Tanggal Pelaporan : {tanggal_req}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>Tanggal Kejadian  : {tanggal_kejadian}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>No Polis : {no_polis}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>No Polisi : {no_polisi}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>Nama Customer : {nama_customer}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>No Telp/Hp : {no_telp_customer}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>Lokasi : {lokasi}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>Tips : {menerima_tips}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>Nominal Uang : {nominal_uang}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>Kronologi Singkat : {kronologi}</Text>
                {/* </Item> */}
            </CardItem>
            <CardItem>
                {/* <Item> */}
                    <Text style = { styles.tulisan }>Gambar:</Text>
                {/* </Item> */}
            </CardItem>

            <CardItem>
            {/* <Item> */}
            {url_foto == null ?  (
              <Text style = { styles.tulisan }>Foto tidak ditemukan</Text>
            ) :
            (
              <Image
              source={{
                  uri: url_foto,
                }}
              style={{marginTop: 20, width: WIDTH - 55, height: 300}}
            />
            )
            }
              {/* </Item> */}
            </CardItem>
           

            

                </ScrollView>
     
        
            </View>
           
        );
  }