import request from '@/utils/request'

export function getTenantList(data) {
  return request({
    url: '/System/Tenant/PageList',
    method: 'post',
    data
  })
}
export function deleteTenant(id) {
  return request({
    url: `/System/Tenant/DeleteTenant?tenantId=${id}`,
    method: 'post'
  })
}
export function addTenant(data) {
  return request({
    url: '/System/Tenant/EditTenant',
    method: 'post',
    data
  })
}
export function UserMenu(id) {
  return request({
    url: `/System/Tenant/TenantInfo?id=${id}`,
    method: 'get'
  })
}
