/**
 * Created by quipoo on 2019/3/21.
 */

import { MODAL_VISIBLE} from './index';
export const toggleModalVisibleState = (isVisible) => {
    return {
        payload:{modalVisible:isVisible},
        'type': MODAL_VISIBLE
    }
}