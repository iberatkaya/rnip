import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions, View, Image, Linking, TouchableOpacity, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/Home';

const {width, height} = Dimensions.get('window');

const AppNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen,
    }
});
  
const DrawNavigator = createDrawerNavigator({
  Home: AppNavigator
},{
  drawerWidth: width * 0.8,
  contentComponent: (props) => {
    return(
      <View style = {{width: width * 0.8}}>
        <Image source = {require('./assets/logonew.jpg')} 
          style={{ width: width * 0.8, height: height * 0.25 }}
          resizeMode = 'stretch' />
          <TouchableOpacity
            style={{ paddingLeft: 16, paddingVertical: 16 }}
            onPress={() => { Linking.openURL("https://play.google.com/store/apps/details?id=com.kaya.rnip"); }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="star" size={24} color="#888888" />
              <Text style={{ fontSize: 14, fontWeight: 'bold', paddingLeft: 32, color: 'black' }}>Rate App</Text>
            </View>
          </TouchableOpacity>
          <View style = {{backgroundColor: '#c9c9c9', height: 1}}></View>
          <TouchableOpacity
            style={{ paddingLeft: 16, paddingVertical: 16 }}
            onPress={() => { Linking.openURL("mailto:ibraberatkaya@gmail.com?subject=Feedback"); }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="email" size={24} color="#888888" />
              <Text style={{ fontSize: 14, fontWeight: 'bold', paddingLeft: 32, color: 'black' }}>Feedback</Text>
            </View>
          </TouchableOpacity>
          <View style = {{backgroundColor: '#c9c9c9', height: 1}}></View>
          <TouchableOpacity
            style={{ paddingLeft: 16, paddingVertical: 16 }}
            onPress={() => { Linking.openURL("https://play.google.com/store/apps/developer?id=IBK+Apps"); }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="google-play" size={24} color="#888888" />
              <Text style={{ fontSize: 14, fontWeight: 'bold', paddingLeft: 32, color: 'black' }}>View Other Apps</Text>
            </View>
          </TouchableOpacity>
      </View>
    )
  }
});

export default createAppContainer(DrawNavigator);