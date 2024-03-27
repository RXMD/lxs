<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="后工满版压纹参数设置" class="w-100 h-100">
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
              <el-table-column align="center" prop="dPrice" label="单价(元/个)">
                <template slot-scope="scope">
                  <div class="d-flex ai-c">
                    <el-input v-model.number="scope.row.dPrice" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                    <el-select v-model="scope.row.sUnitName" size="mini" style="margin-left: 2px">
                      <el-option value="元/张" />
                      <el-option value="元/印刷㎡" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinStartupAmount" label="最低消费(开机费)（元）">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.dMinStartupAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinPrice" label="每张(个)最低单价（元）">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.dMinPrice" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dTemplateAmount" label="模板费（元）/平方厘米">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.dTemplateAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dTemplateMinAmount" label="模板费最低收费(元)">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.dTemplateMinAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="copy(scope.row, scope.$index)">复制</el-button>
                  <el-button size="mini" type="text" class="YZ-table-delBtn" @click="remove(scope.row, scope.$index, 'Ele_ColorBoxSetting_AfterProcess_FullEmbossing')">
                    删除
                  </el-button>
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
  name: 'Mbywchargedetails',
  mixins: [postWorkSetEditMixins],
  data() {
    return {}
  },
  mounted() {},

  methods: {
    getList() {
      this.tableData = []
      this.loading = true
      Api.GetColorBoxSettingAfterProcessFullEmbossingListData(this.uGuid1)
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
        bCustom: true,
        sUnitName: '元/张',
        dMinStartupAmount: 0,
        dMinPrice: 0,
        dPrice: 0,
        dTemplateAmount: 0,
        dTemplateMinAmount: 0
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
      Api.SaveColorBoxSettingAfterProcessFullEmbossing({
        FullEmbossingDetailsList: this.tableData,
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
