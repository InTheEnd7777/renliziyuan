import request from '@/utils/request'
/**
 * 获取员工列表（简单）
 * @returns promise
 */
export function getemployeesApi() {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * //获取员工详情
 * @param {*} params {page,size}
 * @returns
 */
export function getemployeesinfoApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}
/**
 * 删除员工
 * @param {*} id 员工id
 * @returns
 */
export function delemployeesinfoApi(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE'
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
/**
 * 导入员工xlsx模板
 * @returns
 */
export function importemployees(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
