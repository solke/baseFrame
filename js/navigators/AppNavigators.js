import React ,{Component}from 'react';
import {Button, Platform, ScrollView} from 'react-native'
import {createDrawerNavigator, createStackNavigator, DrawerItems, SafeAreaView,createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createReactNavigationReduxMiddleware, reduxifyNavigator} from 'react-navigation-redux-helpers';
import WelcomePage from '../page/WelcomePage'
import RootTabs from '../page/RootTabs'
import ADWebView from '../page/ADWebView'
import OtherPage from '../page/OtherPage'
import {connect} from 'react-redux';
export const rootCom = 'welcome';//设置根路由
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';



const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const { scene } = sceneProps;
        const { route } = scene;
        const params = route.params || {};
        console.log(scene,'scene')
        const transition = params.transition || 'forHorizontal';
        return StackViewStyleInterpolator[transition](sceneProps);
    },
});

const generatePageAndSetting=(Page)=>{
    return(
        {
            screen:Page,
            navigationOptions: {
                header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
            }
        }
    )
}

const WelcomeNavigator = createStackNavigator({

    WelcomePage:generatePageAndSetting(WelcomePage),
    ADWebView:{
        screen:ADWebView,
        navigationOptions: {
            header: null,
        }
    }
})

const InitNavigator = createStackNavigator({
    rootTabs:generatePageAndSetting(RootTabs),//首页Tab

},{
    initialRouteName:'rootTabs',
    transitionConfig:TransitionConfiguration,
    onNavigationStateChange:(prevState, currentState)=>{
        const currentScreen = getCurrentRouteName(currentState);
        const prevScreen = getCurrentRouteName(prevState);
        console.log(currentScreen,'currentScreen')
        if (prevScreen !== currentScreen) {
            console.log("当前屏幕切换到了:" + currentScreen);
        }
    }
})



export const RootNavigator = createAppContainer(createSwitchNavigator({
    welcome: WelcomeNavigator,
    Init: InitNavigator
}, {
    navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
}));



/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 * redux 高版本注意参数位置调换的问题
 */
export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav,//v2
});
// /**
//  * 3.连接 React 组件与 Redux store
//  */
export default connect(mapStateToProps)(AppWithNavigationState);

// export default RootNavigator;


