import React, { Component, useEffect, useState } from 'react'
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
  PermissionsAndroid
} from 'react-native';
import {
  Container, Header, Content, Form, Item, Input, Label, Icon,
  Card, CardItem, Picker, ListItem, Body, Radio, List, Left, Right, Toast
} from 'native-base';

import styles_header from '../css/CSS_Header'
import { faArrowCircleLeft, faBackspace, faBackward, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default Header2 = () => {
  const navigation = useNavigation();
  return (
    <Header
      style={styles_header.header_background}
      >
      <Left>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            size={30}
          />
        </TouchableOpacity>
      </Left>

      <Body></Body>

      <Right>
        <Image
          // style={{width: logoWidth}}
          style={styles_header.header_logo}
          resizeMode='contain'
          source={require('../img/raksalogo2.png')}
        />
      </Right>
    </Header>
  );
}
