<template>
  <transition name="el-zoom-in-center">
    <div class="YZ-preview-main">
      <div class="dynamic-form-main w-100">
        <el-button type="primary" @click="toBackColorboxsetting()">返回后工页面</el-button>

        <el-button type="primary" @click="save('tableData')">保存</el-button>
        <el-button type="primary" @click="addClick('tableData')">新增</el-button>

        <el-table
          ref="table"
          :data="tableData"
          border
          class="w-100 YZ-common-table bd-table table-border-bottom"
          style="margin-top: 10px;"
          size="mini"
          stripe
          :row-class-name="tableRowClassName"
          highlight-current-row
        >
          <el-table-column v-if="false" prop="id" align="center" label="序号" width="50" />
          <!-- <el-table-column align="center" prop="MBIGS" label="通用版" width="100">
                        <template slot-scope="scope">
                            <input type='checkbox' :checked="true" :disabled="true" v-model="scope.row.tongyong">
                        </template>

                    </el-table-column>
                    <el-table-column align="center" prop="Customized" label="定制版" width="100">
                        <template slot-scope="scope">
                            <input type='checkbox' :disabled='disabled' :checked='currentValue'
                                v-model="scope.row.Customized">
                        </template>
                    </el-table-column> -->
          <el-table-column align="center" prop="Name" label="名称">
            <template slot-scope="scope">

              <el-input v-model="scope.row.Name" />
            </template>

          </el-table-column>
          <el-table-column align="center" prop="price" label="单价">
            <template slot-scope="scope">

              <el-input v-model="scope.row.price" style=" width:70%" />
              元/件

            </template>

          </el-table-column>
          <el-table-column align="center" prop="minimumConsumption" label="最低消费(开机费)（元）">
            <template slot-scope="scope">

              <el-input v-model="scope.row.minimumConsumption" />

            </template>
          </el-table-column>
          <el-table-column align="center" prop="oneCount" label="单个包装重量/数量">
            <template slot-scope="scope">

              <el-input v-model="scope.row.oneCount" style=" width:50%" />
              <!-- <select v-model="scope.row.packageUnit">
                                <option value="1">kg/件</option>
                                <option value="2">个/件</option>
                            </select> -->
              <el-select v-model="scope.row.packageUnit" value="" style=" width:50%">
                <el-option label="kg/件" value="1" />
                <el-option label="个/件" value="2" />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="sort" label="排序">
            <template slot-scope="scope">

              <el-input v-model="scope.row.sort" />

            </template>
          </el-table-column>
          <el-table-column align="center" prop="calTime" label="计算次数">
            <template slot-scope="scope">
              <el-lable>{{ scope.row.calTime }}</el-lable>

            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="150" fixed="right">
            <template slot-scope="scope">

              <el-button
                v-if="scope.row.id === '-1'"
                size="mini"
                type="text"
                class="YZ-table-delBtn"
                @click="handleDel(scope.row)"
              >删除</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
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
      antiShake: true,
      listLoading: true,
      tableDatas: '',
      tableData: [
        {
          id: '1',
          date: '-',
          packageUnit: '2',
          Name: '博汇双铜纸',
          price: '3',
          minimumConsumption: '3',
          minimumPrice: '3',
          templatePrice: '3',
          templateMinimumPrice: '3',
          sort: '3',
          calTime: '3',
          paper3: '',
          paper4: '',
          numflag: ''
        }
      ],
      currentPage4: 4
    }
  },
  created() {
    //   this.initData();
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

    },
    // 编辑
    edit(id) {
      this.$router.push({
        path:
                    '/quotationSystem/paperpricesetting/edit?&id=' +
                    id +
                    '&isRefresh=true',
        query: {
          id: id,
          isRefresh: true
        }
      })
    },
    // 删除
    handleDel(val) {
      const index = this['tableData'].indexOf(val)
      this['tableData'].splice(index, 1)
    },
    // 新增
    save(tableData) {
      alert(this.tableData)
    },

    Refresh() {
      this.getList()
    },
    toBackColorboxsetting() {
      const hashPath = window.location.hash
      this.hashPath = hashPath.replace('#', '')
      const params = {
        view: {
          fullPath: this.hashPath
        },
        toPath: '/quotationSystem/colorboxsetting/index'
      }

      this.$store.dispatch('tagsView/delView', params)
    },
    addClick(tableData) {
      this[tableData].unshift({
        id: '-1'
      })
    }
  }
}
</script>
