/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react'
import { View, Image, Text, Dimensions, PermissionsAndroid, TextInput, TouchableOpacity, ActivityIndicator, ScrollView,Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Card, CardItem, Picker, Textarea, Body,Radio, List, Left, Right} from 'native-base';
import DatePicker from 'react-native-datepicker';
import styles from '../../css/CSS_Input_Data';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faHome, faPen, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import LookupModal from 'react-native-lookup-modal';
// import * as ImagePicker from "react-native-image-picker"
import RNFetchBlob from 'rn-fetch-blob';
import DeviceInfo from 'react-native-device-info';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation, { watchPosition } from 'react-native-geolocation-service';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContext } from 'react-navigation';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
// var arr=[]

const options = {
  title: 'Photo',
  takePhotoButtonTitle: 'Ambil Foto',
  // chooseFromLibraryButtonTitle: 'Choose photo from Gallery',
  chooseFromLibraryButtonTitle: '',
  maxWidth: 500,
  // maxHeight: 500,
};

const {width: WIDTH} = Dimensions.get('window');



export default  main_program=({route, navigation})=>{

//inisialisasi awal
let [jam_awal, setjam_awal]                       = useState("");
let [jam_akhir, setjam_akhir]                     = useState("");
let [tinta, settinta]                     = useState("");
let [keterangan, setketerangan] = useState("");
// let [jam_awal, setjam_awal]                       = useState("");
let [pickdate, setpickdate]                       = ""
let [date, setdate]                               = useState("");
let selectedItem= "Silahkan Pilih";
let [pilih_aktivitas, setpilih_aktivitas]         = useState("");
let [avatarSource, setavatarSource]               = useState("");
let [pic, setpic]                                 = useState("");
let [jumlah, setjumlah]             = useState("");
let [jam_awal_minute, setjam_awal_minute]         = useState("");
let [jam_akhir_hour, setjam_akhir_hour]           = useState("");
let [jam_akhir_minute, setjam_akhir_minute]       = useState("");
let [kode_tinta, setkode_tinta]                       = useState("");
let [id_str, setid_str]                           = useState("");
let [jam_mulai, setjam_mulai]                     = useState("");
let [jam_selesai, setjam_selesai]                 = useState("");

const [app_version, setapp_version]               = useState("2.2");
  //VARIABEL DEVICE INFO    
  const [phone_brand, setphone_brand]             = useState("");
  const [device_id, setdevice_id]                 = useState("");
  const [unique_id, setunique_id]                 = useState("");
  const [device, setdevice]                       = useState("");
  const [network_operator, setnetwork_operator]   = useState("");
  const [ip_address, setip_address]               = useState("");
  const [mac_address, setmac_address]             = useState("");
  const [use_emulator, setuse_emulator]           = useState("");
  const [mobile_os, setmobile_os]                 = useState("");
  //GEO LOCATION
  const [geo_lati, setgeo_lati] = useState("");
  const [geo_longi, setgeo_longi] = useState("");
  const [geo_alt, setgeo_alt] = useState("");
  const [geo_accuracy, setgeo_accuracy] = useState("");
  const [formatted_address, setformatted_address] = useState("");


  let [json_list_tinta, setjson_list_tinta]                               = useState("");
  let [id_str_pad, setid_str_pad]                               = useState("");
  // let [json_cate, setjson_cate]                               = useState("");
  // let [json_model, setjson_model]                             = useState("");
  // let [json_type_report, setjson_type_report]                 = useState("");
  // let [json_jenis_pertanggungan, setjson_jenis_pertanggungan] = useState("");

 useEffect(()=>{
  get_cur_date();
    //  get_geo();
    //  get_device_info();
     api_get_list_tinta();
  },[])


  //  Coba_Alert = (dept) => 
  //  {
  //   alert(dept);
  //  }
//ngambil dari store
  const dispatch=useDispatch();
  const full_name_karyawan = useSelector((state) => state.data_login.full_name_karyawan);
  const kode_karyawan = useSelector((state) => state.data_login.kode_karyawan);
  const nama_karyawan = useSelector((state) => state.data_login.nama_karyawan);
  // const dept = useSelector((state) => state.data_login.full_name_karyawan);
  let dept = useSelector((state) => state.data_login.dept);
  let role = dept.substring(0, 3);
  // const grant_user = useSelector((state) => state.data_login.grant)
  // useSelector((state)=>console.log(state))

    


   get_geo = async () => {
     console.log("get geo");
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          // this.setState({
          //   geo_lati: position.coords.latitude,
          //   geo_longi: position.coords.longitude,
          //   geo_alt: position.coords.altitude,
          //   geo_accuracy: position.coords.accuracy,
          // })
          setgeo_lati(position.coords.latitude)
          setgeo_longi(position.coords.longitude)
          setgeo_alt(position.coords.altitude)
          setgeo_accuracy(position.coords.accuracy)
        },
        // (error) => console.log(error.message), { 
        //   enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 ,showLocationDialog:true
        // }
      );
      // await get_geocoder();
    }
    else {
      
    }
  }

  get_cur_date = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setdate(
      date + '-' + month + '-' + year 
      
    );
  }
  
  get_device_info = () => {
    console.log("get device")
    // this.setState({
    //   phone_brand: DeviceInfo.getBrand(),
    //   device_id: DeviceInfo.getDeviceId(),
    //   unique_id: DeviceInfo.getUniqueId(),
    // })
    setphone_brand(DeviceInfo.getBrand());
    setdevice_id(DeviceInfo.getDeviceId());
    setunique_id(DeviceInfo.getUniqueId());
    setmobile_os(DeviceInfo.getSystemVersion());

    DeviceInfo.getDevice().then(device => {
      // "walleye"
      // this.setState({
      //   device: device
      // })
      setdevice(device)
    });

    DeviceInfo.getCarrier().then(carrier => {
      // console.log(carrier)
      // this.setState({
      //   network_operator: carrier
      // })
      setnetwork_operator(carrier);
    });

    // DeviceInfo.getIpAddress().then(ip => {
    //   // "92.168.32.64"
    //   this.setState({
    //     ip_address: ip
    //   })
    // });

    // public_ip = () => {
    //   publicIP()
    //     .then(ip => {
    //       // console.log(ip);
    //       // '47.122.71.234'
    //       // this.setState({
    //       //   ip_address: ip
    //       // })   
    //       setip_address(ip)
    //     })
    // }
    // public_ip();

    DeviceInfo.getMacAddress().then(mac => {
      // "E5:12:D8:E5:69:97"
      // console.log(mac)

      // this.setState({
      //   mac_address: mac
      // })
      setmac_address(mac);
    });

    DeviceInfo.isEmulator().then(isEmulator => {
      // false
      // console.log(isEmulator)
      // this.setState({
      //   use_emulator: isEmulator ? "yes" : "no"
      // })
      setuse_emulator(isEmulator ? "yes" : "no");
    });
  }



  
  
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



  //api get job
   api_get_list_tinta= async()=> {
     console.log("jalan");
    axios.post("url/prog-x/api/form_req/api_list_tinta.php", {
      key : '12NJFNjnvnj*$&@*(*$&'
    })
    .then((responseJson)=>{
      console.log(responseJson.data);
      if(responseJson.data.Status==1) {
        setjson_list_tinta(responseJson.data.data);
        console.log("ok");
        console.log(json_list_tinta.data)
      }
    })
  }




  


  //   LogOut = () =>
  // {
  //   // Alert.alert(nip)
  //   // this.Func_Logout();
  //   navigation.navigate("Menu_Login");
  // }
  

    

      SubmitValidasi= () => 
      {

        // api_insert_data();

        //Validasi Semua yang diinput

        let jumlah = jumlah;
        let kode_tinta = kode_tinta;

       

        console.log("Validasi jalan")
        

        //Validasi input
        if(jumlah == '' || kode_tinta == '')
        {
          alert("Ada data yang belum diisi");
        }
        else
        {

          // Validasi jika tanggal belum diinput
         
            
                //  saveData();
                api_insert_data();
  
              
            }
        
      }



// saveData =()=> {
//   console.log("Save jalan");
//   console.log(kode_karyawan);
//   let jam_mulai_hour1      = jam_awal_hour ;
//   let jam_mulai_minute1    =  jam_awal_minute;
//   let jam_selesai_hour1    = jam_akhir_hour ;
//   let jam_selesai_minute1  =  jam_akhir_minute;
//   let jam_mulai1           = jam_mulai_hour1 + ':' + jam_mulai_minute1;
//   let jam_selesai1         = jam_selesai_hour1 + ':' + jam_selesai_minute1;
//     axios.post('url/prog-x/api/marketing_activity_v2/api_data_insert.php', {
//         kode_karyawan             :kode_karyawan,
//         input_deskripsi_aktivitas : deskripsi_aktivitas,
//         input_jam_mulai           : jam_mulai1,
//         input_jam_selesai         : jam_selesai1,
//         input_aktivitas           : kode_job,
//         input_nama_karyawan       : nama_karyawan,
//         input_tgl_aktivitas       : date,
//         input_dept                : dept,
//         long                      : geo_longi,
//         lat                       : geo_lati,
//         geo_accuracy              : geo_accuracy,
//         geo_alt                   : geo_alt,
//         unique_id                 : unique_id,
//         mac_address               : mac_address,
//         device_id                 : device_id,
//         device                    : device,
//         tipe                      : network_operator,
//         emulator                  : use_emulator,
//         phone_brand               : phone_brand,
//         os                        : mobile_os,
//         versi_apps                : app_version
//       })
//       .then(function (responseJson) {
//          console.log(responseJson.data);
//         if(responseJson.data.Status== '1') {
//           // Alert.alert("SUCCESS", "Sukses In")
//           // = id_str_pad;
//           setid_str(responseJson.data.id_str_pad);
//           // responseJson.data.full_name_karyawan = full_name_karyawan;
//           // responseJson.data.nama_karyawan = nama_karyawan;
//           // responseJson.data.kode_karyawan = kode_karyawan;
//           // dispatch(
//           //   {
//           //     type: "SAVE_LOGIN_INFO",
//           //     // payload: {
//           //     //   nama_user: in_user,
//           //     //   app_version: app_version
//           //     // }
//           //     payload: responseJson.data
//           //   }
//           // )
//          console.log(id_str);
//          api_insert_gambar();
//           // navigation.replace("Menu_Awal");
//         }
//         else {
//           Alert.alert("ERROR LOGIN",responseJson.data.Message)
//         }
//       })
 
//     console.log("Insert Selesai");
//   }
      


//insert data + gambar ke db
  api_insert_data = () => {
    // get_geo();
        // console.log("gambar jalan");
    axios.post("url/prog-x/api/form_req/api_insert_data.php", {
      key : 'vbdh&#7728HFG82(@(',
      kode_karyawan : kode_karyawan,
      dept : dept,
      kode_tinta : kode_tinta,
      tanggal_req : date,
      jumlah_tinta : jumlah,
      deskripsi : keterangan
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


//     saveData = () =>
//     {

//       // let brand = DeviceInfo.getBrand();
//       // let os = DeviceInfo.getSystemVersion();
//       // let jam_mulai           = String(jam_awal_hour) + ':' + String(jam_awal_minute);
//       // let jam_selesai         = String(jam_akhir_hour) + ':' + String(jam_akhir_minute);
  
//         // alert("nama "+nama_karyawan)
//         this.setState({ loading: true, disabled: true }, () =>
//         {
//             fetch('url/prog-x/api/marketing_activity/api_data_insert.php',
//             {
//                 method: 'POST',
//                 headers:
//                 {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(
//                 {
                  
//                 }),
//             }).then((response) => response.json()).then((responseJson) =>
//             {
//               // this.uploadPic(responseJson);
//                 console.log("Long :" + long) ;
//                 console.log("lat :" + lat) ;
//                 console.log(responseJson);

//             }).catch((error) =>
//             {
//                 console.error(error);
//             });
//         });
//         this.props.navigation.navigate('HalamanAwal',{
//           nama_karyawan : nama_karyawan,
//           dept: dept,
//           full_name:full_name,
// kode_karyawan:kode_karyawan,
//       });
//     }

  



    // let myUsers = json_job.map((myValue,myIndex)=>{
    //     return (
    //     <Picker.Item label={myValue.job_desc} value={myValue.kode_job} key={myIndex}/>
    //     )
    //     });
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
              

            <ScrollView>
            {/* <Text style={styles.textHi}>HI {nama_karyawan}</Text>
            <Text style={styles.textHi}>Dept {dept}</Text> */}
            <Text style = { styles.header }>Permintaan Tinta</Text>
            {/* <Text style = { styles.header }>{nip}</Text> */}
           <CardItem bordered="true">
              <View style={styles.container2}>
                <Item floatingLabel style={{padding: 5, flex:10}}>
                  <Label>Tanggal (Format : DD-MM-YYYY) </Label>
                  <Input value={date}
                  editable = {false}/>
                </Item>
              </View>
            </CardItem>

           

            

            <CardItem bordered="true">
              {/* <Body>
                <Label style={{marginBottom:5, fontSize:20}}>Agama :</Label> */}
                <Item>
              <LookupModal
                        data={json_list_tinta}
                        value={tinta}
                        itemTextStyle={{color: '#000000'}}
                        onSelect={async(item) => {
                          await setkode_tinta(item.gt_code)
                          await settinta(item.desc1)
                        }}
                        displayKey={"desc1"}
                        selectButtonStyle={{ width: "90%", borderWidth: 1, marginLeft: 8}}
                        placeholder={"Silahkan Pilih Tinta"}
                        selectText={tinta}
                      />
              </Item>
              {/* </Body> */}
            </CardItem>


            <CardItem bordered="true">
              {/* <Body>
                <Label style={{marginBottom:5, fontSize:20}}>Agama :</Label> */}
              
              {/* </Body> */}
              <Label style={{marginBottom:5, fontSize:15}}>Jumlah</Label>


              <TextInput
                    style={{ width: 50 , borderRadius: 1, borderColor: 'black'}}
                    
                    onChangeText={(text)=>{
                      setjumlah(text);
                      
                    }}
                    value={jumlah}
                    
                    keyboardType="numeric"
                  />
            </CardItem>


            <CardItem bordered="true">
              <Item floatingLabel style={{padding: 5}}>
              <Label>Keterangan </Label>
              <Input
                onChangeText={(text)=>{
                  setketerangan(text);
                }}
              />
              </Item>
            </CardItem>

            


             <TouchableOpacity
                // disabled = { this.state.disabled }
                activeOpacity = { 0.8 }
                style = { styles.BtnInsert }
                onPress = { this.SubmitValidasi }>
                  {/* // onPress = { this.Cek_Gambar }> */}
                <Text style = { styles.btnText }>Simpan</Text>
            </TouchableOpacity>


            </ScrollView>

            </View>
      
           
        );
  }