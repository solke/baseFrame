
import React, {Component} from 'react';
import {
    DeviceInfo,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    NativeModules
} from 'react-native';
import NavigationUtil from '../navigators/NavigationUtil'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
const {width,height} = Dimensions.get('window')
let courseImgW = (width-36)/2.5
let itemW= parseInt(width/3)
let imageW = itemW/2
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
const selectItems = [{title:'职业技能',img:'skill',params:'0700'},{title:'小学',img:'primary',params:'0200'},{title:'初中',img:'middle',params:'0300'},{title:'高中',img:'high',params:'0400'},{title:'大学',img:'university',params:'0500'},{title:'出国',img:'aboard',params:'0600'},{title:'兴趣',img:'interest',params:'0100'},{title:'全部分类',img:'all',params:null}];
const images = {
    skill:{uri:'skill'},
    primary:{uri:'profession_primary'},
    middle:{uri:'profession_icon_middlle'},
    high:{uri:'profession_icon_high'},
    university:{uri:'profession_university'},
    aboard:{uri:'profession_aboard'},
    interest:{uri:'profession_icon_interest'},
    all:{uri:'profession_icon_all'}
}
import { color,notchHeight } from '../common/global'

import {connect} from 'react-redux';
import BackHandleComponent from '../common/BackHandleComponent'
const NotchUtil = NativeModules.NotchUtil
import SYImagePicker from 'react-native-syan-image-picker'
class HomePage extends Component {
    constructor(props){
        super(props);
        this.isSet = false
        this.state={
            photos:[]
        }
    }

    componentDidMount() {
        // tab 点击事件监听
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.listener = data => {
            console.log('uuuiiii')
            console.log(this.props)
        })

        console.log(NativeModules)

    }

    jumpTologin=()=>{
        NavigationUtil.goPage({},'OtherPage')
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.listener);
    }

    toggleStatusBar=()=>{
        // if(!this.isSet){
        //
        // }else {
        //     StatusBar.setBarStyle('dark-content',true);
        //     StatusBar.setBackgroundColor('blue',true)
        //     StatusBar.setTranslucent(false)
        // }
        //
        // this.isSet = !this.isSet
        console.warn('222')
        SYImagePicker.asyncShowImagePicker({imageCount: 1, isRecordSelected: true, isCrop: false, showCropCircle: true})
            .then(photos => {
                console.log(photos);
                const arr = photos.map(v => {
                    return {...v, enableBase64: true}
                });
                // 选择成功
                this.setState({
                    photos: [...this.state.photos, ...arr]
                })
            })
            .catch(err => {
                // 取消选择，err.message为"取消"
            })

    }

    render(){

        return(
            <SafeAreaViewPlus enablePlus={true} topInset={true} topColor={color.primary}>
                <View style={styles.container}>
                    {/*<StatusBar*/}
                    {/*barStyle='light-content'*/}
                    {/*/>*/}
                    {/*安卓返回键监听*/}
                    {/*<BackHandleComponent/>*/}
                    <ScrollView>
                        {/*<View style={{height:48}}/>*/}
                        <Image source={{uri:'profession_top'}} style={{width,height:width/750*300,marginTop:-1}}/>
                        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start',alignItems:'center',marginBottom:12,backgroundColor:'white'}}>
                            {
                                selectItems.map((item,index)=>{
                                    return(
                                        <TouchableOpacity key={item.img} style={{width:Math.floor(width/4),justifyContent:'center',alignItems:'center'}}
                                                          onPress={this.toggleStatusBar}>
                                            <Image source={images[item.img]} style={{height:35,width:35,marginTop:20,marginBottom:12}} resizeMode={"contain"}/>
                                            <Text style={{marginBottom:12}}>{item.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        {
                            this.state.photos.length>0?
                                <Text>{this.state.photos[0].uri}</Text>:null
                        }

                        <View style={{backgroundColor:'white'}}>
                            <View style={styles.orgTopContent}>
                                <Image source={{uri:'school'}} style={{width:45,height:45,marginLeft:16}}/>
                                <View style={{flex:1,justifyContent:'space-between',paddingVertical:3,marginLeft:8}}>
                                    <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center'}}>
                                        <Text style={{fontSize:16,fontWeight:'500'}}>新东方培训学校</Text>
                                        <Text style={{fontSize:12,color:color.primary,marginRight:16}}>查看全部课程</Text>
                                    </View>

                                    <Text style={{fontSize:12,color:'#848484'}}>历久弥新，善思好学，自成一派</Text>
                                </View>
                            </View>
                            <ScrollView horizontal={true} contentContainerStyle={{paddingLeft:16}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                {
                                    selectItems.map((item,index)=>{
                                        return(
                                            <View key={item.img+index} style={{paddingBottom:12}}>
                                                <Image source={{uri:'course'}} style={{width:courseImgW,height:courseImgW*0.6,marginRight:10}}/>
                                                <Text numberOfLines={1} style={{width:courseImgW,marginTop:10,marginBottom:5,fontWeight:'500'}}>求职面试一对一在线辅导</Text>
                                                <Text style={{fontSize:12,color:'#999999',marginBottom:10}}>1.8万人已学习</Text>
                                                <Text style={{color:'#ff9000',fontSize:20,fontWeight:'500'}}>￥1 <Text style={{color:'#848484',fontSize:14,textDecorationLine:'line-through'}}>￥388</Text></Text>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                        <View style={{backgroundColor:'white',marginTop:12}}>
                            <View style={styles.orgTopContent}>
                                <Image source={{uri:'school'}} style={{width:45,height:45,marginLeft:16}}/>
                                <View style={{flex:1,justifyContent:'space-between',paddingVertical:3,marginLeft:8}}>
                                    <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center'}}>
                                        <Text style={{fontSize:16,fontWeight:'500'}}>新东方培训学校</Text>
                                        <Text style={{fontSize:12,color:color.primary,marginRight:16}}>查看全部课程</Text>
                                    </View>

                                    <Text style={{fontSize:12,color:'#848484'}}>历久弥新，善思好学，自成一派</Text>
                                </View>
                            </View>
                            <ScrollView horizontal={true} contentContainerStyle={{paddingLeft:16}} showsHorizontalScrollIndicator={false}>
                                {
                                    selectItems.map((item,index)=>{
                                        return(
                                            <View key={item.img+index} style={{paddingBottom:12}}>
                                                <Image source={{uri:'course'}} style={{width:courseImgW,height:courseImgW*0.6,marginRight:10}}/>
                                                <Text numberOfLines={1} style={{width:courseImgW,marginTop:10,marginBottom:5,fontWeight:'500'}}>求职面试一对一在线辅导</Text>
                                                <Text style={{fontSize:12,color:'#999999',marginBottom:10}}>1.8万人已学习</Text>
                                                <Text style={{color:'#ff9000',fontSize:20,fontWeight:'500'}}>￥1 <Text style={{color:'#848484',fontSize:14,textDecorationLine:'line-through'}}>￥388</Text></Text>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaViewPlus>

        )
    }
}

const mapPopularStateToProps = state => ({
    nav:state.nav
});
export default connect(mapPopularStateToProps)(HomePage);


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:color.bg,
        justifyContent:'center'
    },
    orgTopContent:{
        flexDirection:'row',
        paddingVertical:10
    }
})