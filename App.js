import React, {Component} from 'react';
import {
    StatusBar,
    View,
    Text
} from 'react-native'
import {Provider} from 'react-redux';
import AppRoot from './js/navigators/AppRoot';
// import store from './js/store'
import MyLoading from './js/common/loading/MyLoading'

import configureStore from './js/store/index';
// import store from './js/store'

//正式环境log打印日志都改为空函数
if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {}
    };
}


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            store: configureStore(()=>{
                this.setState({isLoading: false})
            }).store
        };
    }
    componentDidMount() {
        StatusBar.setBarStyle('dark-content',true);
        StatusBar.setBackgroundColor('rgba(0,0,0,0)',true)
        StatusBar.setTranslucent(true)
        console.log(StatusBar.barStyle,'barstyle')

    }


    render() {
        const {isLoading, store} = this.state;
        if (isLoading) {
            return (
                <View style={{flex:1,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
                    <Text>loding</Text>
                </View>
            );
        }
        /**
         * 将store传递给App框架 你看你这段写在哪里咯
         */
        return <Provider store={store}>
            <View style={{flex:1}}>
                <AppRoot />
                {<MyLoading
                    ref={(ref) => {
                        global.mLoadingComponentRef = ref;
                    }}
                />}
            </View>

        </Provider>
    }
}

