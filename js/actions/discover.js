/**
 * Created by quipoo on 2019/3/19.
 */
import {SET_DISCOVER_DATA} from './index';

export const setDiscoverData = (data) => {

    return {
        type: SET_DISCOVER_DATA,
        data
    }
};