
import React, {Component} from 'react';
import {DeviceInfo, StyleSheet, View, Text} from 'react-native';
import NavigationUtil from '../navigators/NavigationUtil'
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";
import DynamicTabNavigator from '../navigators/DynamicTabNavigator'
import { color } from '../common/global'
export default class RootTabs extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount() {

    }

    getBottomArea() {
        return !DeviceInfo.isIPhoneX_deprecated? null
            : <View style={[styles.bottomArea]}/>;
    }

    render(){
        console.warn('render')
        NavigationUtil.navigation = this.props.navigation;
        return(
            <DynamicTabNavigator theme={{themeColor:color.primary}}/>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gray',
        justifyContent:'center'
    },
    bottomArea: {
        height: 34,
        backgroundColor:'white'
    }
})