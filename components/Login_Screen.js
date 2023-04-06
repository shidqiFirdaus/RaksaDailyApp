import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  Linking,
  BackHandler,
  PermissionsAndroid,
  LogBox,
} from 'react-native';

import * as permissions from 'react-native-permissions';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Card,
  CardItem,
  Picker,
  ListItem,
  Body,
  Radio,
  List,
  Left,
  Right,
  Toast,
} from 'native-base';
import md5 from 'md5';
// import Loading from 'react-native-whc-loading'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEyeSlash,
  faEye,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import DeviceInfo from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import styles from '../css/Css_Menu_Login';
import Geolocation, {watchPosition} from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
// import NetInfo from "@react-native-community/netinfo";
import {NavigationContext} from 'react-navigation';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {firebase} from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';
// import md5 from "react-native-md5";
LogBox.ignoreAllLogs();

// import messaging from '@react-native-firebase/messaging';
// import {changeNotificationSetting,checkNotificationPermission} from 'react-native-check-notification-permission';

//autoresize gambar
const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 18);
const imageWidth = dimensions.width;

export default main_program = ({navigation}) => {
  //VARIABEL AWAL
  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [IndikatorLoading, setIndikatorLoading] = useState(false);
  const [pass_icon, setpass_icon] = useState(faEyeSlash);
  const [app_version, setapp_version] = useState('2.6');
  //VARIABEL DEVICE INFO
  const [phone_brand, setphone_brand] = useState('');
  const [device_id, setdevice_id] = useState('');
  const [unique_id, setunique_id] = useState('');
  const [device, setdevice] = useState('');
  const [network_operator, setnetwork_operator] = useState('');
  const [ip_address, setip_address] = useState('');
  const [mac_address, setmac_address] = useState('');
  const [use_emulator, setuse_emulator] = useState('');
  const [mobile_os, setmobile_os] = useState('');
  //GEO LOCATION
  const [geo_lati, setgeo_lati] = useState('');
  const [geo_longi, setgeo_longi] = useState('');
  const [geo_alt, setgeo_alt] = useState('');
  const [geo_accuracy, setgeo_accuracy] = useState('');
  const [formatted_address, setformatted_address] = useState('');
  const [dept, setdept] = useState('');
  const [full_name_karyawan, setfull_name_karyawan] = useState('');
  const [nama_karyawan, setnama_karyawan] = useState('');
  const [kode_karyawan, setkode_karyawan] = useState('');
  let [versi_baru, setversi_baru] = useState('');
  let [link, setlink] = useState('');
  const dispatch = useDispatch();

  //untuk bagian title bar
  const navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#b31b0b',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  insert_token = (userid, deviceid, token) =>
    axios
      .post('https://www.raksa-test.com/prog-x/api/general_api/token.php', {
        userid: userid,
        deviceid: deviceid,
        token: token,
      })
      .then(res => {
        console.log(res);
      });

  get_device_info = () => {
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
      setdevice(device);
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

    public_ip = () => {
      publicIP().then(ip => {
        // console.log(ip);
        // '47.122.71.234'
        // this.setState({
        //   ip_address: ip
        // })
        setip_address(ip);
      });
    };
    public_ip();

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
      setuse_emulator(isEmulator ? 'yes' : 'no');
    });
  };

  alert_restart_aplikasi = () => {
    Alert.alert(
      'FAILED LOGIN',
      'Mohon cek koneksi internet anda dan restart aplikasi ini',
      [
        {
          text: 'OK',
          onPress: () => {
            alert_restart_aplikasi();
          },
        },
      ],

      {
        cancelable: false,
      },
    );
  };

  get_geo = async () => {
    let permission_location = await requestLocationPermission();

    // const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (permission_location) {
      await Geolocation.getCurrentPosition(
        //Will give you the current location
        position => {
          // this.setState({
          //   geo_lati: position.coords.latitude,
          //   geo_longi: position.coords.longitude,
          //   geo_alt: position.coords.altitude,
          //   geo_accuracy: position.coords.accuracy,
          // })
          setgeo_lati(position.coords.latitude);
          setgeo_longi(position.coords.longitude);
          setgeo_alt(position.coords.altitude);
          setgeo_accuracy(position.coords.accuracy);
        },
        // (error) => console.log(error.message), {
        //   enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 ,showLocationDialog:true
        // }
      );
      // await get_geocoder();
    } else {
    }
  };

  requestLocationPermission = async () => {
    let jenis_os = await DeviceInfo.getSystemName().toUpperCase();
    if (jenis_os == 'ANDROID') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission location ok');
        return true;
      } else {
        return false;
      }
    }

    if (jenis_os == 'IOS') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        // do something if granted...
        return true;
      } else {
        return false;
      }
    }
  };

  cek_permission = async a => {
    check(a)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            // izin_kamera();
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            // izin_kamera();
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });
  };

  get_izin = async () => {
    request(PERMISSIONS.IOS.CAMERA).then(result => {
      cek_permission(PERMISSIONS.IOS.CAMERA);
    });

    request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(result => {
      cek_permission(PERMISSIONS.IOS.MEDIA_LIBRARY);
    });

    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
      cek_permission(PERMISSIONS.IOS.PHOTO_LIBRARY);
    });

    request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).then(result => {
      cek_permission(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
    });

    request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).then(result => {
      cek_permission(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
    });
  };

  // get_geocoder = () => {
  //   //AIzaSyDXMQGCEierbUwnaiYj-9RRtCWBSPPAsPM token regie.samuel123
  //   // AIzaSyAQMs-TrYlZH4wjnP7W7ZQkdNx1_zamgoc token pak martin
  //   Geocoder.init('AIzaSyAQMs-TrYlZH4wjnP7W7ZQkdNx1_zamgoc', { language: "en" }); // use a valid API key
  //   Geocoder.from(geo_lati, geo_longi)
  //     .then(json => {
  //       // this.setState({
  //       //   formatted_address: json.results[0].formatted_address,
  //       // })
  //       setformatted_address(json.results[0].formatted_address)
  //     })
  // }

  // login_aegis = async () => {
  //   try {
  //       await get_geo();
  //       await fetch('url/prog-x/api/spk/api_login.php',
  //       {
  //         method: 'POST',
  //         headers:
  //         {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(
  //         {
  //           user_id             : user,
  //           user_pass           : pass,
  //           // username_id         : user,
  //           unique_id           : unique_id,
  //           // token_firebase      : token_firebase,
  //           versi_apps          : app_version,

  //           phone_brand         : phone_brand,
  //           device_id           : device_id,
  //           device              : device,
  //           operator            : network_operator,
  //           ip_address          : ip_address,
  //           mac_address         : mac_address,
  //           emulator            : use_emulator,
  //           geo_latitude        : geo_lati,
  //           geo_longitude       : geo_longi,
  //           geo_altitude        : geo_alt,
  //           geo_accuracy        : geo_accuracy,
  //           os                  : mobile_os,
  //         })
  //       })
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         if (responseJson.Status == '1') {
  //           Alert.alert("SUCCESS", "LOGIN SUCCESS")
  //           navigation.replace("Menu_Utama");
  //           // this.props.navigation.replace("Menu_Utama", {
  //           //   username_id_param: this.state.in_user,
  //           //   unique_id_param: this.state.unique_id,
  //           //   app_version_param: this.state.app_version,
  //           //   dept_aegis_param: this.state.dept_aegis,
  //           //   token_firebase_param: this.state.token_firebase
  //           // })
  //         }
  //         else {
  //           Alert.alert("FAILED", responseJson.Message)
  //         }
  //       })
  //   }
  //   catch {
  //     alert_restart_aplikasi();
  //   }
  // }

  loginKaryawan = async () => {
    let userUppercase = await user.toUpperCase();
    let passUppercase = await pass.toUpperCase();
    let passMD5 = await md5(md5(md5(passUppercase)));
    let paket = {
      in_user: userUppercase,
      in_nama: userUppercase,
      in_password: passMD5,
      unique_id: unique_id,
      versi: app_version,
    };

    await axios
      .post(
        'https://www.raksa-test.com/prog-x/api/general_api/api_login.php',
        paket,
      )
      .then(async res => {
        console.log('status\n' + res.data.Status);
        console.log('data\n' + JSON.stringify(res));
        if (res.data.Status == 1) {
          dispatch({
            type: 'SAVE_LOGIN_INFO',
            // payload: {
            //   nama_user: in_user,
            //   app_version: app_version
            // }
            payload: res.data,
          });
          insert_token(
            res.data.nama_karyawan,
            unique_id,
            await firebase.messaging().getToken(),
          );
          navigation.replace('Menu_Pertama');
        } else {
          Alert.alert('FAIL', 'Gagal Login');
        }
      })
      .catch(err => {
        Alert.alert(err);
        console.log(err);
      });
  };

  login_aegis_with_axios = async () => {
    let user_up = user.toUpperCase();
    let user_md5 = md5(md5(md5(user_up)));
    let pass_up = pass.toUpperCase();
    let pass_md5 = md5(md5(md5(pass_up)));
    // console.log(user_md5);
    // console.log(pass_md5);
    try {
      axios
        .post('www.raksa-test.com/prog-x/api/general_api/api_login.php', {
          in_user: user_up,
          in_nama: user_up,
          in_password: pass_md5,
          unique_id: unique_id,
          // token_firebase      : token_firebase,
          mobile_app_version: app_version,
        })
        .then(function (responseJson) {
          console.log(responseJson.data);
          if (responseJson.data.Status == '1') {
            Alert.alert('SUCCESS', 'LOGIN SUCCESS');
            // responseJson.data.dept = dept;
            // responseJson.data.full_name_karyawan = full_name_karyawan;
            // responseJson.data.nama_karyawan = nama_karyawan;
            // responseJson.data.kode_karyawan = kode_karyawan;
            dispatch({
              type: 'SAVE_LOGIN_INFO',
              // payload: {
              //   nama_user: in_user,
              //   app_version: app_version
              // }
              payload: responseJson.data,
            });

            navigation.replace('Menu_Pertama');
          } else if (responseJson.data.Status == '2') {
            versi_baru = responseJson.data.versi;
            link = responseJson.data.link;
            UpdateAplikasi(versi_baru);
          } else {
            Alert.alert('ERROR LOGIN', responseJson.data.Message);
          }
        });
    } catch {
      alert_restart_aplikasi();
    }
  };

  validasi = async () => {
    await get_geo();

    Alert.alert(
      'LOGIN CONFIRMATION',
      'Are you sure ?',
      [
        {
          text: 'OK',
          onPress: () => {
            loginKaryawan();
            login_aegis_with_axios();
            // navigation.replace("Menu_Pertama");
          },
        },
        {
          text: 'CANCEL',
        },
      ],

      {
        cancelable: true,
      },
    );
  };

  //kyk componentdidmount 1x run aja d awal2 banget
  useEffect(async () => {
    await get_geo();
    await get_device_info();
    await get_izin();
    await cek_permission();
    // await PermissionsAndroid.request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    // Notifications.postLocalNotification({title: 'test'});
  }, []);

  // // NOTES kalo kyk gini, mirip componentdidupdate..tiap update akan nge run set effect ini
  // useEffect(() => {
  // })

  //Update versi
  DownloadUpdate = () => {
    Linking.openURL(link);
  };

  UpdateAplikasi = versi => {
    Alert.alert(
      'Update',
      'Silahkan Update Aplikasi Anda Ke Versi ' + versi,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Download', onPress: () => DownloadUpdate()},
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logo_layout}>
          <Image
            style={{height: imageHeight, width: imageWidth}}
            resizeMode="contain"
            source={require('../img/login-nobg.png')}
          />
        </View>

        <View style={[styles.containerLogin, {padding: 5}]}>
          <Label
            style={{
              color: '#1c3565',
              marginBottom: 5,
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            ASURANSI RAKSA PRATIKARA
          </Label>
          <Label
            style={{
              color: '#1c3565',
              marginBottom: 5,
              fontWeight: 'bold',
              fontSize: 17,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            Raksa Daily Activity
          </Label>

          <View>
            <View style={styles.container3}>
              <Item
                floatingLabel
                style={{padding: 5, marginBottom: 20, width: '75%'}}>
                <Label style={{fontWeight: 'bold', color: '#1c3565'}}>
                  Username{' '}
                </Label>
                <Input
                  onChangeText={text => {
                    setuser(text);
                  }}
                />
              </Item>
            </View>

            <View style={styles.container2}>
              <Item
                floatingLabel
                style={{
                  padding: 5,
                  marginBottom: 30,
                  marginLeft: 20,
                  width: '70%',
                }}>
                <Label style={{fontWeight: 'bold', color: '#1c3565'}}>
                  Password:{' '}
                </Label>
                <Input
                  secureTextEntry={secureTextEntry}
                  onChangeText={text => {
                    setpass(text);
                  }}
                />
              </Item>
              <TouchableOpacity
                onPress={() => {
                  var icon_name = secureTextEntry ? faEye : faEyeSlash;
                  setsecureTextEntry(!secureTextEntry);
                  setpass_icon(icon_name);
                }}>
                <FontAwesomeIcon
                  color="#1c3565"
                  size={30}
                  style={{flex: 1, marginLeft: 10}}
                  icon={pass_icon}></FontAwesomeIcon>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{marginTop: 10, width: '80%'}}
            onPress={async () => {
              validasi();
            }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>LOGIN</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <Loading
            ref="loading"
          />  */}
      </ScrollView>
      <View style={{marginBottom: 10}}>
        <Label
          style={{
            color: '#1c3565',
            fontSize: 15,
            marginBottom: 5,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          Version {app_version}
        </Label>
      </View>

      {IndikatorLoading ? <ActivityIndicator size="large" /> : null}
    </View>
  );
};
