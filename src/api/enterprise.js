import request from '@/utils/request'
/**
 * 查询企业
 * @param {*} id 企业id
 * @returns 
 */
export function getcompanyinfo(id) {
  return request({
    url: '/company/' + id
  })
}
