import request from '@/utils/request'

/**
 * 登录请求
 * @param {object} data  password moblie 
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
