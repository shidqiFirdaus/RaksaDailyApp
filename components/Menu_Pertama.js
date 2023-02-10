/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Linking,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styles from '../css/CSS_MenuPertama';
import {Header, Left, Right, Body} from 'native-base';
import {
  faBook,
  faDoorOpen,
  faHome,
  faMailBulk,
  faPen,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {CommonActions} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {Provider, useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

export default main_program = ({route, navigation}) => {
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 1) / 2);
  const imageWidth = dimensions.width;
  const logoWidth = Math.round((dimensions.width * 9) / 16);
  // const [dept, setdept] = useState("");
  // const [full_name_karyawan, setfull_name_karyawan] = useState("");
  // const [nama_karyawan, setnama_karyawan] = useState("");
  // const [kode_karyawan, setkode_karyawan] = useState("");
  let [json_data_slideshow, setjson_data_slideshow] = useState('');

  //ngambil dari store
  const dispatch = useDispatch();
  const full_name_karyawan = useSelector(
    state => state.data_login.full_name_karyawan,
  );
  let dept = useSelector(state => state.data_login.dept);
  let role = dept.substring(0, 3);
  // let role = useSelector((state) => state.data_login.dept);
  // const grant_user = useSelector((state) => state.data_login.grant)
  // useSelector((state)=>console.log(state))

  //  Coba_Alert = (dept) =>
  //  {
  //   alert(dept);
  //  }

  // get_list_slideshow = async () => {
  //   try {
  //     await fetch('url/prog-x/api/underwriting_approval/api_get_slideshow.php',
  //       {
  //         method: 'POST',
  //         headers:
  //         {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(
  //           {
  //             key_id: "kagjwlak123@djkaldwj123@$%2",
  //             source_phone: DeviceInfo.getSystemName().toUpperCase()
  //           })
  //       })
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         //Success
  //         // Alert.alert(JSON.stringify(responseJson))
  //         // console.log(JSON.stringify(responseJson.nomor))
  //         // console.log("APP VERSION");
  //         // console.log(responseJson);
  //         this.setState({
  //           json_data_slideshow  : responseJson.data
  //         })
  //         // console.log(responseJson)
  //       })
  //   }
  //   catch {
  //     // Alert.alert("ERROR","ERROR! Please Try Again...")
  //   }
  // }

  useEffect(() => {
    get_list_slideshow();

    // get_device_info();
    // api_get_job();
  }, []);

  get_list_slideshow = async () => {
    console.log('jalan');
    axios
      .post(
        'https://www.raksa-test.com/prog-x/api/underwriting_approval/api_get_slideshow.php',
        {
          key_id: 'kagjwlak123@djkaldwj123@$%2',
          source_phone: DeviceInfo.getSystemName().toUpperCase(),
        },
      )
      .then(responseJson => {
        console.log(responseJson.data);
        if (responseJson.data.status == 1) {
          setjson_data_slideshow(responseJson.data.data);
          console.log('sssssssssssaaaaaaaa');
          console.log(json_data_slideshow.length);
        }
      });
  };

  //slideshow
  slide_show = () => {
    if (json_data_slideshow.length > 0) {
      return (
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}>
            {/* <Slideshow
            // containerStyle={{resizeMode: 'cover'}}
            dataSource={this.state.json_data_slideshow}
            onPress={({ index }) => {
              // console.log(this.state.json_data_slideshow[index])
              this.Menu_Slideshow_Details(this.state.json_data_slideshow[index])
            }}
          /> */}

            <View style={{flexDirection: 'row'}}>
              {
                // LOOPING
                json_data_slideshow.map((index, posisi) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.Menu_Slideshow_Details(index);
                        }}
                        activeOpacity={1}>
                        <Image
                          style={{
                            width: imageWidth,
                            height: imageHeight,
                            resizeMode: 'stretch',
                          }}
                          source={{uri: index.url}}
                        />
                      </TouchableOpacity>

                      {/* NGEBUAT BULETANNYA */}
                      <View
                        style={{
                          bottom: 0,
                          position: 'absolute',
                          flexDirection: 'row',
                          alignSelf: 'center',
                          color: 'black',
                        }}>
                        {json_data_slideshow.map((index_2, posisi_2) => {
                          if (posisi_2 == posisi) {
                            return (
                              <View>
                                <Text style={{color: 'white'}}>⬤ </Text>
                              </View>
                            );
                          } else {
                            return (
                              <View>
                                <Text style={{color: '#888'}}>⬤ </Text>
                              </View>
                            );
                          }
                        })}
                      </View>
                    </View>
                  );
                })
              }
            </View>
          </ScrollView>
        </View>
      );
    }
  };

  CekRole = () => {
    let role = useSelector(state => state.data_login.full_name_karyawan);
    if (role == 'KNW_B' || role == 'KNW_A') {
      //do something
    }
  };

  Menu_Slideshow_Details = json_param => {
    navigation.navigate('DetailSlideShow', json_param);
  };

  konfirmasiLogout = () => {
    Alert.alert(
      'Confirmation',
      'Apakah anda ingin Keluar?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Ya', onPress: () => this.LogOut()},
      ],
      {cancelable: false},
    );
  };

  HalamanAwal = () => {
    navigation.navigate('Menu_Awal');
  };

  Req_Form = () => {
    navigation.navigate('Menu_Req');
  };

  Delivery = () => {
    navigation.navigate('MenuDeliv');
    // alert("Fitur ini sedang dalam pengembangan");
  };
  // LihatData = () =>
  // {
  //   let dept = this.state.dept;
  //   let role = dept.substring(0, 3);
  //   if(role == 'KNW' ||  role =='DRK'){
  //     alert ("Anda tidak bisa menggunakan fitur ini");
  //   }
  //   else
  //   {
  //     navigation.navigate("View_Data");
  //   }
  // }

  Hrd = () => {
    // if(role == 'KNW' ||  role =='DRK'){
    //   navigation.navigate("Monitoring_ChechkInOut")
    // }
    // else
    // {
    //   navigation.navigate("CheckInOut");

    // }
    // alert("Fitur ini sedang dalam pengembangan");
    navigation.navigate('MenuNilai');
  };

  LogOut = () => {
    // Alert.alert(this.state.nip)
    // this.Func_Logout();
    // navigation.navigate("Menu_Login");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Menu_Login'}],
      }),
    );
  };

  return (
    <View style={styles.container}>
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
      </View>
      */}
      {/* section tengah */}
      <View style={styles.containerAtasTengah}>
        <View style={styles.containerAtasTengahDalam}>
          <View style={styles.containerGambar}>
            <View>
              <Image
                style={{
                  width: 50,
                  height: 68,
                  // marginLeft:26,
                  // marginTop: 15,
                  // color: '#4060ca'
                }}
                // resizeMode='contain'
                // tintcolor= '#4060ca'
                source={require('../img/Frame-2.png')}
              />
            </View>
            <View>
              <Image
                style={{
                  width: 120,
                  height: 80,
                  marginLeft: 250,
                  // marginTop: 15,
                  marginTop: 0,
                  // color: '#4060ca'
                }}
                // resizeMode='contain'
                // tintcolor= '#4060ca'
                source={require('../img/Frame-7.png')}
              />
            </View>
          </View>
        </View>
        <View style={styles.containerAtasBawah}>
          <View style={styles.TulisanHi}>
            <Text style={styles.textHi}>Halo {full_name_karyawan}</Text>

            <TouchableOpacity
              onPress={this.konfirmasiLogout}
              activeOpacity={0.5}>
              <Image
                style={{
                  width: 30,
                  height: 40,
                  borderRadius: 40 / 2,
                  // backgroundColor:"white",
                  overlayColor: 'white',
                  shadowColor: 'black',
                  marginLeft: '90%',
                  marginTop: -20,
                }}
                // resizeMode='contain'
                source={require('../img/sign_out.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.ButtonLogout}></View>
        </View>

        {/* <Text style={styles.textHi}> {this.state.dept}</Text> */}
      </View>

      {/* { this.state.status_pesan == '1' ? (
      <View style={styles.containerAtasTengah}>
      <Text style={styles.textDari}>Pesan Dari : {this.state.pengirim_pesan} </Text>
     
    
     <Text style={styles.textJudul}> {this.state.judul_pesan}</Text>
     
       <Text style={styles.textIsi}> {this.state.isi_pesan}</Text>
       
       </View>
    ) : (
      <View style={styles.containerAtasTengah}>
      <Text style={styles.textDari}>Tidak ada pesan terbaru {this.state.pengirim_pesan} </Text>
     
       
       </View>
    )



    }  */}

      {/* menu */}
      <View style={styles.containerTengah}>
        {/* <Text>{this.state.nip}</Text> */}
        <View style={styles.menu1}>
          <View style={styles.pilihan1}>
            <View>
              <TouchableOpacity activeOpacity={1} onPress={this.HalamanAwal}>
                <View style={styles.menuInput}>
                  <Image
                    style={{
                      width: 50,
                      height: 68,
                      // marginLeft:26,
                      marginTop: 15,
                      // color: '#4060ca'
                    }}
                    // resizeMode='contain'
                    // tintcolor= '#4060ca'
                    source={require('../img/diary.png')}
                  />
                </View>
                <View>
                  <Text style={styles.textMenu1}>Raksa Diary</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pilihan2}>
            <View>
              <TouchableOpacity activeOpacity={1} onPress={this.Hrd}>
                <View style={styles.menuInput}>
                  <Image
                    style={{
                      width: 83,
                      height: 55,
                      // marginLeft:18,
                      marginTop: 15,

                      // color: '#4060ca'
                    }}
                    // resizeMode='contain'
                    // tintcolor= '#4060ca'
                    source={require('../img/ehrd.png')}
                  />
                </View>
                <View>
                  <Text style={styles.textMenu2}>E-HRD</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pilihan3}>
            <View>
              <TouchableOpacity activeOpacity={1} onPress={this.Req_Form}>
                <View style={styles.menuInput}>
                  <Image
                    style={{
                      width: 58,
                      height: 56,
                      // marginLeft:26,
                      marginTop: 15,

                      // color: '#4060ca'
                    }}
                    // resizeMode='contain'
                    // tintcolor= '#4060ca'
                    source={require('../img/req_form.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.textMenuForm}>Request Form</Text>
            </View>
          </View>
        </View>
        <View style={styles.menu2}>
          <View style={styles.pilihan1}>
            <View>
              <TouchableOpacity activeOpacity={1} onPress={this.Delivery}>
                <View style={styles.menuInput}>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      // marginLeft:26,
                      marginTop: 15,
                      // color: '#2e90fa'
                    }}
                    // resizeMode='contain'
                    // tintcolor= '#2e90fa'
                    source={require('../img/deliv_icon.png')}
                  />
                </View>
                <View>
                  <Text style={styles.textMenu4}>Delivery</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.slide_show}>
        {/* Slideshow */}
        <Text style={styles.textInfo}>Info</Text>
        {slide_show()}
      </View>
    </View>
  );
};
