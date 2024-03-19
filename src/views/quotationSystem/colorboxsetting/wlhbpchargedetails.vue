<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="瓦楞盒裱啤粘一口价参数设置" class="w-100 h-100">
        <div ref="view" class="YZ-preview-main">
          <div class="w-100 pd-0">
            <el-button type="primary" size="mini" @click="close()">返回后工页面</el-button>
            <el-button v-loading="loading" type="primary" size="mini" @click="sumbit">保存</el-button>

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
              :span-method="objectSpanMethod"
            >
              <el-table-column align="center" prop="iOrder" label="排序" width="60">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.iOrder" v-Int class="w-100" size="mini" />
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
              <el-table-column align="center" prop="sName" label="项目" />
              <el-table-column align="center" prop="iLayers" label="层数">
                <template slot-scope="scope">
                  {{ scope.row.iLayers?scope.row.iLayers+'层':'' }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinAmount" label="最低消费（元）">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dMinAmount" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinPrice" label="每个盒子最低单价（元）">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dMinPrice" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>

              <el-table-column>
                <template slot="header">
                  <div class="text-center">单价</div>
                </template>

                <el-table-column v-if="tableHeader.iPriceInterval > 1" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval1" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model="tableHeader.iPriceBetween1" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    张内
                  </template>
                </el-table-column>
                <el-table-column v-if="tableHeader.iPriceInterval > 2" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval2" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model="tableHeader.iPriceBetween2" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    张内
                  </template>
                </el-table-column>
                <el-table-column v-if="tableHeader.iPriceInterval > 3" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval3" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model="tableHeader.iPriceBetween3" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    张内
                  </template>
                </el-table-column>
                <el-table-column v-if="tableHeader.iPriceInterval > 4" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval4" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model="tableHeader.iPriceBetween4" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    张内
                  </template>
                </el-table-column>
                <el-table-column align="center" :label="tableHeader.iPriceBetween5 + '以上'">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval5" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
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
  name: 'Wlhbpchargedetails',
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
      tableData: [
        {
          sName: '不粘箱（包含对裱，模切）',
          iLayers: '3'
        },
        {
          sName: '不粘箱（包含对裱，模切）',
          iLayers: '5'
        },
        {
          sName: '不粘箱（包含对裱，模切）',
          iLayers: '7'
        },
        {
          sName: '单粘箱（包含对裱，模切，粘）',
          iLayers: '3'
        },
        {
          sName: '单粘箱（包含对裱，模切，粘）',
          iLayers: '5'
        },
        {
          sName: '单粘箱（包含对裱，模切，粘）',
          iLayers: '7'
        },
        {
          sName: '双粘箱（包含对裱，模切，双粘）',
          iLayers: '3'
        },
        {
          sName: '双粘箱（包含对裱，模切，双粘）',
          iLayers: '5'
        },
        {
          sName: '双粘箱（包含对裱，模切，双粘）',
          iLayers: '7'
        },
        {
          sName: '四粘箱（包含对裱，模切，四粘）',
          iLayers: '3'
        },
        {
          sName: '四粘箱（包含对裱，模切，四粘）',
          iLayers: '5'
        },
        {
          sName: '四粘箱（包含对裱，模切，四粘）',
          iLayers: '7'
        },
        {
          sName: '裱瓦纸之后再裱卡另加（和上面叠加计算）'
        }
      ],
      sPriceType: '1'
    }
  },
  mounted() {},

  methods: {
    getList() {
      this.loading = true
      Api.GetColorBoxSettingAfterProcessCorrugatedListData()
        .then(res => {
          this.loading = false
          if (res.code == 200 && res.data.length > 0) {
            this.tableData = res.data || []
          } else {
            this.setTableData()
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    setTableData() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.$set(this.tableData[i], 'uGuid1', this.uGuid1)
        this.$set(this.tableData[i], 'uGuid2', this.guid())
        this.$set(this.tableData[i], 'isEdit', false)
        this.$set(this.tableData[i], 'iOrder', i + 1)
      }
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

    sumbit() {
      Api.SaveColorBoxSettingAfterProcessCorrugated({
        CorrugatedDetailsList: this.tableData,
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
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      const rowspan = 3
      if (columnIndex === 1) {
        console.log(rowIndex, rowIndex / 3)
        if (rowIndex % 3 == 0) {
          return {
            rowspan: rowspan,
            colspan: 1
          }
        } else {
          return [0, 0]
        }
      }
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
