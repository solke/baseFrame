
import React, {Component,Fragment} from 'react';
import {BackHandler, Platform} from 'react-native';
import {NavigationActions} from "react-navigation";
import NavigationUtil from '../navigators/NavigationUtil'
import {connect} from 'react-redux';
/*
*  安卓返回键管理组件，不占空间
* */
class BackHandleComponent extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        console.warn('BackHandleComponent')
        if(Platform.OS != 'ios') BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
    }

    componentWillUnMount() {
        if(Platform.OS != 'ios') BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackPress);
    }
    _hardwareBackPress=()=>{
        console.warn('_hardwareBackPress')
        const {dispatch, nav} = this.props;
        //if (nav.index === 0) {
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
            // return true
        }
        dispatch(NavigationActions.back());
        return true;
    }

    render(){
        return(
            <Fragment>
            </Fragment>
        )
    }
}
const mapPopularStateToProps = state => ({
    nav:state.nav
});
export default connect(mapPopularStateToProps)(BackHandleComponent);

