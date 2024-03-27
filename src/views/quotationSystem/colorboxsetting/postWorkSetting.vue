<!--  -->
<template>
  <transition name="el-zoom-in-center">
    <div ref="view" class="YZ-common-layout pd-0 mini-form" style="flex-wrap: wrap; overflow: hidden">
      <div class="d-flex ai-c jc-sb w-100">
        <p class="title">彩盒后工</p>
        <el-button size="mini" type="primary" class="mb-10" @click="sumbit">保存</el-button>
      </div>

      <el-table ref="table" size="mini" :height="tableHeight" border :data="goodList" :span-method="arraySpanMethod" style="width: 100%">
        <el-table-column prop="sAfterProcessName" align="center" label="名称" />
        <el-table-column>
          <template slot="header">
            <div class="text-center">
              单价（分段
              <el-select v-model="tableHeader.iPriceInterval" size="mini" @change="changePriceInrerval">
                <el-option :value="1">1</el-option>
                <el-option :value="2">2</el-option>
                <el-option :value="3">3</el-option>
                <el-option :value="4">4</el-option>
                <el-option :value="5">5</el-option>
              </el-select>
              ）
            </div>
          </template>

          <el-table-column v-if="tableHeader.iPriceInterval > 1" align="center">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.dPriceInterval1" v-Empty-Zero v-Float size="mini" />
            </template>
            <template slot="header">
              <input v-model.number="tableHeader.iPriceBetween1" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
              张（个）以内
            </template>
          </el-table-column>
          <el-table-column v-if="tableHeader.iPriceInterval > 2" align="center">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.dPriceInterval2" v-Empty-Zero v-Float size="mini" />
            </template>
            <template slot="header">
              <input v-model.number="tableHeader.iPriceBetween2" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
              张（个）以内
            </template>
          </el-table-column>
          <el-table-column v-if="tableHeader.iPriceInterval > 3" align="center">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.dPriceInterval3" v-Empty-Zero v-Float size="mini" />
            </template>
            <template slot="header">
              <input v-model.number="tableHeader.iPriceBetween3" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
              张（个）以内
            </template>
          </el-table-column>
          <el-table-column v-if="tableHeader.iPriceInterval > 4" align="center">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.dPriceInterval4" v-Empty-Zero v-Float size="mini" />
            </template>
            <template slot="header">
              <input v-model.number="tableHeader.iPriceBetween4" v-Int size="mini" class="small-input w-100 e-input" @change="inputChange">
              张（个）以内
            </template>
          </el-table-column>
          <el-table-column align="center" :label="tableHeader.iPriceBetween5 + '张（个）以上'">
            <template slot-scope="scope">
              <p v-if="scope.row.sAfterProcessName == '粘盒'">
                粘盒计算方式：
                <el-radio-group v-model="scope.row.sPasteBoxCalcType">
                  <el-radio label="1">一（统一价计算）</el-radio>
                  <el-radio label="2">二（分机器分段计算）</el-radio>
                </el-radio-group>

                <el-button size="mini" type="text" @click="LinkLookDetail(scope.row)">查看收费详情</el-button>
              </p>
              <p v-else-if="!['击凸', '击凹', '单钉盒', '双钉盒', '粘挂钩'].includes(scope.row.sAfterProcessName)">
                <!-- <span v-if="scope.row.sAfterProcessName == '瓦楞盒裱啤粘一口价'">
                                <el-checkbox v-model="checked">启用一口价</el-checkbox>
                            </span> -->
                <el-button type="text" @click="LinkLookDetail(scope.row)">查看收费详情</el-button>
              </p>

              <el-input v-else v-model.number="scope.row.dPriceInterval5" v-Empty-Zero v-Float size="mini" />
            </template>
          </el-table-column>

          <el-table-column align="center" label="单位">
            <template slot-scope="scope">
              <p v-if="scope.row.sAfterProcessName == '击凸' || scope.row.sAfterProcessName == '击凹'">元/张</p>
              <el-select v-else v-model="scope.row.sUnitName" disabled size="mini">
                <el-option label="元/个钉位" value="元/个钉位" />
                <!-- <el-option label="元/m(展开面积)" value="元/m(展开面积)"></el-option> -->
              </el-select>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="最低消费" align="center">
          <el-table-column label="开机费（元）" align="center">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.dStartupAmount" v-Empty-Zero v-Float size="mini" />
            </template>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column align="center" prop="name" label="每个盒最低单价（元）">
                    <template slot-scope="scope">
                        <el-input
                            v-Empty-Zero
                            oninput="value=value.replace(/[^0-9.]/g,'')"
                            v-Float
                            size="mini"
                            v-if="scope.row.sAfterProcessName == '单钉盒' || scope.row.sAfterProcessName == '双钉盒'"
                            v-model="scope.row.dBoxMinPrice"
                        ></el-input>
                    </template>
                </el-table-column> -->
        <el-table-column align="center" prop="name" label="调机费">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.sAfterProcessName == '击凸' || scope.row.sAfterProcessName == '击凹'"
              v-model.number="scope.row.dAdjustAmount"
              v-Empty-Zero
              v-Float
              oninput="value=value.replace(/[^0-9.]/g,'')"
              size="mini"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="actualweight" width="230px">
          <template slot-scope="scope">
            <p v-if="scope.row.sAfterProcessName == '击凸' || scope.row.sAfterProcessName == '击凹'" class="d-flex ai-c">
              <span style="width: 75px; text-align: right">模板费</span>
              <el-input
                v-model.number="scope.row.dTemplateAndMinSpacingAmount"
                v-Empty-Zero
                v-Float
                style="width: 70px"
                size="mini"
                class="input-box"
              />
              <span>元/平方厘米</span>
            </p>
            <!-- <p class="d-flex ai-c" v-else-if="scope.row.sAfterProcessName != '粘挂钩'">
                            <span  style="width:75px;text-align: right;">打钉最小间距</span>
                            <el-input
                                style="width: 70px"
                                v-Empty-Zero
                                oninput="value=value.replace(/[^0-9.]/g,'')"
                                v-Float
                                size="mini"
                                class="input-box"
                                v-model="scope.row.dTemplateAndMinSpacingAmount"
                            ></el-input>
                            <span>mm</span>
                        </p> -->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="dTemplateMinAmount" label="模板费最低收费（元）">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.sAfterProcessName == '击凸' || scope.row.sAfterProcessName == '击凹'"
              v-model.number="scope.row.dTemplateMinAmount"
              v-Empty-Zero
              v-Float
              size="mini"
            />
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="name" label="模板每拼最低收费（元）">
                    <template slot-scope="scope">
                        <el-input
                            v-Empty-Zero
                            oninput="value=value.replace(/[^0-9.]/g,'')"
                            v-Float
                            size="mini"
                            v-if="scope.row.sAfterProcessName == '击凸' || scope.row.sAfterProcessName == '击凹'"
                            v-model="scope.row.dTemplateSpellMinAmount"
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="模板每个位置最低收费（元）">
                    <template slot-scope="scope">
                        <el-input
                            v-Empty-Zero
                            oninput="value=value.replace(/[^0-9.]/g,'')"
                            v-Float
                            size="mini"
                            v-if="scope.row.sAfterProcessName == '击凸' || scope.row.sAfterProcessName == '击凹'"
                            v-model="scope.row.dTemplateLocationMinAmount"
                        ></el-input>
                    </template>
                </el-table-column> -->

        <el-table-column align="center" prop="sStatus" label="状态" width="90">
          <template slot-scope="scope">
            <el-select v-model="scope.row.sStatus" size="mini">
              <el-option label="可用" value="可用" />
              <el-option label="禁用" value="禁用" />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <component :is="compentName" v-if="feeDetailsVisible" class="position-absolute" :u-guid1="feeDetailsGuid1" />
    </div>
  </transition>
</template>

<script>
import Api from '@/api/quotationSystem/basicData'
import { number } from 'echarts/lib/export'
export default {
  name: 'PostWorkSetting',
  components: {
    jbywchargedetails: () => import('./jbywchargedetails'),
    mbywchargedetails: () => import('./mbywchargedetails'),
    jbuvchargedetails: () => import('./jbuvchargedetails'),
    stschargedetails: () => import('./stschargedetails'),
    mqchargedetails: () => import('./mqchargedetails'),
    tjchargedetails: () => import('./tjchargedetails'),
    bmclchargedetails: () => import('./bmclchargedetails'),
    ktctjpchargedetails: () => import('./ktctjpchargedetails'),
    smjchargedetails: () => import('./smjchargedetails'),
    ysdchargedetails: () => import('./ysdchargedetails'),
    qthgchargedetails: () => import('./qthgchargedetails'),
    bzchargedetails: () => import('./bzchargedetails'),
    biaozchargedetails: () => import('./biaozchargedetails'),
    wlhbpchargedetails: () => import('./wlhbpchargedetails'),
    nhchargedetails: () => import('./nhchargedetails')

  },
  props: {
    tab: String
  },
  data() {
    return {
      feeDetailsGuid1: '',
      compentName: '',
      tableHeader: {
        iPriceInterval: 1,

        iPriceBetween2: 0,
        iPriceBetween3: 0,
        iPriceBetween4: 0,
        iPriceBetween1: 0,
        iPriceBetween5: 0
      },
      tableHeight: 400,
      feeDetailsVisible: false,
      goodList: [
        { sAfterProcessName: '击凸', isEdit: false, iOrder: 1 },
        { sAfterProcessName: '击凹', isEdit: false, iOrder: 2 },
        { sAfterProcessName: '单钉盒', sUnitName: '元/个钉位', isEdit: false, iOrder: 3 },
        { sAfterProcessName: '双钉盒', sUnitName: '元/个钉位', isEdit: false, iOrder: 4 },
        { sAfterProcessName: '粘挂钩', sUnitName: '元/个钉位', isEdit: false, iOrder: 5 },
        { sAfterProcessName: '模切', sUrlName: 'mqchargedetails', isEdit: false, iOrder: 6 },
        { sAfterProcessName: '满版压纹', sUrlName: 'mbywchargedetails', isEdit: false, iOrder: 7 },
        { sAfterProcessName: '局部压纹', sUrlName: 'jbywchargedetails', isEdit: false, iOrder: 8 },
        { sAfterProcessName: '局部UV', sUrlName: 'jbuvchargedetails', isEdit: false, iOrder: 9 },
        { sAfterProcessName: '手提绳', sUrlName: 'stschargedetails', isEdit: false, iOrder: 10 },
        { sAfterProcessName: '烫金', sUrlName: 'tjchargedetails', isEdit: false, iOrder: 11 },
        { sAfterProcessName: '表面处理', sUrlName: 'bmclchargedetails', isEdit: false, iOrder: 12 },
        { sAfterProcessName: '开天窗贴胶片', sUrlName: 'ktctjpchargedetails', isEdit: false, iOrder: 13 },
        // { sAfterProcessName: '食品包装盒粘工', sUrlName: 'spbzhchargedetails', isEdit: false, iOrder: 14 },
        { sAfterProcessName: '双面胶', sUrlName: 'smjchargedetails', isEdit: false, iOrder: 15 },
        { sAfterProcessName: '易撕带', sUrlName: 'ysdchargedetails', isEdit: false, iOrder: 16 },
        { sAfterProcessName: '其他后工', sUrlName: 'qthgchargedetails', isEdit: false, iOrder: 17 },
        { sAfterProcessName: '包装', sUrlName: 'bzchargedetails', isEdit: false, iOrder: 18 },
        // { sAfterProcessName: '运费', sUrlName: 'yfchargedetails', isEdit: false, iOrder: 19 },
        { sAfterProcessName: '粘盒', sUrlName: 'nhchargedetails', isEdit: false, iOrder: 20, sPasteBoxCalcType: '1' },
        { sAfterProcessName: '裱纸', sUrlName: 'biaozchargedetails', isEdit: false, iOrder: 21 },
        { sAfterProcessName: '瓦楞盒裱啤粘一口价', sUrlName: 'wlhbpchargedetails', isEdit: false, iOrder: 22 }
      ]
    }
  },
  watch: {
    tab(v) {
      if (v === 'postWorkSettings') {
        this.getData()
        this.getTableH()
      }
    }
  },
  mounted() {
    this.getData()
    this.getTableH()
  },

  methods: {
    inputChange() {
      const { iPriceInterval } = this.tableHeader
      const iPriceBetweenField = this.tableHeader[`iPriceBetween${iPriceInterval - 1}`]
      this.$set(this.tableHeader, 'iPriceBetween5', parseInt(iPriceBetweenField) + 1)
      this.iPriceBetween5 = parseInt(iPriceBetweenField) + 1
    },
    // 自适应table 高度列表 只有头部按钮 和底部分页
    getTableH() {
      this.$nextTick(() => {
        const viewH = this.$refs.view.offsetHeight
        this.tableHeight = parseFloat(viewH) - 40
      })
    },
    getData() {
      Api.GetColorBoxSettingAfterProcessListData()
        .then(res => {
          if (res.code === 200 && res.data && res.data.length > 0) {
            this.goodList = res.data.map(item => {
              item.isEdit = true
              return item
            })
            const header = this.goodList[0]
            this.$set(this.tableHeader, 'iPriceInterval', header.iPriceInterval)
            this.$set(this.tableHeader, 'iPriceBetween2', header.iPriceBetween2)
            this.$set(this.tableHeader, 'iPriceBetween3', header.iPriceBetween3)
            this.$set(this.tableHeader, 'iPriceBetween4', header.iPriceBetween4)
            this.$set(this.tableHeader, 'iPriceBetween1', header.iPriceBetween1)
            this.$set(this.tableHeader, 'iPriceBetween5', header.iPriceBetween5)
            this.$nextTick(() => {
              this.$refs.table.doLayout()
            })
          }
        })
        .catch(() => {})
    },

    sumbit() {
      const { iPriceInterval, iPriceBetween2, iPriceBetween3, iPriceBetween4, iPriceBetween1, iPriceBetween5 } = this.tableHeader
      let flag = true
      if (iPriceInterval === 3) {
        console.log(iPriceBetween3, iPriceBetween2, iPriceBetween1)
        if (iPriceBetween3 <= iPriceBetween2 || iPriceBetween2 <= iPriceBetween1 || iPriceBetween3 <= iPriceBetween1) {
          // 条件不满足的处理逻辑
          flag = false
        }
      } else if (iPriceInterval === 4 || iPriceInterval === 5) {
        if (iPriceBetween4 <= iPriceBetween3 || iPriceBetween3 <= iPriceBetween2 || iPriceBetween2 <= iPriceBetween1) {
          // 条件不满足的处理逻辑
          flag = false
        }
      }
      if (!flag) {
        this.noticfy('不规范，请重新填写！')
        return false
      }
      const postData = this.goodList.map(item => {
        item.uGuid1 = item.uGuid1 || this.$guid()
        return item
      })
      for (const key in this.tableHeader) {
        for (let i = 0; i < this.goodList.length; i++) {
          this.$set(this.goodList[i], key, this.tableHeader[key])
        }
      }
      Api.SaveColorBoxSettingAfterProcess({
        mainList: postData
      })
        .then(res => {
          if (res.code === 200) {
            this.noticfy('操作成功！', 'success')
            this.getData()
          }
        })
        .catch(() => {})
    },
    toLink() {
      this.$router.push({
        path: '/quotationSystem/printingmachinesetting/edit',
        params: {
          currentItem: this.currentItem
        }
      })
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      const leg = 7 + (this.tableHeader.iPriceInterval - 1)

      if (rowIndex >= 5) {
        if (columnIndex === 0) {
          return [1, 1]
        } else if (columnIndex === this.tableHeader.iPriceInterval * 1) {
          return [1, leg - 1]
        } else if (columnIndex !== leg) {
          return [0, 0]
        }
      }
    },
    LinkLookDetail({ sUrlName, uGuid1, isEdit }) {
      if (!isEdit) {
        this.noticfy('请先保存后工设置！')
        return false
      }
      console.log(sUrlName)
      this.compentName = sUrlName
      this.feeDetailsGuid1 = uGuid1
      this.feeDetailsVisible = true
    },
    close() {
      this.feeDetailsVisible = false
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
.title {
    padding-left: 10px;
    margin-bottom: 10px;
    border-left: 4px solid #c25453;
}
.YZ-common-layout {
    height: calc(100vh - 185px);
}
::v-deep.el-table tr {
    background: #f5f7fa;
}
.e-input {
    height: 24px;
    line-height: 24px;
    border-radius: 0;
    border: 1px solid #dcdfe6;
}
</style>
