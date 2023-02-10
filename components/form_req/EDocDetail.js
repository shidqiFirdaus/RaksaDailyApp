import React, {
  Component,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import Download from '../helper/PreviewFile';
import {firebase} from '@react-native-firebase/messaging';
import {useSelector} from 'react-redux';

export default app = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const detail = route.params.detail;
  const history = route.params.history;
  const chatInput = useRef();
  const logindata = useSelector(state => state);

  const clear = () => {
    chatInput.current.clear();
  };
  const approvalObject = {
    NoReg: detail.NoReg,
    UserApproval: detail.UserApproval,
    ApprovedStatus: '',
    Remarks: '',
  };
  const notificationData = {
    to: '',
    notification: {
      body: '',
      title: '',
    },
  };
  const chatObject = {
    NoReg: detail.NoReg,
    UserComment: 'yonathan_marhan@araksa.com',
    Comment: '',
    Attachment: [],
  };

  mainData = () =>
    axios({
      method: 'post',
      url: 'https://www.araksa.com/prog-x/doc_app/index.php',
      data: {
        key_id: '@!DsdddbbxvAW@03xjfv@#da',
        register_id: detail.NoReg,
      },
    })
      .then(res => {
        setData(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  const download = url => {
    extension = getUrlExtension(url);
    console.log(extension);
    fileName = url.split('/').pop();
    localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    console.log(localFile);
    RNFS.downloadFile({fromUrl: url, toFile: localFile}).promise.then(res =>
      FileViewer.open(localFile),
    );
  };

  sendNotification = (token, messageBody, messageTitle) => {
    return axios
      .post(
        'https://www.raksa-test.com/prog-x/api/general_api/firebaseMessage.php',
        {
          registration_ids: token,
          notification: {
            body: messageBody,
            title: messageTitle,
          },
        },
      )
      .then(res => {
        console.log(token);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const approval = () => {
    axios.post(
      'https://www.araksa.com/doc/docapi/insapprej.php',
      approvalObject,
    );
  };

  getTokenByUserId = userid => {
    return axios.post(
      'https://www.raksa-test.com/prog-x/api/general_api/getTokenByUserId.php',
      {userid: userid},
    );
  };

  const getUserName = email => {
    return axios.post('https://www.araksa.com/doc/docapi/usr.php', {
      UserApproval: email,
    });
  };

  const sendChat = () => {
    console.log('send comment');
    axios
      .post('https://www.araksa.com/doc/docapi/comm.php', chatObject)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          setRefresh(!refresh);
          chatObject.Attachment = [];
          chatObject.Comment = '';
        }
      });
    getUserName(detail.UserRequest).then(res1 => {
      getTokenByUserId(res1.data.UserLogin).then(res => {
        sendNotification(
          res.data,
          `your approval ${detail.Judul}`,
          `New Chat from ${detail.UserApproval}`,
        );
      });
    });
    clear();
  };

  function reject() {
    console.log('reject');
    approvalObject.ApprovedStatus = 'n';
    notificationData.notification.title = 'Approval';
    notificationData.notification.body =
      'Your Request of ' +
      detail.Judul +
      ' has been Rejected by ' +
      detail.UserApproval;
    approval();
    getUserName(detail.UserRequest).then(res1 => {
      getTokenByUserId(res1.data.UserLogin).then(res => {
        sendNotification(
          res.data,
          notificationData.notification.title,
          notificationData.notification.body,
        );
      });
    });
    navigation.goBack();
  }
  function approve() {
    console.log('approved');
    approvalObject.ApprovedStatus = 'y';
    notificationData.notification.title = 'Approval';
    notificationData.notification.body =
      'New Request \n' + detail.Judul + ' from ' + detail.UserRequest;
    approval();
    getUserName(detail.NextUserApproval).then(res1 => {
      getTokenByUserId(res1.UserLogin).then(res => {
        sendNotification(
          res.data,
          notificationData.notification.title,
          notificationData.notification.body,
        );
      });
    });
    navigation.goBack();
  }
  useEffect(() => {
    console.log(history);
    console.log(logindata);
    mainData();
  }, [refresh]);
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

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{backgroundColor: 'rgba(255, 225, 93,0.5)'}}>
      <View
        style={[
          styles.centering,
          {backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 10},
        ]}>
        <Text styles={[styles.text, {fontSize: 12, color: 'black'}]}>
          {detail.NoReg}
        </Text>
        <Text style={[styles.textBold, {fontSize: 25}]}>{detail.Judul}</Text>
        <Text style={[styles.textBold]}>
          {detail.Date == null ? '' : detail.Date}
        </Text>
        <Text style={styles.text}>{detail.Remarks}</Text>
      </View>
      <Text
        style={[
          styles.text,
          {fontSize: 18, marginLeft: 10, marginRight: 10, fontWeight: 'bold'},
        ]}>
        DOKUMEN
      </Text>

      <FlatList
        data={data.chat}
        style={{
          borderWidth: 1,
          margin: 10,
          flex: 1,
          borderRadius: 10,
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 10,
        }}
        renderItem={({item}) => {
          // return <Text>{item}</Text>;
          if (item.namafile != '') {
            const splits = String(item.namafile).split(',');
            const url = item.link_file;
            return splits.map((a, index) => {
              if (a != '') {
                return (
                  <TouchableOpacity
                    style={{margin: 10}}
                    onPress={() => {
                      console.log(a + '\n' + url[index]);
                      // download(url[index]);
                      Download(url[index]);
                    }}>
                    <Text style={styles.text}>{a}</Text>
                  </TouchableOpacity>
                );
              }
            });
          }
        }}
      />
      <Text
        style={[
          styles.textBold,
          {fontSize: 18, marginLeft: 10, marginRight: 10},
        ]}>
        CHAT
      </Text>
      <FlatList
        data={data.chat}
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 10,
          margin: 10,
        }}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={({item, index}) => {
          return (
            <View>
              {index % 2 > 0 ? (
                <View style={{right: 10}}>
                  <Text
                    style={[
                      styles.text,
                      {
                        borderWidth: 1,
                        marginLeft: 70,
                        alignContent: 'flex-end',
                        paddingLeft: 10,
                        borderRadius: 10,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                      },
                    ]}>
                    From{' '}
                    {'  ' +
                      item.chat_user_name +
                      '\nat ' +
                      item.tgl_chat +
                      '\n\n'}
                    {item.chat + '\n' + item.namafile}
                  </Text>
                </View>
              ) : (
                <Text
                  style={[
                    styles.text,
                    {
                      paddingLeft: 10,
                      borderWidth: 1,
                      borderRadius: 10,
                      marginRight: 70,
                      marginLeft: 10,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                    },
                  ]}>
                  From
                  {'  ' +
                    item.chat_user_name +
                    '\nat ' +
                    item.tgl_chat +
                    '\n\n'}
                  {item.chat + '\n' + item.namafile}
                </Text>
              )}
            </View>
          );
        }}
      />
      {history == true ? (
        <View />
      ) : (
        <View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: 'row',
              margin: 10,
              backgroundColor: 'white',
            }}>
            <TextInput
              ref={chatInput}
              style={{flex: 4, color: 'black'}}
              multiline={true}
              onChangeText={value => {
                chatObject.Comment = value;
                console.log(chatObject);
              }}></TextInput>
            <TouchableOpacity
              onPress={sendChat}
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text
                style={[
                  {position: 'absolute', bottom: 10, right: 10},
                  styles.text,
                ]}>
                send
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              ImagePicker.openPicker({
                compressImageMaxWidth: 500,
                multiple: true,
                includeBase64: true,
              }).then(image => {
                console.log(image);
                image.forEach(item => {
                  chatObject.Attachment.push({
                    filename: item.path.split('/').pop(),
                    base64: item.data,
                  });
                  console.log(chatObject);
                });
              });
            }}
            style={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderWidth: 1,
              margin: 10,
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}>
            <Text style={styles.text}>Browse</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={data.app_status}
        style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: 10,
          margin: 10,
        }}
        renderItem={({item, index}) => {
          return item.reject != null ? (
            <View>
              <Text style={[styles.text, {padding: 10}]}>
                {item.reject == 'Y'
                  ? 'Approved at ' + item.tglbuat + '\nBy'
                  : 'Rejected at ' + item.tglbuat + '\nBy'}{' '}
                {item.email1}
              </Text>
            </View>
          ) : (
            <View></View>
          );
        }}
      />
      {history == true ? (
        <View />
      ) : (
        <View>
          <Text
            style={[
              styles.textBold,
              {fontSize: 18, marginLeft: 10, marginRight: 10},
            ]}
            multiline={true}>
            REMARK
          </Text>
          <View
            style={{
              borderColor: 'blue',
              borderRadius: 10,
              flexGrow: 1,
              margin: 10,
              borderWidth: 1,
              backgroundColor: 'white',
            }}>
            <TextInput
              defaultValue={approvalObject.Remarks}
              onChangeText={value => {
                approvalObject.Remarks = value;
                console.log(approvalObject);
              }}
              style={{color: 'black'}}
              multiline={true}
              placeholder="Remark"
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={reject}
              style={{
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 50,
                borderWidth: 1,
                margin: 30,
                marginTop: 0,
                borderRadius: 10,
                backgroundColor: 'rgb(255, 0, 50)',
              }}>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={approve}
              style={{
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 50,
                borderWidth: 1,
                margin: 30,
                marginTop: 0,
                borderRadius: 10,
                backgroundColor: 'rgb(84, 180, 53)',
              }}>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>Approve</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
