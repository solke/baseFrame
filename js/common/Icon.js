
/*使用方法：
 *<Icon name="safe" color="red" size={30} style={..} /> 名字可在iconMap中查看可添加 颜色默认灰色，字体默认30

 */


import React, { Component } from 'react';
import {
    Text,
    Platform
} from 'react-native';
import {PropTypes} from 'prop-types';
//    import iconClass from '../../android/app/src/main/assets/fonts/iconfont.css';//本来是这样直接引入就好了的
//解决在android平台的报错，我觉得是window的bug
// try {
//   let iconClass = require('../../android/app/src/main/assets/fonts/iconfont.css');
// }catch(e){
//
// }


//字体镜像
const iconMap = {
    weChatLogin:{
        web:'',
        app:'\ue681'
    },
    relaParent:{
        web:'',
        app:'\ue637'
    },
    deletePhotos:{
        web:'',
        app:'\ue654'
    },
    gourpLabel:{
        web:'icon-aiqingmiao_iconfont-1',
        app:'\ue652'
    },
    groupBuying:{//团购
        web:'icon-aiqingmiao_iconfont-',
        app:'\ue60b'
    },
    orgHomeIcon:{
        app:'\ue603'
    },
    diamond:{
        web:'icon-location_1',
        app:'\ue60c'
    },

    location:{//钻石
        web:'icon-location_1',
        app:'\ue665'
    },
    fire:{//火
        web:'icon-huo',
        app:'\ue6d2'
    },
    zan:{//赞或推荐
        web:'icon-tuijian',
        app:'\ue62b'
    },
    safe:{
        web:'icon-anquan',
        app:'\ue605'
    },
    arrowRight:{
        web:'icon-arrowicon',
        app:'\ue607'
    },
    user:{
        web:'icon-iconfontyonghuming',
        app:'\ue6f4',
    },
    lock:{
        web:'icon-suo',
        app:'\ue63d',
    },
    eyes:{
        web:'icon-iconeye',
        app:'\ue600',
    },
    search:{
        web:'icon-sousuo',
        app:'\ue686',
    },
    clock:{
        web:'icon-weibiaoti1',
        app:'\ue60f',
    },
    unPass:{
        web:'icon-guanbi1',
        app:'\ue614',
    },
    delete:{
        web:'icon-shanchu ',
        app:'\ue621',
    },
    listArrowRight:{
        web:'icon-jiantou-copy-copy-copy-copy',
        app:'\ue640',
    },
    orgHouse:{
        web:'',
        app:'\ue649'
    },
    orgCourseList:{
        web:'',
        app:'\ue647'
    },
    listArrowBottom:{
        web:'icon-jiantou1',
        app:'\ue64a',
    },
    add:{
        web:'icon-jiahao',
        app:'\ue626',
    },
    addNew:{
        web:'icon-xinzeng',
        app:'\ue627',
    },
    select:{
        web:'icon-xuanze',
        app:'\ue628',
    },
    write:{
        web:'icon-bianji',
        app:'\ue625',
    },
    flower:{
        web:'icon-hua',
        app:'\ue601',
    },
    phone:{
        web:'icon-dianhua',
        app:'\ue68e',
    },
    message:{
        web:'icon-xinxi',
        app:'\ue606',
    },
    home:{
        web:'icon-shouye1',
        app:'\ue650'
    },
    address:{
        web:'icon-wo',
        app:'\ue64e',
    },
    discover:{
        web:'icon-faxian1',
        app:'\ue64f',
    },
    mine:{
        web:'icon-iconfontyonghuming',
        app:'\ue64d',
    },
    ok:{
        web:'icon-hook',
        app:'\ue609',
    },
    arrowLeft:{
        web:'icon-zuo',
        app:'\ue63c',
    },
    arrowLeftBig:{
        web:'icon-zuo',
        app:'\ue65b',
    },
    info:{
        web:'icon-info',
        app:'\ue69d',
    },
    icon:{
        web:'',
        app:'',
    },
    sort:{
        web:'icon-jieshao',
        app:'\ue62f',
    },
    addButton:{
        app:'\ue62d',
    },
    qingjia:{
        app:'\ue619'
    },
    contactServer:{
        web:'icon-lianxikefu',
        app:'\ue61b'
    },
    point:{
        app:'\ue613'
    },
    introduce:{
        web:'icon-jieshao',
        app:'\ue62f'
    },
    collect:{
        web:'icon-shoucang',
        app:'\ue61a'
    },
    hasCollect:{
        web:'icon-yishoucang',
        app:'\ue618'
    },
    information:{
        web:'icon-tongzhi',
        app:'\ue644'
    },
    share:{
        web:'icon-fenxiang',
        app:'\ue648'
    },
    wechat:{
        web:'icon-fenxiang',
        app:'\ue681'
    },
    homeicon:{
        web:'icon-fenxiang',
        app:'\ue8b9'
    },
    //缺少的图标
    start:{
        web:'',
        app:'\ue60a'
    },
    contact:{
        web:'',
        app:'\ue69d'
    },
    identify:{
        web:'',
        app:'\ue605'
    },
    homeWorkHistory:{
        app:'\ue605'
    },

    unPublish:{
        app:'\ue605'
    },
    class:{
        app:'\ue605'
    },
    subject:{
        app:'\ue605'
    },
    identification:{
        app:'\ue605'
    },
    clear:{
        app:'\ue62a'
    },
    pencil:{
        app:'\ue659'
    },
    answerCard:{
        app:'\ue658'
    },
    morePoint:{
        app:'\ue657'
    },
    collection:{
        app:'\ue65a'
    },
    right:{
        app:'\ue65c'
    },
    false:{
        app:'\ue654'
    },
    redpacket:{
        app:'\ue65d'
    },
    rightSelect:{
        app:'\ue65c'
    },
    rightUnSelect:{
        app:'\ue664'
    },
    plusCircle:{
        app:'\ue65f'
    },
    minus:{
        app:'\ue667'
    },
    warning:{
        app:'\ue668'
    },
    close:{
        app:'\ue679'
    },
    arrowDown:{
        app:'\ue67c'
    },
    voteRecord:{
        app:'\ue65e'
    },
    activityIntro:{
        app:'\ue661'
    },
    arrowDownLine:{
        app:'\ue67c'
    },
    sponsor:{
        app:'\ue669'
    },
    weixin:{
        app:'\ue655'
    },
    selectVote:{
        app:'\ue67f'
    },
    unSelectVote:{
        app:'\ue67e'
    },
    zanHand:{
        app:'\ue662'
    }

};


export default class Icon extends Component {
    static propTypes = {
        name:PropTypes.string
    }

    static defaultProps = {
        name:'zan'
    }
    render() {
        return(
            <Text style={[{ fontFamily:'iconfont', fontSize: 20 },this.props.style]} onPress={this.props.onPress} allowFontScaling={false}>{iconMap[this.props.name].app}</Text>
        );
        // let iconColor = this.props.color ? this.props.color : '#999';
        // let iconSize = this.props.size ? this.props.size : 30;
        if(Platform.OS=='web'){
            return (
                <Text
                    className={`${iconClass.iconfont}
              ${iconClass[iconMap[this.props.name].web]}`}
                    style={[{color:iconColor,fontSize:iconSize},this.props.style]}
                    onPress={this.props.onPress} />
            );
        }else{
            return(
                <Text style={[{ fontFamily:'iconfont', fontSize: 20, color:'black' },this.props.style]} onPress={this.props.onPress}>{iconMap[this.props.name].app}</Text>
            );
        }

    }
}
