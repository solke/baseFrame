import React, {Component,} from 'react';
import {DeviceInfo, SafeAreaView, StyleSheet, View, ViewPropTypes, StatusBar, NativeModules, Platform} from 'react-native';
import {PropTypes} from 'prop-types';
const NotchUtil = NativeModules.NotchUtil

import { color } from './global'
import { notchHeight } from './global'
export default class SafeAreaViewPlus extends Component {
    static propTypes = {
        ...ViewPropTypes,
        topColor: PropTypes.string,
        bottomColor: PropTypes.string,
        enablePlus: PropTypes.bool,
        topInset: PropTypes.bool,
        bottomInset: PropTypes.bool
    };
    static defaultProps = {
        topColor: color.primary,
        bottomColor: '#f8f8f8',
        enablePlus: true,
        topInset: true,
        bottomInset: false,
    };


    constructor(props){
        super(props);

    }

    componentDidMount() {

    }

    genSafeAreaViewPlus() {
        const {children, topColor, bottomColor, topInset, bottomInset} = this.props;
        return <View style={[styles.container, this.props.style]}>
            {this.getTopArea(topColor, topInset)}
            {children}
            {this.getBottomArea(bottomColor, bottomInset)}
        </View>;
    }

    genSafeAreaView() {
        return <SafeAreaView style={[styles.container, this.props.style]} {...this.props}>
            {this.props.children}
        </SafeAreaView>
    }

    static topHeight = Platform.OS=='ios'?(DeviceInfo.isIPhoneX_deprecated?44:20):NotchUtil.isNotch?NotchUtil.notchHeight:StatusBar.currentHeight

    getTopArea(topColor, topInset) {
        console.warn(notchHeight+'：：：'+topInset+'：：：'+'test')
        return (notchHeight==0 || !topInset) ? null
            : <View style={[styles.topArea, {backgroundColor: topColor}]}/>;
    }

    getBottomArea(bottomColor, bottomInset) {
        return !DeviceInfo.isIPhoneX_deprecated || !bottomInset ? null
            : <View style={[styles.bottomArea, {backgroundColor: bottomColor}]}/>;
    }

    render() {
        const {enablePlus} = this.props;
        return enablePlus ? this.genSafeAreaViewPlus() : this.genSafeAreaView();
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topArea: {
        height: notchHeight,
    },
    bottomArea: {
        height: 34,
    }
});