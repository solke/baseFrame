/**
 * Created by quipoo on 2019/3/21.
 */
let LoadingUtil = {
    showLoading(timeOut = 10000){
        global.mLoadingComponentRef && global.mLoadingComponentRef.showLoading();
        this.timerLoading = setTimeout(() => {
            this.dismissLoading();
        }, timeOut);

    },
    dismissLoading(){
        global.mLoadingComponentRef && global.mLoadingComponentRef.dismissLoading();
        this.timerLoading && clearTimeout(this.timerLoading);

    },
    showBackground(){
        global.mLoadingComponentRef && global.mLoadingComponentRef.showBackground();
    },
    dimissBackground(){
        global.mLoadingComponentRef && global.mLoadingComponentRef.dimissBackground();
    }
};

export default LoadingUtil;