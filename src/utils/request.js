// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { gettokentime } from '@/utils/auth'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
}) // 创建一个axios的实例
const istime = function () {
  const currentTime = Date.now()
  //登录的时间
  const tokenTime = gettokentime()
  //token的保质期
  const timeout = 2*60*60 * 1000
  return currentTime - tokenTime > timeout
}
service.interceptors.request.use(async (config) => {
  // console.log(config)
  if (store.state.user.token) {

    if (istime()) {
      // console.log('token过期')
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  function (error) {
    // console.dir(error)

    if (error?.response?.status === 401) {
      Message.error('登录过期')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
    // console.log(error)
  }
) // 响应拦截器.

export default service // 导出axios实例
