/**
 * Created by quipoo on 2019/2/11.
 */
import {LOGIN, LOGOUT,UPDATE_NOTICES_TIP} from './index';

export const login = (user) => {
    console.log(user,'getlogin')
    return {
        type: LOGIN,
        data: user
    }
};

export const logout = () => {

    return {
        type: LOGOUT
    }
};

export const updateNoticeTip = (url,type) => {
    return async dispatch => {
        try {
            let body = {type}
            let data = await http.post(url,body)
            if(type==0){
                // alert(JSON.stringify(data))
            }

            dispatch(updateNoticesTip(type));

        } catch (err) {

        }
    }
}

const updateNoticesTip = (type) => {


    return {
        type: UPDATE_NOTICES_TIP,
        payload:type
    }
}