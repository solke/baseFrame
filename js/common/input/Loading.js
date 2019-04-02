/**
 * Created by quipoo on 2019/3/21.
 */
/**
 * 加载中组件
 * @example:  <Loading />
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Platform,
} from 'react-native';

import {PropTypes} from 'prop-types';
function Loading(props) {
    return (
        Platform.OS === 'android' ?
            <View style={[styles.container, props.style]}>
                <ProgressBarAndroid styleAttr="Small" color={props.color} />
            </View> :
            <View style={[styles.container, props.style]}>
                <ActivityIndicatorIOS color={props.color} />
            </View>
    );
}
Loading.propTypes = {
    style: PropTypes.any,
    color: PropTypes.string,
};
Loading.defaultProps = {
    style: {},
    color: '#999999',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading;
