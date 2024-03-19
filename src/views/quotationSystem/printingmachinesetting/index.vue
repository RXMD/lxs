<template>
  <transition name="el-zoom-in-center">
    <div ref="view" class="YZ-common-layout">
      <div class="w-100">
        <el-button type="primary" size="mini" @click="toSystem()">新增</el-button>
        <span class="demonstration fz-12" style="margin-left: 25px">关键字：</span>
        <el-input v-model="keyword1" placeholder="请输入纸张名称或纸张分类" style="width: 300px; margin-right: 10px" size="mini" />
        <el-button type="primary" :loading="btnLoading" size="mini" class="mb-10" icon="el-icon-search" @click="getList()">搜索</el-button>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :height="tableHeight"
          :data="tableData"
          border
          class="w-100 YZ-common-table bd-table table-border-bottom"
          size="mini"
          stripe
          highlight-current-row
        >
          <el-table-column sortable align="center" width="70" prop="iOrder" label="排序" />
          <el-table-column align="center" prop="sMachineName" label="机台名称" />
          <el-table-column align="center" prop="sMachineType" label="机台分类" />
          <el-table-column align="center" prop="dGripperEdge" label="咬口" />
          <el-table-column align="center" prop="dMaxMachineLength" label="最大上机长" />
          <el-table-column align="center" prop="dMaxMachineWidth" label="最大上机宽" />
          <el-table-column align="center" prop="dMinMachineLength" label="最小上机长" />
          <el-table-column align="center" prop="dMinMachineWidth" label="最小上机宽" />
          <el-table-column align="center" prop="dMinWeight" label="最小克重" />
          <el-table-column align="center" prop="dMaxWeight" label="最大克重" />
          <el-table-column align="center" prop="bUVPrinting" label="是否UV">
            <template slot-scope="scope">
              {{ scope.row.bUVPrinting ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bNoPrintCardBox" label="不印卡盒">
            <template slot-scope="scope">
              {{ scope.row.bNoPrintCardBox ? '是' : '否' }}
            </template>
          </el-table-column>

          <el-table-column align="center" prop="bNoPrintPitBox" label="不印坑盒">
            <template slot-scope="scope">
              {{ scope.row.bNoPrintPitBox ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="edit(scope.row.uGuid1)">编辑</el-button>
              <el-button size="mini" type="text" class="YZ-table-delBtn" @click="handleDel(scope.row.id, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          align="center"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100, 200, 500, 1000]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import Api from '@/api/quotationSystem/basicData'
export default {
  name: 'PaperPriceSetting',
  data() {
    return {
      keyword1: '',
      currentTableRow: {},
      tableLoading: false,
      btnLoading: false,
      tableData: [],
      currentPage: 1,
      total: 0,
      tableHeight: 0,
      isAjax: false
    }
  },
  created() {},
  mounted() {
    this.getTableH()
    this.initData()
    this.isAjax = true
  },
  activated() {
    const query = this.$route.query

    const isRefresh = query.isRefresh

    if (isRefresh && !this.isAjax) {
      this.getTableH()
      this.initData()
      this.doLayout()
    } else {
      this.doLayout()
    }
  },
  deactivated() {
    this.isAjax = false
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },

    initData() {
      this.isAjax = true
      this.getList()
    },
    doLayout() {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    // 自适应table 高度列表 只有头部按钮 和底部分页
    getTableH() {
      this.$nextTick(() => {
        const viewH = this.$refs.view.offsetHeight

        this.tableHeight = parseFloat(viewH) - 100
      })
    },

    // 获取列表展示的数据
    getList() {
      this.tableData = [] // 主表
      this.tableLoading = true
      Api.GetPrintMachineSettingListData()
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data
            this.tableLoading = false
          }
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    // 编辑
    edit(id) {
      this.$router.push({
        path: './printEdit?&id=' + id + '&isRefresh=true',
        query: {
          id: id,
          isRefresh: true
        }
      })
    },
    // 删除
    handleDel(id, index) {
      this.$confirm('是否删除数据？', '提示', { type: 'warning' })
        .then(() => {
          Api.DeletePrintMachineSetting(id).then(res => {
            if (res.code == 200) {
              this.$message.success('删除成功！')
              this.tableData.splice(index, 1)
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {})
    },
    // 新增
    toSystem() {
      this.$router.push('./printEdit?isRefresh=true')
    },

    Refresh() {
      this.getList()
    }
  }
}
</script>
