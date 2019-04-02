/**
 * Created by quipoo on 2019/3/16.
 */
import {
    AsyncStorage,
} from 'react-native';
import Storage from 'react-native-storage';
const STORAGE_NAME = 'userInfo';
export const storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,//1000 * 3600 * 24
});
export default {
    get(callback){
        storage.load({
            key: STORAGE_NAME,
        }).then((ret) => {
            callback(null,ret);
        }).catch((err) => {
            callback(err);
        });
    },
    save(data,callback){
        console.log(data);
        storage.save({
            key:STORAGE_NAME,
            data:data,
        }).then(function() {
            callback(null)
        }).catch((err) => {
            callback(err)
        });
    },
    clear(){
        storage.remove({
            key: STORAGE_NAME
        });
    }
}