import { AsyncStorage } from 'react-native';
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import { persistStore, persistReducer } from 'redux-persist';
import {middleware} from '../navigators/AppNavigators'

/**
 * 自定义log中间件
 * https://cn.redux.js.org/docs/advanced/Middleware.html
 * @param store
 */
const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching ', action);
    }
    const result = next(action);
    console.log('nextState ', store.getState());
    return result;
};

const persistConfig = {
    key: 'root',
    storage:AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = [
    middleware,
    logger,
    thunk,
];

/**
 * 创建store
 */
// export default createStore(reducers, applyMiddleware(...middlewares));

export default (onComplete = () => {}) => {
    let store = createStore(persistedReducer,applyMiddleware(...middlewares))
    let persistor = persistStore(store,null,onComplete)
    return { store, persistor }
}