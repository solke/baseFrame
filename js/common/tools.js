/**
 *  工具类
 */
import LoadingUtil from './LoadingUtil'
export const loadingUtil = LoadingUtil

//转换服务器的图片格式
export function transformAvatar(avatar,role){

    console.log(avatar)
    if(avatar == null || avatar=='null'){
        return 'avatar_course'
    }
    if(!avatar || typeof avatar =='object'){
        if(role=='orgnaztion'){
            return 'avatar_course'
        }
        return 'avatar_user'
    }



    if(avatar.indexOf("/var/mobile") > -1){
        return avatar
    }

    if (avatar.indexOf("avatar") > -1){
        if(role=='orgnaztion'){
            return 'avatar_user'
        }
        return avatar
    }

    if (avatar.indexOf("course") > -1)
        return avatar
    if (avatar.indexOf("ORG") > -1){
        if(role=='orgnaztion'){
            return 'avatar_user'
        }
        return 'avatar_course'
    }

    if (avatar=='image')
        return 'avatar_user'
    if (avatar=='1.png')
        return 'avatar_course'
    if (avatar.indexOf("test") > -1)
        return 'course'
    if (avatar.indexOf("icon") > -1)
        return avatar
    if (avatar.indexOf("http") > -1)
        return avatar


    return 'http://quickpoo.oss-cn-hangzhou.aliyuncs.com/' + avatar
}

//选项配置
const dayMap = ['日','一','二','三','四','五','六'];


//替换字符串
export function replace(...strs){
    let sApi = strs[0];//要被替换的api
    if(!sApi){
        return;
    }
    let aStr = strs.slice(1);//要替换成的文字数组
    let i=0;
    return sApi.replace(/\{\w+\}/g,function(){
        return aStr[i++];
    })
};


//把后端的时间(20161009)转换为可以显示的格式(2016-10-09 星期三)
export function timeFormat(time){
    if (!time) {
        return '';
    }
    time = String(time)
    const dayMap = ['日','一','二','三','四','五','六'];
    let temArr = time.split('');
    temArr.splice(4,0,'-');
    temArr.splice(temArr.length-2,0,'-');
    var temTime = new Date(temArr.join(''));
    return `${temArr.join('')} 星期${dayMap[temTime.getDay()]}`;
};

//把20161008161317这种时间格式的数据转换为2016-10-08 16:13:17
export function secTimeFormat(timeStr){
    if(!timeStr || timeStr.length<1){
        return ''
    }
    let dateTemArr = timeStr.slice(0,8).split('');
    dateTemArr.splice(4,0,'-');
    dateTemArr.splice(dateTemArr.length-2,0,'-')
    var date = dateTemArr.join('');

    let timeTemArr = timeStr.slice(8).split('');
    timeTemArr.splice(2,0,':');
    timeTemArr.splice(timeTemArr.length-2,0,':');
    let time = timeTemArr.join('');
    return `${date}  ${time}`;
};

//把后端的时间(20161009)转换为可以显示的格式(2016年10月09日)
export function timeFormatNormal(time){
    console.log(time,'time')
    if(!time||time==''){
        return ''
    }
    time = String(time)
    const dayMap = ['日','一','二','三','四','五','六'];
    let temArr = time.split('');
    temArr.splice(4,0,'年');
    temArr.splice(temArr.length-2,0,'月');
    var temTime = new Date(temArr.join(''));
    return `${temArr.join('')}日`;
};

//把后端的时间(20161009)转换为可以显示的格式(2016-10-09)
export function timeFormatLine(time){
    time=String(time)||''
    const dayMap = ['日','一','二','三','四','五','六'];
    let temArr = time.split('');
    temArr.splice(4,0,'-');
    temArr.splice(temArr.length-2,0,'-');
    var temTime = new Date(temArr.join(''));
    return `${temArr.join('')}`;
};

//把时间对象转换为所想要的格式 format(new Date,'YYYYMMDD')
export function format(Date,fmt){
    if(!Date || !fmt){
        return '';
    }
    var year = Date.getFullYear();
    var month = Date.getMonth() + 1;
    var date = Date.getDate();
    var hours = Date.getHours();
    var minutes =Date.getMinutes();
    var seconds = Date.getSeconds();
    month = month<10?'0'+month:month;
    date = date<10?'0'+date:date;
    hours = hours<10?'0'+hours:hours;
    minutes = minutes<10?'0'+minutes:minutes;
    seconds = seconds<10?'0'+seconds:seconds;
    fmt = fmt.replace('YYYY',year);
    fmt = fmt.replace('MM',month);
    fmt = fmt.replace('DD',date);
    fmt = fmt.replace('HH',hours);
    fmt = fmt.replace('mm',minutes);
    fmt = fmt.replace('ss',seconds);
    return fmt;
};


export function secTimeFormatSpecial(timeStr){
    let month = timeStr.substring(4,6)
    let day = timeStr.substring(6,8)
    let hour = timeStr.substring(8,10)
    let minu = timeStr.substring(10,12)
    return `${month}-${day} ${hour}:${minu}`;
};

export function isFunc(obj){
    return Object.prototype.toString.call(obj)=="[object Function]";
}

