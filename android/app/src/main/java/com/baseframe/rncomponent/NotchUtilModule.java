package com.baseframe.rncomponent;


import android.content.Context;
import android.os.Build;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.gotolearn.notchtools.NotchTools;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class NotchUtilModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    private Promise pPromise;

    public NotchUtilModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "NotchUtil";
    }


    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<String, Object>();
        //工具类判断是否是刘海屏
        NotchTools notchTools = NotchTools.getFullScreenTools();
        if(notchTools.isNotchScreen(getCurrentActivity().getWindow())){
            constants.put("isNotch",true);//是否是刘海屏
            //获取刘海屏高度，并px转换成dp
            int notchHeight = notchTools.getNotchHeight(getCurrentActivity().getWindow());
            float transHeight = PixelUtil.toDIPFromPixel(notchHeight);
            constants.put("notchHeight",transHeight);//刘海屏高度
        }else {
            constants.put("isNotch",false);
            constants.put("notchHeight",0);
        }


        if(Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT){//4.4之前的版本无法沉浸式状态栏
            constants.put("isEarly19Version",true);
        }else{
            constants.put("isEarly19Version",false);
        }

        return constants;
    }

    /*
    * 判断是否是刘海屏并返回高度
    * */
    @ReactMethod
    public void isNotchScreen(final Promise promise) {
        pPromise = promise;
        NotchTools notchTools = NotchTools.getFullScreenTools();

        if(notchTools.isNotchScreen(getCurrentActivity().getWindow())){
            WritableMap result = Arguments.createMap();
            result.putBoolean("isNotch",true);
            //获取刘海屏高度，并px转换成dp
            int notchHeight = notchTools.getNotchHeight(getCurrentActivity().getWindow());
            float transHeight = PixelUtil.toDIPFromPixel(notchHeight);
            result.putDouble("NotchHeight",transHeight);
            pPromise.resolve(result);
        }else {
            pPromise.reject("-1","faile");
        }

    }

//    @ReactMethod
//    public void notchHeight(final Promise promise) {
//        pPromise = promise;
//        NotchTools notchTools = NotchTools.getFullScreenTools();
//
//        if(notchTools.isNotchScreen(getCurrentActivity().getWindow())){
//            pPromise.resolve(notchTools.getNotchHeight(getCurrentActivity().getWindow()));
//        }else {
//            pPromise.resolve(0);
//        }
//
//    }


    @ReactMethod
    public void isEarlyVersion19(final Promise promise){
        pPromise = promise;
        try{
            if(Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT){//4.4之前的版本无法沉浸式状态栏
                pPromise.resolve(true);
            }else{
                pPromise.resolve(false);
            }
        }catch (Exception e){
            pPromise.reject("-1","错误");
        }




    }
}
