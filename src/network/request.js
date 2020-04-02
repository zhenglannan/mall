import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance1 = axios.create({
    baseURL: 'http://152.136.185.210:8000',
    timeout: 5000
  })
  // 2.axios的拦截器
  // 请求拦截
  instance1.interceptors.request.use(config => {
      // console.log(config);
      // 拦截之后必须要返回，不然拿不到数据
      return config
    }, err => {
      console.log(err);
    }),
    // 响应拦截
    instance1.interceptors.response.use(res => {
      // console.log(res);
      // 返回真正需要的值
      return res.data
    }, err => {
      console.log(err);
    })

  return instance1(config)
}
