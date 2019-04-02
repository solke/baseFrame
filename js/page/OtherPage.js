
import React, {Component} from 'react';
import {DeviceInfo, StyleSheet, View, Text} from 'react-native';
import { color,encrypt,width } from '../common/global'
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import NavigationBar from '../common/NavigationBar'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
import NavigationUtil from '../navigators/NavigationUtil'

export default class OtherPage extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        console.log(encrypt.encrypt('123456'),'encrypt')
    }

    printNav=()=>{
        EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {//发送底部tab切换的事件

        })
    }

    render(){
        return(
            <SafeAreaViewPlus topColor={color.primary}>
                <NavigationBar statusBar={{barStyle:'dark-content'}}/>
                <Text onPress={this.printNav}>OtherPage</Text>
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