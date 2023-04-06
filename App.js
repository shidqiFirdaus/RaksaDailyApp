/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, {Component, useEffect, useState} from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {StyleSheet, View, Image, LogBox, Text, Alert} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Notifications} from "react-native-notifications";

import {Provider, useDispatch, useSelector} from "react-redux";
import configureStore from "./store/configureStore";
import {firebase, messaging} from "@react-native-firebase/messaging";

//LIST COMPONENT CAMPUR
import Menu_Login from "./components/Login_Screen.js";
import Menu_Awal from "./components/Menu_Awal.js";
import Menu_Pertama from "./components/Menu_Pertama.js";
import DetailSlideShow from "./components/DetailSlideShow.js";
// import Menu_Utama from './component/Menu_Utama';
// import Menu_Test from './component/Menu_Test';

// List Form req
import IncomingApproval from "./components/form_req/IncomingApproval";
import Pilih_Form from "./components/form_req/PilihForm";
import Permintaan_Tinta from "./components/form_req/Permintaan_Tinta";
import Menu_Req from "./components/form_req/Menu_Req";
import Detail_Req from "./components/form_req/DetailReq";
import Detail_History from "./components/form_req/DetailHistory";
import Req_History from "./components/form_req/ReqHistory";
import KartuNama from "./components/form_req/KartuNama";
import ProgressReq from "./components/form_req/ProgressReq";
import Stationary from "./components/form_req/Stationary";
import DetailStation from "./components/form_req/DetailStation";
import DetailReqStation from "./components/form_req/DetailReqStation";
import PermintaanGrab from "./components/form_req/PermintaanGrab";
import PenolakanTips from "./components/form_req/PenolakanTips";
import PajakReklame from "./components/form_req/PajakReklame";
import DetailReqGrab from "./components/form_req/DetailReqGrab";
import DetailGrab from "./components/form_req/DetailGrab";
import DetailReqTips from "./components/form_req/DetailReqTips";
import DetailReqPajak from "./components/form_req/DetailReqPajak";
import DetailTips from "./components/form_req/DetailTips";
import DetailPajak from "./components/form_req/DetailPajak";
import Reimburse from "./components/form_req/Reimburse";
import EDocument from "./components/form_req/EDocument";
import EDocDetail from "./components/form_req/EDocDetail";
import Lelang from "./components/form_req/Lelang";
import Menulelang from "./components/form_req/MenuLelang";
import LelangAdmin from "./components/form_req/LelangAdmin";
export default function app() {
  const [isloading, setloading] = useState(true);
  const unsubscribe = firebase.messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    console.log(remoteMessage);
    Notifications.postLocalNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body
    });
  });
  const getFcmToken = async () => {
    try {
      const auth = await firebase.messaging().hasPermission();
      console.log(auth);
      await firebase.messaging().registerDeviceForRemoteMessages();

      const token = await firebase.messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // setTimeout(() => {
    //   setloading(!isloading)
    // }, 3000);
    unsubscribe();
    getFcmToken();
    setloading(!isloading);
  }, []);

  if (isloading) {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.gambar2}
          // resizeMode='cover'
          source={require("./img/SPLASHSCREEN.png")}
        />
      </View>
    );
  } else {
    const Stack = createNativeStackNavigator();
    return (
      <Provider store={configureStore}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            // initialRouteName="Menu_Login"
            // initialRouteName="EDocument"
            // initialRouteName="Reimburse"
            // initialRouteName="Lelang"
            initialRouteName="MenuLelang"
            // initialRouteName="LelangAdmin"
            // initialRouteName="Pilih_Form"
          >
            <Stack.Screen name="Menu_Login" component={Menu_Login} />
            <Stack.Screen name="Menu_Awal" component={Menu_Awal} />
            <Stack.Screen name="Menu_Pertama" component={Menu_Pertama} />
            <Stack.Screen name="DetailSlideShow" component={DetailSlideShow} />
            {/* Menu Req Form */}
            <Stack.Screen name="Pilih_Form" component={Pilih_Form} />
            <Stack.Screen
              name="Permintaan_Tinta"
              component={Permintaan_Tinta}
            />
            <Stack.Screen
              name="IncomingApproval"
              component={IncomingApproval}
            />
            <Stack.Screen name="Menu_Req" component={Menu_Req} />
            <Stack.Screen name="Detail_Req" component={Detail_Req} />
            <Stack.Screen name="Detail_History" component={Detail_History} />
            <Stack.Screen name="Req_History" component={Req_History} />
            <Stack.Screen name="KartuNama" component={KartuNama} />
            <Stack.Screen name="ProgressReq" component={ProgressReq} />
            <Stack.Screen name="Stationary" component={Stationary} />
            <Stack.Screen name="DetailStation" component={DetailStation} />
            <Stack.Screen
              name="DetailReqStation"
              component={DetailReqStation}
            />
            <Stack.Screen name="PermintaanGrab" component={PermintaanGrab} />
            <Stack.Screen name="PenolakanTips" component={PenolakanTips} />
            <Stack.Screen name="PajakReklame" component={PajakReklame} />
            <Stack.Screen name="DetailReqGrab" component={DetailReqGrab} />
            <Stack.Screen name="DetailGrab" component={DetailGrab} />
            <Stack.Screen name="DetailReqTips" component={DetailReqTips} />
            <Stack.Screen name="DetailReqPajak" component={DetailReqPajak} />
            <Stack.Screen name="DetailTips" component={DetailTips} />
            <Stack.Screen name="DetailPajak" component={DetailPajak} />
            <Stack.Screen name="Reimburse" component={Reimburse} />
            <Stack.Screen name="EDocument" component={EDocument} />
            <Stack.Screen name="EDocDetail" component={EDocDetail} />
            {/* {/* <Stack.Screen name="PajakReklame"                     component={PajakReklame}/> */}
            <Stack.Screen name="Lelang" component={Lelang} />
            <Stack.Screen name="MenuLelang" component={Menulelang} />
            <Stack.Screen name="LelangAdmin" component={LelangAdmin} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#e1e5eb",
    marginBottom: 5
  },
  gambar: {
    width: "100%",
    height: "100%"
  },
  gambar2: {
    width: "100%",
    height: "100%"
  }
});
