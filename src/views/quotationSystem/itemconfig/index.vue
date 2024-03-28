<template>
  <div>
    <transition name="el-zoom-in-center">
      <div class="YZ-preview-main">
        <div class="dynamic-form-main w-100">
          <el-button type="primary" size="mini" class="mb-10" @click="toSystem()">新增</el-button>
          <el-table ref="table" :data="tableData" border class="w-100 YZ-common-table bd-table table-border-bottom" size="mini" stripe highlight-current-row @row-click="rowClick">
            <el-table-column align="center" width="50" type="selection" />
            <el-table-column align="center" prop="idraworder" label="排序" width="70" sortable="" />
            <el-table-column align="center" :formatter="fmtUsable" prop="bUsable" label="可用" width="80" />
            <el-table-column align="center" :formatter="fmtSpecialEdition" prop="bSpecialEdition" label="专版" width="100" />
            <el-table-column align="center" prop="sItemCode" label="报价项目编码" />
            <el-table-column align="center" prop="sItemName" label="报价项目名称" />
            <el-table-column align="center" prop="sCrtUserName" label="制作人" width="100" />
            <el-table-column align="center" prop="tCrtDate" label="制单日期" width="180" />
            <el-table-column align="center" label="操作" width="120" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button size="mini" type="text" class="YZ-table-delBtn" @click="handleDel(scope.row.id, scope.$index)">删除</el-button>
                <el-button size="mini" type="text" class="YZ-table-delBtn" @click="detail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          align="center"
          :current-page="currentPage4"
          :page-sizes="[20, 50, 100, 200, 500, 1000]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </transition>
    <Dialogbox :show-didlog="showDidlog" :menu-list="menuList" :title-text="titleText" :current-item="currentItem" :readonly="readonly" @closed="closed" />
  </div>
</template>

<script>
import Dialogbox from './edit.vue'
import api from '@/api/quotationSystem/basicData'
import { GetitemConfigListData } from '@/api/system/menu'
"[{url:'/api/File/Image/system/20230613_d661de1cd20b44f7a19f4c1426157f87.png',name:'20230613_d661de1cd20b44f7a19f4c1426157f87'}]"
export default {
  name: 'Itemconfig',
  components: { Dialogbox },
  data() {
    return {
      currentTableRow: {},
      antiShake: true,
      listLoading: true,
      tableData: [],
      currentPage4: 4,
      currentSize: 20,
      showDidlog: false,
      titleText: '',
      currentItem: {},
      readonly: false,
      menuList: []
    }
  },
  created() {
    this.initData()
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    initData() {
      this.getList()
    },
    closed() {
      this.showDidlog = false
    },

    // 获取列表展示的数据
    getList() {
      this.tableData = [] // 主表
      this.antiShake = true
      const params = {
        'id': 0,
        'snowflakeId': 0,
        'tenantId': 0,
        'sUserCode': 'string',
        'sUserName': 'string'
      }
      this.listLoading = true
      GetitemConfigListData(params)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data || [] // 主表
            if (this.tableData.length > 0) {
              this.rowClick(this.tableData[0])
            }
            this.listLoading = false
          }
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    rowClick(row) {
      this.currentTableRow = row
      this.$nextTick(() => {
        this.$refs.table.setCurrentRow(row)
      })
    },
    // 编辑
    edit(val) {
      this.titleText = '1'
      this.showDidlog = true
      this.currentItem = val
    },
    detail(val) {
      this.titleText = '2'
      this.currentItem = val
      this.showDidlog = true
      this.readonly = true
    },

    fmtUsable(row, column, cellValue) {
      return row.bUsable ? '是' : '否'
    },

    fmtSpecialEdition(row, column, cellValue) {
      return row.bSpecialEdition ? '是' : '否'
    },
    // 删除
    handleDel(id, index) {
      if (!id) return
      this.$confirm('确定要删除所选数据吗？', '提示', { type: 'warning' }).then(() => {
        api.DelItemConfig(id)
          .then(res => {
            if (res.code == 200) {
              this.$message.success('删除成功！')
              this.tableData.splice(index, 1)
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(() => {})
      })
    },
    // 新增
    toSystem() {
      this.titleText = '0'
      this.showDidlog = true
    },

    Refresh() {
      this.getList()
    }
  }
}
</script>
<style scoped lang="scss">
.YZ-preview-main {
    height: calc(100vh - 84px);
    background: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
</style>
