<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="后工烫金参数设置" class="w-100 h-100">
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
                  <el-input v-model.number="scope.row.iOrder" v-Int size="mini" />
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
              <el-table-column align="center" prop="sName" label="名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sName" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dPrice" label="材料单价(元/㎡)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dPrice" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinPrice" label="材料每张最低单价(元)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dMinPrice" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinAmount" label="材料最低收费(元)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dMinAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="人工(元/张)">
                <el-table-column align="center" prop="dArtificialSixAmount" label="六开机">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dArtificialSixAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dArtificialFourAmount" label="四开机">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dArtificialFourAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dArtificialTwoAmount" label="对开机">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dArtificialTwoAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dArtificialFullAmount" label="全开机">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dArtificialFullAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" prop="dAdjustAmount" label="调机费">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dAdjustAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinArtificialAmount" label="人工最低收费(元)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dMinArtificialAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dTemplateAmount" label="模板费(元/平方厘米)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dTemplateAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinTemplateAmount" label="模板费最低收费(元)	">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dMinTemplateAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="copy(scope.row, scope.$index)">复制</el-button>
                  <el-button size="mini" type="text" class="YZ-table-delBtn" @click="remove(scope.row, scope.$index, 'Ele_ColorBoxSetting_AfterProcess_HotGold')">删除</el-button>
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
  name: 'Tjchargedetails',
  mixins: [postWorkSetEditMixins],
  data() {
    return {}
  },
  mounted() {},

  methods: {
    getList() {
      this.tableData = []
      this.loading = true
      Api.GetColorBoxSettingAfterProcessHotGoldListData(this.uGuid1)
        .then(res => {
          if (res.code === 200) {
            this.tableData =
                            res.data.map(item => {
                              item.isEdit = true
                              return item
                            }) || []
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
        bCustom: true,
        dPrice: 0,
        dMinPrice: 0,
        dMinAmount: 0,
        dArtificialSixAmount: 0,
        dArtificialFourAmount: 0,
        dArtificialTwoAmount: 0,
        dArtificialFullAmount: 0,
        dMinArtificialAmount: 0,
        dFilmAmount: 0,
        dMinFilmAmount: 0
      })
    },

    sumbit() {
      if (this.tableData.length === 0) {
        this.$notify.error({
          title: '提示',
          message: '请添加数据！',
          offset: 0
        })
        return false
      }

      let isValid = true

      for (let i = 0; i < this.tableData.length; i++) {
        const currentObj = this.tableData[i]

        // 判断sName是否为空
        if (!currentObj.sName) {
          isValid = false
          break
        }

        // 判断sName是否重复
        for (let j = i + 1; j < this.tableData.length; j++) {
          if (currentObj.sName === this.tableData[j].sName) {
            isValid = false
            break
          }
        }

        if (!isValid) {
          break
        }
      }

      if (!isValid) {
        this.noticfy('名称不能为空且不能重复，请重新填写！')
        return
      }
      Api.SaveColorBoxSettingAfterProcessHotGold({
        HotGoldDetailsList: this.tableData,
        deleteData: JSON.stringify(this.delteTableData)
      })
        .then(res => {
          if (res.code === 200) {
            this.getList()
            this.$notify.success({
              title: '提示',
              message: '操作成功！',
              offset: 0
            })
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
