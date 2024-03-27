<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="后工裱纸参数设置" class="w-100 h-100">
        <div ref="view" class="YZ-preview-main">
          <div class="w-100 pd-0">
            <el-button type="primary" size="mini" @click="close()">返回后工页面</el-button>
            <el-button v-loading="loading" type="primary" size="mini" @click="sumbit">保存</el-button>
            <el-button type="primary" size="mini" @click="add">新增</el-button>
            <el-row class="border mt-10">
              <el-col :span="4"><div class="grid-content1 bg-purple-dark">单价分段</div></el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark d-flex fz-12 ai-c">
                  <el-select v-model="tableHeader.iPriceInterval" size="mini" @change="changePriceInrerval">
                    <el-option :value="1">1</el-option>
                    <el-option :value="2">2</el-option>
                    <el-option :value="3">3</el-option>
                    <el-option :value="4">4</el-option>
                    <el-option :value="5">5</el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row class="border">
              <el-col :span="4"><div class="grid-content1 bg-purple-dark">单价系数</div></el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark d-flex fz-12 ai-c">
                  尺寸超过
                  <el-input v-model.number="tableHeader.dLength" v-Empty-Zero v-Float style="width: 80px" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  x
                  <el-input v-model.number="tableHeader.dWidth" v-Empty-Zero v-Float style="width: 80px" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  ,单价乘以
                  <el-input v-model.number="tableHeader.dPriceTake" v-Empty-Zero v-Float style="width: 80px" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </div>
              </el-col>
            </el-row>

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
                  <el-input v-model.number="scope.row.iOrder" v-Int class="w-100" size="mini" />
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
                  <el-input v-model="scope.row.sName" class="w-100" size="mini" />
                </template>
              </el-table-column>
              <el-table-column>
                <template slot="header">
                  <div class="text-center">单价（元/㎡）</div>
                </template>

                <el-table-column v-if="tableHeader.iPriceInterval > 1" align="center">
                  <template slot-scope="scope">
                    <el-input v-model.number="scope.row.dPriceInterval1" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model.number="tableHeader.iPriceBetween1" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    张内
                  </template>
                </el-table-column>
                <el-table-column v-if="tableHeader.iPriceInterval > 2" align="center">
                  <template slot-scope="scope">
                    <el-input v-model.number="scope.row.dPriceInterval2" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model.number="tableHeader.iPriceBetween2" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    张内
                  </template>
                </el-table-column>
                <el-table-column v-if="tableHeader.iPriceInterval > 3" align="center">
                  <template slot-scope="scope">
                    <el-input v-model.number="scope.row.dPriceInterval3" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model.number="tableHeader.iPriceBetween3" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    张内
                  </template>
                </el-table-column>
                <el-table-column v-if="tableHeader.iPriceInterval > 4" align="center">
                  <template slot-scope="scope">
                    <el-input v-model.number="scope.row.dPriceInterval4" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model.number="tableHeader.iPriceBetween4" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    张内
                  </template>
                </el-table-column>
                <el-table-column align="center" :label="tableHeader.iPriceBetween5 + '以上'">
                  <template slot-scope="scope">
                    <el-input v-model.number="scope.row.dPriceInterval5" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" prop="dMinAmount" label="最低消费(开机费)（元）">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.dMinAmount" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinPrice" label="每张最低单价（元）">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.dMinPrice" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dTemplateAmount" label="模板费（元">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.dTemplateAmount" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="copy(scope.row, scope.$index)">复制</el-button>
                  <el-button size="mini" type="text" class="YZ-table-delBtn" @click="remove(scope.row, scope.$index, 'Ele_ColorBoxSetting_AfterProcess_MountedPaper')">删除</el-button>
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
  name: 'Biaozchargedetails',
  mixins: [postWorkSetEditMixins],
  data() {
    return {
      tableHeader: {
        iPriceInterval: 1,
        iPriceBetween2: 0,
        iPriceBetween3: 0,
        iPriceBetween4: 0,
        iPriceBetween1: 0,
        iPriceBetween5: 1,
        dLength: 1020,
        dWidth: 720,
        dPriceTake: 1
      },
      sPriceType: '1'
    }
  },
  mounted() {},

  methods: {
    getList() {
      this.tableData = []
      this.loading = true
      Api.GetColorBoxSettingAfterProcessMountedPaperListData(this.uGuid1)
        .then(res => {
          if (res.code == 200 && res.data.length > 0) {
            this.tableData =
                            res.data.map(item => {
                              item.isEdit = true
                              return item
                            }) || []
            const d = res.data[0]
            for (const field in d) {
              if (field in this.tableHeader) {
                this.$set(this.tableHeader, field, d[field])
              }
            }
          }
          this.loading = false
          this.$nextTick(() => {
            this.$refs.table.doLayout()
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    getTableH() {
      this.$nextTick(() => {
        const viewH = this.$refs.view.offsetHeight
        console.log(viewH)
        this.tableHeight = parseFloat(viewH) - 40 - 80
      })
    },
    inputChange() {
      const { iPriceInterval } = this.tableHeader
      const iPriceBetweenField = this.tableHeader[`iPriceBetween${iPriceInterval - 1}`]
      this.$set(this.tableHeader, 'iPriceBetween5', parseInt(iPriceBetweenField) + 1)
      this.iPriceBetween5 = parseInt(iPriceBetweenField) + 1
    },
    add() {
      this.tableData.push({
        uGuid1: this.uGuid1,
        isEdit: false,
        uGuid2: this.guid(),
        iOrder: this.tableData.length + 1,
        bCustom: true,
        dTemplateAmount: 0,
        dMinPrice: 0,
        dMinAmount: 0
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
      Api.SaveColorBoxSettingAfterProcessMountedPaper({
        MountedPaperDetailsList: this.tableData,
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
    },
    changePriceInrerval() {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.YZ-preview-main {
    height: calc(100vh - 216px);
}
.text-center {
    text-align: center;
}
.footter {
    font-size: 12px;
    padding: 10px 0 10px 10px;
    p {
        padding: 10px 0;
    }
}
.small-input {
    width: 50px;
}
.center {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.input-box {
    width: 60px;
}
.padding10 {
    padding: 10px;
}
.menu-box {
    font-size: 12px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .menu1 {
        flex: 3;
        padding: 10px;
        ul {
            flex: 1;
            li {
                padding: 5px 0;
                display: flex;
                align-items: center;
            }
        }
        div {
            display: flex;
            align-items: center;
        }
    }
    .menu2 {
        padding: 10px;
        display: flex;
        align-items: center;
        flex: 1;
        border-top: 1px solid #ececec;
    }
}
ul > li {
    list-style-type: none;
}
.border {
    border-top: 1px solid #ececec;
    border-right: 1px solid #ececec;
}
.border-right {
    border-right: 1px solid #ececec;
}
.bg-purple-dark {
    border-left: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    height: 32px;
}
.grid-content1 {
    text-align: center;
    font-size: 12px;
    line-height: 32px;
}
.grid-content {
    padding-left: 10px;
    line-height: 32px;
}
.botton-box {
    text-align: left;
    padding: 5px;
}
.content-box {
    width: 100%;
    height: 100%;
    overflow: auto;
}
.padding-box {
    padding: 30px 0;
}
.padding1 {
    padding-bottom: 20px;
}
.text-right {
    text-align: right;
}
.content {
    padding: 10px;
    background-color: #ffffff;
}
.title {
    padding-left: 10px;
    margin-bottom: 10px;
    border-left: 4px solid #c25453;
}
.form-text {
    font-size: 12px;
}

::v-deep .grid-content .el-input {
    width: 100%;
}
.YZ-common-layout {
    height: calc(100vh - 185px);
}
.e-input {
    height: 24px;
    line-height: 24px;
    border-radius: 0;
    border: 1px solid #dcdfe6;
}
</style>
