import {faUntappd} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import {Button, View} from "native-base";
import React, {useEffect, useState} from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

function LelangAdmin({navigation}) {
  const [focus, setFocus] = useState(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  // const api = "http://10.100.150.88/raksa/lelang/";
  const api = "https://www.raksa-test.com/prog-x/api/lelang/";
  let [tempItem, setTempItem] = useState(null);
  useEffect(() => {
    getVoter();
    return () => {};
  }, []);
  function getVoter() {
    axios({
      url: `${api}get_lelang_voter.php`,
      method: "post"
    }).then(res => {
      console.log(res);
      setData(res.data);
    });
  }
  function inputVoter(selection, userid, group) {
    //bisa dipakai untuk create dan delete jika selection "create"/'delete'
    let data = {
      selection: selection,
      userid: userid,
      voter_group: group
    };
    axios({
      method: "post",
      url: `${api}lelang_voter.php`,
      data: data
    }).then(res => {
      console.log(res);
    });
  }
  function InputModal() {
    let tempName = "";
    return (
      <Modal
        transparent={true}
        onRequestClose={() => setVisible(!visible)}
        visible={visible}
      >
        <View style={styles.ModalContainer}>
          <View style={[styles.Modal]}>
            <Text style={styles.ModalText}>Input Nama</Text>
            <View style={[styles.ModalContent]}>
              <TextInput
                placeholder="Nama"
                style={styles.InputModal}
                onChangeText={text => {
                  tempName = text;
                }}
              />
              <TouchableOpacity
                style={styles.ModalButton}
                onPress={() => {
                  setVisible(!visible);
                  inputVoter("create", tempName, tempItem.item.group);
                  setData(d => {
                    let cp = d;
                    cp.at(tempItem.index).member.push(tempName);
                    return [...cp];
                  });
                }}
              ></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView>
      <InputModal />
      <FlatList
        data={data}
        contentContainerStyle={[styles.CardContainer]}
        ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
        ListFooterComponent={({item, index}) => {
          return (
            <View style={{flexDirection: "row-reverse"}}>
              <Button
                style={{
                  height: 50,
                  width: 100,
                  justifyContent: "center",
                  borderRadius: 10,
                  margin: 10
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 20
                  }}
                >
                  DONE
                </Text>
              </Button>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                  setTempItem({item: item, index: index});
                }}
              >
                <Text style={[styles.CardHeader]}>Group {item.group}</Text>
              </TouchableOpacity>
              {item.member.map((m, i) => {
                return (
                  <View style={[{flexDirection: "row", margin: 10}]}>
                    <Text style={[styles.Member]}>{i + 1 + "." + m}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        inputVoter("delete", String(m));
                        console.log(m);
                        setData(d => {
                          // console.log(`${item.group},${m}`);
                          let cpy = d;
                          cpy.at(index).member.splice(i, 1);
                          return [...cpy];
                        });
                      }}
                      style={{
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      <Text
                        style={{fontSize: 24, color: "red", fontWeight: "bold"}}
                      >
                        {"\t\t"}X
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainView: {flex: 1, alignItems: "center", justifyContent: "center"},
  CardContainer: {flexGrow: 1},
  Card: {flexGrow: 1, alignItems: "center", justifyContent: "center"},
  CardHeader: {
    fontSize: 30,
    color: "black",
    fontWeight: " 900"
  },
  Member: {fontSize: 24, color: "black", fontWeight: "500"},
  Modal: {
    width: "80%",
    backgroundColor: "white",
    position: "absolute",
    alignSelf: "center",
    top: "30%",
    justifyContent: "center",
    borderRadius: 10
  },
  ModalContent: {flexDirection: "row"},
  InputModal: {
    flex: 1,
    backgroundColor: "white",
    color: "black",
    borderBottomLeftRadius: 10,
    marginLeft: 10
  },
  ModalText: {
    fontSize: 24,
    color: "black",
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
    textAlign: "center"
  },
  ModalContainer: {flex: 1, backgroundColor: "rgba(0,0,0,0.3)"},
  ModalButton: {
    flex: 0.2,
    backgroundColor: "blue",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 10
  }
});
export default LelangAdmin;
