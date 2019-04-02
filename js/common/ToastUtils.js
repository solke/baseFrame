/**
 * Created by quipoo on 17/4/17.
 *
 * 使用：
 *      import {toastShort} from '../../tools/ToastUtils'
 *      toastShort('提示')
 */
import {
    Platform
} from 'react-native';
import Toast from 'react-native-root-toast';//导入组件

let toast;
//短时间提示的方法,content:弹窗内容，cbOnShow：弹窗刚显示的回调，cbOnHide:弹窗隐藏时的回调
export const toastShort = (content,cbOnShow,cbOnHide) => {
    if (toast !== undefined) {
        Toast.hide(toast);
    }
    toast = Toast.show(content.toString(), {
        duration: Toast.durations.SHORT,
        position: Platform.OS === 'android' ? Toast.positions.BOTTOM : Toast.positions.CENTER,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow:cbOnShow,
        onHide:cbOnHide
    });


};



//长时间提示的方法,content:弹窗内容，cbOnShow：弹窗刚显示的回调，cbOnHide:弹窗隐藏时的回调
export const toastLong = (content,cbOnShow,cbOnHide) => {
    if (toast !== undefined) {
        Toast.hide(toast);
    }
    toast = Toast.show(content.toString(), {
        duration: Toast.durations.LONG,
        position: Platform.OS === 'android' ? Toast.positions.BOTTOM : Toast.positions.CENTER,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow:cbOnShow,
        onHide:cbOnHide
    });
};