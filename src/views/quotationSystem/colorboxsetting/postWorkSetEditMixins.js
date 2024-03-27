import yz from '@/utils/yz'
import { deepClone } from '@/utils'
import { guid } from '@/utils/tool'
export default {
  props: {
    uGuid1: String
  },
  components: {},
  data() {
    return {
      tableData: [],
      delteTableData: {},
      tableHeight: 400,
      loading: false
    }
  },

  mounted() {
    this.getList()
    this.getTableH()
    this.$nextTick(() => {
      this.$refs.table.doLayout()
    })
  },
  methods: {
    guid,
    deepClone,
    // 自适应table 高度列表 只有头部按钮 和底部分页
    getTableH() {
      this.$nextTick(() => {
        const viewH = this.$refs.view.offsetHeight
        this.tableHeight = parseFloat(viewH) - 40
      })
    },
    close() {
      this.$parent.close()
    },
    // 编辑页面下设置删除id
    remove(row, idx, table, tableDataName = 'tableData') {
      let delteTableData = this.delteTableData[table]
      delteTableData = delteTableData || []
      const json = {}
      json.uGuid2 = row.uGuid2
      delteTableData.push(json)
      this.$set(this.delteTableData, table, delteTableData)
      this[tableDataName].splice(idx, 1)
    },
    copy(row, idx) {
      const nRow = JSON.parse(JSON.stringify(row))
      nRow.uGuid2 = this.guid()
      nRow.isEdit = false
      nRow.iOrder = this.tableData.length + 1
      delete nRow.id
      this.tableData.splice(idx + 1, 0, nRow)
    }

  }
}
