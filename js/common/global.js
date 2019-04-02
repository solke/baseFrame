/**
 * Created by quipoo on 2019/3/13.
 */
import { NativeModules, Platform, StyleSheet, Dimensions, StatusBar,PixelRatio} from 'react-native'
const {width,height} = Dimensions.get('window');
import { isIphoneX } from './config'
const rate = 750 / width;
import DeviceInfo from 'react-native-device-info';

const systemVersion = DeviceInfo.getSystemVersion()//系统版本
const NotchUtil = NativeModules.NotchUtil

//刘海屏高度(不是刘海屏时为0)
const notchHeight = Platform.OS=='ios'?isIphoneX?44:0:(NotchUtil.isNotch?NotchUtil.notchHeight:0)

//状态栏或者刘海屏高度
const NavPaddingHeight = Platform.OS=='ios'?(isIphoneX?44:20):(NotchUtil.isNotch?NotchUtil.notchHeight:StatusBar.currentHeight)

//状态栏或者刘海屏高度加上导航栏总高度
const NavHeight = NavPaddingHeight + (Platform.OS=='ios'?44:50)

const isEarly19Version = Platform.OS=='android' && NotchUtil.isEarly19Version
var JSEncrypt = require('./jsencrypt.min')
let encrypt = new JSEncrypt();
encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsHQ8bqvcK3jx0tShI0jq+TihGTbJF88oAGaIRwZjOnDV5Uj+hCkowPLVePmLMGg220i1hP7KWPRKjsCj0F/EJ7OAROyNUPb1L2YqUq+1Uo0FAPcAp5QK7L7g5e1XvkuY9orr6Be/iXE2G+Rs1kyVHDTq4uEA279Lz3Xntcr+1iQIDAQAB')
const SIDE_GAP = 16
const color = {
    primary:'#4fc1e9',
    assist:'#9ee6ff',
    warning:'#FF9730',
    danger:'#ff0000',

    fontStrong:'#222',
    fontLighter:'#999',
    // fontNormal:'#000',
    fontNormal:'#323639',
    fontInfo:'#fff',

    splitLine:'rgba(0,0,0,0.1)',
    bg:'#f4f4f4',
    lighterBg:'#fff',
    strongBg:'#dcdcdc',
    point:'#ACD59B',
    scheduleBg:'#FEE9B4',
    expText:'#FFE4D2',
    normalGray:'#F2F4F5',
    deepGray:'#E6E7E8',
    placeHolder:'rgba(0,0,0,0.18)',
    newBg:'#efefef',
    fontNormalGray:'#848484',
    splitItem:'#efefef',
    arrowRight:'#c6c6c6'
};

const fontSize = {
    titleNav:48,
    titleList:42,
    titleContent:40,
    titleHead:34,
    titleAssist:34,
    titleState:32,

    tipTitle:26,

    contentComment:42,
    content:38,
    contentList:34,
    contentRemack:24,
    contentState:30,
    contentAssist:26,
    contentTitle:42,
    btnText:34,
    btnTextAssist:28,
    inputContent:32,
    noticeContent:36,

    nav:38,
    navBar:30,
    navAssist:28,

    icon:26,

    middle:parseInt(26/rate),
    normal:parseInt(28/rate),
    small:parseInt(24/rate),
    mine:parseInt(32/rate),
    scal30:parseInt(30/rate),
    scal31:parseInt(31/rate),
    scal32:parseInt(32/rate),
    scal33:parseInt(33/rate),
    scal34:parseInt(34/rate),
    scal35:parseInt(35/rate)
}

const hairLine = StyleSheet.hairlineWidth
const lineStyle={
    height:hairLine,
    backgroundColor:color.splitLine
}

const valid = {
    code:{
        reg:/^\d{4}$/,//验证码的正则
        errorInfo:'验证码格式有误'
    },
    pwd:{
        reg:/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/,//密码的正则
        errorInfo:'密码格式有误',
    },
    phone:{
        // reg:/^0{0,1}(13[0-9]|15[5-9]|153|18[0-9])[0-9]{8}$/,//电话的验证正则
        // reg:/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\\d{8}$/,//电话的验证正则
        reg:/^1(3|4|5|7|8)\d{9}$/,//正则
        errorInfo:'手机号格式有误',
    },
    rePwd:{
        reg:/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/,//密码的正则
        errorInfo:'密码格式有误',
        noSame:'两次密码不一致'
    },
    color:{
        reg:/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/
    }
};

export {color,systemVersion, isEarly19Version,encrypt,SIDE_GAP,hairLine,lineStyle,valid,fontSize,width,height,rate,NavPaddingHeight,isIphoneX,NavHeight,notchHeight}