/**
 * Created by quipoo on 2019/3/12.
 */
import React, {Component} from 'react';
import {
    DeviceInfo,
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
const IMGURL_PREFIX = 'http://quickpoo.oss-cn-hangzhou.aliyuncs.com/'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default class WelcomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            adImage:null,
            countDownTime:5
        }
    }

    componentDidMount() {


        const { navigation } = this.props
        console.log(this.props)
        navigation.navigate('Init')
        return
        //加载广告数据
        this.loadAdData()





        //如果两秒内没获取到广告信息，则直接跳转到首页
        this.timeOut = setTimeout(()=>{
            if(this.state.adImage==null){
                console.warn('init')
                navigation.navigate('Init')
                this.clearTimer()
            }
        },3000)
    }

    startCountDow=()=>{
        const { navigation } = this.props
        this.interval = setInterval(()=>{
            this.setState({
                countDownTime:--this.state.countDownTime
            })
            if(this.state.countDownTime<=-1){//时间到跳转至首页
                this.interval && clearInterval(this.interval)
                navigation.navigate('Init')
            }
        },1000)
    }

    //加载广告数据
    loadAdData=()=>{
        fetch('http',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response=>{
                if(response.ok){
                    return response.json()
                }
            })
            .then(res=>{
                console.log(res)
                if(Array.isArray(res.data) && res.data.length>0){
                    if(res.data[0].items && res.data[0].items.length>0){
                        let adData = {...res.data[0].items[0]}
                        this.setState(()=>(
                            {
                                adImage:adData.img,
                                adUrl:adData.adUrl
                            }
                        ))
                        //广告倒计时
                        this.startCountDow()
                    }

                }

            })
    }

    //清除计时器
    clearTimer=()=>{
        this.interval && clearInterval(this.interval)
        this.timeOut && clearTimeout(this.timeOut)
    }

    componentWillUnMount() {
        this.clearTimer()
    }

    jumpToAd=()=>{
        this.clearTimer()
        const { navigation } = this.props
        navigation.navigate('ADWebView')
    }

    render(){
        //广告图片固定分辨率800*1280
        let logoH = height-width*1200/800
        return(
            <TouchableOpacity style={styles.container} onPress={this.jumpToAd}>
                {
                    this.state.adImage?
                        <ImageBackground style={{height:width/800*1200,width}} source={{uri:IMGURL_PREFIX+this.state.adImage}}>
                            <TouchableOpacity style={styles.countDowBtn}
                                              onPress={()=>{
                                                  this.interval && clearInterval(this.interval)
                                                  this.setState({countDownTime:-1})
                                                  this.props.navigation.navigate('Init')
                                              }}>
                                <Text style={{color:'white',fontSize:9}}>{`${this.state.countDownTime}秒`}</Text>
                                <Text style={{fontSize:9,color:'white'}}>跳过</Text>

                            </TouchableOpacity>
                        </ImageBackground>:
                        <View style={{height:width/800*1200,width}}>
                            <View style={styles.countDowBtn}>
                                <Text style={{fontSize:9,color:'white'}}>加载中</Text>

                            </View>
                        </View>
                }
                <Image source={{uri:'ad_bottom_logo'}} style={{width,height:logoH<50?50:logoH}} resizeMode={"contain"}/>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    countDowBtn:{
        height:40,
        width:40,
        backgroundColor:'rgba(0,0,0,0.6)',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:30,
        right:10,
        borderRadius:20
    }
})