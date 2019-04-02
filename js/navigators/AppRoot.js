import React ,{ Component }from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler,ToastAndroid } from "react-native";
import AppNavigator  from "./AppNavigators";
class AppRoot extends Component {
    constructor(props){
        super(props);
        console.disableYellowBox = true;
    }
    componentDidMount() {
        console.log(this.props,'handleNavigationChange')
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    handleNavigationChange=(prevState, newState, action)=>{

    }
    onBackPress = () => {
        try{
            const { dispatch, nav } = this.props;
            let state = nav.routes[nav.index]
            if(state.index === 0){
                if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    BackHandler.exitApp()
                }
                console.log('再按一次退出')
                ToastAndroid.show('再按一次退出应用',300)
                this.lastBackPressed = Date.now();
                return true
                // return false;
            }
            dispatch(NavigationActions.back());
        }catch (e){
            return true
        }

        return true;
    };
    render() {
        const { dispatch, nav } = this.props;
        // const navigation = addNavigationHelpers(); 因为addNavigationHelpers 已被移除不存在
        return <AppNavigator
        />
    }
}

const mapStateToProps = state => ({
    nav:state.nav
});

export default connect(mapStateToProps)(AppRoot);
