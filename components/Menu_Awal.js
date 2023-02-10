/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Linking,
  
  TouchableHighlight,
  TouchableOpacity,
  Button, Alert,Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from '../css/CSS_MenuAwal';
import {Header,Left,Right,Body} from 'native-base';
import { faBook, faDoorOpen, faHome, faMailBulk, faPen, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { CommonActions } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { Provider, useDispatch, useSelector } from 'react-redux';


export default  main_program=({route, navigation})=>{
  
  
  // const [dept, setdept] = useState("");
  // const [full_name_karyawan, setfull_name_karyawan] = useState("");
  // const [nama_karyawan, setnama_karyawan] = useState("");
  // const [kode_karyawan, setkode_karyawan] = useState("");


//ngambil dari store
  const dispatch=useDispatch();
  const full_name_karyawan = useSelector((state) => state.data_login.full_name_karyawan);
  let dept = useSelector((state) => state.data_login.dept);
  let role = dept.substring(0, 3);
  // let role = useSelector((state) => state.data_login.dept);
  // const grant_user = useSelector((state) => state.data_login.grant)
  // useSelector((state)=>console.log(state))

  //  Coba_Alert = (dept) => 
  //  {
  //   alert(dept);
  //  }

  // Ambil_Pesan = () => {
  //   this.setState({ loading: true, disabled: true }, () =>
  //       {
  //           fetch('url/prog-x/api/marketing_activity/api_ambil_pesan.php',
  //           {
  //               method: 'POST',
  //               headers: 
  //               {
  //                   'Accept': 'application/json',
  //                   'Content-Type': 'application/json',
  //               },
  //               body: JSON.stringify(
  //               {
  //                   // id          : id,
  //                   nama_karyawan : this.state.nama_karyawan,
  //                   dept : this.state.dept,
  //               })
  //           }).then((response) => response.json()).then((responseJson) =>
  //           {
  //               // alert(responseJson);

  //               if(responseJson[0]['Status'] == '1')
  //               {
  //                 this.setState({
  //                   judul_pesan: responseJson[0]['judul_pesan'],
  //                   isi_pesan: responseJson[0]['isi_pesan'],
  //                   berlaku_sampai: responseJson[0]['berlaku_sampai'],
  //                   pengirim_pesan: responseJson[0]['pengirim_pesan'],
  //                   status_pesan:responseJson[0]['Status'],
  //                 })
  //               }
  //               else if(responseJson[0]['Status'] == '2')
  //               {
  //                 this.setState({
  //                  status_pesan:responseJson[0]['Status'],
  //                 })
  //               }
  //               // console.log(id);
  //           }).catch((error) =>
  //           {
  //               console.error(error);
  //           });
  //       });
  // }

  get_device_info = () => {
    this.setState({
      // phone_brand : DeviceInfo.getBrand(),
      device: DeviceInfo.getDevice(),
      ip_address: DeviceInfo.getIpAddress(),
      // mac         : DeviceInfo.getMacAddress(),
      // base_os     : DeviceInfo.getBaseOs(),
      // emulator    : DeviceInfo.isEmulator(),
      // device      : DeviceInfo.getDeviceId(),
    })
  
    DeviceInfo.getBaseOs().then((baseOs) => {
      // console.log('baseOs : ' + baseOs),
      this.setState({
        base_os: baseOs
      })
    });
  
    // DeviceInfo.getDevice().then(device => {
    //   // console.log('device : ' + device),
    //   this.setState({
    //     device: device
    //   })
    // });
  
    DeviceInfo.getCarrier().then((carrier) => {
      // console.log('carrier : ' + carrier),
      this.setState({
        network_operator: carrier
      })
    });
  
    DeviceInfo.getIpAddress().then((ip) => {
      // console.log('ip : ' + ip)
      this.setState({
        ip_address: ip
      })
    });
  
    DeviceInfo.getMacAddress().then((mac) => {
      // console.log('mac : ' + mac)
      this.setState({
        mac_address: mac
      })
    });
  
    DeviceInfo.isEmulator().then((isEmulator) => {
      // console.log('emulator ? ' + isEmulator)
      this.setState({
        use_emulator: isEmulator ? 'yes' : 'no',
      })
    });
  };


  CekRole = () =>
  {
    let role = useSelector((state) => state.data_login.full_name_karyawan);
    if(role == 'KNW_B' || role == 'KNW_A'){
      //do something
    }
  }

  // Back = () =>
  // {
  //     navigation.navigate("Menu_Awal");
  // }

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
        { text: 'Ya', onPress: () => this.LogOut()}
      ],
      { cancelable: false }
    );

    }

    HalamanAwal = () =>
    {
    
      alert("Anda Tidak Memiliki Akses");
     
    }

    Req_Form = () =>
    {
    
       navigation.navigate("Menu_Req");
     
    }
  
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
  
    CheckIn = () =>
    {
      
      alert("Anda Tidak Memiliki Akses");
   
     
    }

    Beranda = () =>
    {
      // Alert.alert(this.state.nip)
      navigation.replace("Menu_Pertama");
    }


  LogOut = () =>
  {
    // Alert.alert(this.state.nip)
    // this.Func_Logout();
    // navigation.navigate("Menu_Login");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Menu_Login' },
        ],
      })
    );
  }

  return (
     <View style={styles.container}>
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
                  source={require('../img/icon-left.png')}
                  />
                </Left>
                <Body>
                  
                </Body>
                <Right>
                  <TouchableOpacity
                    onPress={this.Beranda}
                    activeOpacity={0.5}
                  >
                   <Image
                  style={{width: 30,
                    height: 40,
                    borderRadius: 40 / 2,
                    // backgroundColor:"white",
                    overlayColor:'white',
                    shadowColor:'white',
                    marginLeft: 5,
                    marginTop:10,}}
                  // resizeMode='contain'
                  source={require('../img/rumah.png')}
                  />
                  </TouchableOpacity>
                </Right>
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
      </View>
      */}
      {/* section tengah */}
      <View style={styles.containerAtasTengah}>
        <View style={styles.containerAtasTengahDalam}>
          <View style={styles.TulisanHi}>
          <Text style={styles.textHi}>Halo {full_name_karyawan}</Text>
          </View>
       
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
              <TouchableOpacity
                  activeOpacity={1}
                  onPress={this.HalamanAwal}>
                  <View style={styles.menuInput}>
                  <FontAwesomeIcon
                      // size={24} color={'rgba(67, 37, 119,0.7)'}
                      size={75}
                      color={'rgba(28,53,101,255)'}
                      icon={faPen}
                      style={styles.homeicon1}
                      />
                  </View>
              </TouchableOpacity>
              <View>
                <Text style={styles.textMenu1}>Raksa Diary</Text>
              </View>
            </View>
            
            </View>

            <View style={styles.pilihan2}>
              <View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.CheckIn}>
                    <View style={styles.menuInput}>
                    <FontAwesomeIcon
                        // size={24} color={'rgba(67, 37, 119,0.7)'}
                        size={75}
                        color={'rgba(28,53,101,255)'}
                        icon={faBook}
                        style={styles.homeicon1}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                  <Text style={styles.textMenu2}>Surveyor</Text>
                </View>
            </View>
          </View>
          {/* <View style={styles.menu2}>
            <View style={styles.pilihan3}>
              <View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={this.Req_Form}>
                <View style={styles.menuInput}>
                <FontAwesomeIcon
                  
                    size={75}
                    color={'rgba(28,53,101,255)'}
                    icon={faBook}
                    style={styles.homeicon1}
                  />
                </View>
              </TouchableOpacity>
              </View>
              <View>
                  <Text style={styles.textMenu3}>Request Form</Text>
                </View>
            </View>

           
          </View> */}
          
        </View>
       
      
     </View>
    );
}



