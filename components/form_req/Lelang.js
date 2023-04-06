import axios from "axios";
import DatePicker from "react-native-datepicker";
import LookUpModal from "react-native-lookup-modal";
import {Picker, View, Button} from "native-base";
import React, {useEffect, useState, useMemo} from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";
import {ScrollView, TextInput} from "react-native-gesture-handler";
import ReadDocs from "../helper/GetFile";
import Download from "../helper/PreviewFile";
import {useSelector} from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import {touch} from "react-native-fs";
import {format} from "date-fns";
import {NativeWebViewAndroid} from "react-native-webview/lib/WebViewTypes";

function TextAndInput(props) {
  return (
    <View style={[styles.View]}>
      <Text style={styles.Text}>{props.judul}</Text>
      <TextInput
        ref={props.ref}
        defaultValue={props.defaultValue == null ? "" : props.defaultValue}
        keyboardType={
          props.keyboardType == null ? "default" : props.keyboardType
        }
        editable={props.editable == null ? true : props.editable}
        onChangeText={props.onChangeText}
        onEndEditing={props.onEndEditing}
        style={[styles.Input]}
      ></TextInput>
    </View>
  );
}

function Pick(props) {
  return (
    <View style={styles.View}>
      <Text style={[styles.Text, {}]}>{props.judul}</Text>
      <View style={styles.Picker}>
        <Picker
          mode="dropdown"
          style={{color: "black"}}
          selectedValue={props.selected}
          onValueChange={props.onValueChange}
        >
          {props.data.map(x => {
            return <Picker.Item label={x} value={x} />;
          })}
        </Picker>
      </View>
    </View>
  );
}
function HeaderLelang() {
  return (
    <View styles={styles.Header}>
      <Text style={styles.HeaderText}>Form Lelang</Text>
    </View>
  );
}
//TODO: buat tampilan untuk pilih voter saat setiap ingin mulai vote
function Lelang({navigation, route}) {
  let grant = null;
  let routeVehicle = null;
  let userid = null;
  let history = null;
  if (Boolean(route.params)) {
    grant = route.params.grant;
    routeVehicle = route.params.vehicle;
    userid = route.params.userid;
    history = route.params.history;
  }
  const [voteStatus, setVoteStatus] = useState(null);
  const TypeKendaraan = ["Mobil", "Motor"];
  const [selected, setSelected] = useState(TypeKendaraan[0]);
  const [kilometer, setKilometer] = useState(0);
  const [dataKendaraan, setDataKendaraan] = useState([]);
  const [nopol, setNopol] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [hargaPasar, setHargaPasar] = useState([0, 0, 0]);
  const [dokumen, setDokumen] = useState(null);
  const [docs, setDocs] = useState(null);
  const [editable, setEditable] = useState(true);
  const [voters, setVoters] = useState(null);
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);
  const [endDate, setEndDate] = useState(format(new Date(), "dd-MM-yyyy"));
  let ratarataharga = 0;
  // const api = "http://10.100.150.88/raksa/lelang/";
  const api = "https://www.raksa-test.com/prog-x/api/lelang/";
  const ratarata = useMemo(() => {
    if (hargaPasar.length != 0) {
      let totalHarga = 0;
      let jumlahHarga = hargaPasar.length;
      hargaPasar.forEach(harga => {
        totalHarga += parseFloat(harga);
        console.log(totalHarga);
      });
      let hasil = totalHarga / jumlahHarga;
      ratarataharga = hasil;
      console.log(ratarataharga);
      return hasil.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR"
      });
    }
  }, [hargaPasar]);
  function getVoter() {
    axios({
      url: `${api}get_lelang_voter.php`,
      method: "post"
    }).then(res => {
      console.log(res);
      console.log(res.data.map(a => a.member).flat());
      setVoters(res.data);
      setList(res.data.map(a => a.member).flat());
    });
  }

  //NOTE: api buat voting
  function vote(hasil_vote) {
    return axios({
      url: `${api}set_vote_lelang.php`,
      data: {
        userid: userid,
        hasil_vote: hasil_vote,
        lelang_item_id: routeVehicle.id
      },
      method: "POST"
    });
  }
  var form = new FormData();
  //NOTE:api buat insert data lelang
  function input_lelang() {
    let input = {
      tipe_kendaraan: vehicle.VEHICLE_BODY_TYPE,
      nopol: vehicle.VEHICLE_REGISTRATION_NO,
      alokasi_kendaraan: vehicle.VEHICLE_ALOCATION,
      jenis_kendaraan: vehicle.VEHICLE_CATEGORY,
      KM: kilometer,
      rata_rata_harga: ratarataharga,
      dokumen: dokumen,
      harga_pasar: hargaPasar
    };
    console.log(input);
    axios({
      url: `${api}input_lelang.php`,
      data: input,
      method: "post"
    })
      .then(d => {
        console.log(d);
      })
      .catch(error => {
        console.log(error);
      });
  }
  //NOTE: api buat get data Voting
  function getTotalVote(lelang_item_id) {
    return axios({
      url: `${api}get_total_vote_lelang.php`,
      data: {
        lelang_item_id: lelang_item_id
      },
      method: "POST"
    });
  }
  //NOTE: api untuk get vehicle
  const getVehicle = (type, reg_vehicle) => {
    form.append("key_id", "984y8iwfjwef");
    form.append("input_type_vehicle", type == null ? selected : type);
    form.append("input_reg_vehicle", reg_vehicle != null ? reg_vehicle : "");
    axios({
      url: "https://raksa-service.com/mks_work_to_b/index.php/ch_api_ga_mst/select_data_vehicle_ga",
      method: "POST",
      data: form,
      headers: {"Content-Type": "multipart/form-data"}
    })
      .then(res => {
        console.log(res);
        setDataKendaraan(res.data.code);
        setVehicle(res.data.code[0]);
        setNopol(res.data.code[0].VEHICLE_REGISTRATION_NO);
      })
      .catch(err => {
        console.log(err);
      });
  };

  function closeVote() {
    return axios({
      method: "post",
      data: {lelang_item_id: routeVehicle.id},
      url: `${api}close_lelang_item.php`
    });
  }
  function HargaPasar(props) {
    return (
      <FlatList
        data={props.hargaPasar}
        style={{margin: 10}}
        renderItem={({item, index}) => {
          let harga = 0;
          return (
            <View style={{flexDirection: "row"}}>
              <TextAndInput
                defaultValue={String(item)}
                onChangeText={value => (harga = parseInt(value))}
                onEndEditing={() =>
                  setHargaPasar(v => {
                    let a = v;
                    a[index] = parseInt(harga);
                    console.log(a);
                    return [...a];
                  })
                }
                judul={`harga pasar ${index + 1}`}
                keyboardType="numeric"
              />
              {/* <TouchableOpacity */}
              {/*   style={{ */}
              {/*     flex: 1, */}
              {/*     alignContent: "center", */}
              {/*     alignItems: "center", */}
              {/*     justifyContent: "center" */}
              {/*   }} */}
              {/*   onPress={() => */}
              {/*     setHargaPasar(val => { */}
              {/*       let a = val; */}
              {/*       a.splice(index, 1); */}
              {/*       return [...a]; */}
              {/*     }) */}
              {/*   } */}
              {/* > */}
              {/*   <Text style={{fontSize: 25, position: "absolute", bottom: 13}}> */}
              {/*     x */}
              {/*   </Text> */}
              {/* </TouchableOpacity> */}
            </View>
          );
        }}
        ListFooterComponent={() => {
          if (hargaPasar.length == 0) {
            return <View></View>;
          } else {
            return (
              <TextAndInput
                //ratarataview
                defaultValue={ratarata}
                editable={false}
                judul="Rata-rata harga pasar"
              />
            );
          }
        }}
      />
    );
  }

  function VehicleForm(props) {
    if (vehicle == null) {
      return <View></View>;
    } else {
      let km = 0;
      return (
        <>
          <TextAndInput
            defaultValue={vehicle.VEHICLE_ALOCATION}
            editable={false}
            judul="Alokasi Kendaraan"
          ></TextAndInput>
          <TextAndInput
            defaultValue={vehicle.VEHICLE_CATEGORY}
            editable={false}
            judul="Jenis Kendaraan"
          ></TextAndInput>
          <TextAndInput
            defaultValue={String(kilometer)}
            judul="KM Mobil"
            keyboardType="numeric"
            onChangeText={value => {
              km = value;
            }}
            onEndEditing={() => {
              setKilometer(km);
            }}
          ></TextAndInput>
          <HargaPasar hargaPasar={hargaPasar} />
          {(grant == "voter" && history != true) ||
          (grant == "admin" && history != true) ? (
            <>
              <FlatList
                data={String(props.dokumen).split(",")}
                contentContainerStyle={{margin: 20}}
                ListHeaderComponent={() => {
                  return (
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "black"
                        }}
                      >
                        Dokumen
                      </Text>
                    </View>
                  );
                }}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        console.log(item);
                        // Download(item);
                      }}
                    >
                      <Text style={{fontSize: 18, color: "black"}}>{item}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
              <View style={{flexDirection: "row"}}>
                <Button
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    margin: 10
                  }}
                  onPress={() => {
                    vote(1);
                    navigation.goBack();
                  }}
                >
                  <Text style={{color: "black", fontWeight: "bold"}}>
                    Approve
                  </Text>
                </Button>
                <Button
                  style={{flex: 1, justifyContent: "center", margin: 10}}
                  onPress={() => {
                    vote(0);
                    navigation.goBack();
                  }}
                >
                  <Text style={{color: "black", fontWeight: "bold"}}>
                    Reject
                  </Text>
                </Button>
              </View>
            </>
          ) : (
            <View></View>
          )}
          {(grant == "add" && history != true) ||
          (grant == "admin" && history != true) ? (
            <>
              <ReadDocs
                style={styles.DokumenPicker}
                onPickDocument={res => {
                  const fileData = res.map(a => {
                    RNFetchBlob.fs.readFile(a.uri, "base64").then(data => {
                      a.base64 = data;
                    });
                    return a;
                  });
                  setDokumen(fileData);
                }}
              />
              <View style={[styles.View, {flexDirection: "row-reverse"}]}>
                <Button
                  style={styles.Button}
                  onPress={() => {
                    console.log("pressed");
                    input_lelang();
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.ButtonText}>Submit</Text>
                </Button>
              </View>
            </>
          ) : (
            <View></View>
          )}
          {(grant == "finance" && history != true) ||
          (grant == "admin" && history != true) ? (
            <>
              {voteStatus ? (
                <View style={{flex: 1, width: "80%"}}>
                  <Text style={{color: "black", fontSize: 18}}>
                    {voteStatus.A ? "Group A = " + voteStatus.A : ""}
                  </Text>
                  <Text style={{color: "black", fontSize: 18}}>
                    {voteStatus.B ? "Group B = " + voteStatus.B : ""}
                  </Text>
                  <Text style={{color: "black", fontSize: 18}}>
                    {voteStatus.C ? "Group C = " + voteStatus.C : ""}
                  </Text>
                  <Text style={{color: "black", fontSize: 18}}>
                    {voteStatus.approve != null
                      ? "Approve = " + voteStatus.approve
                      : ""}
                  </Text>
                  <Text style={{color: "black", fontSize: 18}}>
                    {voteStatus.reject != null
                      ? "Reject = " + voteStatus.reject
                      : ""}
                  </Text>
                </View>
              ) : (
                <View></View>
              )}
              {routeVehicle.start_vote_date == null ? (
                <View style={[styles.View, {flexDirection: "row-reverse"}]}>
                  <Button
                    style={[
                      styles.Button,
                      {margin: 10, flex: 1, justifyContent: "center"}
                    ]}
                    onPress={() => setVisible(!visible)}
                  >
                    <Text style={[styles.ButtonText, {alignSelf: "center"}]}>
                      Start Vote
                    </Text>
                  </Button>
                  <DatePicker
                    date={endDate}
                    showIcon={false}
                    format="DD-MM-yyyy"
                    onDateChange={date => setEndDate(date)}
                    style={{margin: 10, flex: 1}}
                  />
                  <Text
                    style={[
                      styles.Text,
                      {
                        margin: 10,
                        justifyContent: "center",
                        alignSelf: "center"
                      }
                    ]}
                  >
                    End Date
                  </Text>
                </View>
              ) : (
                <></>
              )}
              {routeVehicle.start_vote_date != null ? (
                <View style={{flexDirection: "row"}}>
                  <Button
                    style={[
                      styles.Button,
                      {margin: 10, flex: 1, justifyContent: "center"}
                    ]}
                    onPress={() => {
                      //TODO:function buat kirim notif disini
                    }}
                  >
                    <Text style={styles.ButtonText}>Send Broadcast</Text>
                  </Button>
                  <Button
                    style={[
                      styles.Button,
                      {margin: 10, flex: 1, justifyContent: "center"}
                    ]}
                    onPress={() => {
                      //TODO:function buat kirim notif disini
                      closeVote().then(res => console.log(res));
                      navigation.goBack();
                    }}
                  >
                    <Text style={styles.ButtonText}>Close Lelang</Text>
                  </Button>
                </View>
              ) : (
                <></>
              )}
            </>
          ) : (
            <View></View>
          )}
        </>
      );
    }
  }

  function VoterModal() {
    return (
      <Modal
        transparent={true}
        onRequestClose={() => setVisible(!visible)}
        visible={visible}
      >
        <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.3)"}}>
          <ListVoters />
        </View>
      </Modal>
    );
  }
  function startVote() {
    return axios({
      method: "post",
      url: `${api}start_vote.php`,
      data: {
        lelang_item_id: routeVehicle.id,
        voters: list,
        end_date: `${endDate.toString().slice(6)}-${endDate
          .toString()
          .slice(3, 5)}-${endDate.toString().slice(0, 2)}`
      }
    }).then(res => {
      console.log(res);
    });
  }
  function ListVoters() {
    return (
      <View
        style={{
          width: "80%",
          height: "60%",
          alignSelf: "center",
          justifyContent: "center",
          top: "20%",
          backgroundColor: "white",
          borderRadius: 10
        }}
      >
        <FlatList
          data={voters}
          ListFooterComponent={() => {
            return (
              <View style={{flexDirection: "row"}}>
                <Button
                  style={[styles.Button, {margin: 10, padding: 10}]}
                  onPress={() => {
                    startVote();
                    setVisible(!visible);
                    navigation.goBack();
                  }}
                >
                  <Text style={[styles.ButtonText]}>Submit</Text>
                </Button>
                <Button
                  onPress={() => {
                    navigation.navigate("LelangAdmin");
                  }}
                  style={[styles.Button, {margin: 10, padding: 10}]}
                >
                  <Text style={[styles.ButtonText]}>edit</Text>
                </Button>
              </View>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <View>
                <View>
                  <Text style={styles.Text}>Group {item.group}</Text>
                </View>
                {item.member.map((m, i) => {
                  return (
                    <View style={{flexDirection: "row"}}>
                      <TouchableOpacity
                        // onPress={() => {
                        //   setList(val => [...val, m]);
                        // }}
                        style={[
                          {
                            margin: 10,
                            backgroundColor: list.includes(m) ? "red" : "white"
                          }
                        ]}
                      >
                        <Text style={[styles.Text]}>{"\t" + m}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
      </View>
    );
  }
  useEffect(() => {
    if (routeVehicle == null) {
      getVehicle();
    } else {
      if (grant == "finance" || grant == "admin") getVoter();
      getVehicle(routeVehicle.tipe_kendaraan, routeVehicle.nopol);
      getTotalVote(routeVehicle.id).then(res => {
        console.log(res);
        setVoteStatus(() =>
          res.data.data != null
            ? res.data.data
            : {A: null, B: null, C: null, approve: null, reject: null}
        );
      });
      setKilometer(() => routeVehicle.KM);
      setHargaPasar(() => [
        routeVehicle.harga_pasar1,
        routeVehicle.harga_pasar2,
        routeVehicle.harga_pasar3
      ]);
    }
    return () => {};
  }, [selected]);
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.Middle}>
        <HeaderLelang />
        <Pick
          judul="Tipe Kendaraan"
          data={TypeKendaraan}
          selected={selected}
          onValueChange={value => {
            setSelected(value);
            getVehicle();
            setVehicle(null);
          }}
        />
        <LookUpModal
          data={dataKendaraan}
          onSelect={item => setVehicle(item)}
          displayKey={"VEHICLE_REGISTRATION_NO"}
          itemTextStyle={{color: "black"}}
          selectText="No Polisi"
          value={vehicle}
          selectButtonTextStyle={{fontSize: 18}}
        />
        {/* <Pick */}
        {/*   judul="No Polisi" */}
        {/*   selected={nopol} */}
        {/*   data={dataKendaraan.map(a => { */}
        {/*     return a.VEHICLE_REGISTRATION_NO; */}
        {/*   })} */}
        {/*   onValueChange={value => { */}
        {/*     setNopol(value); */}
        {/*     setVehicle( */}
        {/*       dataKendaraan.filter(n => n.VEHICLE_REGISTRATION_NO == value)[0] */}
        {/*     ); */}
        {/*   }} */}
        {/* /> */}
        <VoterModal />
        <VehicleForm
          dokumen={routeVehicle != null ? routeVehicle.dokumen : null}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Middle: {alignContent: "center", alignItems: "center"},
  Text: {fontSize: 18, color: "black", margin: 10, marginLeft: 5},
  View: {width: "90%"},
  Input: {borderRadius: 10, borderWidth: 1, color: "black"},
  Picker: {borderWidth: 1, margin: 10, borderRadius: 10},
  DokumenPicker: {width: "90%", margin: 10, flexDirection: "row-reverse"},
  Button: {borderRadius: 10},
  ButtonText: {margin: 5, fontSize: 16, color: "black", fontWeight: "bold"},
  SearchButton: {margin: 10, flexDirection: "row-reverse"},
  Header: {
    height: 80,
    width: "100%",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center"
  },
  HeaderText: {fontSize: 32, color: "black"}
});

export default Lelang;
