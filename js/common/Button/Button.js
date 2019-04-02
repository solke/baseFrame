/**
 * Created by quipoo on 2019/3/16.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    PixelRatio,
    View,
} from 'react-native';
const px = 1 / PixelRatio.get();
import { color } from '../global'

export default class Button extends React.Component{
    constructor(props){
        super(props);

    }
    static propTypes = {
        disable:PropTypes.bool,
        activeOpacity:PropTypes.number
    }

    static defaultProps={
        disable:false,
        activeOpacity:0.8
    }

    onPress=()=>{
        this.props.onPress && !this.props.disable && this.props.onPress()
    }

    render(){
        return(
            <TouchableOpacity style={[{backgroundColor:this.props.disable?color.assist:color.primary,paddingVertical:10,borderRadius:5,alignItems:'center'},this.props.responsive?null:{alignSelf:'center'},this.props.style]}
                              onPress={this.onPress} activeOpacity={this.props.activeOpacity}>
                {
                    React.isValidElement(this.props.children) ?
                        this.props.children :
                        <Text
                            style={{color:'white'}}>
                            {this.props.children}
                        </Text>
                }
            </TouchableOpacity>
        )
    }

}