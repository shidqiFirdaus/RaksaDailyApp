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
import styles from '../../css/CSS_Stationary';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faHome, faPen, faUser, faUsers, faTrash } from '@fortawesome/free-solid-svg-icons';
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
import { FlatList } from 'react-native-gesture-handler';
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
let selectedItem= "Silahkan Pilih";

let [jumlah, setjumlah]             = useState("");

let [nama_barang, setnama_barang]                     = useState("Silahkan Pilih Barang");
let [kode_barang, setkode_barang]                       = useState("");
let [jumlah_barang, setjumlah_barang]                       = useState("");

const [app_version, setapp_version]               = useState("2.5");
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


  let [json_list_barang, setjson_list_barang]                               = useState("");
  let [json_view_data, setjson_view_data]                               = useState("");
  let [json_list_jumlah_barang, setjson_list_jumlah_barang]     = useState("");
  let [id_str_pad, setid_str_pad]                               = useState("");
  let [no_req, setno_req]                                       = useState(route.params.no_req);
  // let [no_req, setno_req]                                       = useState("RISTO1357");
  // let [json_cate, setjson_cate]                               = useState("");
  // let [json_model, setjson_model]                             = useState("");
  // let [json_type_report, setjson_type_report]                 = useState("");
  // let [json_jenis_pertanggungan, setjson_jenis_pertanggungan] = useState("");

 useEffect(()=>{
  get_cur_date();
  get_data();
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
  // const dept = useSelector((state) => state.data_login.full_name_karyawan);
  let dept                    = useSelector((state) => state.data_login.dept);
  let role                    = dept.substring(0, 3);
  // const grant_user = useSelector((state) => state.data_login.grant)
  // useSelector((state)=>console.log(state))

    


  get_data =()=> {
    try {
      axios.post('url/prog-x/api/form_req/api_list_barang_insert.php', {
        key: '2312JJVDJ99njv(#()($',
        no_req: no_req
      })
      .then(function (responseJson) {
         console.log(responseJson.data);
        if(responseJson.data.Status=='1') {
          setjson_view_data(responseJson.data.data);
          // Alert.alert("SUCCESS", "LOGIN SUCCESS")
          // responseJson.data.dept = dept;
          // responseJson.data.full_name_karyawan = full_name_karyawan;
          // responseJson.data.nama_karyawan = nama_karyawan;
          // responseJson.data.kode_karyawan = kode_karyawan;
          // dispatch(
          //   {
          //     type: "MKG_EDIT_DATA",
          //     // payload: {
          //     //   nama_user: in_user,
          //     //   app_version: app_version
          //     // }
          //     payload: responseJson.data
          //   }
          // )
         
          // navigation.replace("Menu_Awal");
        }
        // else {
        //   Alert.alert("Data Kosong",responseJson.data.Message)
        // }
      })
    }
 
    catch {
      // alert_restart_aplikasi();
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
    //   // "92.168.32.54"
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



  //api get barang
   api_get_list= async()=> {
    await setkode_barang("");
    await setnama_barang("Silahkan Pilih Barang");
    await setjumlah_barang("");
    await setjson_list_jumlah_barang("");
     console.log("jalan");
    axios.post("url/prog-x/api/form_req/api_list_barang.php", {
      key : '12NJFNjnvnj*$&@*(*$&'
    })
    .then((responseJson)=>{
      console.log(responseJson.data);
      if(responseJson.data.Status==1) {
        setjson_list_barang(responseJson.data.data);
        console.log("ok");
        // console.log(json_list_data.data)
      }
    })
  }


  //api get jumlah barang
  api_get_jumlah_barang= async()=> {
    await setjumlah_barang("");
    await setjson_list_jumlah_barang("");
    console.log("jalan");
   axios.post("url/prog-x/api/form_req/api_list_jumlah_barang.php", {
     key : '12NJFNjnvnj*$&@*(*$&',
     kode_barang : kode_barang
   })
   .then((responseJson)=>{
     console.log(responseJson.data);
     if(responseJson.data.Status==1) {
        setjson_list_jumlah_barang(responseJson.data.data);
       console.log("ok");
       // console.log(json_list_data.data)
     }
   })
 }

  EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.emptyListStyle}
        onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };


  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };


  


  

  EditData = () =>
  {
    alert("Silahkan Hubungi HRD untuk melakukan perubahan data")
  }
  

    

      SubmitValidasi1= () => 
      {
        if (json_view_data == '')
        {
            alert('Tidak ada data yang disimpan')
        }
        else
        {
            Alert.alert(
                'Menambahkan Barang',
                'Apakah Anda Yakin ?',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      api_save_data();
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
        }
        
        // api_insert_data();

       
        
      }


      SubmitValidasi= () => 
      {
        if(kode_barang == '')
        {
            alert("Barang Belum Disini");
        }
        else
        {
            if(jumlah_barang == '')
            {
                alert("Jumlah barang belum diisi");
            }
            else
            {
                Alert.alert(
                    'SAVE CONFIRMATION',
                    'Apakah Anda Yakin ?',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          api_add_data();
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
            }
        }
        
        // api_insert_data();

       
        
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


      hapusItem=(row_id)=> {
        console.log("row_id: "+row_id);
       axios.post("url/prog-x/api/form_req/api_hapus_barang_list.php", {
         key : '2312JJVDJ99njv(#()($',
         row_id : row_id
       })
       .then((responseJson)=>{
         console.log(responseJson.data);
         if(responseJson.data.Status==1) {
            // setjson_list_jumlah_barang(responseJson.data.data);
            get_data();
           console.log("ok");
           // console.log(json_list_data.data)
         }
       })
     }
      


//add data 
  api_add_data = async() => {
    // get_geo();
        console.log("no_req:"+ no_req);
    axios.post("url/prog-x/api/form_req/api_insert_barang_temp.php", {
      key : 'hvnjf9*3884IFJjf8@@',
      kode_karyawan : kode_karyawan,
      dept : dept,
      jumlah : jumlah_barang,
      kode_barang : kode_barang,
      no_req: no_req
    
    })
    .then(async(responseJson) =>  {
       console.log(responseJson);
      if (responseJson.data.Status == '1') {
        Alert.alert("SUCCESS", "Data Berhasil Ditambahkan");
        // navigation.replace("Menu_Req");
        await setkode_barang("");
        await setnama_barang("Silahkan Pilih Barang");
        await setjumlah_barang("");
        await setjson_list_jumlah_barang("");
        await console.log('no_req dari api: '+ responseJson.data.no_req);
        await setno_req(responseJson.data.no_req);
        await console.log('jalan dulu');
        await console.log('no_req baru: '+no_req);
        await get_data();
      }
      else {
        Alert.alert("FAILED", "Gagal")
        console.log("Respon:" +responseJson.data);
      }
    })
    .catch(function (error) {
      Alert.alert("ERROR","Please Try again...")
      console.log(responseJson.data);
    });
  }



//add data 
api_save_data = () => {
    // get_geo();
        console.log("no_req:"+ no_req);
    axios.post("url/prog-x/api/form_req/api_update_status_req.php", {
      key : 'hvnjf9*3884IFJjf8@@',
      no_req: no_req
    
    })
    .then((responseJson) =>  {
       console.log(responseJson);
      if (responseJson.data.Status == '1') {
        Alert.alert("SUCCESS", "Data Berhasil Disimpan");
        navigation.replace("Menu_Req");
        // await console.log('no_req dari api: '+ responseJson.data.no_req);
        // await setno_req(responseJson.data.no_req);
        // await console.log('jalan dulu');
        // await console.log('no_req baru: '+no_req);
        // await get_data();
      }
      else {
        Alert.alert("FAILED", "Gagal")
        console.log("Respon:" +responseJson.data);
      }
    })
    .catch(function (error) {
      Alert.alert("ERROR","Please Try again...")
      console.log(responseJson.data);
    });
  }


  renderItem = ({ item }) => (
    <View style={styles.tulisan_background}>
        <Text style={styles.tulisan1}> {item.nama_barang} </Text>
        <Text style={styles.tulisan2}>{item.jumlah_barang}</Text>
        {/* <Text style={styles.tulisan3}>{item.nama_dept}</Text> */}
        {/* <Text style={styles.tulisan4}>{Moment(item.date_create).format('DD-MMM-Y HH:mm:ss')}</Text> */}

        <TouchableOpacity style={styles.btn2} 
          onPress={ ()=>{

            Alert.alert(
              'Delete CONFIRMATION',
              'Apakah Anda Yakin Ingin Menghapus Data ini ?',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    hapusItem(item.row_id);
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

            
            
          }}>
            <FontAwesomeIcon 
            style={styles.btnText} icon={faTrash} /> 
        </TouchableOpacity>

        {/* <TouchableOpacity 
          onPress={ this.DeleteData.bind(this,item.id) } style={styles.btn}>
            <FontAwesomeIcon 
            style={styles.btnText} icon={faTrash} /> 
        </TouchableOpacity>                 */}
    </View>     
  )

  



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


            <View>
            <Text style = { styles.header }>Stationary</Text>
            {/* <Text style = { styles.header }>{nip}</Text> */}
           

           

            <CardItem bordered="true">
            <Label style={{ fontSize:15}}>Barang :</Label>
            </CardItem>

            <CardItem bordered="true"> 
                <Item>
              <LookupModal
                        data={json_list_barang}
                        value={nama_barang}
                        itemTextStyle={{color: '#000000'}}
                        onSelect={async(item) => {
                          await setnama_barang(item.nama_barang);
                          await setkode_barang(item.kode_barang);
                          
                          await api_get_jumlah_barang();
                        }}
                        displayKey={"nama_barang"}
                        selectButtonStyle={{ width: "90%", borderWidth: 1, marginLeft: 8}}
                        placeholder={"Silahkan Pilih Barang"}
                        selectText={nama_barang}
                      />
              </Item>
            </CardItem>

            <CardItem bordered="true">
            <Label style={{ fontSize:15}}>Jumlah Barang :</Label>
            </CardItem>

            <CardItem bordered="true"> 
                <Item>
              <LookupModal
                        data={json_list_jumlah_barang}
                        value={jumlah_barang}
                        itemTextStyle={{color: '#000000'}}
                        onSelect={async(item) => {
                          await setjumlah_barang(item.jumlah_barang);
                          
                        }}
                        displayKey={"jumlah_barang"}
                        selectButtonStyle={{ width: "90%", borderWidth: 1, marginLeft: 8}}
                        placeholder={"Silahkan Pilih Jumlah"}
                        selectText={jumlah_barang}
                      />
              </Item>
            </CardItem>  

            <TouchableOpacity
                // disabled = { this.state.disabled }
                activeOpacity = { 0.8 }
                style={{width: '80%'}}
                style = { styles.BtnAdd }
                onPress = {this.SubmitValidasi}>
                  {/* // onPress = { this.Cek_Gambar }> */}
                <Text style = { styles.btnText }>Tambah data</Text>
            </TouchableOpacity>    
            </View>  
              

            <ScrollView style={{marginTop : 10}}>
            {/* <Text style={styles.textHi}>HI {nama_karyawan}</Text> */}
            <View style={styles.judul}>
            <Text style={styles.tulisanJudul}>List Barang </Text>
            </View>
            
            <FlatList
                  data={json_view_data}
                  ItemSeparatorComponent = {FlatListItemSeparator}
                  renderItem={renderItem}
                  ListEmptyComponent={EmptyListMessage}
                />
            


             <TouchableOpacity
                // disabled = { this.state.disabled }
                activeOpacity = { 0.8 }
                style = { styles.BtnSimpan }
                onPress = {this.SubmitValidasi1}>
                  {/* // onPress = { this.Cek_Gambar }> */}
                <Text style = { styles.btnText }>Simpan</Text>
            </TouchableOpacity>


            


            </ScrollView>

            </View>
      
           
        );
  }