/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react'
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen,faLock,faAirFreshener,faAnchor,faTrash, faHome, faBook, faUser, faUsers, faEye } from '@fortawesome/free-solid-svg-icons';
// import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import {Container, Header, Content, Form, Item, Input, Label, Icon, Card, CardItem, Picker, Textarea, Body,Radio, List, Left, Right} from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput
} from 'react-native';
import bgImage from '../../img/pastel3.jpeg';
import styles from '../../css/CSS_HasilSupervisor';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { NavigationContext } from 'react-navigation';
import { Provider, useDispatch, useSelector } from 'react-redux';
import LookupModal from 'react-native-lookup-modal';



export default  main_program=({route, navigation})=>{


  let [loading_incoming_data, setloading_incoming_data]=useState(false);
  let [json_view_data, setjson_view_data] = useState([]);
  // let [tanggal_mulai, settanggal_mulai]                       = useState(route.params.tanggal_mulai);
  // let [tanggal_selesai, settanggal_selesai]                   = useState(route.params.tanggal_selesai);
  // let [pil_row_id, setpil_row_id]                     = useState(route.params.pil_row_id);
  let [remark, setremark] = useState("");
  let [json_form, setjson_form]                               = useState("");
  let [pil_form, setpil_form]         = useState("");
  let [kode_form, setkode_form]                       = useState("");
  
  


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

    useEffect(()=>
    {
      api_get_form();
    },[])


  api_get_form= async()=> {
    console.log("jalan");
   axios.post("url/prog-x/api/form_req/api_list_form_baru.php", {
     key : '123nbhhnvn@**@*9nhvjjjn'
   })
   .then((responseJson)=>{
     if(responseJson.data.Status==1) {
       setjson_form(responseJson.data.data);
     }
   })
 }

  get_data =()=> {
    try {
      axios.post('url/prog-x/api/form_req/api_list_awaiting_approval_mks_v2.php', {
        kode_karyawan:kode_karyawan,
        key : '737dHFhbvHS@Y@!^#!',
        tipe_form : kode_form
        
      })
      .then(function (responseJson) {
         console.log(responseJson.data.data);
        if(responseJson.data.Status=='1') {
          setjson_view_data(responseJson.data.data);
          
        }
        else if(responseJson.data.Status == '2')
        {
          Alert.alert("Warning",responseJson.data.message)
        }
        else {
          Alert.alert("Data Kosong",responseJson.data.message)
        }
      })
    }
 
    catch {
      // alert_restart_aplikasi();
    }
  }


  validasi = () => 
  {
    let kode = kode_form
    // Tinta
    if (kode == '')
    {
      alert("Silahkan Isi Tipe Form")
    }
    else 
    {
      get_data();
    }
  }


  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#919191',
          marginBottom: 10,
        }}
      />
    );
  }

  // Detail_Req = () => {
   
   
     
  // }

//  
  
    renderItem = ({ item }) => {
      return (
        <View>
          <TouchableOpacity
          onPress={ async() => {
            // console.log("aaaa");
            // navigation.replace("Detail_Req", item)

            if(kode_form == 'KNAMA')
            {
              await setjson_form("");
              await setkode_form("");
              await setpil_form("");
              await setjson_view_data("");
              await navigation.replace("Detail_Req", item)
            }
            if(kode_form == 'STATION')
            {
              await setjson_form("");
              await setkode_form("");
              await setpil_form("");
              await setjson_view_data("");
              await navigation.replace("DetailReqStation", item)

            }
            if(kode_form == 'GRAB')
            {
              await setjson_form("");
              await setkode_form("");
              await setpil_form("");
              await setjson_view_data("");
              await navigation.replace("DetailReqGrab", item)

            }

            if(kode_form == 'TIPS')
            {
              await setjson_form("");
              await setkode_form("");
              await setpil_form("");
              await setjson_view_data("");
              await navigation.replace("DetailReqTips", item)

            }

            if(kode_form == 'REKLAME')
            {
              await setjson_form("");
              await setkode_form("");
              await setpil_form("");
              await setjson_view_data("");
              await navigation.replace("DetailReqPajak", item)

            }
      
          }}>
            <View>
              <Card style={{ borderRadius: 5 }}>
                <CardItem style={{borderRadius: 5}}>
                  <Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      
      
                      <View style={{ flex: 3}}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 ,color:'#000000' }}>No Req: {item.no_req}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 ,color:'#000000' }}>Tanggal Request: {item.tanggal_req}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 ,color:'#000000' }}>Direquest Oleh: {item.nama_req}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 ,color:'#000000' }}>Departemen: {item.dept_lengkap}</Text>
                        
                      </View>
                    </View>
                  </Content>
                </CardItem>
              </Card>
              </View>
          </TouchableOpacity>
        </View>
      )
    }
  

  return (
        // Moment.locale('id');
        // var dt = item.date_create;
        
      <View style={styles.containerDataUser}>
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
               <View style={{ justifyContent: 'center',alignItems : 'center'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 ,color:'#000000' }}>Incoming Request </Text>
              </View>
              <View>
                <Text style = {{fontSize: 15, color:'#000000'} }>Pilih Form</Text>
              <CardItem bordered="true">
              {/* <Body>
                <Label style={{marginBottom:5, fontSize:20}}>Agama :</Label> */}
                <Item>
              <LookupModal
                        data={json_form}
                        value={pil_form}
                        itemTextStyle={{color: '#000000'}}
                        onSelect={async(item) => {
                          await setkode_form(item.req_form)
                          await setpil_form(item.nama_form)
                        }}
                        displayKey={"nama_form"}
                        selectButtonStyle={{ width: "90%", borderWidth: 1, marginLeft: 8}}
                        placeholder={"Silahkan Pilih Form"}
                        selectText={pil_form}
                      />
              </Item>
              {/* </Body> */}
              </CardItem>


              <TouchableOpacity 
                // disabled = { this.state.disabled } 
                activeOpacity = { 0.8 } 
                style = { styles.BtnCari } 
                onPress = { ()=>{validasi();}}>
                <Text style = { styles.btnText }>Pilih</Text>
              </TouchableOpacity>
                
              </View>
    {
              loading_incoming_data==false?
              (
                <FlatList
                  data={json_view_data}
                  ItemSeparatorComponent = {FlatListItemSeparator}
                  renderItem={renderItem}
                />
              )
              :
              (
                <ActivityIndicator
                  size="large" color="blue"
                />
              )
            }

     
        
            </View>
    
    

    ); // end
} // end export

