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
import Swiper from 'react-native-swiper'
import NavigationBar from '../common/NavigationBar'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
const CLASSIFY_ARRAY = [
    {title:'日用清洁',image:'classitem'},
    {title:'休闲零食',image:'classitem'},
    {title:'冷藏冷冻',image:'classitem'},
    {title:'酒水冲饮',image:'classitem'},
    {title:'个人洗护',image:'classitem'},
    {title:'牛奶面包',image:'classitem'},
    {title:'熟识面点',image:'classitem'},
    {title:'粮油调味',image:'classitem'},
    {title:'母婴',image:'classitem'},
    {title:'厨房用具',image:'classitem'}
    ]
//
const HOT_SELL_ARRAY=[1,1,1,1,1,1,1]
const ItemW = Math.floor(width/5)
const classItemImgW = ItemW*0.5
const hotSellW = Math.floor((width-12-10)/3)
//
const BANNER_HEIGHT = width*0.55
import NavigationUtil from '../navigators/NavigationUtil'
import { toastShort } from '../common/ToastUtils'
import LoadingUtil from '../common/LoadingUtil'
import * as userActions from '../actions/user'
import {connect} from "react-redux";
export default class ConvenienceStorePage extends Component{

    renderBanner(){
        return(
            <View style={{height:BANNER_HEIGHT}}>
                <Swiper height={BANNER_HEIGHT}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={{backgroundColor:'red', width: 6, height: 6,borderRadius: 3,margin: 3}}/>}
                        activeDot={<View style={{backgroundColor:'blue', width: 6, height: 6,borderRadius: 3,margin: 3}}/>}
                        paginationStyle={{bottom:10,flexDirection:'row',justifyContent:'center'}}
                        removeClippedSubviews={false}
                        loop
                        autoplay
                >
                    <View >
                        <Image resizeMode='stretch' style={styles.image} source={require('../asset/test/banner1.png')} />
                    </View>
                    <View >
                        <Image resizeMode='stretch' style={styles.image} source={require('../asset/test/banner2.png')} />
                    </View>
                </Swiper>
            </View>
        )
    }

    renderThemeTitle(title){
        return(
            <View style={{backgroundColor:'white',paddingLeft:6}}>
                <Text style={{marginTop:10,fontSize:fontSize.scal30,color:'black',fontWeight:'600'}}>{title}</Text>
            </View>
        )
    }

    render(){
        //
        return(
            <SafeAreaViewPlus style={{backgroundColor:color.bg}}>
                <NavigationBar title="蜂米小店"/>
                <ScrollView>
                    {/*轮播*/}
                    {
                        this.renderBanner()
                    }

                    {/*商品分类*/}
                    <View style={{flexDirection: 'row',flexWrap: 'wrap',backgroundColor:'white'}}>
                        {
                            CLASSIFY_ARRAY.map((item,index)=>{
                                return(
                                    <View style={styles.classItemContainer} key={'classifyItem'+index}>
                                        <Image source={{uri:item.image}} style={{width:classItemImgW,height:classItemImgW}}/>
                                        <Text style={styles.classifyTitle}>{item.title}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>

                    {/*超值热卖*/}
                    <View style={styles.hotSellContainer}>
                        {
                            this.renderThemeTitle('超值热卖')//
                        }
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{marginTop:10}}
                        >
                            {
                                HOT_SELL_ARRAY.map((item,index)=>{
                                    return(
                                        <View style={{flexDirection:'row'}}>
                                            <View>
                                                <Image source={require('../asset/test/hotsell.png')} style={{width:hotSellW,height:hotSellW*0.6}} resizeMode="contain"/>
                                                <View style={{flexDirection:'row',justifyContent:'center',marginBottom:5}}>
                                                    <Text style={[styles.hotSellRealPrice,{marginRight:2}]}><Text style={{fontSize:8}}>￥</Text>{35.9}</Text>
                                                    <Text style={styles.hotSellPrice}>￥29.30</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })

                            }
                        </ScrollView>
                    </View>

                    {/*小蜂优选*/}
                    {
                        this.renderThemeTitle('小蜂优选')
                    }
                    <Image source={require('../asset/test/better1.png')} style={{width:width-12,marginLeft:6,marginTop:5}}/>
                    <View style={{flexDirection:'row',paddingBottom:2,borderBottomColor:color.splitItem,borderBottomWidth:1,paddingLeft:6,marginBottom:3}}>
                        <Image source={require('../asset/test/better2.png')} style={{width:(width-12-3)/2}}/>
                        <Image source={require('../asset/test/better2.png')} style={{width:(width-12-3)/2}}/>
                    </View>

                    {/*人气商品*/}
                    <Image source={require('../asset/test/popular_ad.png')} style={{width:width-16,marginLeft:8}}/>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../asset/test/sellimg.png')} style={{width:width*0.22,height:width*0.22}}/>
                        <View>
                            <Text style={{fontSize:fontSize.scal32,fontWeight:'600'}}>金沙河清汤麦芯挂面</Text>
                            <Text style={{fontSize:fontSize.small,color:color.fontLighter}}>简单工艺爽滑美味</Text>
                            <View>
                                <Text style={{fontSize:11}}>1kg/包</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems: 'flex-end'}}>
                                <Text style={{fontSize:fontSize.scal34,color:color.warning}}>￥6.9</Text>
                                <Text>￥14.8</Text>
                            </View>
                        </View>
                    </View>


                </ScrollView>


            </SafeAreaViewPlus>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{

    },
    image:{
        width,
        height:BANNER_HEIGHT
    },
    classItemContainer:{
        width:ItemW,
        height:ItemW,
        alignItems:'center',
        justifyContent: 'center'
    },
    classifyTitle:{
        fontSize:fontSize.normal,
        fontWeight: '400',
        color:'black'
    },
    hotSellContainer:{
        backgroundColor:'white',
        paddingLeft:6,
        borderTopWidth: 1,
        borderTopColor:color.splitItem
    },
    hotSellTitle:{
        fontSize:fontSize.scal30,
        fontWeight: '600',
        color:'black',
        marginVertical: 12
    },
    hotSellRealPrice:{
        color:'red',
        fontSize:fontSize.middle
    },
    hotSellPrice:{
        fontSize:12,
        alignSelf:'flex-end'
    }

})