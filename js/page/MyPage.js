
import React, {Component} from 'react';
import {DeviceInfo, StyleSheet, View, Text} from 'react-native';
import NavigationUtil from '../navigators/NavigationUtil'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
export default class MyPage extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount() {

///usr/local/reactProj/voteproj
//  /usr/share/nginx/html

    }

    setPageOneData=(data)=>{

    }

    render(){

        return(
            <View style={styles.container}>
                <Text>MyPage</Text>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gray',
        justifyContent:'center'
    }
})