
import React, {Component} from 'react';
import {DeviceInfo, StyleSheet, View, Text} from 'react-native';
import NavigationUtil from '../navigators/NavigationUtil'

export default class ParentHome extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {



    }

    render(){

        return(
            <View style={styles.container}>
                <Text>ParentHome</Text>
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