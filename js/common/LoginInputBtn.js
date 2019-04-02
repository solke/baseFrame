/**
 * Created by quipoo on 2019/3/15.
 */
import React,{Component} from 'react'
import {
    ViewPropTypes,
    Text,
    StatusBar,
    StyleSheet,
    View,
    Platform,
    DeviceInfo,
    NativeModules,
    TextInput,
    TouchableOpacity
} from 'react-native'
import {PropTypes} from 'prop-types';
import Icon from './Icon'
import { color,SIDE_GAP } from './global'

export default class LoginInputBtn extends Component{

    static propTypes = {
        iconName:PropTypes.string.isRequired,
        style:ViewPropTypes.style,
        iconStyle:ViewPropTypes.style,
        textInputStyle:ViewPropTypes.style,
        cleanBtnEnable:PropTypes.bool,
        onClickRightBtn:PropTypes.func,
        rightIconStyle:ViewPropTypes.style,
        input:PropTypes.shape(
            {
                placeholder:PropTypes.string,
                placeholderTextColor:PropTypes.string,
                defaultValue:PropTypes.string,
                onChangeText:PropTypes.func,
                onFocus:PropTypes.func,
                keyboardType:PropTypes.string,
                secureTextEntry:PropTypes.bool,
                clearButtonMode:PropTypes.string,
                multiline:PropTypes.bool,
                maxLength:PropTypes.number,
                returnKeyType:PropTypes.string,
                returnKeyLabel:PropTypes.string
            }
        ),
        onBtnClear:PropTypes.func,
        rightIconName:PropTypes.string,
        iconSize:PropTypes.number,
        rightIconColor:PropTypes.string,
        isCountDownBtn:PropTypes.bool,
        countDownTime:PropTypes.number
    }

    static defaultProps = {
        iconName:'zan',
        style:{

        },
        iconStyle:{
        },
        textInputStyle:{
        },
        cleanBtnEnable:false,
        onClickRightBtn:()=>{},
        rightIconStyle:{},
        input:{
            placeholder:null,
            placeholderTextColor:color.fontLighter,
            defaultValue:null,
            onChangeText:()=>{},
            onFocus:()=>{},
            keyboardType:"default",
            secureTextEntry:false,
            clearButtonMode:"never",
            multiline:false
        },
        onBtnClear:()=>{},
        iconSize:20,
        rightIconColor:color.fontLighter,
        isCountDownBtn:false,
        countDownTime:60,

    }

    constructor(props){
        super(props);
        this.state={
            countDownTime:60,
            isStartCount:false
        }
        this.renderClearBtn = this.renderClearBtn.bind(this)
        this.renderRightIcon = this.renderRightIcon.bind(this)
        // this.renderCountDowBtn = this.renderCountDowBtn(this)
    }


    componentDidMount() {
        console.log(this.props.iconStyle,'kk;lj')
    }

    componentWillUnmount(){
        this.timer && clearInterval(this.timer)
    }

    clickCleanBtn=()=>{
        if(this.textInput){
            this.textInput.clear()
            this.textInput.focus()
            this.props.onBtnClear()
        }
    }

    renderClearBtn(){
        return(
            <TouchableOpacity style={{height:this.props.style.height||45,justifyContent:'center'}} onPress={this.clickCleanBtn}>
                <Icon name="clear" style={{color:color.fontLighter,marginHorizontal:5,marginLeft:8}}/>
            </TouchableOpacity>
        )
    }

    startCountDown=()=>{
        this.setState({
            isStartCount:true,
            countDownTime:60
        })

        this.timer = setInterval(()=>{
            if(this.state.countDownTime==0){
                this.timer && clearInterval(this.timer)
            }else{
                this.setState({
                    countDownTime:--this.state.countDownTime
                })
            }


        },1000)
    }

    onPressCountDown=()=>{
        if(!this.state.isStartCount){
            this.props.getCode && this.props.getCode()
        }else if(this.state.countDownTime<=0){
            this.props.getCode && this.props.getCode()
        }
    }

    renderCountDowBtn=()=>{
        let btnH = this.props.style.height||45
        return(
            <TouchableOpacity style={{height:btnH * 0.8,paddingHorizontal:10,justifyContent:'center',alignItems:'center',borderRadius:3,backgroundColor:color.primary}}
                              onPress={this.onPressCountDown} activeOpacity={0.9}>
                <Text style={{color:'white'}}>{this.state.isStartCount?this.state.countDownTime>0?`还剩${this.state.countDownTime}秒`:'重新发送':'发送验证码'}</Text>
            </TouchableOpacity>
        )
    }

    clickRightBtn=()=>{
        this.props.onClickRightBtn && this.props.onClickRightBtn()
    }

    renderRightIcon(){
        return(
            <TouchableOpacity style={{height:this.props.style.height||45,justifyContent:'center'}} onPress={this.clickRightBtn}>
                <Icon name={this.props.rightIconName} style={[{color:this.props.rightIconColor,marginHorizontal:5,marginLeft:8,marginTop:2},{...this.props.rightIconStyle}]}/>
            </TouchableOpacity>
        )
    }

    render(){
        console.log(this.props.cleanBtnEnable,'cleanBtnEnable')

        return(
            <View style={[styles.btnContainer,{...this.props.style}]}>
                <Icon
                    name={this.props.iconName}
                    style={[styles.iconStyle,{...this.props.iconStyle,fontSize:this.props.iconSize}]}/>
                <View style={{flex:1,flexDirection:'row'}}>
                    <TextInput
                        style={[styles.textInput,this.props.textInputStyle,{height:this.props.style.height||45,marginRight:this.props.isCountDownBtn?140:80}]}
                        ref={e=>this.textInput=e}
                        {...this.props.input}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.rightBtnContain}>
                    {
                        this.props.cleanBtnEnable?
                            this.renderClearBtn():null
                    }
                    {
                        this.props.rightIconName?
                            this.renderRightIcon():null
                    }
                    {
                        this.props.isCountDownBtn?
                            this.renderCountDowBtn():null
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnContainer:{
        flexDirection:'row',
        height:45,
        backgroundColor:'white',
        alignItems:'center'
    },
    iconStyle:{
        fontSize:16,
        color:color.fontLighter,
        marginLeft:SIDE_GAP/2
    },
    textInput:{
        marginLeft:SIDE_GAP,
        height:45,
        flex:1,
        marginRight:80
    },
    rightBtnContain:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        right:SIDE_GAP
    }
})