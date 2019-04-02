/**
 * Created by quipoo on 2019/3/21.
 */

/*example
 *<FillOutInput keyText="价格" placeholder="￥请填写授课价格" setState={this.setState.bind(this)} valueName="price" />
 * renderRightText={func} [inputStyle]*/

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    Platform
} from 'react-native';

import {PropTypes} from 'prop-types';
import {color, fontSize,rate} from '../global';
let width = Dimensions.get('window').width
export default class FillOutInput extends Component {
    static propTypes = {
        text: PropTypes.any,//默认值
    }
    constructor(props) {
        super(props);
        this.text = props.text;
    }
    //获取input的值
    getVal = () => {
        return this.text;
    }

    //textinput 聚焦
    _onFocus=()=>{
        this.props.onFocus && this.props.onFocus()
    }
    render() {
        let keyboardType = this.props.keyboardType || 'default';
        //let maxLength = this.props.maxLength;

        const val = this.props.text||typeof(this.props.text)=='number'?this.props.text.toString():null;
        return (
            <View style={[pStyles.infoWrap,this.props.style]}>
                <Text style={[pStyles.itemLeftWrap,this.props.leftTextWrap?this.props.leftTextWrap:null]}>{this.props.keyText}</Text>
                <View style={[pStyles.itemRightWrap,this.props.rightWrapStyle]}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <TextInput
                            placeholder={this.props.placeholder}
                            defaultValue={val}
                            ref={node=>this.input=node}
                            onChangeText={text=>{
                                this.text=text
                                this.props.onChangeText && this.props.onChangeText(text)
                            }}
                            onFocus={this._onFocus}
                            placeholderTextColor="#999"
                            keyboardType={keyboardType}
                            secureTextEntry={false}
                            clearButtonMode="never"
                            multiline={false}
                            underlineColorAndroid="transparent"
                            style={[pStyles.infoTitle,this.props.inputStyle]}
                            maxLength={this.props.maxLength||1000}
                            returnKeyType="done"
                            returnKeyLabel="done"

                        />

                        {
                            this.props.renderRightText && this.props.renderRightText()
                        }
                    </View>

                </View>
                {
                    this.props.inputPrice && <Text style={{position: 'absolute',alignSelf:'center',left:400/rate,fontSize:fontSize.mine,color:color.fontLighter}}>￥</Text>
                }


            </View>
        );
    }
}
const pStyles = StyleSheet.create({
    infoWrap:{
        height:45,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:color.splitLine,
        borderBottomWidth:StyleSheet.hairlineWidth,
        backgroundColor:'#fff'
    },
    itemLeftWrap:{
        width:250/rate,
        paddingLeft:30/rate,
        fontSize:14,
        color:color.fontLighter,

    },
    itemRightWrap:{
        width:width-250/rate,
        height:45,
        paddingRight:10/rate+20
    },
    infoTitle:{
        color:color.fontNormal,
        alignSelf:'stretch',
        fontSize:fontSize.mine,
        padding: 0,
        flex:1,
        height:45,
        marginTop:Platform.OS=='ios'?2:0
    },

    itemInfoIcon:{
        color:color.fontLighter,
    },
});