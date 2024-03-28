import Vue from 'vue'

export default () => {
  // 整型
  Vue.directive('Int', {
    inserted: function(el) {
      const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
      el.addEventListener('keypress', function(e) {
        e = e || window.event

        const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
        const re = /\d/
        if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
          if (e.preventDefault) {
            e.preventDefault()
          } else {
            e.returnValue = false
          }
        }
      })
    }
  })
  // 小数
  Vue.directive('Float', {
    bind(el, binding) {
      el.onkeypress = function(e) {
        const ev = e || event
        const value = ev.target.value
        const fmrCode = String.fromCharCode(ev.keyCode || ev.which)
        const isNumber = /[\d]/.test(fmrCode)
        let isPoint = ev.key == '.' && value.indexOf('.') < 0
        if (!value || value == '') {
          // 第一位不能输小数点
          isPoint = false
        }
        // ev.which兼容firefox， String.fromCharCode（将 Unicode 编码转为一个字符）
        return isNumber || ev.which === 8 || isPoint
      }
    }
  })
  Vue.directive('Download', {
    bind(el, binding, vNode) {
      el.addEventListener('click', e => {
        const ev = e || event

        const fileUrl = process.env.VUE_APP_BASE_API + vNode.data.attrs.fileUrl
        const fileName = vNode.data.attrs.fileName

        const fileBlobUrl = window.URL.createObjectURL(new Blob([fileUrl]))
        // 生成一个a标签
        if ('download' in document.createElement('a')) {
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = fileBlobUrl
          // 生成时间戳
          link.download = fileName
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        } else {
          navigator.msSaveBlob(fileBlobUrl, fileName)
        }
      })
    }
  })
  Vue.directive('Number', {
    inserted(el, vDir, vNode) {
      // vDir.value 有指令的参数
      let content
      // 按键按下=>只允许输入 数字/小数点
      el.addEventListener('keypress', event => {
        const e = event || window.event
        const inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode)
        const re = /\d|\./
        content = e.target.value
        // 定义方法,阻止输入
        function preventInput() {
          if (e.preventDefault) {
            e.preventDefault()
          } else {
            e.returnValue = false
          }
        }
        if (!re.test(inputKey) && !e.ctrlKey) {
          preventInput()
        } else if (content.indexOf('.') > 0 && inputKey == '.') {
          // 已有小数点,再次输入小数点
          preventInput()
        }
      })
      // 按键弹起=>并限制最大最小
      el.addEventListener('keyup', event => {
        const e = event || window.event
        content = parseFloat(e.target.value)
        if (!content) {
          content = 0.0
        }
        let arg_max = ''
        let arg_min = ''
        if (vDir.value) {
          arg_max = parseFloat(vDir.value.max)
          arg_min = parseFloat(vDir.value.min)
        }
        if (arg_max && content > arg_max) {
          e.target.value = arg_max
          content = arg_max
        }
        if (arg_min && content < arg_min) {
          e.target.value = arg_min
          content = arg_min
        }
      })
      // 失去焦点=>保留指定位小数
      el.addEventListener('focusout', event => {
        // 此处会在 el-input 的 @change 后执行
        const e = event || window.event
        content = parseFloat(e.target.value)
        if (!content) {
          content = 0.0
        }
        let arg_precision = 0 // 默认保留至整数
        if (vDir.value.precision) {
          arg_precision = parseFloat(vDir.value.precision)
        }
        e.target.value = content.toFixed(arg_precision)
        // -- callback写法1
        // vNode.data.model.callback = ()=>{
        //     e.target.value = content.toFixed(arg_precision)
        // }
        // vNode.data.model.callback();
        // -- callback 写法2
        // vNode.data.model.callback(
        //     e.target.value = content.toFixed(arg_precision)
        // )
      })
    }
  })
  Vue.directive('ScrollLoadMore', {
    bind(el, binding) {
      const selectWrap = el.querySelector('.el-table__body-wrapper')
      selectWrap.addEventListener('scroll', function() {
        const sign = 0
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        if (scrollDistance <= sign) {
          binding.value()
        }
      })
    }
  })
  // 输入框 change 为空 默认为0
  Vue.directive('EmptyZero', {
    inserted: function(el, binding) {
      el.addEventListener('change', function(event) {
        if (event.target.value && !isNaN(event.target.value)) {
          event.target.value = parseFloat(event.target.value) ? parseFloat(event.target.value) : 0
        } else {
          event.target.value = 0
        }
      })
    }
  })

  // v-dialogDrag: 弹窗拖拽属性 element 弹窗拖拽
  Vue.directive('DialogDrag', {
    bind(el, binding, vnode, oldVnode) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header')
      const dragDom = el.querySelector('.el-dialog')
      // dialogHeaderEl.style.cursor = 'move';
      dialogHeaderEl.style.cssText += ';cursor:move;'
      dragDom.style.cssText += ';top:0px;'

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = (function() {
        if (window.document.currentStyle) {
          return (dom, attr) => dom.currentStyle[attr]
        } else {
          return (dom, attr) => getComputedStyle(dom, false)[attr]
        }
      })()

      dialogHeaderEl.onmousedown = e => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop

        const screenWidth = document.body.clientWidth // body当前宽度
        const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

        const dragDomWidth = dragDom.offsetWidth // 对话框宽度
        const dragDomheight = dragDom.offsetHeight // 对话框高度

        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

        // 获取到的值带px 正则匹配替换
        let styL = sty(dragDom, 'left')
        let styT = sty(dragDom, 'top')

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (styL.includes('%')) {
          styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
          styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
        } else {
          styL = +styL.replace(/\px/g, '')
          styT = +styT.replace(/\px/g, '')
        }

        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX
          let top = e.clientY - disY

          // 边界处理
          if (-left > minDragDomLeft) {
            left = -minDragDomLeft
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft
          }

          if (-top > minDragDomTop) {
            top = -minDragDomTop
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop
          }

          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
        }

        document.onmouseup = function(e) {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })
  // v-dialogDrag: 弹窗拖拽+水平方向伸缩
  Vue.directive('DialogDragZoom', {
    bind(el, binding, vnode, oldVnode) {
      // 弹框可拉伸最小宽高

      const minWidth = 400

      const minHeight = 300

      // 初始非全屏

      let isFullScreen = false

      // 当前宽高

      let nowWidth = 0

      let nowHight = 0

      // 当前顶部高度

      let nowMarginTop = 0

      // 获取弹框头部（这部分可双击全屏）

      const dialogHeaderEl = el.querySelector('.el-dialog__header')

      // 弹窗

      const dragDom = el.querySelector('.el-dialog')

      // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；

      dragDom.style.overflow = 'auto'

      // 清除选择头部文字效果

      // dialogHeaderEl.onselectstart = new Function("return false");

      // 头部加上可拖动cursor

      dialogHeaderEl.style.cursor = 'move'

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);

      const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

      const moveDown = e => {
        // 鼠标按下，计算当前元素距离可视区的距离

        const disX = e.clientX - dialogHeaderEl.offsetLeft

        const disY = e.clientY - dialogHeaderEl.offsetTop

        // 获取到的值带px 正则匹配替换

        let styL, styT

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px

        if (sty.left.includes('%')) {
          styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)

          styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
        } else {
          styL = +sty.left.replace(/\px/g, '')

          styT = +sty.top.replace(/\px/g, '')
        }

        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离

          const l = e.clientX - disX

          const t = e.clientY - disY

          // 移动当前元素

          dragDom.style.left = `${l + styL}px`

          dragDom.style.top = `${t + styT}px`

          // 将此时的位置传出去

          // binding.value({x:e.pageX,y:e.pageY})
        }

        document.onmouseup = function(e) {
          document.onmousemove = null

          document.onmouseup = null
        }
      }

      dialogHeaderEl.onmousedown = moveDown

      // 双击头部全屏效果

      dialogHeaderEl.ondblclick = e => {
        if (isFullScreen == false) {
          nowHight = dragDom.clientHeight

          nowWidth = dragDom.clientWidth

          nowMarginTop = dragDom.style.marginTop

          dragDom.style.left = 0

          dragDom.style.top = 0

          dragDom.style.height = '100VH'

          dragDom.style.width = '100VW'

          dragDom.style.marginTop = 0

          isFullScreen = true

          dialogHeaderEl.style.cursor = 'initial'

          dialogHeaderEl.onmousedown = null
        } else {
          dragDom.style.height = 'auto'

          dragDom.style.width = nowWidth + 'px'

          dragDom.style.marginTop = nowMarginTop

          isFullScreen = false

          dialogHeaderEl.style.cursor = 'move'

          dialogHeaderEl.onmousedown = moveDown
        }
      }

      dragDom.onmousemove = function(e) {
        const moveE = e

        if (e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 || dragDom.offsetLeft + 10 > e.clientX) {
          dragDom.style.cursor = 'w-resize'
        } else if (el.scrollTop + e.clientY > dragDom.offsetTop + dragDom.clientHeight - 10) {
          dragDom.style.cursor = 's-resize'
        } else {
          dragDom.style.cursor = 'default'

          dragDom.onmousedown = null
        }

        dragDom.onmousedown = e => {
          const clientX = e.clientX

          const clientY = e.clientY

          const elW = dragDom.clientWidth

          const elH = dragDom.clientHeight

          const EloffsetLeft = dragDom.offsetLeft

          const EloffsetTop = dragDom.offsetTop

          dragDom.style.userSelect = 'none'

          const ELscrollTop = el.scrollTop

          // 判断点击的位置是不是为头部

          if (clientX > EloffsetLeft && clientX < EloffsetLeft + elW && clientY > EloffsetTop && clientY < EloffsetTop + 100) {
            // 如果是头部在此就不做任何动作，以上有绑定dialogHeaderEl.onmousedown = moveDown;
          } else {
            document.onmousemove = function(e) {
              e.preventDefault() // 移动时禁用默认事件

              // 左侧鼠标拖拽位置

              if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
                // 往左拖拽

                if (clientX > e.clientX) {
                  dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px'
                }

                // 往右拖拽

                if (clientX < e.clientX) {
                  if (dragDom.clientWidth < minWidth) {
                  } else {
                    dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px'
                  }
                }
              }

              // 右侧鼠标拖拽位置

              if (clientX > EloffsetLeft + elW - 10 && clientX < EloffsetLeft + elW) {
                // 往左拖拽

                if (clientX > e.clientX) {
                  if (dragDom.clientWidth < minWidth) {
                  } else {
                    dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px'
                  }
                }

                // 往右拖拽

                if (clientX < e.clientX) {
                  dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px'
                }
              }

              // 底部鼠标拖拽位置

              if (ELscrollTop + clientY > EloffsetTop + elH - 20 && ELscrollTop + clientY < EloffsetTop + elH) {
                // 往上拖拽

                if (clientY > e.clientY) {
                  if (dragDom.clientHeight < minHeight) {
                  } else {
                    dragDom.style.height = elH - (clientY - e.clientY) * 2 + 'px'
                  }
                }

                // 往下拖拽

                if (clientY < e.clientY) {
                  dragDom.style.height = elH + (e.clientY - clientY) * 2 + 'px'
                }
              }
            }

            // 拉伸结束

            document.onmouseup = function(e) {
              document.onmousemove = null

              document.onmouseup = null
            }
          }
        }
      }
    }
  })

  // 小数
  Vue.directive('LoadMore', {
    bind(el, binding) {
      const selectWrap = el.querySelector('.elx-table--body-wrapper')
      selectWrap.addEventListener('scroll', function() {
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        if (scrollDistance <= 0.5) {
          binding.value() // 执行在使用时绑定的函数，在这里即loadMorePerson方法
        }
      })
    }
  })
  // 可拖拽 自定义弹窗
  Vue.directive('DragDailog', {
    inserted: function(el, binding) {
      const self = el // 获取当前元素
      const oDiv = el.querySelector('.drag-header') // 获取当前元素
      oDiv.style.cursor = 'move'
      oDiv.onmousedown = e => {
        // 鼠标相对拖动元素的位置 + 父元素距离边界距离
        const disX = e.clientX - self.offsetLeft
        const disY = e.clientY - self.offsetTop
        let top
        let left

        document.onmousemove = e => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          const faDiv = self.parentNode
          // 判断上左边界
          left = e.clientX < disX ? 0 : e.clientX - disX
          top = e.clientY < disY ? 0 : e.clientY - disY
          // 判断右下边界
          if (left > faDiv.offsetWidth - self.offsetWidth) {
            left = faDiv.offsetWidth - self.offsetWidth
          }
          if (top > faDiv.offsetHeight - self.offsetHeight) {
            top = faDiv.offsetHeight - self.offsetHeight
          }
          // 使用百分百赋值实现自适应
          self.style.left = (left / faDiv.offsetWidth) * 100 + '%'
          self.style.top = (top / faDiv.offsetHeight) * 100 + '%'
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
          // 鼠标抬起事件回调返回id及位置参数
          binding.value({ id: el.id, top: self.style.top, left: self.style.left })

          //                  <div id="drags" v-drag="callback"></div>
          // methods: {
          //   callback(option) {
          //   	// 回调函数返回参数
          //     console.log(option)
          //   }
          // }
        }
      }
    }
  })
  // 可拖拽 自定义弹窗
  Vue.directive('Drag', {
    inserted: function(el, binding) {
      const self = el // 获取当前元素

      self.style.cursor = 'move'
      self.onmousedown = e => {
        // 鼠标相对拖动元素的位置 + 父元素距离边界距离
        const disX = e.clientX - self.offsetLeft
        const disY = e.clientY - self.offsetTop
        let top
        let left

        document.onmousemove = e => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          const faDiv = self.parentNode
          // 判断上左边界
          left = e.clientX < disX ? 0 : e.clientX - disX
          top = e.clientY < disY ? 0 : e.clientY - disY
          // 判断右下边界
          if (left > faDiv.offsetWidth - self.offsetWidth) {
            left = faDiv.offsetWidth - self.offsetWidth
          }
          if (top > faDiv.offsetHeight - self.offsetHeight) {
            top = faDiv.offsetHeight - self.offsetHeight
          }
          // 使用百分百赋值实现自适应
          self.style.left = (left / faDiv.offsetWidth) * 100 + '%'
          self.style.top = (top / faDiv.offsetHeight) * 100 + '%'
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
          // 鼠标抬起事件回调返回id及位置参数
          binding.value({ id: el.id, top: self.style.top, left: self.style.left })

          //                  <div id="drags" v-drag="callback"></div>
          // methods: {
          //   callback(option) {
          //   	// 回调函数返回参数
          //     console.log(option)
          //   }
          // }
        }
      }
    }
  })
}
