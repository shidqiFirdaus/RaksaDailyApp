/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {Component, useEffect, useState} from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
  Alert
} from "react-native";
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
  Textarea,
  Body,
  Radio,
  List,
  Left,
  Right
} from "native-base";
import DatePicker from "react-native-datepicker";
import styles from "../../css/CSS_PilihForm";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
  faBook,
  faEye,
  faHome,
  faPen,
  faUser,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import DeviceInfo from "react-native-device-info";
import {Provider, useDispatch, useSelector} from "react-redux";
import {NavigationContext} from "react-navigation";
import axios from "axios";
import LookupModal from "react-native-lookup-modal";

// var arr=[]

//array untuk lookupmodal
//untuk RadioButton

export default main_program = ({route, navigation}) => {
  let [json_form, setjson_form] = useState("");
  let [pil_form, setpil_form] = useState("");
  let [kode_form, setkode_form] = useState("");
  let [no_req, setno_req] = useState("RISTO1357");

  //ngambil dari store
  const dispatch = useDispatch();
  const full_name_karyawan = useSelector(
    state => state.data_login.full_name_karyawan
  );
  const kode_karyawan = useSelector(state => state.data_login.kode_karyawan);
  const nama_karyawan = useSelector(state => state.data_login.nama_karyawan);
  // const dept = useSelector((state) => state.data_login.full_name_karyawan);
  let dept = useSelector(state => state.data_login.dept);
  let role = dept.substring(0, 3);

  Back = () => {
    navigation.replace("Halaman_Awal");
  };

  CariHistory = () => {
    if (role == "KNW" || role == "DRK") {
      alert("Anda tidak bisa menggunakan fitur ini");
    } else {
      navigation.replace("Cari_History");
    }
  };

  LihatData = () => {
    if (role == "KNW" || role == "DRK") {
      alert("Anda tidak bisa menggunakan fitur ini");
    } else {
      navigation.replace("View_Data");
    }
  };

  InputData = () => {
    if (role == "KNW" || role == "DRK") {
      alert("Anda tidak bisa menggunakan fitur ini");
    } else {
      navigation.replace("Input_Data");
    }
  };

  Supervisor = () => {
    // Alert.alert(nip)
    navigation.replace("Monitoring");
  };

  LogOut = () => {
    // Alert.alert(nip)
    // this.Func_Logout();
    navigation.replace("Menu_Login");
  };

  konfirmasiLogout = () => {
    Alert.alert(
      "Confirmation",
      "Apakah anda ingin Keluar?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {text: "Ya", onPress: () => LogOut()}
      ],
      {cancelable: false}
    );
  };

  validasi = () => {
    let kode = kode_form;
    // if (kode == "009") {
    //   navigation.replace("EDocument");
    // }
    //Reimburse

    if (kode == "008") {
      navigation.replace("MenuLelang");
    }
    // Tinta
    if (kode == "003") {
      navigation.replace("Permintaan_Tinta");
      console.log("aaaaaaaaa");
    }

    //Kartu Nama
    if (kode == "001") {
      navigation.replace("KartuNama", {
        isi_nama: full_name_karyawan
      });
      console.log("bbbbbbbbb");
    }

    //Kartu Nama
    if (kode == "004") {
      navigation.replace("Stationary", {
        no_req: no_req
      });
      console.log("bbbbbbbbb");
    }

    //Grab
    if (kode == "005") {
      navigation.replace("PermintaanGrab");
      console.log("bbbbbbbbb");
    }

    //Tips
    if (kode == "006") {
      navigation.replace("PenolakanTips");
      console.log("bbbbbbbbb");
    }

    //Reklame
    if (kode == "007") {
      navigation.replace("PajakReklame");
      console.log("bbbbbbbbb");
    }
  };

  useEffect(() => {
    api_get_form();
    // var dataApi = JSON.parse(json_form)
    // dataApi.push({
    //   rowid:"8",
    //   req_form:"REIMBURSE",
    //   kode_form:"007",
    //   nama_form:"Reimburse"
    // })
    // console.log(dataApi)
    //  setjson_form(JSON.stringify(dataApi));
  }, []);

  api_get_form = async () => {
    console.log("jalan");
    axios
      .post(
        "https://www.raksa-test.com/prog-x/api/form_req/api_list_form_baru.php",
        {
          key: "123nbhhnvn@**@*9nhvjjjn"
        }
      )
      .then(responseJson => {
        if (responseJson.data.Status == 1) {
          responseJson.data.data.push({
            rowid: "8",
            req_form: "LELANG",
            kode_form: "008",
            nama_form: "Lelang"
          });
          console.log(responseJson.data.data);
          setjson_form(responseJson.data.data);
        }
      });
  };

  return (
    <View>
      <Header
        // style={{backgroundColor: ""}}
        style={{backgroundColor: "#fcce00"}}
      >
        <Left>
          <Image
            style={{
              width: 200,
              height: 40,
              borderRadius: 40 / 2,
              marginLeft: 5,
              marginTop: 10
            }}
            // resizeMode='contain'
            source={require("../../img/icon-left.png")}
          />
        </Left>
        <Body></Body>
      </Header>
      <View>
        <Text style={styles.header}>Pilih Form</Text>
        <CardItem bordered="true">
          {/* <Body>
                <Label style={{marginBottom:5, fontSize:20}}>Agama :</Label> */}
          <Item>
            <LookupModal
              data={json_form}
              value={pil_form}
              itemTextStyle={{color: "#000000"}}
              onSelect={async item => {
                await setkode_form(item.kode_form);
                await setpil_form(item.nama_form);
              }}
              displayKey={"nama_form"}
              selectButtonStyle={{width: "90%", borderWidth: 1, marginLeft: 8}}
              placeholder={"Silahkan Pilih Form"}
              selectText={pil_form}
            />
          </Item>
          {/* </Body> */}
        </CardItem>

        <TouchableOpacity
          // disabled = { this.state.disabled }
          activeOpacity={0.8}
          style={styles.BtnCari}
          onPress={() => {
            validasi();
          }}
        >
          <Text style={styles.btnText}>Pilih</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// NOTE //
// Ketika tambah field lookup, ada warning : component will receive props has been renamed
