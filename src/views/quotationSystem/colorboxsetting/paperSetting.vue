<template>
  <transition name="el-zoom-in-center">
    <div ref="view" class="YZ-common-layout pd-0">
      <div class="w-100">
        <el-button type="primary" class="mb-10" size="mini" @click="toSystem()">新增</el-button>
        <!-- <span class="demonstration fz-12" style="margin-left: 25px">关键字：</span>
                <el-input v-model="keyword1" placeholder="请输入纸张名称或纸张分类" style="width: 300px; margin-right: 10px" size="mini"></el-input>
                <el-button type="primary" :loading="btnLoading" size="mini" class="mb-10" icon="el-icon-search" @click="getList()">{{ $t('common.search') }}</el-button> -->
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
          <el-table-column align="center" width="70" type="index" label="排序" />
          <el-table-column align="center" prop="sPaperName" label="纸张名称" />
          <el-table-column align="center" prop="sPaperType" label="纸张类型" />
          <el-table-column align="center" prop="bSelfinversion" label="自翻">
            <template slot-scope="scope">
              {{ scope.row.bSelfinversion ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bUVPrinting" label="UV印刷">
            <template slot-scope="scope">
              {{ scope.row.bUVPrinting ? '是' : '否' }}
            </template>
          </el-table-column>

          <el-table-column align="center" prop="bPVCFilm" label="PVC胶片">
            <template slot-scope="scope">
              {{ scope.row.bPVCFilm ? '是' : '否' }}
            </template>
          </el-table-column>

          <el-table-column align="center" prop="bPastingCard" label="可用于裱卡">
            <template slot-scope="scope">
              {{ scope.row.bPastingCard ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="edit(scope.row.uGuid1)">编辑</el-button>
              <el-button size="mini" type="text" class="YZ-table-delBtn" @click="handleDel(scope.row.id, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
                    align="center"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 100, 200, 500, 1000]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                ></el-pagination> -->
      </div>
      <el-dialog v-DialogDrag width="70%" title="选择数据" :visible.sync="editVisible" append-to-body :close-on-click-modal="false" @close="editVisible = false">
        <paper-setting-edit :id="id" @close="closeDialog" @refresh="Refresh" />
      </el-dialog>
    </div>
  </transition>
</template>

<script>
import Api from '@/api/quotationSystem/basicData'
import PaperSettingEdit from './paperSettingEdit'
export default {
  name: 'PaperSetting',
  components: {
    PaperSettingEdit
  },
  props: {
    tab: String
  },
  data() {
    return {
      keyword1: '',
      editVisible: false,
      tableLoading: false,
      btnLoading: false,
      tableData: [],
      currentPage: 1,
      total: 0,
      id: '',
      tableHeight: 0
    }
  },
  watch: {
    tab(v) {
      if (v == 'paperSetting') {
        this.getTableH()
        this.initData()
        this.doLayout()
      }
    }
  },
  mounted() {
    this.getTableH()
    this.initData()
    this.doLayout()
  },
  methods: {
    closeDialog() {
      this.editVisible = false
    },
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

        this.tableHeight = parseFloat(viewH) - 40
      })
    },

    // 获取列表展示的数据
    getList() {
      this.tableData = [] // 主表
      this.tableLoading = true
      Api.GetColorBoxSettingPaperListData()
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
      this.id = id
      this.editVisible = true
    },
    // 删除
    handleDel(id, index) {
      this.$confirm('是否删除数据？', '提示', { type: 'warning' })
        .then(() => {
          Api.DeleteColorBoxSettingPaper(id).then(res => {
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
      this.id = ''
      this.editVisible = true
    },

    Refresh() {
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.YZ-common-layout {
    height: calc(100vh - 186px);
}
</style>
