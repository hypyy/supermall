import axios from 'axios'


//什么是回调函数
// function aaa(bbb,ccc) {
//     bbb('ssss')
// }
// aaa(function (res) {
//     console.log(res+'dddd');
// },function (err) {
//     console.log(err);
// })

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/z8',
        timeout: 1000
    })
    // 2.axios的拦截器
    //拦截请求http://152.136.185.210:8000/api/n3
    instance.interceptors.request.use(config=>{
        // console.log(config);
        //拦截请求有什么用呢？
        //1.比如config中的一些信息不符合服务器的要求

        //2.比如每次发送网络请求去，都希望在界面中显示出一个等待的小圆圈

        //3.某些网络请求（比如登录（token））,必须携带一些特殊的信息

        //把config返回出去
        return config
    },err=>{
        // console.log(err);
    })
    //响应链接
    instance.interceptors.response.use(res=>{
        // console.log(res);
        return res.data
    },err=>{
        // console.log(err);
    })
    //3.发送真正的网络请求
    //instance直接就会返回一个Promise所以没有必要再封装一个Promise
    return instance(config)
}

