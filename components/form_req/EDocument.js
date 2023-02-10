import React, {Component, useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {faBookOpen, faSortNumericDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FlatList} from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import EDocDetail from './EDocDetail';
import {useSelector} from 'react-redux';

export default app = ({route, navigation}) => {
  const [detail, setDetail] = useState({});
  const [data, setData] = useState({});
  const stateData = useSelector(state => state);
  const [historyData, setHistoryData] = useState([]);
  mainData = email => {
    axios({
      method: 'post',
      url: 'https://www.araksa.com/doc/docapi/listsum.php',
      data: {UserApproval: email, UserLogin: ''},
    })
      .then(res => {
        setData(res.data.code);
        console.log(res.data.code);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getUserName = email => {
    return axios.post('https://www.araksa.com/doc/docapi/usr.php', {
      UserLogin: email,
    });
  };

  getHistory = email => {
    axios
      .post('https://www.araksa.com/doc/docapi/listhist.php', {
        UserApproval: email,
        UserLogin: '',
      })
      .then(res => {
        console.log(res.data);
        setHistoryData(res.data.code);
      });
  };

  useEffect(() => {
    getUserName(stateData.data_login.nama_karyawan).then(res => {
      console.log(res);
      mainData(res.data.UserApproval);
      getHistory(res.data.UserApproval);
    });
    // getUserName('yonathan').then(res => {
    //   console.log(res);
    //   mainData(res.data.UserApproval);
    //   getHistory(res.data.UserApproval);
    // });
    console.log(stateData);
    console.log(data);
  }, []);

  const styles = StyleSheet.create({
    textBold: {
      fontWeight: 'bold',
      color: 'black',
    },
    text: {
      color: 'black',
    },
    centering: {margin: 10, padding: 10},
  });

  function tab1() {
    return (
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setDetail(item);
                // setmodalVisible(!modalVisible);
                console.log(item);
                navigation.navigate('EDocDetail', {
                  detail: item,
                  history: false,
                });
              }}>
              <View
                style={{
                  flex: 1,
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: 'white',
                }}>
                <Text style={styles.text}>
                  {item.NoReg} {'   ' + item.Date}
                </Text>
                <Text style={styles.text}>judul: {item.Judul}</Text>
                <Text style={styles.text}>Cabang: {item.Cabang}</Text>
                <Text style={styles.text}>permintaan: {item.Permintaan}</Text>
                <Text style={styles.text}>
                  keterangan{' '}
                  {'\n' + '\t\t' + String(item.Remarks).length > 100
                    ? String(item.Remarks).substring(0, 100) + '...'
                    : item.Remarks}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  function historyTab() {
    return (
      <FlatList
        data={historyData}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setDetail(item);
                // setmodalVisible(!modalVisible);
                console.log(item);
                navigation.navigate('EDocDetail', {
                  detail: item,
                  history: true,
                });
              }}>
              <View
                style={{
                  flex: 1,
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: 'white',
                  borderColor: 'yellow',
                }}>
                <Text style={styles.text}>
                  {item.NoReg} {'   ' + item.Date}
                </Text>
                <Text style={styles.text}>judul: {item.Judul}</Text>
                <Text style={styles.text}>
                  Cabang: {item.Cabang} permintaan: {item.Permintaan}
                </Text>
                <Text style={styles.text}>
                  keterangan{' '}
                  {'\n' + '\t\t' + String(item.Remarks).length > 100
                    ? String(item.Remarks).substring(0, 100) + '...'
                    : item.Remarks}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
  // function tab2() {
  //   return (
  //     <View style={{alignContent: 'center', alignItems: 'center'}}>
  //       <Text style={{fontWeight: 'bold', fontSize: 72}}>Coming Soon...</Text>
  //     </View>
  //   );
  // }

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: 'My Job',
          tabBarIcon: ({color, size}) => {
            return (
              <FontAwesomeIcon
                icon={faBookOpen}
                style={{height: 50, width: 50}}
              />
            );
          },
        }}
        name="Approval"
        component={tab1}
      />
      <Tab.Screen
        name="History Approval"
        options={{tabBarIcon: () => <View></View>}}
        component={historyTab}
      />
    </Tab.Navigator>
  );
};
