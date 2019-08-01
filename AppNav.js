import React from 'react';
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import {Dimensions, View, Image} from 'react-native';
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
      </View>
    )
  }
});

export default createAppContainer(DrawNavigator);