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
import CheckBox from '@react-native-community/checkbox';
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

  let url_api = 'https://www.araksa.com';


  // url_api+'/api_get_data'

//inisialisasi awal
let [isi_nama, setisi_nama]                       = useState(route.params.isi_nama);
let [data1, setdata1]                     = useState("");
let [keterangan, setketerangan] = useState("");
let [kode_gt, setkode_gt]                       = useState("");
let [company, setcompany]                       = useState("PT. Asuransi Raksa Pratikara");
let [date, setdate]                               = useState("");
let selectedItem= "Silahkan Pilih";

let [jumlah, setjumlah]             = useState("");
let [use_gelar_depan, setuse_gelar_depan]             = useState(false);
let [use_gelar_belakang, setuse_gelar_belakang]             = useState(false);


const [app_version, setapp_version]               = useState("2.6");
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




  let [json_list_data, setjson_list_data]                               = useState("");
  let [id_str_pad, setid_str_pad]                               = useState("");
  // let [json_cate, setjson_cate]                               = useState("");
  // let [json_model, setjson_model]                             = useState("");
  // let [json_type_report, setjson_type_report]                 = useState("");
  // let [json_jenis_pertanggungan, setjson_jenis_pertanggungan] = useState("");

 useEffect(()=>{
  get_cur_date();
    //  get_geo();
    //  get_device_info();
     api_get_list();
  },[])


  //  Coba_Alert = (dept) => 
  //  {
  //   alert(dept);
  //  }
//ngambil dari store
  const dispatch              = useDispatch();
  const full_name_karyawan    = useSelector((state) => state.data_login.full_name_karyawan);
  const kode_karyawan         = useSelector((state) => state.data_login.kode_karyawan);
  const nama_karyawan         = useSelector((state) => state.data_login.nama_karyawan);
  const hp                    = useSelector((state) => state.data_login.HP);
  const WA                    = useSelector((state) => state.data_login.WA);
  const department_kartu_nama = useSelector((state) => state.data_login.department_kartu_nama);
  const department_name       = useSelector((state) => state.data_login.department_name);
  const lokasi_kerja          = useSelector((state) => state.data_login.lokasi_kerja);
  const personal_email        = useSelector((state) => state.data_login.personal_email);
  const posisi                = useSelector((state) => state.data_login.posisi);
  const posisi_kartu_nama     = useSelector((state) => state.data_login.posisi_kartu_nama);
  const private_email         = useSelector((state) => state.data_login.private_email);
  const gelar_depan           = useSelector((state) => state.data_login.gelar_depan);
  const gelar_belakang        = useSelector((state) => state.data_login.gelar_belakang);
  // const dept = useSelector((state) => state.data_login.full_name_karyawan);
  let dept                    = useSelector((state) => state.data_login.dept);
  let role                    = dept.substring(0, 3);
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
   api_get_list= async()=> {
     console.log("jalan");
    axios.post(url_api+"/prog-x/api/form_req/api_list_posisi.php", {
      key : '737hBCHS*#*jvj01'
    })
    .then((responseJson)=>{
      console.log(responseJson.data);
      if(responseJson.data.Status==1) {
        setjson_list_data(responseJson.data.data);
        console.log("ok");
        // console.log(json_list_data.data)
      }
    })
  }




  


  //   LogOut = () =>
  // {
  //   // Alert.alert(nip)
  //   // this.Func_Logout();
  //   navigation.navigate("Menu_Login");
  // }

  EditData = () =>
  {
    alert("Silahkan Hubungi HRD untuk melakukan perubahan data")
  }
  

    

      SubmitValidasi= () => 
      {
        Alert.alert(
          'SAVE CONFIRMATION',
          'Apakah Anda Yakin ?',
          [
            {
              text: 'OK',
              onPress: () => {
                api_insert_data();
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
        // api_insert_data();

       
        
      }



      


//insert data 
  api_insert_data = () => {
    // get_geo();
        // console.log("gambar jalan");
    axios.post("url/prog-x/api/form_req/api_insert_kartu_nama.php", {
      key : 'hvnjf9*3884IFJjf8@@',
      kode_karyawan : kode_karyawan,
      dept : dept,
      dept_lengkap : department_name,
      jumlah : jumlah,
      deskripsi : keterangan,
      full_name_karyawan : full_name_karyawan,
      posisi_kartu_nama : posisi_kartu_nama,
      posisi : posisi,
      personal_email : personal_email,
      private_email : private_email,
      hp : hp,
      wa : WA,
      gelar_depan : gelar_depan,
      gelar_belakang : gelar_belakang
    })
    .then((responseJson) => {
       console.log(responseJson);
      if (responseJson.data.Status == '1') {
        Alert.alert("SUCCESS", "Data Berhasil Diinput")
        navigation.replace("Menu_Req");
        console.log(responseJson.data);
      }
      else {
        Alert.alert("FAILED", "Gagal")
        console.log(responseJson.data);
      }
    })
    .catch(function (error) {
      Alert.alert("ERROR","Please Try again...")
      console.log(responseJson.data);
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
            <Text style = { styles.header }>Kartu Nama</Text>
            {/* <Text style = { styles.header }>{nip}</Text> */}
           

           

            <CardItem bordered="true">
              <Text style={{color: 'black'}}>Nama : {full_name_karyawan}</Text>
            </CardItem>

            <CardItem bordered="true">
              <Text style={{color: 'black'}}>Department : {department_name}</Text>
            </CardItem>

            <CardItem bordered="true">
              <Text style={{color: 'black'}}>Posisi : {posisi}</Text>
            </CardItem>

            <CardItem bordered="true">
                <Text style={{color: 'black'}}>Email Pribadi : {private_email}</Text>  
            </CardItem>

            <CardItem bordered="true">
            <Text style={{color: 'black'}}>Email Kantor : {personal_email}</Text>
            </CardItem>

            <CardItem bordered="true">
              <Text style={{color: 'black'}}>Nomor Telpon : {hp}</Text>
            </CardItem>

            <CardItem bordered="true">
              <Text style={{color: 'black'}}>WhatsApp : {WA}</Text>
            </CardItem>


            <CardItem bordered="true">
              <Text style={{color: 'black'}}>Posisi di kartu nama : {posisi_kartu_nama}</Text>
            </CardItem>

            <CardItem bordered="true">
                <View>
                  <Label style={{marginBottom:5, fontSize:15, color:'#000000'}}>Menggunakan Gelar Depan? </Label>
                  <View>
                    <CheckBox
                      style={{ borderWidth: 5 }}
                      disabled={false}
                      value={use_gelar_depan}
                      onValueChange={() => setuse_gelar_depan(!use_gelar_depan)}
                      leftText={"Gelar Depan"}
                    />
                  </View> 
                </View>
                </CardItem>
                {use_gelar_depan == true ?(
                    <CardItem bordered="true">
                    <Text style={{color: 'black'}}>Gelar Depan : {gelar_depan}</Text>
                  </CardItem>
                ):
                (
                  <CardItem bordered="true">
                  <Text style={{color: 'black'}}>Gelar Depan : - </Text>
                </CardItem>

                )

                }

                
                <CardItem bordered="true">
                <View>
                  <Label style={{marginBottom:5, fontSize:15, color:'#000000'}}>Menggunakan Gelar Belakang? </Label>
                  <View>
                    <CheckBox
                      style={{ borderWidth: 5 }}
                      disabled={false}
                      value={use_gelar_belakang}
                      onValueChange={() => setuse_gelar_belakang(!use_gelar_belakang)}
                      leftText={"Gelar Belakang"}
                    />
                  </View> 
                </View>
                </CardItem>


                {use_gelar_belakang == true ?(
                    <CardItem bordered="true">
                    <Text style={{color: 'black'}}>Gelar Belakang : {gelar_belakang}</Text>
                  </CardItem>
                ):
                (
                  <CardItem bordered="true">
                  <Text style={{color: 'black'}}>Gelar Depan : - </Text>
                </CardItem>

                )

                }



            <CardItem bordered="true">
              {/* <Body>
                <Label style={{marginBottom:5, fontSize:20}}>Agama :</Label> */}
              
              {/* </Body> */}
              <Label style={{marginBottom:5, fontSize:15, color:'black'}}>Jumlah :</Label>


              <TextInput
                    style={{ width: 50 , borderBottomWidth: 1, borderBottomColor: 'black',color: '#000000'}}
                    
                    onChangeText={(text)=>{
                      setjumlah(text);
                      
                    }}
                    value={jumlah}
                    
                    keyboardType="numeric"
                  />
                  <Label style={{marginBottom:5, fontSize:15, color:'black'}}> Box</Label>
            </CardItem>


            <CardItem bordered="true">
              <Item floatingLabel style={{padding: 5}}>
              <Label style={{color: 'black'}}>Keterangan </Label>
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
                style = { styles.BtnSimpan }
                onPress = { this.SubmitValidasi }>
                  {/* // onPress = { this.Cek_Gambar }> */}
                <Text style = { styles.btnText }>Simpan</Text>
            </TouchableOpacity>


            <TouchableOpacity
                // disabled = { this.state.disabled }
                activeOpacity = { 0.8 }
                style = { styles.BtnEdit}
                onPress = { this.EditData }>
                  {/* // onPress = { this.Cek_Gambar }> */}
                <Text style = { styles.btnText }>Edit</Text>
            </TouchableOpacity>


            </ScrollView>

            </View>
      
           
        );
  }