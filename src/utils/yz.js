import store from '@/store'
// import dayjs from 'dayjs';
// import { CodeToText } from 'element-china-area-data';
// import CircularJSON from 'circular-json'
const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

import context from '@/main'
const STORAGEPREFIX = 'yz_'
const STORAGETYPE = window.localStorage
export default {
  toDateText(dateTimeStamp) {
    let result = ''
    const minute = 1000 * 60 // 把分，时，天，周，半个月，一个月用毫秒表示
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7
    const halfamonth = day * 15
    const month = day * 30
    const now = new Date().getTime() // 获取当前时间毫秒
    const diffValue = now - dateTimeStamp // 时间差
    if (diffValue < 0) return
    const minC = diffValue / minute // 计算时间差的分，时，天，周，月
    const hourC = diffValue / hour
    const dayC = diffValue / day
    const weekC = diffValue / week
    const monthC = diffValue / month
    if (monthC >= 1 && monthC <= 3) {
      result = ' ' + parseInt(monthC) + '月前'
    } else if (weekC >= 1 && weekC <= 3) {
      result = ' ' + parseInt(weekC) + '周前'
    } else if (dayC >= 1 && dayC <= 6) {
      result = ' ' + parseInt(dayC) + '天前'
    } else if (hourC >= 1 && hourC <= 23) {
      result = ' ' + parseInt(hourC) + '小时前'
    } else if (minC >= 1 && minC <= 59) {
      result = ' ' + parseInt(minC) + '分钟前'
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = '刚刚'
    } else {
      const datetime = new Date()
      datetime.setTime(dateTimeStamp)
      const Nyear = datetime.getFullYear()
      const Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      const Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      const Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
      const Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
      const Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
      result = Nyear + '-' + Nmonth + '-' + Ndate
    }
    return result
  },
  getDate(format, strInterval, number) {
    var myDate = new Date()
    var dtTmp = new Date()
    if (strInterval) {
      switch (strInterval) {
        case 's':
          myDate = new Date(Date.parse(dtTmp) + 1000 * number) // 秒
          break
        case 'n':
          myDate = new Date(Date.parse(dtTmp) + 60000 * number) // 分
          break
        case 'h':
          myDate = new Date(Date.parse(dtTmp) + 3600000 * number) // 小时
          break
        case 'd':
          myDate = new Date(Date.parse(dtTmp) + 86400000 * number) // 天
          break
        case 'w':
          myDate = new Date(Date.parse(dtTmp) + 86400000 * 7 * number) // 星期
          break
        case 'q':
          myDate = new Date(dtTmp.getFullYear(), dtTmp.getMonth() + number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()) // 季度
          break
        case 'm':
          myDate = new Date(dtTmp.getFullYear(), dtTmp.getMonth() + number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()) // 月
          break
        case 'y':
          myDate = new Date(dtTmp.getFullYear() + number, dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()) // 年
          break
        default:
      }
    }
    return yz.toDate(myDate, format)
  },
  toDate(v, format) {
    format = format || 'yyyy-MM-dd HH:mm'
    if (!v) return ''
    var d = v
    if (typeof v === 'string') {
      if (v.indexOf('/Date(') > -1) d = new Date(parseInt(v.replace('/Date(', '').replace(')/', ''), 10))
      else d = new Date(Date.parse(v.replace(/-/g, '/').replace('T', ' ').split('.')[0]))
    } else {
      d = new Date(v)
    }
    var o = {
      'M+': d.getMonth() + 1,
      'd+': d.getDate(),
      'h+': d.getHours(),
      'H+': d.getHours(),
      'm+': d.getMinutes(),
      's+': d.getSeconds(),
      'q+': Math.floor((d.getMonth() + 3) / 3),
      S: d.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  },
  getThatDay(space) {
    if (space == undefined) {
      space = 0
    }

    const date = new Date()
    date.setTime(date.getTime() + 86400000 * space)
    return this.assemblyDay({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    })
  },
  assemblyDay(data) {
    const year = data.year.toString()
    data.month = Number(data.month + 1)
    const month = this.complement(data.month)
    const date = this.complement(data.date)
    return year + '-' + month + '-' + date
  },
  complement(value, digit) {
    digit = digit || 2
    value = Number(value)
    if (value < Math.pow(10, digit - 1)) {
      let text = ''
      for (let i = 0; i < digit - value.toString().length; i++) {
        text = text + '0'
      }
      return text + value
    } else {
      return value.toString()
    }
  },
  toTreeViewJson(data, id, parentIdText, idText) {
    parentIdText = parentIdText || 'parentId'
    idText = idText || 'id'
    id = id || 0
    const treeJson = []
    const childNode = data.filter(v => v[parentIdText] == id)
    if (childNode.length > 0) {
      for (let i = 0; i < childNode.length; i++) {
        const treeModel = {
          ...childNode[i],
          hasChildren: !!data.filter(v => v[parentIdText] == childNode[i][idText]).length,
          ChildNodes: yz.toTreeViewJson(data, childNode[i][idText], parentIdText, idText),
          isexpand: childNode[i].isexpand == undefined ? true : childNode[i].isexpand,
          complete: true
        }
        treeJson.push(treeModel)
      }
    }
    return treeJson
  },
  toFileSize(size) {
    if (size == null || size == '') {
      return ''
    }
    if (size < 1024.0) return yz.toDecimal(size) + ' 字节'
    else if (size >= 1024.0 && size < 1048576) return yz.toDecimal(size / 1024.0) + ' KB'
    else if (size >= 1048576 && size < 1073741824) return yz.toDecimal(size / 1024.0 / 1024.0) + ' MB'
    else if (size >= 1073741824) return yz.toDecimal(size / 1024.0 / 1024.0 / 1024.0) + ' GB'
  },
  toDecimal(num) {
    if (num == null) {
      num = '0'
    }
    num = num.toString().replace(/\$|\,/g, '')
    if (isNaN(num)) num = '0'
    var sign = num == (num = Math.abs(num))
    num = Math.floor(num * 100 + 0.50000000001)
    var cents = num % 100
    num = Math.floor(num / 100).toString()
    if (cents < 10) cents = '0' + cents
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + '' + num.substring(num.length - (4 * i + 3))
    return (sign ? '' : '-') + num + '.' + cents
  },
  toUrl(url) {
    return url ? process.env.VUE_APP_BASE_API + url : ''
  },
  getAuth() {
    return store.getters.token
  },
  // 基于dayjs日期格式化,时间戳(毫秒)转日期
  dateFormat(date, format) {
    format = format || 'YYYY-MM-DD HH:mm:ss'
    if (!date) return ''
    return dayjs(date).format(format)
  },
  // 基于dayjs日期格式化,日期转时间戳(毫秒)
  timestamp(val) {
    return dayjs(val).valueOf()
  },
  // 基于dayjs日期格式化, 表格专用
  tableDateFormat(row, column, cellValue) {
    const format = 'YYYY-MM-DD HH:mm:ss'
    if (!cellValue) return ''
    return dayjs(cellValue).format(format)
  },
  storageSet(obj) {
    for (const i in obj) {
      cacheItem(i, obj[i])
    }

    function cacheItem(key, val) {
      key = STORAGEPREFIX + key
      const valType = typeof val
      if (val !== null) {
        var valConstructor = val.constructor
      }
      if (valType === 'string' || valType === 'number' || valType === 'boolean') {
        if (valConstructor === String) {
          val = val + '|String'
        } else if (valConstructor === Number) {
          val = val + '|Number'
        } else if (valConstructor === Boolean) {
          val = val + '|Boolean'
        }

        STORAGETYPE.setItem(key, val)
      } else if (valType === 'object') {
        if (val === null) {
          val = JSON.stringify(val) + '|Null'
          STORAGETYPE.setItem(key, val)
        } else {
          if (valConstructor === Array) {
            val = JSON.stringify(val) + '|Array'
          } else if (valConstructor === Object) {
            val = JSON.stringify(val) + '|Object'
          }

          STORAGETYPE.setItem(key, val)
        }
      }
    }
  },
  storageGet(key) {
    key = STORAGEPREFIX + key
    const keyName = STORAGETYPE.getItem(key)
    if (keyName === null) {
      return null
    }
    const valArr = keyName.split('|')
    const getDataType = valArr[valArr.length - 1]
    valArr.splice(valArr.length - 1, 1)
    let val = valArr.join('')
    if (getDataType === 'Number') {
      val = parseInt(val)
    } else if (getDataType === 'Boolean') {
      if (val === 'true') {
        val = true
      } else {
        val = false
      }
    } else if (getDataType === 'Array' || getDataType === 'Object' || getDataType === 'Null') {
      val = JSON.parse(val)
    }
    return val
  },
  storageRemove(key) {
    STORAGETYPE.removeItem(STORAGEPREFIX + key)
  },
  storageClear() {
    for (const i in STORAGETYPE) {
      if (i.indexOf(STORAGEPREFIX) !== -1) {
        STORAGETYPE.removeItem(i)
      }
    }
  },
  hasP(enCode) {
    const permissionList = store.getters && store.getters.permissionList
    const modelId = context.$route.meta.modelId || ''
    if (!modelId) return false
    const list = permissionList.filter(o => o.modelId === modelId)
    if (!list.length) return false
    const columnList = list[0] && list[0].column ? list[0].column : []
    if (!columnList.length) return false
    const hasPermission = columnList.some(column => column.enCode === enCode)
    if (hasPermission) return true
    return false
  },
  hasBtnP(enCode) {
    const permissionList = store.getters && store.getters.permissionList
    const modelId = context.$route.meta.modelId || ''
    if (!modelId) return false
    const list = permissionList.filter(o => o.modelId === modelId)
    if (!list.length) return false
    const btnList = list[0] && list[0].button ? list[0].button : []
    if (!btnList.length) return false
    const hasPermission = btnList.some(btn => btn.enCode === enCode)
    if (hasPermission) return true
    return false
  },
  // 地区code转文字
  fmtCodeToText(row, column) {
    const r = row.region && row.region.split(',')

    if (r && r.length > 0) {
      return CodeToText[r[0]] + '/' + CodeToText[r[1]] + '/' + CodeToText[r[2]]
    } else {
      return ''
    }
  },
  // 转证件类型
  fmtCertificatesType(row, column) {
    if (row.certificatesType == 1) {
      return '身份证'
    } else {
      return '护照'
    }
  },
  // 男女
  fmtGender(row, column) {
    return row.gender == 1 ? '男' : '女'
  },

  // 扁平数组转换成树形数组
  translateDataToTree(data, idKey, pidKey) {
    // 没有父节点的数据
    if (data && data.length > 0) {
      const parents = data.filter(value => {
        return value[pidKey] == 'undefined' || value[pidKey] == null || value[pidKey].length == 0
      })

      // 有父节点的数据
      const children = data.filter(value => value[pidKey] !== 'undefined' && value[pidKey] != null)

      // 定义转换方法的具体实现
      const translator = (parents, children) => {
        parents.forEach(parent => {
          children.forEach((current, index) => {
            if (current[pidKey] === parent[idKey]) {
              const temp = JSON.parse(JSON.stringify(children))
              temp.splice(index, 1)
              translator([current], temp)

              if (typeof parent.children !== 'undefined') {
                parent.children.push(current)
              } else {
                parent.children = [current]
              }
            }
          })
        })
      }

      // 调用转换方法
      translator(parents, children)

      // 返回最终的结果
      return parents
    }
  },
  translateDataToTreeT(arr, idKey, pidKey) {
    // 利用两层filter实现
    const data = arr.filter(item => {
      const itemValue = item[idKey]
      if (itemValue) {
        const children = arr.filter(e => {
          return itemValue === e[pidKey]
        })
        if (children && children.length > 0) {
          item.children = children
        }
        return !item[pidKey]
      }
    })

    return data
  },
  // 树形数组转成扁平数组
  treeTransArray(treeData, field) {
    var result = []
    if (!field) field = 'children'
    const treeToArray = (treeData, field) => {
      for (var obj of treeData) {
        var clone = JSON.parse(JSON.stringify(obj))
        delete clone[field]
        result.push(clone)
        if (obj[field] && obj[field].length > 0) {
          treeToArray(obj[field], field)
        }
      }
    }
    treeToArray(treeData, field)
    return result
  },

  filterRouteRefrsh(path) {
    if (path.indexOf('&isRefresh=true') > -1) {
      return path.replace('&isRefresh=true', '')
    } else if (path.indexOf('&isRefresh=false') > -1) {
      return path.replace('&isRefresh=false', '')
    } else if (path.indexOf('?isRefresh=true') > -1) {
      return path.replace('?isRefresh=true', '')
    } else if (path.indexOf('?isRefresh=false') > -1) {
      return path.replace('?isRefresh=false', '')
    } else {
      return path
    }
  },
  /*
     * JSON数组去重
     */

  uniqueArray(array, key) {
    var result = [array[0]]
    for (var i = 1; i < array.length; i++) {
      var item = array[i]
      var repeat = false
      for (var j = 0; j < result.length; j++) {
        if (item[key] == result[j][key]) {
          repeat = true

          break
        }
      }
      if (!repeat) {
        result.push(item)
      }
    }
    return result
  },
  // 过滤树形表单idx
  fmrTreeIdx(array) {
    for (let i = 0; i < array.length; i++) {
      const prevItem = array[i - 1]
      const previndex = prevItem && prevItem.index
      const prevChildren = prevItem && prevItem.children
      const item = array[i]
      const children = item.children
      if (prevItem) {
        if (children && children.length > 0) {
          item.index = previndex + children.length
          for (let l = 0; l < children.length; l++) {
            children[l].index = previndex + l + 1
          }
        } else {
          item.index = previndex + 1
        }
      } else {
        if (prevChildren && prevChildren.length > 0) {
          for (let l = 0; l < children.length; l++) {
            children[l].index = 1
          }
        } else {
          item.index = i
        }
      }
    }
    return array
  },
  // 根据value获取select label
  getSelectField(value, array, valueName, fieldName) {
    if (array && array.length > 0) {
      const json = array.find(item => {
        return item[valueName] == value
      })
      return json && (json[fieldName] || json[valueName])
    }
  },

  // 根据url生成blob下载
  // downloadFile(content, name) {

  //   if (content.size === 0) throw new Error("文件数据大小为0字节!");
  //   // 正常文件导出的接口成功调用都是直接返回数据，json格式一致认为是接口出现错误。
  //   if (content.type === "application/json") {
  //     // 在Promise里面抛出异常不会被正常的try-catch捕获到
  //     content.text().then((txt) => {
  //       message.error(matchString(txt, "msg", false));
  //       // throw new Error(`May be is error, check again, type is ${content.type}, size is ${content.size}.`);
  //     });
  //   } else {
  //     // 后端接口返回的数据类型是这个旧版的excel
  //     const isExcel =
  //       content.type === "application/vnd.ms-excel" ||
  //       content.type === "application/x-msdownload";
  //     const blob = new Blob([content], {
  //       type: isExcel ? "application/ms-excel" : content.type,
  //     });
  //     // excel需要指定扩展名，不然会有提示警告
  //     // 有一个接口下载的文件是txt
  //     const fileName = isExcel ? `${name}.xlsx` : name;
  //     if ("download" in document.createElement("a")) {
  //       // 非IE下载
  //       const elink = document.createElement("a");
  //       elink.download = fileName;
  //       elink.style.display = "none";
  //       elink.href = URL.createObjectURL(blob);
  //       document.body.appendChild(elink);
  //       elink.click();
  //       URL.revokeObjectURL(elink.href); // 释放URL 对象
  //       document.body.removeChild(elink);
  //     } else {
  //       navigator.msSaveBlob(blob, fileName);
  //     }
  //   }
  // },
  downloadFile(url, name) {
    const baseURL = this.getProductionAjaxUrl()
    url = baseURL + url
    const didx = name.lastIndexOf('.')
    name = name.slice(0, didx)

    if ('download' in document.createElement('a')) {
      // 非IE下载
      const elink = document.createElement('a')
      elink.download = name
      elink.style.display = 'none'
      elink.href = url
      console.log(elink)
      document.body.appendChild(elink)
      elink.click()
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(url, name)
    }
  },
  // 文件流转换成Blob下载
  fileStreamDownByBlob(data, filename, mimeType) {
    // 创建 Blob 对象
    const blob = new Blob([data], { type: mimeType })

    // 创建一个下载链接
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename

    // 将 a 元素添加到文档并点击它
    document.body.appendChild(a)
    a.click()

    // 清理
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  },
  /*
     * changeURLStatic 修改地址栏URL参数 不跳转
     *   @param name 参数名
     *   @param value 参数值
     *
     * */
  changeURLStatic(name, value) {
    const url = location.href
    console.log(url)
    const reg = eval('/([?|&]' + name + '=)[^&]*/gi')
    value = value.toString().replace(/(^\s*)|(\s*$)/g, '') // 移除首尾空格
    let url2 = ''
    if (!value) {
      url2 = url.replace(reg, '') // 正则替换
    } else {
      if (url.match(reg)) {
        url2 = url.replace(reg, '$1' + value) // 正则替换
      } else {
        url2 = url + (url.indexOf('?') > -1 ? '&' : '?') + name + '=' + value // 没有参数添加参数
      }
    }
    history.replaceState(null, null, url2) // 替换地址栏
  },
  // 格式化日期T 字符串
  filterDateT(date) {
    if (date && date.length > 0) {
      date = date.toString()
      const idx = date.indexOf('T')
      if (idx > -1) {
        return date.substring(0, idx)
      } else {
        return date
      }
    }
  },
  // 获取生产环境请求地址
  getProductionAjaxUrl() {
    let baseURL = ''
    if (process.env.NODE_ENV == 'development') {
      baseURL = IPConfig.developmentUrl
    } else {
      // 内网
      if (window.location.href.indexOf('://192.168.') > -1 || window.location.href.indexOf('//localhost') > -1) {
        baseURL = IPConfig.productionUrl
      } else {
        // 外网
        baseURL = IPConfig.productionHttpUrl
      }
    }
    return baseURL
  },
  /**
     *    四舍五入 tofixed 防止精度丢失
     */
  toFixedWithoutLoss(value, precision) {
    const parsedValue = parseFloat(value)
    if (isNaN(parsedValue)) {
      return ''
    }

    const fixedValue = parsedValue.toFixed(precision)
    return parseFloat(fixedValue) // Convert back to a number
  },
  /**
     * Json对象 首字母大写转成小写
     */
  convertKeysToCamelCase(obj) {
    const convertedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const convertedKey = key.charAt(0).toLowerCase() + key.slice(1)
        convertedObj[convertedKey] = obj[key]
      }
    }
    return convertedObj
  },
  /**
     * 获取url的参数
     * @param {String} url
     * @returns
     */
  getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return obj
  },
  // 千分位
  numberToCurrencyNo(value) {
    if (!value) return 0
    // 获取整数部分
    const intPart = Math.trunc(value)
    // 整数部分处理，增加,
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    // 预定义小数部分
    let floatPart = ''
    // 将数值截取为小数部分和整数部分
    const valueArray = value.toString().split('.')
    if (valueArray.length === 2) {
      // 有小数部分
      floatPart = valueArray[1].toString() // 取得小数部分
      return intPartFormat + '.' + floatPart
    }
    return intPartFormat + floatPart
  },
  // 使用正则表达式检查是否为数字，但排除多个零开头的情况
  isNumber(value) {
    // 使用正则表达式检查是否为数字，但排除多个零开头的情况
    return /^-?[1-9]\d*(\.\d+)?$/.test(value) || /^-?0\.\d+$/.test(value)
  }
}
