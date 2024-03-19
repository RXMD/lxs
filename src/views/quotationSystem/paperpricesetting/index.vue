<template>
  <transition name="el-zoom-in-center">
    <div class="YZ-preview-main">
      <div class="dynamic-form-main w-100">
        <el-button type="primary" size="mini" @click="toSystem()">新增</el-button>
        <span class="demonstration fz-12" style="margin-left: 25px">关键字：</span>
        <el-input v-model="keyword1" placeholder="请输入纸张名称或纸张分类" style="width: 300px; margin-right: 10px" size="mini" />
        <el-button type="primary" :loading="btnLoading" size="mini" class="mb-10" icon="el-icon-search" @click="getList()">搜索</el-button>
        <el-table ref="table" v-loading="tableLoading" :data="tableData" border class="w-100 YZ-common-table bd-table table-border-bottom" size="mini" stripe highlight-current-row>
          <el-table-column type="index" align="center" width="50" label="序号" />
          <el-table-column sortable align="center" width="70" prop="iOrder" label="排序" />
          <el-table-column align="center" prop="sPaperName" label="纸张名称" />
          <el-table-column align="center" prop="sPaperType" label="纸张分类" />

          <el-table-column align="center" prop="bSelfinversion" label="自翻">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.bSelfinversion" size="mini" disabled />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bUVprinting" label="UV印刷">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.bUVprinting" size="mini" disabled />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bGoldsilvercard" label="金银卡">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.bGoldsilvercard" size="mini" disabled />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bBackUVprinting" label="背面UV印刷">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.bBackUVprinting" size="mini" disabled />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bPVCfilm" label="PVC胶片">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.bPVCfilm" size="mini" disabled />
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="350" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="edit(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="text" class="YZ-table-delBtn" @click="handleDel(scope.row.id,scope.$index)">删除</el-button>
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
</template>

<script>
import api from '@/api/quotationSystem/basicData'
export default {
  name: 'PaperPriceSetting',
  data() {
    return {
      keyword1: '',
      currentTableRow: {},
      tableLoading: false,
      btnLoading: false,
      tableData: [],
      currentPage4: 4
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

    // 获取列表展示的数据
    getList() {
      this.tableData = [] // 主表
      this.tableLoading = true
      api.GetPaperPriceSettingListData()
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
        path: '/parameter/edit',
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
          api.DeletePaperPriceSetting(id).then(res => {
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
      this.$router.push('./edit')
    },

    Refresh() {
      this.getList()
    }
  }
}
</script>
