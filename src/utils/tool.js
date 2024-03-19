/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'string') {
    if (/^[0-9]+$/.test(time)) {
      // support "1548221490638"
      time = parseInt(time)
    } else {
      // support safari
      // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
      time = time.replace(new RegExp(/-/gm), '/')
    }
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
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
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}')
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(fn, delay) {
  var timer = null // 声明计时器
  return function() {
    var context = this
    var args = arguments
    console.log(fn)
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * Sort
 */
export function sortOrder(a, b) {
  const aIndex = a.iOrder
  const bIndex = b.iOrder
  return aIndex - bIndex
}
export function sortOrderS(a, b) {
  const aIndex = a.iOrder
  const bIndex = b.iOrder
  return bIndex - aIndex
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

const S4 = function() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export function guid() {
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4()
}

export const uuid = () => {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

export const filterRouteRefrsh = path => {
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
}

// 字符串替换
export const fReplaceAll = (str, AFindText, ARepText) => {
  const raRegExp = new RegExp(AFindText, 'g')
  return str.replace(raRegExp, ARepText)
}

// 数字转成大写
export const fNumToString = n => {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return '数据非法' // 判断数据是否大于0
  }

  var unit = '千百拾亿千百拾万千百拾元角分'
  var str = ''
  n += '00'

  var indexpoint = n.indexOf('.') // 如果是小数，截取小数点前面的位数

  if (indexpoint >= 0) {
    n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2) // 若为小数，截取需要使用的unit单位
  }

  unit = unit.substr(unit.length - n.length) // 若为整数，截取需要使用的unit单位
  for (var i = 0; i < n.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i) // 遍历转化为大写的数字
  }

  return str
    .replace(/零(千|百|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万|壹(拾)/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, '元整') // 替换掉数字里面的零字符，得到结果
}
// 千分位
export function numberToCurrencyNo(value) {
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
}

// 根据年月获取 当前年月第一天和最后一天
export function getFirstAndLastDayOfMonth(dateStr) {
  // 将日期字符串转换为 Date 对象
  const date = new Date(dateStr)
  // 获取该月第一天的日期
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  // 获取该月最后一天的日期
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  // 格式化日期字符串，以便输出
  const dateFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const firstDayStr = firstDayOfMonth.toLocaleDateString('zh-CN', dateFormatOptions)
  const lastDayStr = lastDayOfMonth.toLocaleDateString('zh-CN', dateFormatOptions)
  // 返回结果
  return { firstDay: firstDayStr, lastDay: lastDayStr }
}

// 根据 选中数组 在原数组进行置顶 置底
export function rearrangeArray(arr, selectedKeys, position, field) {
  // 筛选出选中的元素
  const selectedItems = arr.filter(item => selectedKeys.includes(item[field]))

  // 将选中的元素从原数组中删除
  const remainingItems = arr.filter(item => !selectedKeys.includes(item[field]))

  // 根据置顶或置底的位置进行合并
  const rearrangedArray = position === 'top' ? selectedItems.concat(remainingItems) : remainingItems.concat(selectedItems)

  return rearrangedArray
}

/**
 * 数组上移下移
 */
export function moveArrayItems(arr, selectedKeys, direction, field) {
  const clonedArray = [...arr]

  selectedKeys.forEach(key => {
    const index = clonedArray.findIndex(item => (field ? item[field] === key : item === key))
    if (index !== -1) {
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (targetIndex >= 0 && targetIndex < clonedArray.length) {
        [clonedArray[index], clonedArray[targetIndex]] = [clonedArray[targetIndex], clonedArray[index]]
      }
    }
  })

  return clonedArray
}

