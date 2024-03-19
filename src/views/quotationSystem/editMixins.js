import yz from '@/utils/yz'
import { deepClone, sortOrder, guid } from '@/utils/tool'
export default {
  props: {},
  components: {},
  data() {
    return {
      id: ''
    }
  },
  watch: {},
  computed: {},
  created() {
    const { id } = this.$route.query
    this.id = id
    this.init()
  },
  activated() {
    const { id, isRefresh } = this.$route.query
    if ((isRefresh || isRefresh == 'true')) {
      this.id = id
      this.init()
    }
  },
  deactivated() {},
  methods: {
    guid,
    deepClone,
    // 保存前验证2
    checkTableValues(matchTable, validErrorTip) {
      let res = true
      let errorTips = ''
      const errorTables = []
      const f = tableOpts => {
        const { tableData, requireFields, parentTables, tableName, errorTip, pguidName, guidName } = tableOpts
        const lastTableName = tableName || errorTip
        const tableDataLength = tableData.length
        for (let i = 0; i < tableDataLength; i++) {
          const item = tableData[i]
          const pid = item[pguidName]
          const id = item[guidName]
          let isValids = true
          let errorIdx = i + 1
          for (let s = 0; s < requireFields.length; s++) {
            const key = requireFields[s]
            const value = item[key]

            if (!this.checkData(value)) {
              isValids = false
              this.$set(item, key + 'ErrorValids', true)
            } else {
              this.$set(item, key + 'ErrorValids', false)
            }
          }

          if (!isValids) {
            let errorJson = []
            if (parentTables) {
              const ptableData = parentTables.tableData
              const pguidName = parentTables.guidName
              const ptableName = parentTables.tableName
              const children = parentTables.children
              const pid = item[pguidName]

              for (let s = 0; s < ptableData.length; s++) {
                const sitem = ptableData[s]

                if (pid == sitem[pguidName]) {
                  errorJson.push({
                    tableName: ptableName,
                    idx: s + 1
                  })
                }
              }
              if (children) {
                errorJson = d(children, pid, pguidName, errorJson, item)
              }
            }
            if (pid) {
              const ftableData = tableData.filter(fitem => {
                return fitem[pguidName] == pid
              })
              for (let m = 0; m < tableData.length; m++) {
                if (id == ftableData[m][guidName]) {
                  errorIdx = m + 1
                  break
                }
              }
            }
            res = false
            errorJson.push({
              tableName: lastTableName,
              idx: errorIdx
            })
            errorTables.push(errorJson)
          }
        }
      }
      const d = (childrenOpts, pid, pidName, errorJson, row) => {
        const tableData = childrenOpts.tableData
        const guidName = childrenOpts.guidName
        const tableName = childrenOpts.tableName
        const children = childrenOpts.children
        const cid = row[guidName]
        if (pid) {
          tableData.filter(item => {
            return item[pidName] == pid
          })
          for (let s = 0; s < tableData.length; s++) {
            const sitem = tableData[s]
            if (row[guidName] == sitem[guidName]) {
              errorJson.push({
                tableName: tableName,
                idx: s + 1
              })
            }
          }
          if (children) {
            children, cid, guidName, errorJson, row
          } else {
            return errorJson
          }
        }
      }
      for (let i = 0; i < matchTable.length; i++) {
        const item = matchTable[i]
        const { conditionField, conditionFieldValue } = item
        const tableData = item.tableData ? item.tableData : []
        const tableLength = tableData.length
        const errorTip = item.errorTip
        if (tableLength > 0) {
          f(item)
        } else {
          if (conditionField) {
            const formconditionFieldValue = this.form[conditionField]
            if (conditionFieldValue != formconditionFieldValue) {
            } else {
              if (errorTip) {
                errorTips += errorTip + ','
                res = false
              }
            }
          } else {
            if (errorTip) {
              errorTips += errorTip + ','
              res = false
            }
          }
        }
      }
      if (this.errorNotify) {
        this.errorNotify.close()
      }

      if (!res && errorTips.length > 0) {
        errorTips = errorTips.substring(0, errorTips.length - 1)

        this.errorNotify = this.$notify.error({
          title: '提示',

          message: `${errorTips}不能为空！`,
          offset: 0
        })

        return false
      } else if (!res && errorTables.length > 0) {
        console.log(errorTables, res)
        let errorTips = ''
        for (let i = 0; i < errorTables.length; i++) {
          const row = errorTables[i]
          let tip = ''
          for (let h = 0; h < row.length; h++) {
            const item = row[h]
            let { tableName, idx } = item
            if (tableName.indexOf('表') > -1) {
              tableName = tableName.replace('表', '')
            }
            tip += `<span class='color-red'>${tableName}</span>表:第<span class='color-red'>${idx}</span>行下`
          }

          errorTips += tip + '；<br/>'
        }
        if (validErrorTip) {
          errorTips = validErrorTip + ',' + errorTips
        }
        this.errorNotify = this.$notify.error({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: `${errorTips}检测到未填写字段，请填写完整！！`,
          duration: 0,
          offset: 120,
          customClass: 'cash-flow-noticfy'
        })
        // this.errorCorrect();
        return false
      } else if (validErrorTip && validErrorTip.length > 0) {
        this.errorNotify = this.$notify.error({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: `${validErrorTip}检测到未填写字段，请填写完整！！`,
          duration: 0,
          offset: 120,
          customClass: 'cash-flow-noticfy'
        })
        return false
      } else {
        return true
      }
    },
    //
    changePageUrlDetail(id) {
      const json = {}
      let fullPath = this.$route.fullPath
      fullPath = fullPath.replace('&isRefresh=true', '')
      json.path = fullPath
      yz.changeURLStatic('id', id)
      // yz.changeURLStatic('isRefresh', '');
      let nPath = window.location.hash
      nPath = nPath.replace('#/', '/')
      json.nPath = nPath
      this.$store.dispatch('tagsView/editVisitedPath', JSON.stringify(json))

      // let query = {
      //     modelId: this.modelId,
      //     id: id,
      //     op: 'detail',

      //     billType: this.docType,
      // };
      // this.formRefresh(query);
    },
    /**
         * 校验单个表单数据
         * @param {CmpConfig} 组件配置对象
         */
    checkData(value) {
      if ([null, undefined, ''].includes(value)) return false
      // if (tag === 'org-select') return this.checkOrgData(value)
      if (Array.isArray(value)) return value.length > 0
      return true
    },
    // 判断表 字段数据是否重复
    isCommonFiledValue(tableData, field) {
      // 获取所有的dWeight值
      const fieldArray = tableData.map(item => {
        if (isNaN(item[field])) {
          return item[field]
        } else {
          return parseFloat(item[field])
        }
      })
      // 检查是否有重复值
      const uniqueFieldArray = Array.from(new Set(fieldArray))

      return fieldArray.length !== uniqueFieldArray.length
    },
    fmrDataEditStatus(data) {
      if (data.length > 0) {
        return data.map(item => {
          item.isEdit = true
          return item
        })
      } else {
        return []
      }
    },
    // noticfy 提示
    noticfy(tip, type = 'error', customClass) {
      this.$notify[type]({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: tip,
        offset: 0,
        customClass: customClass
      })
    }
  }
}
