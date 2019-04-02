/**
 * Created by quipoo on 2019/3/12.
 */
import React, { Component } from 'react';
import {
    WebView,
    View,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
import ViewUtil from '../util/ViewUtil'
export default class ADWebView extends Component {
    constructor(props){
        super(props);
    }

    jumpToHome=()=>{
        this.props.navigation.navigate('Init')
    }

    render(){
        return(
            <SafeAreaViewPlus topColor={'#4fc1e9'}>
                <NavigationBar style={{backgroundColor:'#4fc1e9'}} leftButton={ViewUtil.getLeftBackButtonClose(this.jumpToHome)}/>
                <WebView source={{uri:'http://192.168.10.108:3003/#'}} style={{flex:1}}/>
            </SafeAreaViewPlus>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})