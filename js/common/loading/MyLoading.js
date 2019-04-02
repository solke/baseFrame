/**
 * Created by quipoo on 2019/3/21.
 */
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View,Dimensions } from "react-native";
import { notchHeight } from '../global'
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height + notchHeight
export default class MyLoading extends React.Component {
    constructor(props) {
        super(props);
        this.minShowingTime = 200;
        this.state = {
            showBg:false,
            isLoading : false,
            setIsLoading : (isLoading) => {
                if (isLoading != this.state.isLoading) {
                    let curTimeLong = new Date().getTime();
                    if (isLoading) {
                        this.startTime = curTimeLong;
                        this.setState({
                            isLoading,
                            showBg:false
                        });
                    } else {
                        let hasShowingTimeLong = curTimeLong - this.startTime;
                        if (hasShowingTimeLong < this.minShowingTime) {
                            setTimeout(() => {
                                this.setState({
                                    isLoading,
                                    showBg:false
                                });
                            }, this.minShowingTime - hasShowingTimeLong);

                        } else {
                            this.setState({
                                isLoading,
                                showBg:false
                            });
                        }
                    }

                }
            },
            setShowBg : (showBg) => {
                if (showBg != this.state.showBg) {
                    this.setState({
                        isLoading:showBg,
                        showBg:showBg
                    });

                }
            },
        };
    }

    showLoading = () => {
        this.state.setIsLoading(true);
    };
    dismissLoading = () => {
        this.state.setIsLoading(false);

    };

    showBackground=()=>{
        this.state.setShowBg(true)
    }
    dimissBackground=()=>{
        this.state.setShowBg(false)

    }

    render() {
        if (!this.state.isLoading) {
            return null;
        }

        return (
            <View style={{
                flex : 1,
                width : width,
                height : height,
                position : 'absolute',
                // backgroundColor:'red',
                backgroundColor : '#10101022',
            }}>

                {
                    this.state.showBg?null:
                        <View style={styles.loading}>
                            <ActivityIndicator color="white"/>
                            <Text style={styles.loadingTitle}>加载中...</Text>
                        </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading : {
        backgroundColor : '#10101099',
        height : 80,
        width : 100,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        top : (height - 80) / 2,
        left : (width - 100) / 2,
    },

    loadingTitle : {
        marginTop : 10,
        fontSize : 14,
        color : 'white'
    }
});
