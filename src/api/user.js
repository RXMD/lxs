import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Authorization/Auth/SignIn',
    method: 'post',
    data
  })
}
// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }
export function getInfo(token) {
  return request({
    url: '/System/User/Info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

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
// 添加用户
export function addUser(data) {
  return request({
    url: '/System/User/SignUpUser',
    method: 'post',
    data
  })
}
// 删除用户
export function deleteUser(id) {
  return request({
    url: `/System/User/DeleteUser?userId=${id}`,
    method: 'post'
  })
}
// 获取权限
export function AllList(userId, tenantId) {
  return request({
    url: `/System/UserMenu/AllList?userId=${userId}&tenantId=${tenantId}`,
    url: `/System/UserMenu/AllList?userId=${userId}`,
    method: 'get'
  })
}
// 用户权限
export function UserMenu(userId, tenantId) {
  return request({
    url: `/System/UserMenu/List?userId=${userId}&tenantId=${tenantId}`,
    url: `/System/UserMenu/List?userId=${userId}`,
    method: 'get'
  })
}
export function saveList(data) {
  return request({
    url: `/System/UserMenu/save`,
    method: 'post',
    data
  })
}
