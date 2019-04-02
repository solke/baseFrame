/**
 * Created by quipoo on 2019/2/11.
 */
import { LOGIN, LOGOUT, UPDATE_NOTICES_TIP } from '../actions';
const initialState = {
    role:null,
    name:null,
    isLogin:false
};

export default function user(state = initialState, {type, data}) {
    switch (type) {
        case LOGIN:
            return {
                ...state,
                ...data,
                isLogin:true
            }
            break;
        case LOGOUT:
            return{
                role:null,
                name:null,
                isLogin:false
            }
            break;
        case UPDATE_NOTICES_TIP:
            let noticesTip = state.noticesTip
            for(let i=0;i<noticesTip.length;i++){
                if(noticesTip[i].type == parseInt(payload)){
                    noticesTip[i].hasNew = false
                }
            }
            let hasNewNotice = false
            for(let i=0;i<noticesTip.length;i++){
                if(noticesTip[i].hasNew==true){
                    hasNewNotice = true
                }
            }
            return{
                ...state,
                noticesTip,
                hasNewNotices:hasNewNotice
            }
            break;
        default:
            return state;
    }
}