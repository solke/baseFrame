/**
 * Created by quipoo on 2019/3/19.
 */
import { SET_DISCOVER_DATA } from '../actions';
const initialState = {
    data:[
        {
            title:'校园竞赛',
            image:'icon_competition',
            url: "http://fj.51347.cn/static/appNew/index.html",
        },
        {
            title:'高考录取',
            image:'icon_query-gaokao',
            // url: "http://fj.51347.cn/web/other/fjgkcjcx/scores_enter.html",
            url:"http://fj.51347.cn/web/other/fjgklqcx/lq_enter"
        },
        {
            title:'学习提高',
            image:'icon_learn_to_improve',
            url: ""
        }
    ]
};

export default function discover(state = initialState, {type, data}) {
    switch (type) {
        case SET_DISCOVER_DATA:{
            return {
                data
            }
        }
        default:
            return state;
    }
}