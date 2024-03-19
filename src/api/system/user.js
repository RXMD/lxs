import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: `/System/User/PageList`,
    method: 'post',
    data
  })
}
export function SubAccountList(data) {
  return request({
    url: `/System/User/SubAccountList`,
    method: 'post',
    data
  })
}
