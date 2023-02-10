/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react'
import { View, Image, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView,Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Card, CardItem, Picker, Textarea, Body,Radio, List, Left, Right} from 'native-base';
import DatePicker from 'react-native-datepicker';
import styles from '../../css/CSS_DetailStation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faHome, faPen, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { NavigationContext } from 'react-navigation';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

// var arr=[]
const {width: WIDTH} = Dimensions.get('window');


export default  main_program=({route, navigation})=>{


let [remark,setremark] = useState("");
// let [nama_karyawan_req, setnama_karyawan_req]      = useState(route.params.nama_karyawan);
let [nama_req, setnama_req]                        = useState(route.params.nama_req);
let [no_req, setno_req]                = useState(route.params.no_req);
let [dept_req, setdept_req]    = useState(route.params.nama_dept);
let [status_req, setstatus_req]    = useState(route.params.status);
// let [posisi_kartu_nama, setposisi_kartu_nama]      = useState(route.params.posisi_kartu_nama);
// let [no_hp, setno_hp]                              = useState(route.params.no_hp);
// let [no_wa, setno_wa]                              = useState(route.params.no_wa);
// let [email_pribadi, setemail_pribadi]              = useState(route.params.email_pribadi);
// let [email_kantor, setemail_kantor]                = useState(route.params.email_kantor);
// let [id_req, setid_req]                            = useState(route.params.kode_karyawan_req);
// // let [nama_dept, setnama_dept]                                = useState(route.params.nama_dept);
// let [posisi, setposisi]                            = useState(route.params.posisi);
// let [jumlah, setjumlah]                            = useState(route.params.jumlah);
let [tanggal_req, settanggal_req]                  = useState(route.params.tanggal_req);
let [json_view_data, setjson_view_data]                               = useState("");
// let [nama_departemen, setnama_departemen]          = useState(route.params.nama_dept);
// let [keterangan, setketerangan]                    = useState(route.params.keterangan);

    
  //ngambil dari store
  const dispatch=useDispatch();
  const full_name_karyawan = useSelector((state) => state.data_login.full_name_karyawan);
  const kode_karyawan = useSelector((state) => state.data_login.kode_karyawan);
  const nama_karyawan = useSelector((state) => state.data_login.nama_karyawan);
  // const dept = useSelector((state) => state.data_login.full_name_karyawan);
  let dept = useSelector((state) => state.data_login.dept);
  let role = dept.substring(0, 3);


  useEffect(()=>{
    // get_cur_date();
    get_data();
      //  get_geo();
      //  get_device_info();
      //  api_get_list();
    },[])

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


  renderItem = ({ item }) => (
    <View style={styles.tulisan_background}>
        <Text style={styles.tulisan1}> {item.nama_barang} </Text>
        <Text style={styles.tulisan2}>{item.jumlah_barang}</Text>
        {/* <Text style={styles.tulisan3}>{item.nama_dept}</Text> */}
        {/* <Text style={styles.tulisan4}>{Moment(item.date_create).format('DD-MMM-Y HH:mm:ss')}</Text> */}

        

        {/* <TouchableOpacity 
          onPress={ this.DeleteData.bind(this,item.id) } style={styles.btn}>
            <FontAwesomeIcon 
            style={styles.btnText} icon={faTrash} /> 
        </TouchableOpacity>                 */}
    </View>     
  )

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

  Action_Edit = () =>
  {
    navigation.navigate("Stationary",{
      no_req: no_req,
    })
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
                style={{backgroundColor: "#fcce00", marginTop: 0}}
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

            <View style={styles.container}>
            {/* <Text style={styles.textHi}>HI {this.state.nama_karyawan}</Text>
            <Text style={styles.textHi}>Dept {this.state.dept}</Text> */}
            <Text style = { styles.header }>Detail Request Station</Text>
            {/* <Text style = { styles.header }>{this.state.nip}</Text> */}
            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan_detail }>No Req : {no_req}</Text>
                {/* </Item> */}
            </CardItem>
            
            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan_detail }>Nama : {nama_req}</Text>
                {/* </Item> */}
            </CardItem>

            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan_detail }>Tanggal Request : {tanggal_req}</Text>
                {/* </Item> */}
            </CardItem>

            <CardItem>
                {/* <Item> */}
                <Text style = { styles.tulisan_detail }>Departemen : {dept_req}</Text>
                {/* </Item> */}
            </CardItem>


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
            


            


            </ScrollView>
            {status_req == 'POST'?
              (
                  <View>
                    <CardItem>
                    <TouchableOpacity
                            style={{backgroundColor: 'grey', width: WIDTH - 55, padding: 10}}
                            activeOpacity={0.5}
                            onPress={() => {
                            Alert.alert(
                                'CONFIRMATION',
                                'Are you sure ?',
                                [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        Action_Edit();
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
                            <Text style={{color: 'white', fontWeight:'bold',alignSelf:'center'}}>Edit</Text>
                            </View>
                        </TouchableOpacity>
                    </CardItem>
                    </View>
              ):
              (
                <View>
                  </View>
              )

            }
            

            </View>
     
        
            </View>
           
        );
  }