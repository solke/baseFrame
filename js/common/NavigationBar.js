import React,{Component} from 'react'
import {ViewPropTypes, Text, StatusBar, StyleSheet, View, Platform,DeviceInfo, NativeModules, TouchableOpacity} from 'react-native'
import NavigationUtil from '../navigators/NavigationUtil'
import { NavigationActions } from 'react-navigation';
import {PropTypes} from 'prop-types';
import {color, systemVersion, isEarly19Version, hairLine} from '../common/global'
import Icon from '../common/Icon'
const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度
const NotchUtil = NativeModules.NotchUtil
const STATUS_BAR_HEIGHT_ANDROID = Platform.OS=='android'?NotchUtil.isNotch?0:StatusBar.currentHeight:0
const StatusBarShape = {//设置状态栏所接受的属性
    barStyle: PropTypes.oneOf(['light-content', 'default','dark-content']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};
export default class NavigationBar extends Component {
    //提供属性的类型检查
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        statusBarStyle:ViewPropTypes.style,
        rightButton: PropTypes.element,
        leftButton: PropTypes.element
    };
    //设置默认属性
    static defaultProps = {
        statusBar: {
            barStyle: 'dark-content',
            hidden: false,
            backgroundCoLor:'white'
        },
        statusBarStyle:{
            backgroundColor:'rgba(0,0,0,0)'
        }
    };

    componentDidMount() {

        // console.warn(NotchUtil.getNotchHeight()+'version')
        console.warn(StatusBar.currentHeight)

    }

    render() {
        let {barStyle,...otherStatusBar} = this.props.statusBar
        let statusBar = !this.props.statusBar.hidden ?
            <View style={[styles.statusBar,{...this.props.statusBarStyle}]}>
                <StatusBar {...otherStatusBar} barStyle={barStyle=='dark-content' && isEarly19Version ? 'default':barStyle}/>
            </View> : null;

        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title}</Text>;

        let content = this.props.hide ? null :
            <View style={styles.navBar}>
                {this.props.leftButton?this.getButtonElement(this.props.leftButton):this.getDefaultLeftButton()}
                {
                    this.props.renderTitle?
                        <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                            {
                                this.props.renderTitle()
                            }
                        </View>
                        :
                        <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                            {titleView}
                        </View>
                }

                {/*判断是否又右默认样式的按钮需要渲染*/}
                {(this.props.rightIcon || this.props.rightText)?this.getDefaultRightButton():this.getButtonElement(this.props.rightButton)}
            </View>;
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }

    getButtonElement(data) {
        return (
            <View style={styles.navBarButton}>
                {data ? data : null}
            </View>
        )
    }

    onPressBack=()=>{
        NavigationUtil.goBack(this.props.navigation)
    }

    getDefaultLeftButton=()=>{
        return(
            <TouchableOpacity style={styles.arrowLeft} activeOpacity={0.9} onPress={this.onPressBack}>
                <Icon name="arrowLeft" style={styles.arrowLeftIcon}/>
            </TouchableOpacity>
        )
    }

    onPressRightBtn=()=>{
        this.props.onPressRightBtn && this.props.onPressRightBtn()
    }

    getDefaultRightButton=()=>{
        if(this.props.rightIcon){
            return(
                <TouchableOpacity style={styles.rightBtn} activeOpacity={0.9} onPress={this.onPressRightBtn}>
                    <Icon name={this.props.rightIcon} style={[{color:'white'},this.props.rightTextStyle||null]}/>
                </TouchableOpacity>
            )
        }
        if(this.props.rightText){
            return(
                <TouchableOpacity style={styles.rightBtn} activeOpacity={0.9} onPress={this.onPressRightBtn}>
                    <Text style={[styles.rightText,this.props.rightTextStyle||null]}>{this.props.rightText}</Text>
                </TouchableOpacity>
            )
        }
    }
}
//
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomWidth:1,
        borderBottomColor:color.splitItem
    },
    navBarButton: {
        alignItems: 'center'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 80,
        right: 80,
        top: 0,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: 'black',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT :STATUS_BAR_HEIGHT_ANDROID,
    },
    arrowLeft:{
        width:80,
        height:Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        justifyContent:'center',
        paddingLeft:12,

    },
    arrowLeftIcon:{
        color:'white',
        marginTop:3,
        fontSize:20
    },
    rightBtn:{
        width:60,
        height:Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:12
    },
    rightText:{
        color:'white',
        fontSize:16
    }
});