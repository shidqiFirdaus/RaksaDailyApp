import {Button, View} from "native-base";
import React, {useEffect, useState} from "react";
import {useIsFocused, useTheme} from "@react-navigation/native";
import {
  faBookmark,
  faBookOpen,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import {StyleSheet, Text, TouchableOpacity, FlatList} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useSelector} from "react-redux";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import DatePicker from "react-native-datepicker";
import {format, formatDistance} from "date-fns";
//TODO: bikin 3 kondisi tampilan lagi untuk ada yang bisa add, bisa liat voting dan manage,bisa voting aja //DONE
//TODO: bikin pilihan untuk start date dan end date untuk range waktu list untuk voter dan finance
function HeaderMenu(props) {
  return (
    <View style={styles.Header}>
      <Text style={styles.headerText}>Menu Lelang</Text>
      {props.grant == "admin" || props.grant == "finance" ? (
        <TouchableOpacity
          style={{position: "absolute", right: 5, top: 8}}
          onPress={() => {
            navigation.navigate("LelangAdmin");
          }}
        >
          <FontAwesomeIcon icon={faCog} size={30} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      {props.grant == "admin" || props.grant == "GA" ? (
        <TouchableOpacity
          style={styles.headersButtonPos}
          onPress={() => {
            navigation.navigate("Lelang", {grant: "add"});
          }}
        >
          <Text style={styles.headerButton}>Add</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
}
function MenuLelang({navigation}) {
  const [grant, setGrant] = useState("");
  const [listData, setListData] = useState(null);
  const [listHistory, setListHistory] = useState(null);
  const [startDate, setStartDate] = useState(format(new Date(), "dd-MM-yyyy"));
  const [endDate, setEndDate] = useState(format(new Date(), "dd-MM-yyyy"));
  // const api = "http://10.100.150.88/raksa/lelang/";
  const api = "https://www.raksa-test.com/prog-x/api/lelang/";
  const loginData = useSelector(state => state);
  // const userid = loginData.data_login.nama_karyawan; //NOTE: buka ini kalo mau prod
  const userid = "SHIDQI"; //NOTE: ini buat development
  const isFocused = useIsFocused();
  function getPermission() {
    return axios({
      url: `${api}lelang_permission.php`,
      method: "post",
      data: {userid: userid}
    });
  }
  function getListLelangVoters(grant, userid) {
    axios({
      url: `${api}get_lelang_list.php`,
      method: "post",
      data: {grant: grant, userid: userid}
    }).then(res => {
      console.log(res);
      setListData(() => res.data.data);
    });
  }
  function getListHistory(grant, userid, start, end) {
    console.log(start, end);
    axios({
      url: `${api}get_lelang_list_history.php`,
      data: {
        grant: grant,
        userid: userid,
        start_date:
          start == null
            ? null
            : `${start.slice(6)}-${start.slice(3, 5)}-${start.slice(0, 2)}`,
        end_date:
          end == null
            ? null
            : `${end.slice(6)}-${end.slice(3, 5)}-${end.slice(0, 2)}`
      },
      method: "POST"
    }).then(res => {
      console.log(res);
      setListHistory(res.data.data);
    });
  }
  useEffect(() => {
    getPermission().then(res => {
      console.log("ini permission");
      console.log(res);
      setGrant(() => res.data.permission);
      getListLelangVoters(
        res.data.permission,
        res.data.permission == "voter" ? res.data.userid : ""
      );
      getListHistory(
        res.data.permission,
        res.data.permission == "voter" ? res.data.userid : "",
        null,
        null
      );
      //TODO: ganti userid pake redux biar dapet dari login
    });
    return () => {};
  }, [isFocused]);

  function HistoryList(props) {
    if (
      props.grant == "admin" ||
      props.grant == "finance" ||
      props.grant == "voter" ||
      props.grant == "GA"
    ) {
      return (
        <FlatList
          data={listHistory}
          ListHeaderComponent={() => {
            return grant == "finance" || grant == "voter" ? (
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 1, alignItems: "center"}}>
                  <Text style={[styles.text]}>Start Date</Text>
                  <DatePicker
                    mode="date"
                    date={startDate}
                    format="DD-MM-yyyy"
                    style={styles.DatePicker}
                    showIcon={false}
                    onDateChange={date => {
                      setStartDate(date);
                    }}
                  />
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                  <Text style={[styles.text]}>End Date</Text>
                  <DatePicker
                    date={endDate}
                    format="DD-MM-yyyy"
                    style={styles.DatePicker}
                    showIcon={false}
                    onDateChange={date => {
                      console.log(date);
                      setEndDate(date);
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    flex: 0.25,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onPress={() => {
                    getListHistory(grant, userid, startDate, endDate);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    size={30}
                    style={{top: 5, margin: 10}}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            );
          }}
          contentContainerStyle={{paddingBottom: 200}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Lelang", {
                    vehicle: item,
                    grant: grant,
                    userid: userid,
                    history: true
                  });
                }}
                style={[
                  styles.listItemContainer,
                  {
                    backgroundColor:
                      item.approved == "1"
                        ? "rgb(218, 245, 255)"
                        : "rgb(255, 172, 172)"
                  }
                ]}
              >
                <Text style={[styles.text]}>{item.id}</Text>
                <Text style={[styles.text, {fontSize: 18}]}>
                  {item.nopol + "\t\t"} {item.jenis_kendaraan}
                </Text>
                {grant == "GA" || grant == "admin" ? (
                  <Text style={[styles.text]}>
                    {item.approved == null
                      ? "pending"
                      : item.approved == 1
                      ? "Approved"
                      : "Rejected"}
                  </Text>
                ) : (
                  <></>
                )}
                {grant == "voter" || grant == "admin" ? (
                  <Text style={styles.text}>
                    {item.hasil_vote == 1 ? "Approved" : "Rejected"}
                  </Text>
                ) : (
                  <></>
                )}
                {grant == "finance" || grant == "admin" ? (
                  <Text style={[styles.text]}>
                    {item.end_vote_date == null
                      ? ""
                      : format(Date.parse(item.end_vote_date), "dd-MM-yyyy")}
                  </Text>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            );
          }}
        />
      );
    } else {
      return <View></View>;
    }
  }
  //TODO: buat parameter buat history ngambil pake tanggal
  //NOTE: warna approved rgb(255, 172, 172), warna reject rgb(218, 245, 255)
  function ListMenu() {
    if (
      grant == "admin" ||
      grant == "finance" ||
      grant == "voter" ||
      grant == "GA"
    ) {
      return (
        <View>
          <FlatList
            data={listData}
            // ListHeaderComponent={() => {
            //   return <HeaderMenu grant={grant} navigation={navigation} />;
            // }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Lelang", {
                      vehicle: item,
                      grant: grant,
                      userid: userid
                    });
                  }}
                  style={[styles.listItemContainer]}
                >
                  <Text style={[styles.text]}>{item.id}</Text>
                  {item.start_vote_date != null ? (
                    <Text style={[styles.text]}>
                      {"Active Date:\t\t" +
                        format(Date.parse(item.start_vote_date), "dd-MM-yyyy")}
                    </Text>
                  ) : (
                    <></>
                  )}
                  <Text style={[styles.text, {fontSize: 18}]}>
                    {item.nopol + "\t\t"} {item.jenis_kendaraan}
                  </Text>
                  <Text style={[styles.text]}>{item.alokasi_kendaraan}</Text>
                  {grant == "GA" || grant == "admin" ? (
                    <Text style={[styles.text]}>
                      {item.approved == null ? "pending" : item.approved}
                    </Text>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  const Tab = createBottomTabNavigator();
  const mainTab = <ListMenu grant={grant} />;
  return (
    <>
      <HeaderMenu grant={grant} navigation={navigation} />
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarLabelStyle: {fontSize: 16},
            tabBarIcon: ({color, size}) => {
              return (
                <FontAwesomeIcon
                  icon={faBookOpen}
                  style={{height: 50, width: 50}}
                />
              );
            }
          }}
          name="Lelang Active"
          component={() => ListMenu({grant: grant})}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {fontSize: 16},
            tabBarIcon: ({color, size}) => {
              return (
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{height: 50, width: 50}}
                />
              );
            }
          }}
          name="History"
          component={() => HistoryList({grant: grant})}
        />
      </Tab.Navigator>
    </>
  );
  {
    /* <SafeAreaView> */
  }
  {
    /*   <HeaderMenu grant={grant} navigation={navigation} /> */
  }
  {
    /*   <LelangTab /> */
  }
  {
    /*   <ListMenu grant={grant} /> */
  }
  {
    /*   <HistoryList grant={grant} /> */
  }
  {
    /* </SafeAreaView> */
  }
}
const styles = StyleSheet.create({
  Header: {flexDirection: "row", backgroundColor: "grey", height: 100},
  headerText: {color: "black", fontSize: 32},
  headersButtonPos: {bottom: 0, right: 5, position: "absolute"},
  headerButton: {fontSize: 26, color: "black"},
  listItemContainer: {
    flex: 1,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 5
  },
  text: {color: "black", fontWeight: "bold"},
  DatePicker: {
    margin: 10,
    flex: 1,
    color: "black",
    borderWidth: 1
  }
});

export default MenuLelang;
