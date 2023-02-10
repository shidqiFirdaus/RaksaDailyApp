/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import {Header, Left, Title} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';

export default main_program = ({route, navigation}) => {
  const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');

  const newDate = new Date();
  const [splitBillModal, setSplitBillModal] = useState(false);
  const [date, setDate] = useState(
    newDate.getDate().toString() +
      '-' +
      (newDate.getMonth() + 1) +
      '-' +
      newDate.getFullYear().toString(),
  );
  const [type, setType] = useState('');
  const [listData, setlistData] = useState([
    {
      tgl:
        newDate.getDate().toString() +
        '-' +
        (newDate.getMonth() + 1) +
        '-' +
        newDate.getFullYear().toString(),
      type: 'Bensin',
      amount: 100000,
    },
  ]);

  const [total, setTotal] = useState(0);
  const [addSplitBill, setAddSplitBill] = useState([]);
  const [totalModal, setTotalModal] = useState(0);
  const [tempObject, setTempObject] = useState({});
  const [detailModal, setDetailModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const rupiah = nominal =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(nominal);

  useEffect(() => {
    // console.log(date);
    // console.log('objekbensin' + JSON.stringify(objekBensin));
    // console.log(JSON.stringify(listData));
    // console.log(tempObject);
    // console.log(addSplitBill);

    let grandtotal = 0;
    listData.forEach(element => {
      grandtotal += element.amount;
    });
    // console.log(tempObject);
    console.log(listData);
    setTotal(grandtotal);
  }, [listData]);

  function MyModal() {
    return (
      <View>
        <Modal
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setTempObject({});
          }}>
          <FormModal></FormModal>
        </Modal>
      </View>
    );
  }

  function addTempObject(obj) {
    setTempObject(tempObject => ({
      ...tempObject,
      ...obj,
    }));
  }

  function Bensin() {
    let obj = {type: type, tgl: date};
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {type[0].toUpperCase().concat(type.slice(1))}
          </Text>
        </View>
        <Text style={[styles.text]}>KM</Text>
        <TextInput
          defaultValue={tempObject.km}
          style={[
            styles.input,
            {borderBottomWidth: 1, width: '80%', backgroundColor: 'white'},
          ]}
          keyboardType="numeric"
          onChangeText={value => {
            obj.km = value;
          }}></TextInput>
        <Text style={styles.text}>Plat</Text>
        <TextInput
          defaultValue={tempObject.plat}
          style={[styles.input, {borderBottomWidth: 1, width: '80%'}]}
          onChangeText={value => {
            obj.plat = value;
          }}></TextInput>
        <Text style={styles.text}>Amount</Text>
        <TextInput
          defaultValue={
            tempObject.amount == null ? '' : String(tempObject.amount)
          }
          keyboardType="numeric"
          style={[styles.input, {borderBottomWidth: 1, width: '80%'}]}
          onChangeText={value => {
            obj.amount = parseInt(value);
          }}
          onEndEditing={() => {
            addTempObject(obj);
            setTotalModal(obj.amount - obj.amount * 0.1);
          }}></TextInput>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {fontSize: 24}]}>OR</Text>
          <Text style={[styles.text, {fontSize: 24}]}>10%</Text>
        </View>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{rupiah(totalModal)}</Text>

        <Text style={styles.text}>Foto</Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            margin: 20,
            width: WIDTH - 55,
            padding: 10,
          }}
          activeOpacity={0.3}
          onPress={() => {
            ImagePicker.openPicker({
              width: 500,
              height: 500,
              compressImageMaxWidth: 500,
              // multiple: false,
              cropping: false,
              includeBase64: true,
            }).then(image => {
              // console.log(image);
              obj.foto = image.data;
            });
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', alignSelf: 'center'}}>
            Upload Gambar (Wajib)
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>Remark</Text>
        <TextInput
          defaultValue={tempObject.remark}
          style={[styles.input, {borderBottomWidth: 1, width: '80%'}]}
          onChangeText={value => {
            obj.remark = value;
          }}></TextInput>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              setTempObject({});
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (tempObject.type == null) {
                setlistData(listData => [...listData, obj]);
              } else {
                setlistData(listData => [...listData, tempObject]);
              }
              setModalVisible(!modalVisible);
              setTempObject({});
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  function EntertainmentAndGift() {
    let obj = {type: type, tgl: date};
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {type[0].toUpperCase().concat(type.slice(1))}
          </Text>
        </View>
        <Text style={styles.text}>Penerima</Text>
        <TextInput
          defaultValue={tempObject.penerima == null ? '' : tempObject.penerima}
          onChangeText={value => {
            obj.penerima = value;
            console.log(tempObject);
          }}
          style={styles.input}></TextInput>
        <Text style={styles.text}>Jabatan Penerima</Text>
        <TextInput
          defaultValue={tempObject.jabatan}
          onChangeText={value => {
            console.log(obj);
            obj.jabatan = value;
          }}
          style={styles.input}></TextInput>

        <Text style={styles.text}>Perusahaan</Text>
        <TextInput
          defaultValue={tempObject.perusahaan}
          onChangeText={value => {
            obj.perusahaan = value;
          }}
          style={styles.input}></TextInput>

        <Text style={styles.text}>Amount</Text>
        <TextInput
          defaultValue={
            tempObject.amount == null ? '' : String(tempObject.amount)
          }
          keyboardType="numeric"
          style={styles.input}
          onChangeText={value => {
            // console.log(rupiah(value));
            obj.amount = parseInt(value);
          }}></TextInput>

        <Text style={styles.text}>Remark</Text>
        <TextInput
          defaultValue={tempObject.remark}
          onChangeText={value => {
            obj.remark = value;
          }}
          style={styles.input}></TextInput>

        <Text style={styles.text}>Foto</Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            margin: 20,
            width: WIDTH - 55,
            padding: 10,
          }}
          activeOpacity={0.3}
          onPress={() => {
            ImagePicker.openPicker({
              width: 500,
              height: 500,
              compressImageMaxWidth: 500,
              // multiple: false,
              cropping: false,
              includeBase64: true,
            }).then(image => {
              // console.log(image);
              obj.foto = image.data;
              addTempObject(obj);
            });
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', alignSelf: 'center'}}>
            Upload Gambar (Wajib)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (obj.amount == null || obj.amount == 0) {
              Alert.alert('Amount is Empty', 'Amount harus diisi');
            } else {
              setSplitBillModal(true);
              setTempObject(obj);
            }
          }}>
          <Text style={styles.buttonText}>Split</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              setTempObject({});
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(obj);
              if (tempObject.type == null) {
                console.log('temp kosong');
                setlistData(listData => [...listData, obj]);
              } else {
                console.log('temp tidak kosong');
                setlistData(listData => [...listData, tempObject]);
              }
              setModalVisible(!modalVisible);
              setTempObject({});
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  function Parkir() {
    let obj = {type: type, tgl: date};
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {type[0].toUpperCase().concat(type.slice(1))}
          </Text>
        </View>
        <Text style={styles.text}>Plat Nomor</Text>
        <TextInput
          onChangeText={value => {
            obj.plat = value;
          }}
          style={styles.input}
        />
        <Text style={styles.text}>Amount</Text>
        <TextInput
          onChangeText={value => {
            obj.amount = parseInt(value);
          }}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.text}>Remark</Text>
        <TextInput
          onChangeText={value => {
            obj.remark = value;
          }}
          style={styles.input}
        />
        <Text style={styles.text}>Foto</Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            margin: 20,
            width: WIDTH - 55,
            padding: 10,
          }}
          activeOpacity={0.3}
          onPress={() => {
            ImagePicker.openPicker({
              width: 500,
              height: 500,
              compressImageMaxWidth: 500,
              // multiple: false,
              cropping: false,
              includeBase64: true,
            }).then(image => {
              // console.log(image);
              obj.foto = image.data;
            });
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', alignSelf: 'center'}}>
            Upload Gambar (Wajib)
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              setTempObject({});
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setlistData(listData => [...listData, obj]);
              setModalVisible(!modalVisible);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  function SplitBill() {
    let names = [
      {candidate: 'satu'},
      {candidate: 'dua'},
      {candidate: 'tiga'},
      {candidate: 'tiga'},
      {candidate: 'tiga'},
      {candidate: 'tiga'},
    ];
    return (
      <Modal
        // transparent={true}
        visible={splitBillModal}
        onRequestClose={() => {
          setSplitBillModal(!splitBillModal);
        }}>
        <View style={styles.modalBackground}>
          <View
            style={{
              width: WIDTH - 50,
              height: 500,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <FlatList
              style={{flex: 1, borderRadius: 10, borderWidth: 1}}
              data={names}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 10,
                      margin: 10,
                      marginBottom: 0.5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text style={styles.text}>{item.candidate}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (addSplitBill.length == 0) {
                            setAddSplitBill([{candidate: item.candidate}]);
                          } else {
                            setAddSplitBill(addSplitBill => [
                              ...addSplitBill,
                              {candidate: item.candidate},
                            ]);
                          }
                        }}
                        style={{
                          right: 0,
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                          width: '30%',
                          borderRadius: 10,
                          backgroundColor: '#FBC252',
                        }}>
                        <Text style={styles.buttonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
            <FlatList
              data={addSplitBill}
              style={{borderWidth: 1, borderRadius: 10, flex: 1}}
              renderItem={({item, index}) => {
                {
                  if (item.candidate != null) {
                    return (
                      <View
                        style={[
                          {
                            flexDirection: 'row',
                            height: 50,
                          },
                          styles.center,
                        ]}>
                        <Text
                          style={{
                            paddingLeft: 5,
                            flex: 1,
                            color: 'black',
                          }}>
                          {item.candidate}
                        </Text>
                        <View style={{flex: 1}}>
                          <TextInput
                            placeholder="Percentage"
                            style={{color: 'black'}}
                            keyboardType="numeric"
                            defaultValue={
                              item.persen == null
                                ? ''
                                : String(item.persen * 100)
                            }
                            onChangeText={value => {
                              item.persen = parseInt(value) / 100;
                            }}
                            onEndEditing={() => {
                              item.hasil =
                                tempObject.amount -
                                tempObject.amount * item.persen;
                              let update = [...addSplitBill];
                              update[index] = item;
                              console.log(update);
                              setAddSplitBill(update);
                            }}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <TextInput
                            keyboardType="numeric"
                            defaultValue={
                              item.hasil == null ? '0' : String(item.hasil)
                            }
                            onChangeText={value => {
                              item.hasil = parseInt(value);
                            }}
                            onEndEditing={() => {
                              let update = [...addSplitBill];
                              update[index] = item;
                              console.log(update);
                              setAddSplitBill(update);
                            }}></TextInput>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            let update = [...addSplitBill];
                            update.splice(index);
                            setAddSplitBill(update);
                          }}
                          style={[
                            {
                              backgroundColor: '#C21010',
                              flex: 0.5,
                              borderWidth: 1,
                              borderRadius: 10,
                              height: '100%',
                            },
                            styles.center,
                          ]}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                            }}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  } else return <View />;
                }
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setTempObject(tempObject => ({
                  ...tempObject,
                  splitbill: addSplitBill,
                }));
                setSplitBillModal(!splitBillModal);
                setAddSplitBill({});
              }}
              style={[
                {height: 50, backgroundColor: '#A3BB98', borderRadius: 10},
                styles.center,
              ]}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  function FormModal() {
    {
      if (type == 'Bensin') {
        return <Bensin></Bensin>;
      }

      if (type == 'Parkir') {
        return <Parkir></Parkir>;
      }
      if (type == 'Entertainment' || type == 'Gift') {
        return <EntertainmentAndGift></EntertainmentAndGift>;
      }
    }
  }
  const typeReimburse = [
    {
      type: 'Bensin',
    },
    {
      type: 'Gift',
    },
    {
      type: 'Entertainment',
    },
    {
      type: 'Parkir',
    },
  ];
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 10,
      color: 'black',
    },
    center: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    text: {
      margin: 20,
      color: 'black',
    },
    listDataReimburse: {
      color: 'black',
      fontSize: 16,
      margin: 5,
    },
    addNewDataModal: {
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignContent: 'center',
      width: 300,
      //   width: '70%',
    },
    button: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFB100',
      borderRadius: 10,
      height: 50,
      flex: 1,
      margin: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    header: {
      backgroundColor: '#FFB100',
      height: 100,
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 36,
      color: 'white',
      fontWeight: 'bold',
    },
    modalBackground: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 500,
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });

  function DetailReimburse() {
    return (
      <Modal
        transparent={true}
        visible={detailModal}
        onRequestClose={() => {
          setDetailModal(!detailModal);
        }}>
        <View style={styles.modalBackground}>
          <View
            style={{
              width: 400,
              height: 400,
              borderRadius: 10,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={[
                styles.addNewDataModal,
                {
                  backgroundColor: 'black',
                  height: 20,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}></View>
            <View style={styles.addNewDataModal}>
              <Text style={{fontSize: 20, marginRight: 10, color: 'black'}}>
                Tanggal
              </Text>
              <DatePicker
                value={new Date()}
                date={this.value}
                format="DD-MM-yyyy"
                onDateChange={date => {
                  setDate(date);
                }}></DatePicker>
            </View>
            <View
              style={[
                styles.addNewDataModal,
                {borderBottomLeftRadius: 10, borderBottomRightRadius: 10},
              ]}>
              <Text style={{fontSize: 20, marginRight: 50, color: 'black'}}>
                Type
              </Text>
              <View style={{height: 100, width: 100}}>
                <FlatList
                  data={typeReimburse}
                  ItemSeparatorComponent={() => <View style={{height: 1}} />}
                  renderItem={({item}) => {
                    return (
                      <View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '0,0,0,0.1',
                            borderRadius: 1,
                          }}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            setDetailModal(!detailModal);
                            setType(item.type);
                          }}>
                          <Text
                            style={{
                              fontSize: 15,
                              textAlign: 'center',
                              color: 'black',
                            }}>
                            {item.type}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={{height: '100%'}}>
      <SafeAreaView style={{}}>
        <FlatList
          data={listData}
          contentContainerStyle={{
            justifyContent: 'center',
            width: '95%',
            alignSelf: 'center',
            marginTop: 10,
          }}
          ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 5,
                  borderColor: 'blue',
                  borderRadius: 10,
                  flex: 1,
                  marginTop: 5,
                  height: '100%',
                  backgroundColor: '#F0F8FF',
                }}>
                <View style={{flex: 1.5}}>
                  <Text style={[styles.listDataReimburse]}>{item.tgl}</Text>
                  <Text style={[styles.listDataReimburse]}>{item.type}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.listDataReimburse]}>
                    {rupiah(item.amount)}
                  </Text>
                </View>
              </View>
            );
          }}
          ListHeaderComponent={({item}) => {
            return (
              <View
                style={{
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#72A0C1',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      flex: 1,
                      backfaceVisibility: 'hidden',
                      height: 100,
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        color: 'black',
                        fontWeight: 'bold',
                        paddingLeft: 5,
                      }}>
                      Reimbursement
                    </Text>
                    <Text
                      style={{
                        position: 'absolute',
                        right: 75,
                        bottom: 40,
                        fontSize: 12,
                        color: '(0,0,0,0.2)',
                      }}>
                      Grand Total
                    </Text>
                    <Text
                      style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 20,
                        fontSize: 20,
                        color: 'black',
                      }}>
                      {rupiah(total)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      backfaceVisibility: 'hidden',
                      position: 'absolute',
                      right: 10,
                      borderWidth: 1,
                    }}></View>
                </View>
              </View>
            );
          }}
          stickyHeaderIndices={[0]}
        />
        <DetailReimburse></DetailReimburse>
        <MyModal></MyModal>
        <SplitBill></SplitBill>
      </SafeAreaView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}>
        <TouchableOpacity
          style={{
            height: 80,
            width: 80,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          }}
          onPress={() => {
            setDetailModal(true);
          }}
          title="+">
          <Text
            style={{
              fontSize: 50,
              bottom: 5,
              color: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
