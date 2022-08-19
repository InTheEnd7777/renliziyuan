import request from '@/utils/request.js'
// 获取权限
export function getPermission(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

