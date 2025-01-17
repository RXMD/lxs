import request from '@/utils/request'

// 获取用户列表
export function getList(data) {
  return request({
    url: `/Customer/Customer/PageList`,
    method: 'post',
    data
  })
}
export function customerSave(data) {
  return request({
    url: `/Customer/Customer/Save'`,
    method: 'put',
    data
  })
}
// 获取用户信息
export function getInfo(id) {
  return request({
    url: `/Customer/Customer/Info?id=${id}`,
    method: 'get'
  })
}
