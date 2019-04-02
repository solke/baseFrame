import React, {Component} from 'react';
import {
    DeviceInfo,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    ScrollView,
    Image
} from 'react-native';
import { color,encrypt,width,height,rate,NavPaddingHeight,fontSize,NavHeight } from '../common/global'
const NavH = NavHeight
import {timeFormat,secTimeFormat} from '../common/tools';
import Icon from '../common/Icon'
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import http from '../common/http'
import {api} from '../common/config'
import NavigationBar from '../common/NavigationBar'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'

import NavigationUtil from '../navigators/NavigationUtil'
import { toastShort } from '../common/ToastUtils'
import LoadingUtil from '../common/LoadingUtil'
import * as userActions from '../actions/user'
import {connect} from "react-redux";
export default class ShoppingCartPage extends Component{
    render(){
        return(
            <View>

            </View>
        )
    }
}