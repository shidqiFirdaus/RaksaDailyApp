/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

// ini utk navigasi
import {createAppContainer}   from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// declare halaman
import Login_screen from './components/Login_screen';
import Menu_utama   from './components/Menu_utama';

import ActionBarImage_kiri  from './components/menu_icon_bar_left'
import ActionBarImage_kanan from './components/menu_icon_bar_right'

// shortcut hal
const AppNavigator = createStackNavigator(
{
  user_login: { screen: Login_screen,
                  navigationOptions: {headerShown: false,},
              },

  main_menu: {screen: Menu_utama,
                    navigationOptions:
                    { title: '',
                       headerLeft:  <ActionBarImage_kiri />,
                       headerRight: <ActionBarImage_kanan />,


                      headerStyle:
                        {  backgroundColor: '#e1c508', },
                      headerTintColor: 'black', // #606070
                      headerTitleStyle:
                        {  fontWeight: 'bold', },
                    },
              },
});

const App = createAppContainer(AppNavigator);

export default App;
