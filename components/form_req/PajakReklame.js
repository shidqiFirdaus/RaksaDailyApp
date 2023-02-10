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

//inisialisasi awal
// let [isi_nama, setisi_nama]                       = useState(route.params.isi_nama);
let [data1, setdata1]                     = useState("");
let [keterangan, setketerangan] = useState("");
let [kode_gt, setkode_gt]                       = useState("");
let [company, setcompany]                       = useState("PT. Asuransi Raksa Pratikara");
let [date, setdate]                               = useState("");
let [email, setemail]                               = useState("");
let [hp, sethp]                               = useState("");
let selectedItem= "Silahkan Pilih";

let [picktanggal_kejadian, setpicktanggal_kejadian]                       = useState("");
let [tanggal_kejadian, settanggal_kejadian]                               = useState("");

let [jumlah, setjumlah]             = useState("");
const [penerimaan_tips, setpenerimaan_tips] = useState(false);
let [pickawal_pajak, setpickawal_pajak]                       = ""
let [awal_pajak, setawal_pajak]                               = useState("");
let [pickakhir_pajak, setpickakhir_pajak]                       = ""
let [akhir_pajak, setakhir_pajak]                               = useState("");
let [no_skpd, setno_skpd]                               = useState("");
let [isi_teks, setisi_teks]                               = useState("");
let [luas_reklame, setluas_reklame]                               = useState("");
let [nsr, setnsr]                               = useState("");


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
  let [avatarSource, setavatarSource]               = useState("");


  let [json_list_data, setjson_list_data]                               = useState("");
  let [id_str_pad, setid_str_pad]                               = useState("");
  let [nama_dept, setnama_dept]                     = useState("Silahkan Pilih Departemen");
  let [kode_dept, setkode_dept]                     = useState("");
  let [json_dept, setjson_dept]                               = useState("");
  let [json_bulan, setjson_bulan]                               = useState("");
  let [nama_bulan, setnama_bulan]                     = useState("Silahkan Pilih Bulan");
  let [kode_bulan, setkode_bulan]                     = useState("");
  // let [json_cate, setjson_cate]                               = useState("");
  // let [json_model, setjson_model]                             = useState("");
  // let [json_type_report, setjson_type_report]                 = useState("");
  // let [json_jenis_pertanggungan, setjson_jenis_pertanggungan] = useState("");

 useEffect(()=>{
  get_cur_date();
    //  get_geo();
     api_get_bulan();
    api_get_dept();
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
  const nik                    = useSelector((state) => state.data_login.nik);
  const department_name       = useSelector((state) => state.data_login.department_name);
  // const dept = useSelector((state) => state.data_login.full_name_karyawan);
  let dept                    = useSelector((state) => state.data_login.dept);
  let role                    = dept.substring(0, 3);
  // const grant_user = useSelector((state) => state.data_login.grant)
  // useSelector((state)=>console.log(state))

  api_get_dept= async()=> {
    console.log("jalan 1");
   axios.post("url/prog-x/api/form_req/api_list_dept.php", {
     key : '123nbhhnvn@**@*9nhvjjjn',
   })
   .then((responseJson)=>{
    console.log(responseJson)
     if(responseJson.data.Status==1) {
       setjson_dept(responseJson.data.data);
     }
   })
 }

 api_get_bulan= async()=> {
  console.log("jalan 1");
 axios.post("url/prog-x/api/form_req/api_list_bulan.php", {
   key : '123nbhhnvn@**@*9nhvjjjn',
 })
 .then((responseJson)=>{
  console.log(responseJson)
   if(responseJson.data.Status==1) {
     setjson_bulan(responseJson.data.data);
   }
 })
}


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
    let hari = new Date().getDate(); //Current Date
    let hari_s = String(hari);
    
    console.log('panjang hari:'+hari_s.length)
    if(hari_s.length == 1)
    {
        hari = '0'+hari;
    }
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let sec = new Date().getSeconds(); //Current Seconds
    let tanggal = hari + '-' + month + '-' + year ;
    setdate(tanggal);
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
                // alert("Fitur Masih dikembangkan")
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
  api_insert_data = () => 
  {
    // get_geo();
        // console.log("gambar jalan");
    axios.post("url/prog-x/api/form_req/api_insert_pajak.php", {
      key : 'hvnjf9*3884IFJjf8@@',
      kode_karyawan : kode_karyawan,
      kode_dept_input : kode_dept,
      dept_input_lengkap : nama_dept,
      periode_awal : awal_pajak,
      periode_akhir : akhir_pajak,
      keterangan : keterangan,
      nama_req : full_name_karyawan,
      no_skpd : no_skpd,
      isi_teks : isi_teks,
      luas_reklame : luas_reklame,
      nsr:nsr,
      dept: dept,
      bulan: kode_bulan
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
            <Text style = { styles.header }>Pajak Reklame</Text>
            {/* <Text style = { styles.header }>{nip}</Text> */}
           
            <CardItem bordered="true">
              <Text style={{color: 'black'}}>Tanggal : {date}</Text>
            </CardItem>

            <CardItem bordered="true">
                <Text style={{color: 'black'}}>User : {nama_karyawan}</Text>
            </CardItem>


            <CardItem bordered="true">
                <Text style={{color: 'black'}}>Nama Karyawan : {full_name_karyawan}</Text>
            </CardItem>

            <CardItem bordered="true">
            <Label style={{ fontSize:1, color: '#000000'}}>Bulan :</Label>
            </CardItem>

            <CardItem bordered="true"> 
                <Item>
              <LookupModal
                        data={json_bulan}
                        value={nama_bulan}
                        itemTextStyle={{color: '#000000'}}
                        onSelect={async(item) => {
                          await setkode_bulan(item.kode_bulan);
                          await setnama_bulan(item.nama_bulan);
                        }}
                        displayKey={"nama_bulan"}
                        selectButtonStyle={{ width: "90%", borderWidth: 1, marginLeft: 8}}
                        placeholder={"Silahkan Pilih Bulan"}
                        selectText={nama_bulan}
                      />
              </Item>
            </CardItem>

            <CardItem bordered="true">
              <View style={styles.container2}>
                <Item floatingLabel style={{padding: 5, flex:10}}>
                  <Label>Periode Awal Pajak  </Label>
                  <Input value={awal_pajak}
                  editable = {false}/>
                </Item>
                <DatePicker
                  style={{flex: 1}}
                  date={awal_pajak}
                  mode="date"
                  //placeholder="select date"
                  format="DD-MM-YYYY"
                //   minDate={new Date(Date.now())}
                //   maxDate={new Date(Date.now() + (168 * 3600 * 1000))}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  hideText="true"
                  //disabled='false'
                  customStyles={{
                    dateIcon: {
                      position: 'relative',
                      left: 0,
                      top: 0,
                      marginLeft: 0,
                    },
                  }}
                  onDateChange={(date) => {
                   setawal_pajak(date);
                   setpickawal_pajak(date);
                  }}
                />
              </View>
            </CardItem>


            <CardItem bordered="true">
              <View style={styles.container2}>
                <Item floatingLabel style={{padding: 5, flex:10}}>
                  <Label>Periode Akhir Pajak  </Label>
                  <Input value={akhir_pajak}
                  editable = {false}/>
                </Item>
                <DatePicker
                  style={{flex: 1}}
                  date={akhir_pajak}
                  mode="date"
                  //placeholder="select date"
                  format="DD-MM-YYYY"
                //   minDate={new Date(Date.now())}
                //   maxDate={new Date(Date.now() + (168 * 3600 * 1000))}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  hideText="true"
                  //disabled='false'
                  customStyles={{
                    dateIcon: {
                      position: 'relative',
                      left: 0,
                      top: 0,
                      marginLeft: 0,
                    },
                  }}
                  onDateChange={(date) => {
                   setakhir_pajak(date);
                   setpickakhir_pajak(date);
                  }}
                />
              </View>
            </CardItem>

            <CardItem bordered="true">
            <Label style={{ fontSize:1, color: '#000000'}}>Departemen :</Label>
            </CardItem>

            <CardItem bordered="true"> 
                <Item>
              <LookupModal
                        data={json_dept}
                        value={nama_dept}
                        itemTextStyle={{color: '#000000'}}
                        onSelect={async(item) => {
                          await setkode_dept(item.kode_dept);
                          await setnama_dept(item.nama_dept);
                        }}
                        displayKey={"nama_dept"}
                        selectButtonStyle={{ width: "90%", borderWidth: 1, marginLeft: 8}}
                        placeholder={"Silahkan Pilih Departemen"}
                        selectText={nama_dept}
                      />
              </Item>
            </CardItem>
           


            <CardItem bordered="true">
                <Label style={{marginBottom:5, fontSize:15,color:'#000000'}}>No SKPD:</Label>
                <TextInput
                        style={{ width:  WIDTH - 100 ,color: '#000000',borderBottomWidth : 1,marginRight: 5}}
                        // maxLength={2}
                        onChangeText={(text)=>{
                         setno_skpd(text);
                        }}
                        value={no_skpd}
                        placeholder="No SKPD"
                    />
            </CardItem>

            <CardItem bordered="true">
                <Label style={{marginBottom:5, fontSize:15,color:'#000000'}}>Isi Teks Pajak Reklame :</Label>
                <TextInput
                        style={{ width:200 ,color: '#000000',borderBottomWidth : 1,marginRight: 5}}
                        // maxLength={2}
                        onChangeText={(text)=>{
                         setisi_teks(text);
                        }}
                        value={isi_teks}
                        placeholder="Isi Teks"
                    />
            </CardItem>

            <CardItem bordered="true">
                <Label style={{marginBottom:5, fontSize:15,color:'#000000'}}>Luas Reklame :</Label>
                <TextInput
                        style={{ width:  WIDTH - 150 ,color: '#000000',borderBottomWidth : 1,marginRight: 5}}
                        // maxLength={2}
                        onChangeText={(text)=>{
                         setluas_reklame(text);
                        }}
                        value={luas_reklame}
                        placeholder="Luas Reklame"
                    />
            </CardItem>

            <CardItem bordered="true">
                <Label style={{marginBottom:5, fontSize:15,color:'#000000'}}>NSR :</Label>
                <TextInput
                        style={{ width:  WIDTH - 150 ,color: '#000000',borderBottomWidth : 1,marginRight: 5}}
                        // maxLength={2}
                        onChangeText={(text)=>{
                         setnsr(text);
                        }}
                        value={nsr}
                        placeholder="NSR"
                    />
            </CardItem>

           



        
                <CardItem bordered="true">
                <Label style={{marginBottom:5, fontSize:15,color:'#000000'}}>Keterangan :</Label>
                <TextInput
                        style={{ width:  WIDTH - 100 ,color: '#000000',borderBottomWidth : 1,marginRight: 5}}
                        multiline={true}
                        onChangeText={(text)=>{
                         setketerangan(text);
                        }}
                        value={keterangan}
                        placeholder="keterangan"
                    />
            </CardItem>




            

            


             <TouchableOpacity
                // disabled = { this.state.disabled }
                activeOpacity = { 0.8 }
                style = { styles.BtnSimpan }
                onPress = { this.SubmitValidasi }>
                  {/* // onPress = { this.Cek_Gambar }> */}
                <Text style = { styles.btnText }>Simpan</Text>
            </TouchableOpacity>


           


            </ScrollView>

            </View>
      
           
        );
  }