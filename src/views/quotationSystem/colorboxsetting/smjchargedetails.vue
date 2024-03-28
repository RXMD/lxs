<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="后工双面胶参数设置" class="w-100 h-100">
        <div ref="view" class="YZ-preview-main">
          <div class="w-100 pd-0">
            <el-button type="primary" size="mini" @click="close()">返回后工页面</el-button>
            <el-button v-loading="loading" type="primary" size="mini" @click="sumbit">保存</el-button>
            <el-button type="primary" size="mini" @click="add">新增</el-button>
            <el-table
              ref="table"
              v-loading="loading"
              :data="tableData2"
              border
              class="w-100 YZ-common-table bd-table table-border-bottom"
              style="margin-top: 10px"
              size="mini"
              stripe
              highlight-current-row
            >
              <el-table-column align="center" prop="sName2" label="名称" />
              <el-table-column align="center" prop="dArtificialPrice" label="单价(元/m)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dArtificialPrice" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dArtificialMinPieceAmount" label="每条最低（元）	">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dArtificialMinPieceAmount" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                </template>
              </el-table-column>

              <el-table-column align="center" prop="dArtificialMinAmount" label="最低消费（元）">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dArtificialMinAmount" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="sArtificialCalcType" label="计算方式">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.sArtificialCalcType" class="w-100" size="mini" filterable clearable>
                    <el-option label="手工-按材料长度" value="1" />
                    <el-option label="机器-按展开长度" value="2" />
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
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
              <el-table-column align="center">
                <template slot="header">
                  <div class="d-flex ai-c jc-ce">双面胶材料</div>
                </template>
                <el-table-column align="center" prop="iOrder" label="排序" width="60">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.iOrder" v-Int size="mini" />
                  </template>
                </el-table-column>

                <el-table-column align="center" prop="sName" label="种类">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sName" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dWidth" label="宽度(mm)">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dWidth" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dPrice" label="单价(元/米)">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPrice" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dMinAmount" label="最低消费(元)">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dMinAmount" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="120" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="copy(scope.row, scope.$index)">复制</el-button>
                    <el-button size="mini" type="text" class="YZ-table-delBtn" @click="remove(scope.row, scope.$index, 'Ele_ColorBoxSetting_AfterProcess_EasyTearTape')">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
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
  name: 'Smjchargedetails',
  mixins: [postWorkSetEditMixins],
  props: {
    uGuid1: String
  },
  data() {
    return {
      tableData: [],
      tableData2: [
        {
          sName2: '贴胶片人工',
          dArtificialPrice: 0.01,
          dArtificialMinPieceAmount: 0,
          dArtificialMinAmount: 150,
          sArtificialCalcType: '1'
        }
      ]
    }
  },
  mounted() {},

  methods: {
    getList() {
      this.tableData = []
      this.loading = true
      Api.GetColorBoxSettingAfterProcessDoubleFilmListData(this.uGuid1)
        .then(res => {
          if (res.code == 200) {
            this.tableData =
                            res.data.map(item => {
                              item.isEdit = true
                              return item
                            }) || []
            if (this.tableData.length > 0) {
              const { dArtificialPrice, dArtificialMinPieceAmount, dArtificialMinAmount, sArtificialCalcType } = this.tableData[0]
              this.$set(this.tableData2[0], 'dArtificialPrice', dArtificialPrice)
              this.$set(this.tableData2[0], 'dArtificialMinPieceAmount', dArtificialMinPieceAmount)
              this.$set(this.tableData2[0], 'dArtificialMinAmount', dArtificialMinAmount)
              this.$set(this.tableData2[0], 'sArtificialCalcType', sArtificialCalcType)
            }
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
        iOrder: this.tableData.length + 1
      })
    },
    getTableH() {
      this.$nextTick(() => {
        const viewH = this.$refs.view.offsetHeight

        this.tableHeight = parseFloat(viewH) - 40 - 70
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
        if (!this.tableData[i].sName) {
          this.$notify.error({
            title: '提示',
            message: '种类不能为空！',
            offset: 0
          })
          flag = false
          break
        }
      }
      if (!flag) return
      for (const field in this.tableData2[0]) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.$set(this.tableData[i], field, this.tableData2[0][field])
        }
      }
      Api.SaveColorBoxSettingAfterProcessDoubleFilm({
        DoubleFilmDetailsList: this.tableData,
        deleteData: JSON.stringify(this.delteTableData)
      })
        .then(res => {
          if (res.code == 200) {
            this.tableData =
                            this.tableData.map(item => {
                              item.isEdit = true
                              return item
                            }) || []
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
