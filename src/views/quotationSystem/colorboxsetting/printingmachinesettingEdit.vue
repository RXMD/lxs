<template>
  <div v-loading="loading" class="content-box mini-form">
    <div class="table-box">
      <div class="text-right">
        <el-button type="primary" size="mini" class="mb-10" @click="submit">保存</el-button>
        <el-button type="primary" size="mini" class="mb-10" @click="goBack">关闭</el-button>
      </div>

      <el-table
        ref="table"
        highlight-current-row
        stripe
        border
        :max-height="300"
        size="mini"
        :data="formTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
      >
        <el-table-column v-if="!formId" width="40" type="selection" />
        <el-table-column width="40" label="序号" type="index" />
        <el-table-column label="排序" prop="iOrder" width="60">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.iOrder" v-Int />
          </template>
        </el-table-column>
        <el-table-column prop="sMachineType" label="机台类型" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.sMachineType" disabled>
              <el-option label="全开" value="1" />
              <el-option label="对开" value="2" />
              <el-option label="四开" value="3" />
              <el-option label="六开" value="4" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="机台名称" prop="sMachineName" width="140">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sMachineName" disabled />
          </template>
        </el-table-column>
        <el-table-column label="咬口" prop="dGripperEdge" width="140">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dGripperEdge" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMaxMachineLength" label="最大上机长">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMaxMachineLength" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMaxMachineWidthe" label="最大上机宽">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMaxMachineWidth" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMinMachineLength" label="最小上机长">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMinMachineLength" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMinMachineWidth" label="最小上机宽">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMinMachineWidth" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMinWeight" label="最小克重">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMinWeight" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMaxWeight" label="最大克重">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMaxWeight" v-Empty-Zero v-Float oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column prop="bUVPrinting" label="是否UV">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.bUVPrinting" />
          </template>
        </el-table-column>
        <el-table-column prop="bNoPrintCardBox" label="不印卡盒">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.bNoPrintCardBox" />
          </template>
        </el-table-column>
        <el-table-column prop="bNoPrintPitBox" label="不印坑盒">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.bNoPrintPitBox" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-box">
      <el-table ref="multipleTable" stripe border :data="Ele_PrintMachineSetting_Detail" style="width: 100%">
        <!-- <el-table-column type="selection" label="选择">
                    <template slot="header">选择</template>
                </el-table-column> -->
        <el-table-column prop="sPrintingColor" label="印刷颜色">
          <template slot-scope="scope">
            {{ scope.row.sPrintingColor }}
          </template>
        </el-table-column>
        <el-table-column prop="dStartupAmount">
          <template slot="header">
            <span style="color: #f56c6c">*</span>
            开机费
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.dStartupAmount" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column prop="dPlateAmount" label="版费（元）">
          <template slot="header">
            <span style="color: #f56c6c">*</span>
            版费（元）
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.dPlateAmount" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column prop="iImpression" label="包含印次">
          <template slot="header">
            <span style="color: #f56c6c">*</span>
            包含印次
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.iImpression" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <input v-model="Ele_PrintMachineSetting_Detail_header.iImpression1" v-Float class="input-box" type="number" @change="changeiImpression">
            印次内

          </template>

          <el-table-column prop="dImpressionPrice1" label="（元/千印）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dImpressionPrice1" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <input v-model="Ele_PrintMachineSetting_Detail_header.iImpression2" v-Float class="input-box" type="number" @change="changeiImpression">
            印次内
          </template>

          <el-table-column prop="dImpressionPrice2" label="（元/千印）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dImpressionPrice2" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="Ele_PrintMachineSetting_Detail_header.iImpression3 + '印次以上'">
          <el-table-column prop="dImpressionPrice3" label="（元/千印）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dImpressionPrice3" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
            </template>
          </el-table-column>
        </el-table-column>

        <!-- <el-table-column label="大实地加收">
                    <el-table-column>
                        <template slot="header">
                            （
                            <input type="radio" name="sLargeFieldType" value="1" v-model="Ele_PrintMachineSetting_Detail_header.sLargeFieldType" />
                            % /
                            <input v-model="Ele_PrintMachineSetting_Detail_header.sLargeFieldType" value="2" type="radio" name="sLargeFieldType" />
                            元）
                        </template>
                        <template slot-scope="scope">
                            <el-input size="mini"  v-Empty-Zero oninput="value=value.replace(/[^0-9.]/g,'')" v-Float v-model="scope.row.dLargeField">
                                <template slot="append">{{ Ele_PrintMachineSetting_Detail_header.sLargeFieldType == '1' ? '%' : '元' }}</template>
                            </el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="高品质加收">
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.dHighQuality">
                                <template slot="append">{{ Ele_PrintMachineSetting_Detail_header.sHighQualityType == '1' ? '%' : '元' }}</template>
                            </el-input>
                        </template>
                        <template slot="header">
                            （
                            <input type="radio" name="sHighQualityType" value="1" v-model="Ele_PrintMachineSetting_Detail_header.sHighQualityType" id="" />
                            % /
                            <input v-model="Ele_PrintMachineSetting_Detail_header.sHighQualityType" value="2" type="radio" name="sHighQualityType" id="" />
                            元）
                        </template>
                    </el-table-column>
                </el-table-column> -->
        <el-table-column prop="iAdjustmentPaperQty" label="印刷调机纸（张）">
          <template slot-scope="scope">
            <el-input v-model="scope.row.iAdjustmentPaperQty" v-Int size="mini" />
          </template>
        </el-table-column>

        <el-table-column prop="iThousandStretchQty" label="印刷每千放数（张）">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.iThousandStretchQty" v-Int size="mini" />
          </template>
        </el-table-column>
        <el-table-column prop="iAfterPrintingLossQty" label="每道后加工（张）">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.iAfterPrintingLossQty" v-Int size="mini" />
          </template>
        </el-table-column>
        <el-table-column prop="iMinLossQty" label="最低总放数（张）">
          <template slot-scope="scope">
            <el-input v-model="scope.row.iMinLossQty" size="mini" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="col-table">
      <!-- <el-row>
                <el-col :span="3"><div class="grid-content bg-purple">版费另计</div></el-col>
                <el-col :span="21">
                    <div class="grid-content bg-purple-light">
                        <el-input :value="0"></el-input>
                        元/平方米 （不分颜色数，按上机纸尺寸x印刷张数）
                    </div>
                </el-col>
            </el-row> -->
      <!-- <el-row>
                <el-col :span="3"><div class="grid-content bg-purple">画册版数优惠</div></el-col>
                <el-col :span="21">
                    <div class="grid-content bg-purple-light">
                        印刷颜色为彩色时，版数大于等于
                        <el-input :value="0"></el-input>
                        ，每版优惠
                        <el-input :value="0"></el-input>
                        元；版数大于等于
                        <el-input :value="0"></el-input>
                        ，每版优惠
                        <el-input :value="0"></el-input>
                        元
                    </div>
                </el-col>
            </el-row> -->
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">本机适应项目</div></el-col>
        <el-col :span="21">
          <div class="grid-content1 bg-purple-light">
            <el-checkbox-group v-model="formRow.project">
              <el-checkbox v-for="(item, index) in projectList" :key="index" :label="item.text" :value="item.text" :disabled="!item.isNotDisabled" />
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
      <!-- <el-row>
                <el-col :span="3"><div class="grid-content bg-purple max-hight">本机适应纸张</div></el-col>
                <el-col :span="21">
                    <div class="grid-content1 bg-purple-light max-hight">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox :label="item.text" v-for="(item, index) in checkList1" :key="index" :disabled="item.disabled"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-col>
            </el-row> -->
    </div>
  </div>
</template>

<script>
import Api from '@/api/quotationSystem/basicData'
export default {
  name: 'PrintingmachinesettingEdit',

  props: {
    id: String
  },
  data() {
    return {
      Ele_PrintMachineSetting_Detail: [],
      Ele_PrintMachineSetting_Detail_all: [],
      Ele_PrintMachineSetting_Detail_header: {
        sLargeFieldType: '1',
        sHighQualityType: '1',
        iImpression3: 0
      },
      multipleSelection: [],
      loading: false,
      formRow: {
        project: []
      },
      formTable: [],

      projectList: [
        { text: '专班单页' },
        { text: '专班画册' },
        { text: '手提袋' },
        { text: '封套' },
        { text: '彩盒', isNotDisabled: true },
        { text: '彩卡吊带' },
        { text: '表格票卷' },
        { text: '信封' },
        { text: '专版联单' },
        { text: '礼品盒' },
        { text: '游戏卡牌' }
      ],
      formId: this.id
    }
  },
  watch: {
    id(v) {
      this.formId = v
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 获取从表头部
    saveDetailHeader() {
      // //初始化字段
      // let fields = [
      //     'dPlateAmount',
      //     'dStartupAmount',
      //     'iImpression',
      //     'dImpressionPrice',
      //     'dImpressionPrice2',
      //     'dImpressionPrice3',
      //     'iAdjustmentPaperQty',
      //     'iThousandStretchQty',
      //     'iAfterPrintingLossQty',
      //     'iMinLossQty',
      // ];
      // for (let i = 0; i < this.Ele_PrintMachineSetting_Detail.length; i++) {
      //     let item = this.Ele_PrintMachineSetting_Detail[i];
      //     this.$set(item, 'isEdit', false);
      //     this.$set(item, 'iOrder', i + 1);
      //     for (let i = 0; i < fields.length; i++) {
      //         this.$set(item, fields[i], 0);
      //     }
      // }
      for (const field in this.Ele_PrintMachineSetting_Detail_header) {
        for (let i = 0; i < this.Ele_PrintMachineSetting_Detail.length; i++) {
          this.$set(this.Ele_PrintMachineSetting_Detail[i], field, this.Ele_PrintMachineSetting_Detail_header[field])
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 点击一级表
    rowClick(row) {
      if (row && row.uGuid1) {
        this.saveDetailHeader()
        this.Ele_PrintMachineSetting_Detail = this.sortRow(
          this.Ele_PrintMachineSetting_Detail_all.filter(item => {
            return item.uGuid1 == row.uGuid1
          })
        )
        const detailFirstData = this.Ele_PrintMachineSetting_Detail[0]
        if (detailFirstData) {
          let { sLargeFieldType, sHighQualityType, iImpression3, iImpression2, iImpression1 } = detailFirstData
          sLargeFieldType = sLargeFieldType || '1'
          sHighQualityType = sHighQualityType || '1'
          iImpression3 = iImpression3 || 0
          this.$set(this.Ele_PrintMachineSetting_Detail_header, 'sLargeFieldType', sLargeFieldType)
          this.$set(this.Ele_PrintMachineSetting_Detail_header, 'sHighQualityType', sHighQualityType)
          this.$set(this.Ele_PrintMachineSetting_Detail_header, 'iImpression3', iImpression3)
          this.$set(this.Ele_PrintMachineSetting_Detail_header, 'iImpression2', iImpression2)
          this.$set(this.Ele_PrintMachineSetting_Detail_header, 'iImpression1', iImpression1)
        }

        this.formRow = row
        this.$refs.table.setCurrentRow(row, true)
      }
    },
    sortRow(data) {
      const order = ['空白', '单黑', '四色(彩色)', '彩色+过油', '1专色', '2专色', '3专色', '4专色', '彩色+1专色', '彩色+2专色', '彩色+3专色', '彩色+4专色']

      return data.sort((a, b) => {
        const indexA = order.indexOf(a.sPrintingColor)
        const indexB = order.indexOf(b.sPrintingColor)

        if (indexA === -1) {
          return 1 // 将不存在于指定顺序中的元素排在后面
        }
        if (indexB === -1) {
          return -1 // 将不存在于指定顺序中的元素排在前面
        }

        return indexA - indexB // 比较两个元素在指定顺序中的索引
      })
    },
    // 初始化
    async init() {
      this.loading = true
      this.formTable = []
      let res = ''
      if (this.formId) {
        res = await Api.GetColorBoxSettingPrintMachineSettingDetail(this.formId)
      } else {
        res = await Api.GetPrintMachineSettingDetailByItemName('彩盒')
      }

      if (res.code === 200) {
        const { mainList, detailsList, main } = res.data
        this.formTable = this.formId ? this.fmrDataEditStatus(mainList, main) : mainList
        for (let i = 0; i < this.formTable.length; i++) {
          this.$set(this.formTable[i], 'project', this.formTable[i].sItemName ? this.formTable[i].sItemName.split(',') : [])
        }
        this.Ele_PrintMachineSetting_Detail_all = this.formId ? this.fmrDataEditStatus(detailsList) : detailsList
        this.rowClick(this.formTable[0] || {})
        this.loading = false
      }
    },
    fmrDataEditStatus(data, main) {
      if (main && this.formId) {
        main.isEdit = true
        return [main]
      }
      if (data && data.length > 0) {
        return data.map(item => {
          item.isEdit = true
          return item
        })
      } else {
        return []
      }
    },
    goBack() {
      this.$emit('close')
    },
    // 保存
    submit() {
      const multipleSelection = this.formId ? this.formTable : this.multipleSelection
      const Ele_PrintMachineSetting_Detail_all = this.Ele_PrintMachineSetting_Detail_all
      if (!multipleSelection || multipleSelection.length == 0) {
        this.noticfy('请选择一级表！')
        return false
      }
      this.saveDetailHeader()
      for (let i = 0; i < multipleSelection.length; i++) {
        if (!multipleSelection[i].sMachineName) {
          this.noticfy('请填写机台名称！')
          return false
        }
      }

      const Ele_PrintMachineSetting_Detail = []

      for (let i = 0; i < multipleSelection.length; i++) {
        let sMachineTypeName = ''
        switch (multipleSelection[i].sMachineType) {
          case '1':
            sMachineTypeName = '全开'
            break
          case '2':
            sMachineTypeName = '对开'
            break
          case '3':
            sMachineTypeName = '四开'
            break
          case '4':
            sMachineTypeName = '六开'
            break
        }
        multipleSelection[i].sMachineTypeName = sMachineTypeName
        multipleSelection[i].sItemName = multipleSelection[i].project.join(',')
        const d = Ele_PrintMachineSetting_Detail_all.filter(item => {
          return item.uGuid1 == multipleSelection[i].uGuid1
        })
        Ele_PrintMachineSetting_Detail.push(...d)
        if (d && d.length > 0) {
          let { iImpression1, iImpression2 } = d[0]
          iImpression1 = parseFloat(iImpression1)
          iImpression2 = parseFloat(iImpression2)
          if (iImpression1 && iImpression2 && iImpression1 >= iImpression2) {
            this.noticfy('印次内2不能小于印次内1！')
            return false
          }
        }
      }

      let isEmpty = false

      for (let i = 0; i < Ele_PrintMachineSetting_Detail.length; i++) {
        const { dStartupAmount, dPlateAmount, dImpressionPrice } = Ele_PrintMachineSetting_Detail[i]
        if (!this.checkData(dStartupAmount) || !this.checkData(dPlateAmount) || !this.checkData(dImpressionPrice)) {
          isEmpty = true
          break
        }
      }
      if (isEmpty) {
        this.noticfy('开机费，版费，包含印次不能为空，请重新填写！')
        return false
      }

      const postData = {
        mainList: multipleSelection,
        detailsList: Ele_PrintMachineSetting_Detail,
        isEdit: !!this.formId
      }

      Api.SaveColorBoxSettingPrintMachineSetting(postData)
        .then(res => {
          if (res.code == 200) {
            this.init()
            this.$message.success('操作成功！')
            this.$emit('refresh')
          }
        })
        .catch(() => {})
    },
    changeFormField(v, field) {
      const value = this.formTable[0][field]
      if (!value) {
        this.$set(this.formTable[0], field, 0)
      }
    },
    changeiImpression() {
      let { iImpression1, iImpression2 } = this.Ele_PrintMachineSetting_Detail_header
      iImpression1 = parseFloat(iImpression1) ? parseFloat(iImpression1) : iImpression1
      iImpression2 = parseFloat(iImpression2) ? parseFloat(iImpression2) : iImpression2
      if (iImpression1 && iImpression2 && iImpression1 >= iImpression2) {
        this.noticfy('印次内2不能小于印次内1！')
        return false
      }
      if (iImpression2 || iImpression2 === 0) {
        this.$set(this.Ele_PrintMachineSetting_Detail_header, 'iImpression3', iImpression2 + 1)
      }
    },

    /**
         * 校验单个表单数据
         * @param {CmpConfig} 组件配置对象
         */
    checkData(value) {
      if ([null, undefined, ''].includes(value)) return false
      // if (tag === 'org-select') return this.checkOrgData(value)
      if (Array.isArray(value)) return value.length > 0
      return true
    }
  }
}
</script>
<style>
.app-main,
.app-main .main {
    height: 100%;
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
::v-deep .el-table--scrollable-y .el-table__body-wrapper {
  @include scrollBar;
}
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  @include scrollBar;
}
.input-box {
    width: 55px;
    padding: 2px;
}
.content-box {
    ::v-deep.el-table--medium th,
    ::v-deep.el-table--medium td {
        padding: 0px 0 !important;
    }
    width: 100%;
    overflow-y: auto;
}
.table-box {
    padding: 0px 0 10px;
}

.block {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #fff;
    .demonstration {
        font-size: 14px;
    }
}
.grid-content {
    text-align: center;
    font-size: 14px;
}
.col-table {
    border: 1px solid #bacede;
    border-bottom: none;
    border-right: none;
    .grid-content,
    .grid-content1 {
        border-right: 1px solid #bacede;
        border-bottom: 1px solid #bacede;
        display: flex;
        height: fit-content;
        max-height: 70px;
        min-height: 50px;
        justify-content: center;
        align-items: center;
        padding: 2px 5px;
    }
    .max-hight {
        max-height: 120px;
        height: 120px;
    }
}

::v-deep {
    .el-input-group__append,
    .el-input-group__prepend {
        padding: 0 1px;
    }
    .col-table {
        .el-input {
            width: 100px;
            display: inline-block;
            margin: 0 5px;
        }
    }

    .el-input--small .el-input__inner {
        height: 25px;
        line-height: 25px;
        text-align: center;
    }
    .grid-content1 .el-input__inner {
        text-align: left;
    }

    .el-pagination {
        margin-top: 0;
        padding: 10px 0;
        background-color: #fff;
    }
    .cell {
        text-align: center;
    }
    .checkbox-box {
        .el-checkbox-group {
            display: flex;
            flex-direction: column;
        }
        .el-checkbox__input::before {
            content: '（';
            color: #3f3fff;
            display: inline-block;
            height: 16px;
            line-height: 16px;
            margin: 0 2px 0 10px;
        }
        .el-checkbox__label {
            color: #3f3fff;
        }
        .el-checkbox__label::after {
            content: '）';
            display: inline-block;
            color: #3f3fff;
            height: 16px;
            line-height: 16px;
            margin: 0 10px 0 2px;
        }
    }
    .bg-purple {
        background-color: #e3efff;
        padding: 10px;
        text-align: center;
    }

    // .el-table thead tr, .el-table thead tr th {
    //     background-color: #d1e5fe !important;
    //     font-weight: bold;
    // }
    // .el-table--enable-row-hover .el-table__body tr:hover > td {
    //     background-color: #fff1cc;
    // }
    // .el-table--striped .el-table__body tr.el-table__row--striped td {
    //     background: #ffffff;
    // }
    // .table-blue .el-table tr {
    //     background-color: #e3efff;
    // }
    // .el-table tr {
    //     background-color: #e3efff;
    // }
}
</style>
