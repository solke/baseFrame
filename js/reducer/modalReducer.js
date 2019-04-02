/**
 * Created by quipoo on 2019/3/21.
 */
/**
 * Created by quipoo on 2017/6/17.
 */
'use strict';

import { MODAL_VISIBLE} from '../actions/index';

const initialState = {
    modalVisible: false,//是否madal需要显示
}

export default function modalReducer(state = initialState, {type, payload}) {
    switch(type) {
        case MODAL_VISIBLE:
            return{
                ...state,
                ...payload
            }
        default:
            return state;
    }

}