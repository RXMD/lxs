<template>
  <div class="content-box mini-form">
    <div class="table-box">
      <div class="text-right">
        <el-button type="primary" size="mini" class="mb-10" @click="submit">保存</el-button>
        <el-button type="primary" size="mini" class="mb-10" @click="goBack">关闭</el-button>
      </div>
      <el-table ref="multipleTable" stripe border size="mini" :data="formTable" style="width: 100%">
        <el-table-column label="序号" prop="iOrder" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.iOrder" v-Int />
          </template>
        </el-table-column>
        <el-table-column prop="sMachineType" label="机台类型" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.sMachineType">
              <el-option label="全开" value="1" />
              <el-option label="对开" value="2" />
              <el-option label="四开" value="3" />
              <el-option label="六开" value="4" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="机台名称" prop="sMachineName" width="140">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sMachineName" />
          </template>
        </el-table-column>
        <el-table-column label="咬口" prop="dGripperEdge" width="140">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dGripperEdge" v-Empty-Zero v-Float @change="value => changeFormField(value, 'dGripperEdge')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMaxMachineLength" label="最大上机长">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMaxMachineLength" v-Empty-Zero v-Float @change="value => changeFormField(value, 'dMaxMachineLength')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMaxMachineWidthe" label="最大上机宽">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMaxMachineWidth" v-Empty-Zero v-Float @change="value => changeFormField(value, 'dMaxMachineWidth')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMinMachineLength" label="最小上机长">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMinMachineLength" v-Empty-Zero v-Float @change="value => changeFormField(value, 'dMinMachineLength')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMinMachineWidth" label="最小上机宽">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMinMachineWidth" v-Empty-Zero v-Float @change="value => changeFormField(value, 'dMinMachineWidth')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMinWeight" label="最小克重">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMinWeight" v-Empty-Zero v-Float @change="value => changeFormField(value, 'dMinWeight')" />
          </template>
        </el-table-column>
        <el-table-column prop="dMaxWeight" label="最大克重">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dMaxWeight" v-Empty-Zero v-Float @change="value => changeFormField(value, 'dMaxWeight')" />
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
        <el-table-column type="selection" label="选择">
          <template slot="header">选择</template>
        </el-table-column>
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
            <el-input v-model="scope.row.dStartupAmount" v-Empty-Zero v-Float size="mini" />
          </template>
        </el-table-column>
        <el-table-column prop="dPlateAmount" label="版费（元）">
          <template slot="header">
            <span style="color: #f56c6c">*</span>
            版费（元）
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.dPlateAmount" v-Empty-Zero v-Float size="mini" />
          </template>
        </el-table-column>
        <el-table-column prop="iImpression" label="包含印次">
          <template slot="header">
            <span style="color: #f56c6c">*</span>
            包含印次
          </template>
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.iImpression" v-Float size="mini" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <input v-model.number="Ele_PrintMachineSetting_Detail_header.iImpression1" v-Float class="input-box" type="number" @change="changeiImpression">
            印次内
          </template>

          <el-table-column prop="dImpressionPrice" label="（元/千印）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dImpressionPrice" v-Empty-Zero v-Float size="mini" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <input v-model.number="Ele_PrintMachineSetting_Detail_header.iImpression2" v-Empty-Zero v-Float class="input-box" type="number" @change="changeiImpression">
            印次内
          </template>

          <el-table-column prop="dImpressionPrice2" label="（元/千印）">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.dImpressionPrice2" v-Empty-Zero v-Float size="mini" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="Ele_PrintMachineSetting_Detail_header.iImpression3 ? Ele_PrintMachineSetting_Detail_header.iImpression3 + '印次以上' : '' + '印次以上'">
          <el-table-column prop="dImpressionPrice3" label="（元/千印）">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.dImpressionPrice3" v-Empty-Zero v-Float size="mini" type="number" />
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
                            <el-input size="mini" v-Float v-model="scope.row.dLargeField">
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
            <el-input v-model.number="scope.row.iAdjustmentPaperQty" v-Int size="mini" />
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
            <el-input v-model.number="scope.row.iMinLossQty" size="mini" />
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
            <el-checkbox-group v-model="project">
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
import editMixins from '../editMixins'
import Api from '@/api/quotationSystem/basicData'
export default {
  name: 'Printingmachinesetting',
  mixins: [editMixins],

  data() {
    return {
      Ele_PrintMachineSetting_Detail: [
        {
          sPrintingColor: '空白'
        },
        {
          sPrintingColor: '单黑'
        },
        {
          sPrintingColor: '四色(彩色)'
        },
        {
          sPrintingColor: '彩色+过油'
        },
        {
          sPrintingColor: '1专色'
        },
        {
          sPrintingColor: '2专色'
        },
        {
          sPrintingColor: '3专色'
        },
        {
          sPrintingColor: '4专色'
        },
        {
          sPrintingColor: '彩色+1专色'
        },
        {
          sPrintingColor: '彩色+2专色'
        },
        {
          sPrintingColor: '彩色+3专色'
        },
        {
          sPrintingColor: '彩色+4专色'
        }
      ],
      Ele_PrintMachineSetting_Detail_header: {
        sLargeFieldType: '1',
        sHighQualityType: '1',
        iImpression3: 0
      },
      formTable: [
        {
          sMachineType: '1',
          dGripperEdge: 0,
          dMaxMachineLength: 0,
          dMaxMachineWidth: 0,
          dMinMachineLength: 0,
          dMinMachineWidth: 0,
          dMinWeight: 0,
          dMaxWeight: 0,
          iOrder: 1
        }
      ],
      checkList: [],
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
      project: ['彩盒'],
      checkList1: [
        { text: '博汇双铜纸' },
        { text: '鲸王双铜' },
        { text: '长鹤双铜纸' },
        { text: '礼品盒双铜纸' },
        { text: '250g' },
        { text: '特种', disabled: true },
        { text: '建晖灰底白板' },
        { text: '数码印刷机用纸', disabled: true },
        { text: '地龙A级白板' },
        { text: '博汇单铜白卡' },
        { text: '宁波单铜白卡' },
        { text: '高松白卡RET02光金', disabled: true },
        { text: '高松白卡RET01光金', disabled: true },
        { text: '黄底白卡RET02光银色', disabled: true },
        { text: '宁波单铜白卡', disabled: true },
        { text: '双铜纸RET01光银', disabled: true },
        { text: '高松白卡铝箔02哑银', disabled: true },
        { text: '高松白卡铝箔03哑金', disabled: true },
        { text: '高松白卡素面镭射02银', disabled: true },
        { text: '双铜素面镭射02银', disabled: true },
        { text: '柏拉底' },
        { text: '柏拉底01' },
        { text: '博汇金蝶蓝' },
        { text: '灰卡纸' },
        { text: '特种纸' },
        { text: '白板纸（灰底白）' },
        { text: '白卡纸（单铜卡）' },
        { text: '双铜纸' },
        { text: '哑粉纸' },
        { text: '双胶纸' },
        { text: '单面牛卡' },
        { text: '双面牛卡' },
        { text: '双面白牛卡' },
        { text: '单面白牛卡' },
        { text: '信封牛皮纸' },
        { text: '双面白板' },
        { text: '超感纸' },
        { text: '道林纸' },
        { text: '牛油纸', disabled: true },
        { text: '白底金银卡系列', disabled: true },
        { text: '灰底金银', disabled: true }
      ],

      currentItem: {}
    }
  },
  watch: {},
  mounted() {},
  methods: {
    init() {
      this.formTable = [
        {
          sMachineType: '1',
          dGripperEdge: 0,
          dMaxMachineLength: 0,
          dMaxMachineWidth: 0,
          dMinMachineLength: 0,
          dMinMachineWidth: 0,
          dMinWeight: 0,
          dMaxWeight: 0,
          iOrder: 1,
          uGuid1: this.guid()
        }
      ]
      this.project = ['彩盒']
      // 初始化字段
      const fields = [
        'dPlateAmount',
        'dStartupAmount',
        'iImpression',
        'dImpressionPrice',
        'dImpressionPrice2',
        'dImpressionPrice3',
        'iAdjustmentPaperQty',
        'iThousandStretchQty',
        'iAfterPrintingLossQty',
        'iMinLossQty'
      ]
      for (let i = 0; i < this.Ele_PrintMachineSetting_Detail.length; i++) {
        const item = this.Ele_PrintMachineSetting_Detail[i]
        this.$set(item, 'isEdit', false)
        this.$set(item, 'iOrder', i + 1)
        for (let i = 0; i < fields.length; i++) {
          this.$set(item, fields[i], 0)
        }
      }
      if (this.id) {
        this.getDetail(this.id)
      }
    },
    //
    getDetail(id) {
      Api.GetPrintMachineSettingDetail(id)
        .then(res => {
          if (res.code == 200) {
            const { main, detailsList } = res.data
            this.Ele_PrintMachineSetting_Detail = this.fmrDataEditStatus(detailsList || [])
            const detailsListF = detailsList[0]
            const detailHeaderFiedls = ['iImpression3', 'iImpression2', 'iImpression1']
            for (const field in detailsListF) {
              if (detailHeaderFiedls.includes(field)) {
                if (field === 'iImpression3') {
                  this.$set(this.Ele_PrintMachineSetting_Detail_header, field, detailsListF[field] || 0)
                } else {
                  this.$set(this.Ele_PrintMachineSetting_Detail_header, field, detailsListF[field] || 0)
                }
              }
            }
            main.isEdit = true
            this.formTable = [main]
            if (main.sItemName && main.sItemName.indexOf(',') > -1) {
              this.project = main.sItemName.split(',')
            } else {
              this.project = [main.sItemName]
            }
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {})
    },

    goBack() {
      this.$router.push('/parameter/printingmachinesetting')
    },
    // 保存
    submit() {
      const form = this.formTable[0]
      const detailTableHeader = this.Ele_PrintMachineSetting_Detail_header
      if (!form.sMachineName) {
        this.noticfy('请填写机台名称！')
        return false
      }
      let { iImpression1, iImpression2 } = detailTableHeader
      iImpression1 = parseFloat(iImpression1)
      iImpression2 = parseFloat(iImpression2)
      if (!form.sMachineName) {
        this.noticfy('请填写机台名称！')
        return false
      }
      if (iImpression1 && iImpression2 && iImpression1 >= iImpression2) {
        this.noticfy('印次内2不能印次内1！')
        return false
      }
      let isEmpty = false
      for (let i = 0; i < this.Ele_PrintMachineSetting_Detail.length; i++) {
        const { dStartupAmount, dPlateAmount, iImpression } = this.Ele_PrintMachineSetting_Detail[i]
        if (!this.checkData(dStartupAmount) || !this.checkData(dPlateAmount) || !this.checkData(iImpression)) {
          isEmpty = true

          break
        }
      }
      if (isEmpty) {
        this.noticfy('开机费，版费，包含印次不能为空，请重新填写！')
        return false
      }
      form.sItemName = this.project.join(',')
      form.isEdit = !!this.id
      switch (form.sMachineType) {
        case '1':
          form.sMachineTypeName = '全开'
          break
        case '2':
          form.sMachineTypeName = '对开'
          break
        case '3':
          form.sMachineTypeName = '四开'
          break
        case '4':
          form.sMachineTypeName = '六开'
          break
      }
      if (form.tCrtDate) {
        form.tCrtDate = new Date(form.tCrtDate).toISOString
      }
      if (form.tModDate) {
        form.tModDate = new Date(form.tModDate).toISOString
      }
      const postData = {
        main: form,
        detailsList: this.Ele_PrintMachineSetting_Detail
      }
      for (const field in this.Ele_PrintMachineSetting_Detail_header) {
        for (let i = 0; i < this.Ele_PrintMachineSetting_Detail.length; i++) {
          this.$set(this.Ele_PrintMachineSetting_Detail[i], field, this.Ele_PrintMachineSetting_Detail_header[field])
          if (!this.id) {
            this.Ele_PrintMachineSetting_Detail[i].isEdit = false
          } else {
            if (!this.Ele_PrintMachineSetting_Detail[i].hasOwnProperty('isEdit')) {
              this.Ele_PrintMachineSetting_Detail[i].isEdit = false
            }
          }
          // if (!this.Ele_PrintMachineSetting_Detail[i].uGuid1) {
          //     this.Ele_PrintMachineSetting_Detail[i] = form.uGuid1
          // }
          // if (!this.Ele_PrintMachineSetting_Detail[i].uGuid2) {
          //     this.Ele_PrintMachineSetting_Detail[i] = this.guid
          // }
        }
      }
      Api.SavePrintMachineSetting(postData)
        .then(res => {
          if (res.code == 200) {
            this.$message.success('操作成功！')
            this.id = form.uGuid1
            this.init()
            if (this.id) {
              this.changePageUrlDetail(form.uGuid1)
            }
          } else {

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
      console.log(iImpression1, iImpression2)
      iImpression1 = parseFloat(iImpression1) ? parseFloat(iImpression1) : iImpression1
      iImpression2 = parseFloat(iImpression2) ? parseFloat(iImpression2) : iImpression2
      console.log(iImpression1, iImpression2)
      if (iImpression1 && iImpression2 && iImpression1 >= iImpression2) {
        this.noticfy('印次内2不能小于印次内1！')
        return false
      }
      if (iImpression2 || iImpression2 === 0) {
        this.$set(this.Ele_PrintMachineSetting_Detail_header, 'iImpression3', iImpression2 + 1)
      }
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
.input-box {
    width: 55px;
    padding: 2px;
}
.content-box {
    padding: 10px;
    background-color: #ffffff;
    height: calc(100vh - 136px);
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
::v-deep .el-table--small th,
::v-deep.el-table--small td {
        padding: 0px 0 !important;
    }
</style>
