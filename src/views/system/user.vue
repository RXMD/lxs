<template>
  <div>
    <transition name="el-zoom-in-center">
      <div class="YZ-preview-main">
        <div class="filter-container">
          <el-input v-model="pageQuery.keyword" placeholder="Title" style="width: 300px;" class="filter-item" @keyup.enter.native="getUserListData" />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getUserListData">
            搜索
          </el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="edit({}, 'add')">
            新增
          </el-button>
        </div>
        <div class="dynamic-form-main w-100">
          <el-table ref="table" v-loading="listLoading" :data="userList" border class="w-100 YZ-common-table bd-table table-border-bottom" size="mini" stripe highlight-current-row @row-click="rowClick">
            <el-table-column align="center" prop="userName" label="用户名" width="240" />
            <el-table-column align="center" prop="eMail" label="邮箱" width="160" />
            <el-table-column align="center" prop="realName" label="真实姓名" width="120" />
            <el-table-column align="center" prop="isMain" :formatter="fmtSpecialEdition" label="是否主账号" />
            <el-table-column align="center" prop="sex" :formatter="fmtSex" label="性别" width="80" />
            <el-table-column align="center" label="操作" width="300" fixed="right">
              <template slot-scope="scope">
                <el-button v-if="false" size="mini" type="text" @click="edit(scope.row, 'add')">新增</el-button>
                <el-button size="mini" type="text" @click="edit(scope.row, 'edit')">编辑</el-button>
                <el-button size="mini" type="text" class="YZ-table-delBtn" @click="handleDel(scope.row.id, scope.$index)">删除</el-button>
                <el-button size="mini" type="text" @click="permission(scope.row)">设置权限</el-button>
                <!-- <el-button size="mini" type="text" v-if="!isChild" @click="viewChild(scope.row)">查看子用户</el-button> -->
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
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </transition>
    <UserEdit :show-didlog="showDidlog" :current-item="currentItem" :type="dialogType" @closed="closed" />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { getUserList } from '@/api/system/user'
import UserEdit from './userEdit.vue'
import { deleteUser } from '@/api/user'
export default {
  name: 'User',
  components: {
    UserEdit
  },
  directives: { waves },
  data() {
    return {
      total: 0,
      listLoading: true,
      dialogType: '',
      currentItem: {},
      showDidlog: false,
      currentPage4: 1,
      pageQuery: {
        'pageIndex': 1,
        'pageSize': 20,
        'sidx': '',
        'sort': '',
        'keyword': ''
      },
      userList: []
    }
  },
  mounted() {
    this.getUserListData()
  },
  methods: {
    closed() {
      this.showDidlog = false
    },
    viewChild(value) {
      this.$router.push({ path: '/system/user/child', query: { userId: value.id, tenantId: value.tenantId }})
    },
    handleDel(id, index) {
      if (!id) return
      this.$confirm('确定要删除所选数据吗？', '提示', { type: 'warning' }).then(() => {
        deleteUser(id)
          .then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功！')
              this.userList.splice(index, 1)
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(() => {})
      })
    },
    edit(val, type) {
      this.dialogType = type
      this.showDidlog = true
      if (type === 'edit') {
        this.currentItem = val
      }
    },
    permission(value) {
      localStorage.setItem('user', JSON.stringify(value))
      this.$router.push({ name: 'childpermission', params: value })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    rowClick(row) {
      this.currentTableRow = row
      this.$nextTick(() => {
        this.$refs.table.setCurrentRow(row)
      })
    },
    getUserListData() {
      this.listLoading = true
      getUserList(this.pageQuery).then(res => {
        if (res.code === 200) {
          this.userList = res.data.data
          this.total = res.data.total
          this.listLoading = false
          if (!localStorage.getItem('userinfo')) {
            const userinfo = this.userList.find(item => item.isMain)
            localStorage.setItem('userinfo', JSON.stringify(userinfo))
          }
        }
      })
    },
    fmtSex (row) {
      return row.sex === 1 ? '男' : row.sex ===  0 ? '女' : ''
    },
    fmtSpecialEdition(row, column, cellValue) {
      return row.isMain ? '主用户' : '子用户'
    }
  }
}
</script>

<style lang="scss" scoped>
.YZ-preview-main {
    height: calc(100vh - 84px);
    background: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
</style>
