/**
 * Created by quipoo on 2019/3/21.
 */

/*example
 *<FillOutSelect keyName="课程节数" rightText="请选择节数" [type="fNumber"] [day={10}] alignRight={true} [onSelect={this._selectLessonNumber}] [rightTextStyle] />*/

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Modal
} from 'react-native';

import {color, fontSize,rate} from '../global';
import {options, isFunc} from '../tools';
import Picker from 'react-native-solke-picker';
import LoadingUtil from '../LoadingUtil'
//import styles from './style';
import Icon from '../Icon';
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalAction from '../../actions/modalAction';

class FillOutSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightText : props.rightText,//右边的文字
            isSetDefault : !!props.isSetDefault,//是否设置初始值
            shouldCoverViewShow:false
        };
    }
    render() {
        console.log(this.props)
        let valueColor = this.state.isSetDefault ? color.fontNormal : color.fontLighter;
        return (
            <TouchableOpacity onPress={this._showPicker}>

                <View style={pStyles.infoWrap}>
                    <Text style={[pStyles.itemLeftWrap,this.props.leftTextStyle]}>{this.props.keyName}</Text>
                    <View style={[pStyles.itemRightWrap,this.props.alignRight?{justifyContent:'flex-end'}:null,this.props.rightWrapStyle]}>
                        {this.props.rightText ==''?
                            <Text style={[pStyles.infoTitle,{color:color.fontLighter,alignSelf:'center'},this.props.rightTextStyle]}>
                                {this.props.rightDefaultText||''}
                            </Text>:
                            <Text style={[pStyles.infoTitle,{color:valueColor,alignSelf:'center'},this.props.rightTextStyle]}>
                                {this.state.rightText}
                            </Text>
                        }
                        <Icon
                            name="arrowRight"
                            style={pStyles.itemInfoIcon}
                        />
                    </View>

                </View>






            </TouchableOpacity>
        );
    }

    componentWillUnMount() {
        this.props.toggleModalVisibleState && this.props.toggleModalVisibleState(false)
        LoadingUtil.dimissBackground()
    }

    _showPicker = () => {
        //显示modal
        this.props.toggleModalVisibleState && this.props.toggleModalVisibleState(true)
        LoadingUtil.showBackground()
        this.props.onPress && this.props.onPress()

        let type = this.props.type;
        let label;
        let items;
        let option = null;
        if (isFunc(options[type])) {
            option = options[type](this.props.day)
            label = option.label;
            items = option.items;
        } else {
            label = options[type].label
            items = options[type].items;
        }
        const that = this;
        let pickerData = [];

        for (let i = 0;i < items.length; i++) {
            pickerData.push( items[i][label] );
        }
        let selectedValue = this.state.isSetDefault && this.state.rightText;

        this.setState({
            shouldCoverViewShow:true
        })
        Picker.init({
            pickerData: pickerData,
            selectedValue: [selectedValue],
            pickerTitleText:'',
            pickerConfirmBtnText:'确认',
            pickerCancelBtnText:'取消',
            pickerToolBarBg:[255,255,255,1],
            pickerBg:[255,255,255,1],
            pickerToolBarFontSize:parseInt(fontSize.content/rate),//android下必须为整数
            onPickerConfirm: (data, index) => {
                if (!isNaN(index)) {
                    index = pickerData.indexOf(data[0]);
                    index = index == -1 ? 0 : index;
                }
                const selectDataText = pickerData[index];
                that.setState({
                    rightText: selectDataText,
                    isSetDefault: true,
                    shouldCoverViewShow:false
                });
                that.props.onSelect && that.props.onSelect(items[index], index);

                this.props.onPressCancel && this.props.onPressCancel()
                LoadingUtil.dimissBackground()
                //隐藏modal
                this.props.toggleModalVisibleState(false)
            },
            onPickerCancel: data => {
                //console.log(data);
                that.setState({
                    shouldCoverViewShow:false
                });
                LoadingUtil.dimissBackground()
                this.props.onPressCancel && this.props.onPressCancel()
                //隐藏modal
                this.props.toggleModalVisibleState(false)
            },
            onPickerSelect: data => {
                //console.log(data);
                //隐藏modal
                this.props.toggleModalVisibleState(false)
            }
        });
        Picker.show();
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
        color:color.fontLighter
    },
    itemRightWrap:{
        width:width-250/rate,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20/rate,
        height:40,
        alignItems:'center',
    },
    infoTitle:{
        color: color.fontNormal,
        fontSize: fontSize.mine,
        paddingLeft: 0,
    },
    itemInfoIcon:{
        color: color.fontLighter,
        marginTop:4
    },

});

const mapStateToProps = state => ({
    modalStore:state.modalStore
});

const mapDispatchToProps = dispatch => ({
    toggleModalVisibleState: (visible) => dispatch(modalAction.toggleModalVisibleState(visible)),
});

export default connect(mapStateToProps,mapDispatchToProps)(FillOutSelect);