/**
 * Created by quipoo on 2019/3/21.
 */


import { UPDATE_FAMILY_MEMBER, START_FETCH_FAMILY_MEMBER, END_FETCH_FAMILY_MEMBER } from '../actions/index';

const initialState = {
    familyInfo: [],//是否madal需要显示
    loading:true
}

export default function guardianMemberReducer(state = initialState, {type, payload}) {
    switch(type) {
        case UPDATE_FAMILY_MEMBER:
            return{
                familyInfo:[...payload],
                loading:false
            }
        case START_FETCH_FAMILY_MEMBER:
            return{
                ...state,
                loading:true
            }
        case END_FETCH_FAMILY_MEMBER:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }

}