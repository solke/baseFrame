/**
 * Created by quipoo on 2019/3/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
export default class CustomImageViewer extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    renderLoading=()=>{
        return(
            <View>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
    renderFooter=(data)=>{
        console.log(data)
        return(
            <View>
                <Text style={{color:'white',fontSize:20}}>{data}</Text>
            </View>
        )

    }

    render() {
        console.log(this.props)
        return (
            <Modal visible={true} transparent={true} onRequestClose={this.props.toggleVisible}>
                <ImageViewer imageUrls={this.props.images} onClick={this.props.toggleVisible} index={this.props.index} loadingRender={this.renderLoading}
                             renderFooter={this.renderFooter} renderHeader={()=>{return null}}/>
            </Modal>
        )
    }
}