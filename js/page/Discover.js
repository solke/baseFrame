
import React, {Component} from 'react';
import {
    DeviceInfo,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    NativeModules,
    Platform
} from 'react-native';
import NavigationUtil from '../navigators/NavigationUtil'
import { color,SIDE_GAP,hairLine,width } from '../common/global'
import { transformAvatar } from '../common/tools'
import http from '../common/http'
import {api} from '../common/config'
import Icon from '../common/Icon'
import NavigationBar from '../common/NavigationBar'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
import * as discoverActions from '../actions/discover'
import {connect} from "react-redux";
const NotchUtil = NativeModules.NotchUtil
class Discover extends Component {
    constructor(props){
        super(props);
        this.state ={
            isAndroidNotch:false,
            notchHeight:0
        }
    }

    componentDidMount() {
        this.loadData()
        if(Platform.OS=='android'){
            NotchUtil.isNotchScreen()
                .then(res=>{
                    console.warn(JSON.stringify(res))
                    if(res.isNotch){
                        this.setState({
                            isAndroidNotch:true,
                            notchHeight:res.NotchHeight
                        })
                    }
                })
        }
    }

    //加载活动地址数据
    loadData=async()=>{
        let body={
            role:'93420ae0-5718-11e7-afec-519e36036fd2'
        }
        try{
            await http.postRootOnly(api.getRootViewData,body)
                .then((data)=>{
                    let {icons} = data
                    // alert(JSON.stringify(icons))
                    console.warn(JSON.stringify(icons))
                    if(icons && icons.length>0){
                        this.props.setDiscoverData(icons)

                    }

                })
                .catch((err)=>{
                    console.log(err)
                })
        }catch (err){

        }
    }

    render(){
        console.log(this.props.discoverStore)
        const itemArray = this.props.discoverStore.data
        return(
            <SafeAreaViewPlus topColor={color.primary} style={styles.container}>
                <NavigationBar title={'发现'}/>
                <View style={{paddingTop:20,borderTopWidth:hairLine,borderBottomWidth:hairLine,borderColor:color.splitLine}}>
                    {
                        itemArray.map((item,index)=>{
                            let imgUrl = item.image.indexOf("icon") > -1?item.image:transformAvatar(item.image)
                            //截取','号前面字符串为标题
                            let dotIndex = item.title.indexOf(',')
                            let title = ''
                            if(dotIndex == -1){
                                title = item.title
                            }else {
                                title = item.title.substring(0,dotIndex)
                            }
                            return(
                                <View key={'discoverItem'+index} style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',height:45}}>
                                    <Image source={{uri:imgUrl}}
                                           style={{height:26,width:26,marginHorizontal:SIDE_GAP}}/>
                                    <View style={{flex:1,height:45,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderTopWidth:index==0?0:hairLine,borderTopColor:color.splitItem}}>

                                        <Text>{title}</Text>
                                        <Icon name="arrowRight" style={{marginRight:10,color:color.fontLighter}}/>
                                    </View>
                                </View>
                            )
                        })
                    }

                    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',height:45}}>
                        <Image source={require('../asset/images/new/vote/icon_vote.png')}
                               style={{height:26,width:26,marginHorizontal:SIDE_GAP}}/>
                        <View style={{flex:1,height:45,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderTopWidth:hairLine,borderTopColor:color.splitItem}}>
                            <Text>{'投票广场'}</Text>
                            <Icon name="arrowRight" style={{marginRight:10,color:color.fontLighter}}/>
                        </View>
                    </View>

                    {
                        this.state.isAndroidNotch?
                            <Text>{`刘海屏高度：${this.state.notchHeight}`}</Text>:null
                    }
                </View>
            </SafeAreaViewPlus>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:color.bg
    }
})

const mapStateToProps = state => ({
    discoverStore:state.discoverStore
});
const mapDispatchToProps = dispatch => ({
    setDiscoverData: (data) => dispatch(discoverActions.setDiscoverData(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Discover);