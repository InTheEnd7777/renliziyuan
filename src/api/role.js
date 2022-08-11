import request from '@/utils/request'
/**
 * 获取角色信息
 * @returns
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * 新增角色
 * @param {*} data
 * @returns
 */
export function addroles(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
/**
 * 删除角色
 * @param {*} id 角色id
 * @returns
 */
export function removeroles(id) {
  return request({
    url: '/sys/role' + id,
    method: 'DELETE'
  })
}

