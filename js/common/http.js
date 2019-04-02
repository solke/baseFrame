//request后端接口
import _ from 'lodash';
import store from './store';
import queryString from 'querystring';
const timeOut = 8000
const header = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
const _fetch = (requestPromise, timeout=timeOut) => {
    let timeoutAction = null;
    const timerPromise = new Promise((resolve, reject) => {
        timeoutAction = () => {
            reject({message:'请求超时'});
        }
    })
    setTimeout(()=>{
        timeoutAction()
    }, timeout)
    return Promise.race([requestPromise,timerPromise]);
}

// import Mock from 'mockjs';
const getSessionId = (cb) => {
    store.get((err,ret) => {
        if(err){
            cb(null)
            return
        }
        if(!ret.sessionId){
            cb(null)
            return
        }
        cb(ret.sessionId)
    });
}
export default {
    get(url,param){
        return new Promise((resolve, reject) => {
            getSessionId((sessionId) => {
                if(sessionId){
                    param = param || {};
                    param.sessionId = sessionId;
                }
                if(param){
                    url += '?' + queryString.stringify(param);
                }
                console.log(url);
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            reject({status:response.status})
                        }
                    })
                    //.then(response => Mock.mock(response))
                    .then(response => {
                        if(response!==undefined && response.statusCode && response.statusCode!= 200){

                            reject(response);
                        }else{
                            resolve(response);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        reject(err);
                    });
            })
        });
    },
    //如果后端服务器不识别这种请求头就采用config.header.headerForm
    post(url,body){

        // return new Promise((resolve, reject) => {
        //     getSessionId((sessionId) => {
        //         if(sessionId){
        //             body = body || {};
        //             body.sessionId = sessionId;
        //         }
        //         let option = _.extend(header,{
        //             body:queryString.stringify(body)
        //         });
        //
        //         fetch(url,option)
        //             .then(response => {
        //
        //                 if (response.ok) {
        //                     return response.json();
        //                 } else {
        //                     reject({status:response.status})
        //                 }
        //             })
        //             //.then(response => Mock.mock(response))
        //             .then(response => {
        //                 if (response!==undefined && response.statusCode && response.statusCode!== 200) {
        //                     // alert(response.message);
        //                     reject(response);
        //                 } else {
        //                     resolve(response);
        //                 }
        //             })
        //             .catch((err) => {
        //
        //                 reject(err);
        //             });
        //     })
        // });

        return new Promise((resolve, reject) => {
            let questBody = body || {}
            getSessionId((sessionId) => {
                if(sessionId){
                    questBody.sessionId = sessionId;
                }
                // console.warn(JSON.stringify(questBody))
                let option = _.extend(header,{
                    body:queryString.stringify(questBody)
                });
                let myFetch = fetch(url,option)

                //封装请求超时
                _fetch(myFetch, timeOut)
                    .then(response => {
                        // console.warn('rrrrreeeee')
                        if (response.ok) {
                            // console.warn(response)

                            return response.json();
                        } else {
                            reject({status:response.status})
                        }
                    })
                    // .then(response => Mock.mock(response))
                    .then(response => {
                        // console.warn(response)
                        if (response!==undefined && response.statusCode && response.statusCode!= 200) {
                            // alert(response.message);
                            reject(response);
                        } else {
                            resolve(response);
                        }
                    })
                    .catch((err) => {
                        // alert(err.message);
                        reject(err);
                    });
            })
        });




    },

    //排序专用
    postSort(url,body){
        return new Promise((resolve, reject) => {
            getSessionId((sessionId) => {
                if(sessionId){
                    body = body || {};
                    body.sessionId = sessionId;
                }
                let option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(body)
                }


                fetch(url,option)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            reject({status:response.status})
                        }
                    })
                    // .then(response => Mock.mock(response))
                    .then(response => {

                        console.log(response)
                        if (response!==undefined && response.statusCode && response.statusCode!= 200) {
                            // alert(response.message);
                            reject(response);
                        } else {
                            resolve(response);
                        }
                    })
                    .catch((err) => {
                        // alert(err.message);
                        reject(err);
                    });
            })
        });
    },
    postJSON(url,body){
        return new Promise((resolve, reject) => {
            console.warn(url)
            fetch(url,{
                header:{
                    "Content-Type":"application/json"
                },
                methond:'POST',
                body: JSON.stringify(body)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject({status:response.status})
                    }
                })
                .then(response => {

                    console.log(response)
                    if (response!==undefined && response.statusCode && response.statusCode!= 200) {
                        // alert(response.message);
                        reject(response);
                    } else {
                        resolve(response);
                    }
                })
                .catch((err) => {
                    // alert(err.message);
                    reject(err);
                });
        })
    },
    fetchGet(url,param){
        return new Promise((resolve, reject) => {
            if(param) {
                url += '?' + queryString.stringify(param);
            }
            console.log(url);
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject({status:response.status})
                    }
                })
                //.then(response => Mock.mock(response))
                .then(response => {
                    if(response!==undefined && response.statusCode && response.statusCode!= 200){

                        reject(response);
                    }else{
                        resolve(response);
                    }
                })
                .catch((err) => {

                    reject(err);
                });
        });
    },
    fetchWXGet(url,param){//不加判断和sessionId
        return new Promise((resolve, reject) => {
            if(param) {
                url += '?' + queryString.stringify(param);
            }
            console.log(url);
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject({status:response.status})
                    }

                })
                .then(response => {
                    resolve(response);
                })
                .catch((err) => {

                    reject(err);
                });
        });
    },
    postRootOnly(url,body){
        return new Promise((resolve, reject) => {
            let option = _.extend({
                method: 'POST',
                headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                }
            },{
                body:queryString.stringify(body)
            });
            console.log(url);
            console.log(body)
            fetch(url,option)
                .then(response => {
                    if (response.ok) {
                        console.log(response,'bbb')
                        return response.json();
                    } else {
                        reject({status:response.status})
                    }
                })

                // .then(response => Mock.mock(response))
                //.then(response => Mock.mock(response))
                .then(response => {
                    resolve(response);
                })
                .catch((err) => {

                    reject(err);
                });
        });
    },
    postOnly(url,body){
        return new Promise((resolve, reject) => {

            let option = _.extend(header,{
                body:queryString.stringify(body)
            });
            console.log(url);
            console.log(body)
            fetch(url,option)
                .then(response => {
                    if (response.ok) {
                        console.log(response,'aaa')
                        return response.json();
                    } else {
                        reject({status:response.status})
                    }
                })
                //.then(response => Mock.mock(response))
                .then(response => {
                    console.log(response)
                    if (response!==undefined && response.statusCode && response.statusCode!= 200) {
                        reject(response);
                    } else {
                        resolve(response);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },


    fetchPost(url,body,cbSuccess,cbFail){
        return new Promise((resolve, reject) => {
            getSessionId((sessionId) => {
                if(sessionId){
                    body = body || {};
                    body.sessionId = sessionId;
                }
                let option = _.extend(header,{
                    body:queryString.stringify(body)
                });
                console.log(url);
                fetch(url,option)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            reject({status:response.status})
                        }
                    })
                    //.then(response => Mock.mock(response))
                    .then(response => {

                        console.log(response)
                        if (response!==undefined && response.statusCode && response.statusCode!= 200) {

                            reject(response);
                            cbSuccess(response)
                        } else {
                            resolve(response);
                            cbFail(response)
                        }
                    })
                    .catch((err) => {

                        reject(err);
                        cbFail(response)
                    });
            })
        });
    },
    fetchNoJsonPost(url,body){
        return new Promise((resolve, reject) => {
            getSessionId((sessionId) => {
                if(sessionId){
                    body = body || {};
                    body.sessionId = sessionId;
                }
                let option = _.extend(header,{
                    body:queryString.stringify(body)
                });
                console.log(url);
                fetch(url,option)
                    .then(response => {
                        if (response.ok) {
                            return response;
                        } else {
                            reject({status:response.status})
                        }
                    })
                    //.then(response => Mock.mock(response))
                    .then(response => {
                        if(response.json() && response.json().statusCode){
                            if (response.json()!==undefined && response.json().statusCode && response.json().statusCode!= 200) {
                                reject(response.json());
                            } else {
                                resolve(response.json());
                            }
                        }else{
                            resolve(response)
                        }

                    })
                    .catch((err) => {

                        reject(err);
                    });
            })
        });
    },

};
export const uploadImage = (url, uri) => {
    return new Promise((resolve, reject) => {
        if ( !uri ) {
            reject();
        }
        getSessionId((sessionId) => {
            let body = {};
            let formData = new FormData();
            if (sessionId) {
                formData.append("sessionId", sessionId);
            }
            let file = {uri: uri, type: 'multipart/form-data', name: 'upload'};
            formData.append("file",file);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type':'multipart/form-data',
                },
                body: formData,
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    if (response.statusCode != 200) {

                        reject(response);
                    } else {
                        resolve(response);
                    }
                })
                .catch((err) => {

                    reject(err);
                });
        })
    });
};


// return new Promise((resolve, reject) => {
//     getSessionId((sessionId) => {
//         if(sessionId){
//             body = body || {};
//             body.sessionId = sessionId;
//         }
//         let option = _.extend(header,{
//             body:queryString.stringify(body)
//         });
//         console.log(url);
//         console.log(body)
//         fetch(url,option)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     reject({status:response.status})
//                 }
//             })
//             // .then(response => Mock.mock(response))
//             .then(response => {
//                 console.log(response)
//                 if (response!==undefined && response.statusCode && response.statusCode!= 200) {
//                     // alert(response.message);
//                     reject(response);
//                 } else {
//                     resolve(response);
//                 }
//                 // resolve(response);
//                 console.log(response)
//                 // if (response.statusCode != 200) {
//                 //     // alert(response.message);
//                 //     reject(response);
//                 // } else {
//                 //     resolve(response);
//                 // }
//             })
//             .catch((err) => {
//                 // alert(err.message);
//                 console.log('eeeeeeeerrrr')
//                 reject(err);
//             });
//     })
// });