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
/**
 * 获取用户基本资料
 * @returns promise
 */
//获取用户基本资料
export function getuserinfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
/**
 *
 * @param {string} id 用户id
 * @returns  promise
 */
//获取用户基本信息
export function getuserinfoxq(id) {
  return request({
    url: '/sys/user/' + id
  })
}
/**
 *  更新用户信息
 * @param {*} data
 * @returns
 */
export function putinfolist(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
