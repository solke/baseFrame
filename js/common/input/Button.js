/**
 * Created by quipoo on 2019/3/21.
 */
/**
 *
 * 按钮组件
 * @example: <Button text="我知道了" onPress={} /> //该组件会导致安卓不规律崩溃，启用！！！！！
 */
'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';

import {color, fontSize, rate, hairLine} from '../global';
import Loading from './Loading';
import {PropTypes} from 'prop-types';

function Button(props) {
    if (props.disable) {
        return (
            <View
                style={[styles.button, props.style, { opacity: 0.5 }]}>
                <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
            </View>
        );
    }

    if (props.pending) {
        const pending = {
            position: 'absolute',
            right: 10,
            top: 10,
            width: 20,
            height: 20,
        };
        return (
            <View
                style={[styles.button, props.style, { opacity: 0.8 }]}>
                <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
                <Loading style={pending} color={props.paddingColor} />
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={props.onPress}
            underlayColor={props.underlayColor}
            style={[styles.button, props.style]}>
            <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
        </TouchableOpacity>
    );
}

Button.defaultProps = {
    text: '提交',
    style: null,
    textStyle: null,
    underlayColor: '#ef2112',
    disable: false,
    pending: false,
    paddingColor: '#ffffff',
    onPress: () => {
        console.log('button pressed');
    },
};
Button.propTypes = {
    text: PropTypes.string,
    style: PropTypes.any,
    textStyle: PropTypes.any,
    underlayColor: PropTypes.string,
    disable: PropTypes.bool,
    pending: PropTypes.bool,
    paddingColor: PropTypes.string,
    onPress: PropTypes.func,
};

const styles = StyleSheet.create({
    button: {
        alignSelf: 'stretch',
        backgroundColor: color.primary,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingVertical:8
    },
    buttonText: {
        color: '#fff',
        fontSize:Platform.OS=='android'?16:13
    },
});

export default Button;
