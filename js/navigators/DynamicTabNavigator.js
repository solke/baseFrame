import React, {Component} from 'react';
import {createBottomTabNavigator, createAppContainer} from "react-navigation";
import HomePage from '../page/HomePage'
import ConvenienceStorePage from '../page/ConvenienceStorePage'
import GroupBuyingPage from '../page/GroupBuyingPage'
import ShoppingCartPage from '../page/ShoppingCartPage'
import Discover from '../page/Discover'
import MyPage from '../page/MyPage'
import {BottomTabBar} from 'react-navigation-tabs';
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import NavigationUtil from '../navigators/NavigationUtil'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from '../common/Icon'
import {connect} from "react-redux";
const homeComponent = {
    guardian:HomePage
}
const myComponent = {
    guardian:MyPage
}
//返回 tab 配置页
const generateTabPage  = function (page,tabBarLabel,iconName) {
    return {
        screen:page,
        navigationOptions: {
            tabBarLabel: tabBarLabel,
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            header:null
        }
    }
}
const UNLOGIN = {
    ConvenienceStorePage:generateTabPage(ConvenienceStorePage,'便利店','home'),
    GroupBuyingPage:generateTabPage(GroupBuyingPage,'团购','discover'),
    ShoppingCartPage:generateTabPage(ShoppingCartPage,'购物车','shopingcart'),
    MyPage:generateTabPage(MyPage,'我的','mine')
}



class DynamicTabNavigator extends Component{
    constructor(props){
        super(props);
    }

    _tabNavigator(){
        // if(this.Tabs){
        //     return this.Tabs;
        // }
        let tabs
        tabs = UNLOGIN
        console.log(tabs,'createBottomTabNavigator')
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
            tabBarComponent: props => {
                return <TabBarComponent theme={this.props.theme} {...props}/>
            }
        }
        ));

    }

    shouldComponentUpdate(nextProps, nextState) { // 组件Props或者state改变时触发，true：更新，false：不更新
        //登录切换的时候才允许刷新
        return this.props.userStore.isLogin != nextProps.userStore.isLogin

    }

    render() {
        const Tab = this._tabNavigator();

        return <Tab
                onNavigationStateChange={(prevState, newState, action) => {
                    EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {//发送底部tab切换的事件
                        from: prevState.index,
                        to: newState.index
                    })
            }}

        />
    }

}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }



    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme?this.props.theme.themeColor:'black'}
            inactiveTintColor="#999"
        />
    }
}


const mapStateToProps = state => ({
    userStore:state.userStore
});


export default connect(mapStateToProps)(DynamicTabNavigator);