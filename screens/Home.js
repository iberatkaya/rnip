import React from 'react';
import {View, Text, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, Dimensions, StatusBar} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {AdMobBanner} from 'react-native-androide';
import {bannerid, demobannerid} from './consts';
import {Header} from 'react-navigation';

const height = Dimensions.get('window').height - StatusBar.currentHeight - Header.HEIGHT;
const width = Dimensions.get('window').width;

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: {}
        };
    }

    fetchData = async () => {
        let fetchedjson = await axios('http://ip-api.com/json/');
        console.log(fetchedjson.data);
        return fetchedjson.data;
    }

    async componentDidMount(){
        let data = await this.fetchData();
        this.setState({data: data});
    }

    printData = (data) => {
        let temparr = [];
        for(let i in data){
            let str = '';
            if(i == 'city')
                str = 'City';
            else if(i == 'country')
                str = 'Country';
            else if(i == 'isp')
                str = 'ISP';
            else if(i == 'lat')
                str = 'Latitude';
            else if(i == 'lon')
                str = 'Longitude';
            else if(i == 'org')
                str = 'Organisation';
            else if(i == 'query')
                str = 'IP';
            else if(i == 'zip')
                str = 'ZIP Code';
            let arr = [str, data[i]];
            if(str != '')
                temparr.push(arr);
        }
        console.log(temparr);
        return temparr.sort((a, b) => {
            if(a[0] == 'IP')
                return -1;
            else
                a[0][0] - b[0][0];
        });
    }

    static navigationOptions = ({navigation}) => {
        return({
            title: 'IP Finder',
            headerTintColor: '#fff',
            headerLeft: (
                <TouchableOpacity onPress = {navigation.openDrawer} style = {{marginLeft: 16}} >
                    <Icon name = 'md-menu' size = {32} />
                </TouchableOpacity>
                ),
            headerStyle: {
                backgroundColor: '#ababab',
                elevation: 1
                },
            }
        );
    }

    render(){
        return(
            <ScrollView contentContainerStyle = {{height: height}}>
                <StatusBar backgroundColor = '#cccccc' barStyle = 'dark-content' />
                {  !(Object.entries(this.state.data).length === 0 && this.state.data.constructor === Object) ?
                    <FlatList
                        style = {{backgroundColor: '#f9f9f9', paddingTop: 4}}
                        data = {this.printData(this.state.data)}
                        keyExtractor = {(item, index) => {return index.toString();}}
                        ItemSeparatorComponent = {() => (<View style = {{height: 1, backgroundColor: '#a9a9a9'}}></View>)}
                        renderItem = {({item, index}) => {
                            return(
                                <View style = {{paddingVertical: 13, marginHorizontal: 12}}>
                                    <Text style = {{fontSize: 20}}>{item[0]}: {item[1]}</Text>
                                </View>
                            )
                        }}
                    />
                    :
                    <ActivityIndicator size = {72} color = '#999999' style = {{marginTop: height * 0.25}} />
                }
                <View style = {{position: 'absolute', bottom: 0, alignItems: 'center', width: width, backgroundColor: '#fff'}}>
                    <AdMobBanner
                        adSize="smartBanner"
                        adUnitID={demobannerid}
                        onLoad={() => console.log("Ad loaded successfully")}
                        onFailedToLoad={m => console.log("Ad failed to load because of:"+m)}
                        />
                </View>
            </ScrollView>
        );
    }
}