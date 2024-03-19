<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="后工手提绳参数设置" class="w-100 h-100">
        <div ref="view" class="YZ-preview-main">
          <div class="w-100 pd-0">
            <el-button type="primary" size="mini" @click="close()">返回后工页面</el-button>
            <el-button v-loading="loading" type="primary" size="mini" @click="sumbit">保存</el-button>
            <el-button type="primary" size="mini" @click="add">新增</el-button>
            <el-table
              ref="table"
              v-loading="loading"
              :data="tableData"
              border
              class="w-100 YZ-common-table bd-table table-border-bottom"
              style="margin-top: 10px"
              :height="tableHeight"
              size="mini"
              stripe
              highlight-current-row
            >
              <el-table-column align="center" prop="iOrder" label="排序" width="60">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.iOrder" v-Int size="mini" />
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" prop="bStandard" label="通用版" width="100">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" v-model="scope.row.bStandard" />
                        </template>
                    </el-table-column> -->
              <!-- <el-table-column align="center" prop="bCustom" label="定制版" width="100">
                                <template slot-scope="scope">
                                    <el-checkbox size="mini" v-model="scope.row.bCustom" disabled />
                                </template>
                            </el-table-column> -->

              <el-table-column align="center" label="手提绳人工">
                <el-table-column align="center" prop="dHandRopeArtificialPrice" label="单价">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dHandRopeArtificialPrice" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dMinHandRopeArtificialAmount" label="最低消费">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dMinHandRopeArtificialAmount" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" label="手提绳材料">
                <el-table-column align="center" prop="sHandRopeMaterialName" label="名称">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sHandRopeMaterialName" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dHandRopeMaterialPrice" label="单价">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dHandRopeMaterialPrice" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dMinHandRopeMaterialAmount" label="最低消费">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dMinHandRopeMaterialAmount" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" prop="bRopeBox" label="提扣绳可用">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.bRopeBox" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="copy(scope.row, scope.$index)">复制</el-button>
                  <el-button size="mini" type="text" class="YZ-table-delBtn" @click="remove(scope.row, scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </transition>
</template>

<script>
import Api from '@/api/quotationSystem/basicData'
import postWorkSetEditMixins from './postWorkSetEditMixins'
export default {
  name: 'Stschargedetails',
  mixins: [postWorkSetEditMixins],

  data() {
    return {

    }
  },
  methods: {

    getList() {
      this.tableData = []
      this.loading = true
      Api.GetColorBoxSettingAfterProcessHandRopeListData()
        .then(res => {
          if (res.code == 200) {
            this.tableData =
                            res.data.map(item => {
                              item.isEdit = true
                              return item
                            }) || []
          } else {
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    add() {
      this.tableData.push({
        uGuid1: this.uGuid1,
        isEdit: false,
        uGuid2: this.guid(),
        iOrder: this.tableData.length + 1,
        dHandRopeArtificialPrice: 0,
        dMinHandRopeArtificialAmount: 0,
        sHandRopeMaterialName: '',
        dHandRopeMaterialPrice: 0,
        dMinHandRopeMaterialAmount: 0
      })
    },

    sumbit() {
      if (this.tableData.length == 0) {
        this.$notify.error({
          title: '提示',
          message: '请添加数据！',
          offset: 0
        })
        return false
      }
      let flag = true
      for (let i = 0; i < this.tableData.length; i++) {
        if (!this.tableData[i].sHandRopeMaterialName) {
          this.$notify.error({
            title: '提示',
            message: '名称不能为空！',
            offset: 0
          })
          flag = false
          break
        }
      }
      if (!flag) return
      Api.SaveColorBoxSettingAfterProcessHandRope({
        HandRopeDetailsList: this.tableData,
        deleteData: JSON.stringify(this.delteTableData)
      })
        .then(res => {
          if (res.code == 200) {
            this.getList()
            this.$notify.success({
              title: '提示',
              message: '操作成功！',
              offset: 0
            })
          } else {
          }
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.YZ-preview-main {
    height: calc(100vh - 216px);
}
</style>
