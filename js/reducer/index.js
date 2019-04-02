/**
 * Created by quipoo on 2019/3/13.
 */
import React, {Component} from 'react';
import {
    StatusBar
} from 'react-native'
import {combineReducers} from 'redux'
import {rootCom, RootNavigator} from '../navigators/AppNavigators';
import userStore from './user';
import discoverStore from './discover'
import modalStore from './modalReducer'
import guardianMemberStore from './guardianMember'
//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));
const DARK_STYLE_PAGES = [
    'selectRole'
]
//监听跳转，处理标题栏样式切换
let handleNavigationChange=(newState, action)=>{
    console.log(newState,'handleNavigationChange')
    //进入或者退出页面时判断StatusBar样式，根据配置进行切换
    if(action && (action.type=='Navigation/BACK'||action.type=='Navigation/COMPLETE_TRANSITION')){
        try{
            let initRoute = newState.routes[newState.index]
            let routeName = initRoute.routes && initRoute.routes[initRoute.index].routeName
            //根据配置进行切换
            let showLightStyle = DARK_STYLE_PAGES.some(
                screenName =>
                screenName === routeName
            )
            StatusBar.setBarStyle(showLightStyle?'light-content':'dark-content',false)

        }catch (e){
            console.error('获取routeName出错')
        }
    }
}

const navReducer = (state = navState, action) => {
    console.log(state,action,'onNavigationStateChange')
    const nextState = RootNavigator.router.getStateForAction(action, state);
    handleNavigationChange(nextState,action)
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

const index = combineReducers({
    nav: navReducer,
    userStore,
    discoverStore,
    modalStore,
    guardianMemberStore
});

export default index;