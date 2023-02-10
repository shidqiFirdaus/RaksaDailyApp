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
let [nama_req, setnama_req]                        = useState(route.params.nama_req);
let [no_req, setno_req]                = useState(route.params.no_req);
let [dept_req, setdept_req]    = useState(route.params.dept_lengkap);
let [tanggal_req, settanggal_req]                  = useState(route.params.tanggal_req);
let [json_view_data, setjson_view_data]                               = useState("");
let [id_req, setid_req]                            = useState(route.params.id_req);

    
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
        axios.post("url/prog-x/api/form_req/api_action_station.php", {
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
        axios.post("url/prog-x/api/form_req/api_action_station.php", {
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

  useEffect(()=>{
    // get_cur_date();
    get_data();
      //  get_geo();
      //  get_device_info();
      //  api_get_list();
    },[])

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
            <Text style = { styles.header }>Detail Request Stationary</Text>
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
            

            <View>
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
            </View>

            

             </ScrollView>
     
        
            </View>
           
        );
  }