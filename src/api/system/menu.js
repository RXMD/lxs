import request from '@/utils/request'

export function GetitemConfigListData(params) {
  return request({
    url: '/Quotation/Ele_ItemConfiguration/ListData',
    method: 'get',
    params
  })
}
