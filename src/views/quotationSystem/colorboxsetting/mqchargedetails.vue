<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="模切参数设置" class="w-100 h-100">
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
              :height="400"
              size="mini"
              stripe
              highlight-current-row
            >
              <el-table-column align="center" prop="iOrder" label="排序" width="60">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.iOrder" v-Int size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="bEnable" label="启用" width="40">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.bEnable" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="sMachineType" label="机台类型">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.sMachineType" size="mini" filterable clearable="">
                    <el-option label="全开" value="1" />
                    <el-option label="对开" value="2" />
                    <el-option label="四开" value="3" />
                    <el-option label="六开" value="4" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="sName" label="名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sName" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="sBoxClass" label="盒子大类">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.sBoxClass" size="mini" filterable clearable="">
                    <el-option label="通用" value="通用" />
                    <el-option label="卡盒" value="卡盒" />
                    <el-option label="坑盒" value="坑盒" />
                  </el-select>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" prop="sName" label="盒子类型">
                                <template slot-scope="scope">
                                    <el-select size="mini" filterable clearable v-model="scope.row.hzlx">
                                        <el-option label="通用" value="1"></el-option>
                                        <template v-if="scope.row.hzdl == '3'">
                                            <el-option label="3层坑盒" value="3层坑盒"></el-option>
                                            <el-option label="5层坑盒" value="5层坑盒"></el-option>
                                            <el-option label="7层坑盒" value="7层坑盒"></el-option>
                                        </template>
                                        <template v-if="scope.row.hzdl == '2'">
                                            <el-option label="普通卡盒" value="普通卡盒"></el-option>
                                            <el-option label="金银卡盒" value="金银卡盒"></el-option>
                                            <el-option label="裱卡盒" value="裱卡盒"></el-option>
                                        </template>
                                    </el-select>
                                </template>
                            </el-table-column> -->

              <el-table-column align="center" prop="dLength" label="长">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dLength" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dWidth" label="宽">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dWidth" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinAmount" label="最低消费(元)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dMinAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>

              <el-table-column align="center">
                <template slot="header">模切费单价</template>
                <el-table-column align="center">
                  <template slot="header">
                    <input v-model="tableHeader.iTemplateInterval1" v-Int size="mini" class="small-input w-100 e-input" @change="changeiImpression">
                    张内
                  </template>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dTemplateIntervalPrice1" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <input v-model="tableHeader.iTemplateInterval2" v-Int size="mini" class="small-input w-100 e-input" @change="changeiImpression">
                    张内
                  </template>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dTemplateIntervalPrice2" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center" :label="tableHeader.iTemplateInterval3 + '以上'">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dTemplateIntervalPrice3" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" label="调机费（元）">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dAdjustAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="copy(scope.row, scope.$index)">复制</el-button>
                  <el-button size="mini" type="text" class="YZ-table-delBtn" @click="remove(scope.row, scope.$index, 'Ele_ColorBoxSetting_AfterProcess_Cutting')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button size="mini" type="primary" @click="add2">增加行</el-button>
            <el-table
              ref="table"
              v-loading="loading2"
              :data="tableData2"
              border
              class="w-100 YZ-common-table bd-table table-border-bottom"
              style="margin-top: 10px"
              :height="300"
              size="mini"
              stripe
              highlight-current-row
            >
              <el-table-column align="center">
                <template slot="header">
                  <div class="d-flex ai-c jc-ce">
                    模板费
                    <!-- （有模切版收费
                                        <el-input size="mini" style="width: 100px;" v-model="mb"></el-input>
                                        元） -->
                  </div>
                </template>
                <el-table-column align="center" prop="iOrder" label="排序" width="60">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.iOrder" v-Int size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="sName" label="名称">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sName" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dAmount" label="金额">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dAmount" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column align="center" label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" class="YZ-table-delBtn" @click="remove(scope.row, scope.$index, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate','tableData2')">
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
  name: 'Mqchargedetails',
  mixins: [postWorkSetEditMixins],
  props: {
    uGuid1: String
  },
  data() {
    return {
      tableHeader: {
        iTemplateInterval1: 0,
        iTemplateInterval2: 0,
        iTemplateInterval3: 0
      },
      tableData2: [],
      loading2: false
    }
  },
  mounted() {},

  methods: {
    getList() {
      this.tableData = []
      this.tableData2 = []
      this.loading = true
      this.loading2 = true
      Api.GetColorBoxSettingAfterProcessCuttingListData()
        .then(res => {
          if (res.code == 200) {
            this.tableData =
                            res.data.map(item => {
                              item.isEdit = true
                              return item
                            }) || []
            const d = res.data[0] || {}
            console.log(d)
            for (const field in d) {
              if (field in this.tableHeader) {
                this.$set(this.tableHeader, field, d[field])
              }
            }
          } else {
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
      Api.GetColorBoxSettingAfterProcessCuttingTemplateListData()
        .then(res => {
          if (res.code == 200) {
            this.tableData2 =
                            res.data.map(item => {
                              item.isEdit = true
                              return item
                            }) || []
          }
          this.loading2 = false
        })
        .catch(() => {
          this.loading2 = false
        })
    },
    changeiImpression() {
      let { iTemplateInterval1, iTemplateInterval2 } = this.tableHeader
      iTemplateInterval1 = parseFloat(iTemplateInterval1)
      iTemplateInterval2 = parseFloat(iTemplateInterval2)
      if (iTemplateInterval1 && iTemplateInterval2 && iTemplateInterval1 >= iTemplateInterval2) {
        this.noticfy('印次内2不能小于印次内1！')
        return false
      }
      console.log(iTemplateInterval2)
      this.$set(this.tableHeader, 'iTemplateInterval3', iTemplateInterval2 + 1)
    },
    add() {
      this.tableData.push({
        uGuid1: this.uGuid1,
        isEdit: false,
        uGuid2: this.guid(),
        iOrder: this.tableData.length + 1,
        bCustom: true,
        sBoxClass: '通用',
        bEnable: true
      })
    },
    add2() {
      this.tableData2.unshift({
        uGuid1: this.uGuid1,
        isEdit: false,
        uGuid2: this.guid(),
        iOrder: this.tableData2.length + 1,
        dAmount: 0
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
      for (const field in this.tableHeader) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.$set(this.tableData[i], field, this.tableHeader[field])
        }
      }
      Api.SaveColorBoxSettingAfterProcessCutting({
        CuttingDetailsList: this.tableData,
        CuttingTemplateDetailsList: this.tableData2,
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
    overflow-y: auto;
}

.e-input {
    height: 24px;
    line-height: 24px;
    border-radius: 0;
    border: 1px solid #dcdfe6;
}
</style>
