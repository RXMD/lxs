<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="瓦楞盒裱啤粘一口价参数设置" class="w-100 h-100">
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
              <el-table-column align="center" prop="sName" label="机器名称" />

              <el-table-column align="center" prop="dStartupAmount" label="材料大类">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.hzdl" size="mini" class="w-100" filterable clearable="">
                    <el-option label="通用" value="1" />
                    <el-option label="卡盒" value="2" />
                    <el-option label="坑盒" value="3" />
                  </el-select>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" prop="dMinPrice" label="材料分类">
                                <template slot-scope="scope">
                                    <el-select size="mini" filterable clearable="" v-model="scope.row.hzdl">
                                        <el-option label="通用" value="1"></el-option>
                                        <el-option label="卡盒" value="2"></el-option>
                                        <el-option label="坑盒" value="3"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column> -->

              <el-table-column align="center" prop="dMinPrice" label="针对盒型">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.hzdl" size="mini" class="w-100" filterable clearable="">
                    <el-option label="通用" value="1" />
                    <el-option label="双插盒" value="2" />
                    <el-option label="扣底盒" value="3" />
                    <el-option label="自动扣底盒" value="3" />
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column align="center" prop="ssss" label="最大展开长(mm)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bbbb" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>

              <el-table-column align="center" prop="dMinPrice" label="最大展开高(mm)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.ssss" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="200" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="edit(scope.row)">修改</el-button>
                  <el-button size="mini" type="text" @click="copy(scope.row, scope.$index)">复制</el-button>
                  <el-button size="mini" type="text" class="YZ-table-delBtn" @click="remove(scope.row, scope.$index, 'Ele_ColorBoxSetting_AfterProcess_PastingFilm')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-dialog v-DialogDrag width="70%" title="粘盒价格设置" :visible.sync="editVisible" append-to-body :close-on-click-modal="false" @close="editVisible = false">
          <div class="content-box mini-form">
            <div class="table-box">
              <div class="text-right">
                <el-button type="primary" size="mini" class="mb-10" @click="addRow2">新增行</el-button>
                <el-button type="primary" size="mini" class="mb-10" @click="submit2">保存</el-button>
                <el-button type="primary" size="mini" class="mb-10" @click="editVisible = false">关闭</el-button>
              </div>
              <el-table class="YZ-common-table bd-table table-border-bottom mb-5" highlight-current-row stripe border size="mini" :data="tableData2" style="width: 100%">
                <el-table-column align="center" prop="sName" label="机器名称" />

                <el-table-column align="center" prop="dStartupAmount" label="材料大类">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.hzdl" size="mini" class="w-100" filterable clearable="">
                      <el-option label="通用" value="1" />
                      <el-option label="卡盒" value="2" />
                      <el-option label="坑盒" value="3" />
                    </el-select>
                  </template>
                </el-table-column>

                <el-table-column align="center" prop="dMinPrice" label="针对盒型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.hzdl" size="mini" class="w-100" filterable clearable="">
                      <el-option label="通用" value="1" />
                      <el-option label="双插盒" value="2" />
                      <el-option label="扣底盒" value="3" />
                      <el-option label="自动扣底盒" value="3" />
                    </el-select>
                  </template>
                </el-table-column>

                <el-table-column align="center" prop="ssss" label="最大展开长(mm)">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.bbbb" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>

                <el-table-column align="center" prop="dMinPrice" label="最大展开高(mm)">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.ssss" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="ssss" label="数量分段">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.iPriceInterval" size="mini" @change="changePriceInrerval">
                      <el-option :value="1">1</el-option>
                      <el-option :value="2">2</el-option>
                      <el-option :value="3">3</el-option>
                      <el-option :value="4">4</el-option>
                      <el-option :value="5">5</el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="ssss" label="价格单位">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.iPriceInterval" size="mini">
                      <el-option :value="1">按个收</el-option>
                      <el-option :value="2">按百收</el-option>
                      <el-option :value="3">按千收</el-option>
                      <el-option :value="4">按万收</el-option>
                      <el-option :value="5">按面积收</el-option>
                    </el-select>
                  </template>
                </el-table-column>

                <el-table-column align="center" prop="dMinPrice" label="多少以上不收调机费">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.ssss" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
              </el-table>
              <el-table class="YZ-common-table bd-table table-border-bottom mb-5" highlight-current-row stripe border :height="500" size="mini" :data="tableData3" style="width: 100%">
                <el-table-column align="center" prop="sName" label="分段(粘口高度)" />

                <el-table-column align="center" prop="dStartupAmount" label="分段单位" />

                <el-table-column align="center" prop="ssss" label="最低收费(元)">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.bbbb" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>

                <el-table-column align="center" prop="dMinPrice" label="调机费(元)">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.ssss" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
                <el-table-column v-if="tableData2[0].iPriceInterval > 1" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval1" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model="table3Header.iPriceBetween1" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    个内(元/个)
                  </template>
                </el-table-column>
                <el-table-column v-if="tableData2[0].iPriceInterval > 2" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval2" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model="table3Header.iPriceBetween2" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    个内(元/个)
                  </template>
                </el-table-column>
                <el-table-column v-if="tableData2[0].iPriceInterval > 3" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval3" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model="table3Header.iPriceBetween3" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    个内(元/个)
                  </template>
                </el-table-column>
                <el-table-column v-if="tableData2[0].iPriceInterval > 4" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval4" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                  <template slot="header">
                    <input v-model="table3Header.iPriceBetween4" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
                    个内(元/个)
                  </template>
                </el-table-column>
                <el-table-column align="center" :label="table3Header.iPriceBetween5 + '以上'">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPriceInterval5" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-dialog>
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
      table3Header: {
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
          sName: '卡盒500粘盒机',
          iOrder: 1,
          ssss: 1000,
          bbbb: 500
        },
        {
          sName: '卡盒750粘盒机',
          iOrder: 2,
          ssss: 1000,
          bbbb: 750
        },
        {
          sName: '卡盒1100粘盒机',
          iOrder: 3,
          ssss: 1000,
          bbbb: 1100
        },
        {
          sName: '瓦盒500粘盒机',
          iOrder: 4,
          ssss: 1000,
          bbbb: 500
        },
        {
          sName: '瓦盒700粘盒机',
          iOrder: 5,
          ssss: 1000,
          bbbb: 700
        },
        {
          sName: '瓦盒1100粘盒机',
          iOrder: 6,
          ssss: 1000,
          bbbb: 1100
        },
        {
          sName: '瓦盒1700手工粘',
          iOrder: 7,
          ssss: 1000,
          bbbb: 1700
        },
        {
          sName: '瓦盒手工双粘口',
          iOrder: 8,
          ssss: 1000,
          bbbb: 1700
        },
        {
          sName: '胶盒750粘盒机',
          iOrder: 9,
          ssss: 1000,
          bbbb: 750
        }
      ],
      editVisible: false,
      tableData2: [
        {
          dPrice: 0,
          sUnitName: '元/CM(周长)',
          dMinAmount: 0,
          dMinPrice: 0
        }
      ],
      tableData3: [],
      table3Header: {
        iPriceInterval: 1,
        iPriceBetween2: 0,
        iPriceBetween3: 0,
        iPriceBetween4: 0,
        iPriceBetween1: 0,
        iPriceBetween5: 1,
        dLength: 1020,
        dWidth: 720,
        dPriceTake: 1
      }
    }
  },
  mounted() {},

  methods: {
    getList() {
      this.loading = true
      Api.GetColorBoxSettingAfterProcessSurfaceListData()
        .then(res => {
          this.loading = false
          if (res.code == 200 && res.data.length > 0) {
            this.tableData = res.data || []
          } else {
            this.setTableData()
          }
        })
        .catch(() => {
          this.setTableData()
          this.loading = false
        })
    },
    getList() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.$set(this.tableData[i], 'uGuid1', this.uGuid1)
        this.$set(this.tableData[i], 'uGuid2', this.guid())
        this.$set(this.tableData[i], 'isEdit', false)
      }
    },

    add() {
      this.tableData.push({
        uGuid1: this.uGuid1,
        isEdit: false,
        uGuid2: this.guid(),
        iOrder: this.tableData.length + 1
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
      for (const field in this.table3Header) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.$set(this.tableData[i], field, this.table3Header[field])
        }
      }
      Api.SaveColorBoxSettingAfterProcessSurface({
        SurfaceDetailsList: this.tableData,
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
    addRow2() {},
    submit2() {}
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

/deep/ .grid-content .el-input {
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
