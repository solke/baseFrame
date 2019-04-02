/**
 * Created by quipoo on 2019/3/21.
 */

import {LOGIN, UPDATE_FAMILY_MEMBER,START_FETCH_FAMILY_MEMBER,END_FETCH_FAMILY_MEMBER} from './index';
import LoadingUtil from '../common/LoadingUtil'
import { toastShort } from '../common/ToastUtils'

import http from '../common/http'
import {api} from '../common/config'

//请求成员数据
export const fetchGuardianMember = () => {
    return async dispatch => {
        try {
            dispatch(startFetchGuardianMember())
            let res = await http.get(api.familyMember)
            console.log(res,'fetchGuardianMemberaa')

            dispatch(endFetchGuardianMember())
            dispatch(updateGuardianMember(res.data));

        } catch (err) {
            dispatch(endFetchGuardianMember())
        }
    }
}

//延迟刷新数据
export const updateMember=()=>{
    return async dispatch =>{
        setTimeout(()=>{
            dispatch(fetchGuardianMember())
        },500)
    }
}


//取消绑定
export const cancelBindMember = (body)=>{
    return async dispatch => {
        try {
            dispatch(startFetchGuardianMember())
            let res = await http.get(api.cancelBind,body)
            console.log(res,'fetchGuardianMember')

            dispatch(updateMember())//延迟刷新

            dispatch(endFetchGuardianMember())

        } catch (err) {
            if(err.statusCode && err.statusCode==404){
                toastShort('您无权限取消关联该家长，请联系班主任取消')
            }else{
                toastShort(err.message||'请求失败，请稍后再试')
            }
            dispatch(endFetchGuardianMember())
        }
    }
}

const startFetchGuardianMember=()=>{
    return{
        type:START_FETCH_FAMILY_MEMBER
    }
}
const endFetchGuardianMember=()=>{
    return{
        type:END_FETCH_FAMILY_MEMBER
    }
}
const updateGuardianMember = (data) => {


    return {
        type: UPDATE_FAMILY_MEMBER,
        payload:data
    }
}