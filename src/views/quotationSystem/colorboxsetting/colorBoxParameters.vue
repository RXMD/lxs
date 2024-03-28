<!--  -->
<template>
  <div ref="view" class="color-parameters-box">
    <div class="d-flex ai-c jc-sb">
      <p class="title">参数设置</p>
      <div class="botton-box">
        <el-button size="mini" type="primary" @click="submit">保存</el-button>
      </div>
    </div>
    <div class="set-box" :style="{ 'height': tableHeight + 'px' }">
      <el-row class="border border-right">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10 center">设计：</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-dark menu-box">
            <div class="menu1">
              <div>
                <ul>
                  <li>
                    单位：

                    <el-radio-group v-model="form.sDesignUnitType">
                      <el-radio label="1">元/P</el-radio>
                      <el-radio label="2">元/款</el-radio>
                    </el-radio-group>
                  </li>
                  <li>
                    模板设计（简单）：
                    <el-input v-model="form.dTemplateDesign" v-Empty-Zero v-Float type="number" size="mini" />
                  </li>
                  <li>
                    来样设计（一般）：
                    <el-input v-model="form.dSampleDesign" v-Empty-Zero v-Float type="number" size="mini" />
                  </li>
                  <li>
                    创意设计（复杂）：
                    <el-input v-model="form.dCreativeDesign" v-Empty-Zero v-Float type="number" size="mini" />
                  </li>
                </ul>
              </div>
            </div>
            <div class="menu2">
              <el-checkbox v-model="form.bDesign">不设计</el-checkbox>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="border">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10">默认报价纸张：</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c" style="flex-direction: initial; justify-content: flex-start">
            <el-select v-model="form.sPaperType" size="mini" @change="v => changePaper(v, 'type')">
              <el-option v-for="(item, idx) in parperTypes" :key="idx" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="form.sPaperName" size="mini" @change="v => changePaper(v, 'name')">
              <el-option v-for="(item, idx) in parperNames" :key="idx" :label="item.sPaperName" :value="item.sPaperName" />
            </el-select>
            <el-select v-model="form.dWeight" size="mini">
              <el-option v-for="(item, idx) in parperWeights" :key="idx" :label="item.dWeight" :value="item.dWeight" />
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="border">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10">坑纸比面纸小：</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c text-color">
            <el-input v-model="form.dPitLowSurface" v-Empty-Zero v-Float size="mini" type="number" />
            (MM)
          </div>
        </el-col>
      </el-row>
      <el-row class="border">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10">裱卡比面纸小:</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c text-color">
            <el-input v-model="form.dPastingLowSurface" v-Empty-Zero v-Float size="mini" type="number" />
            (MM)
          </div>
        </el-col>
      </el-row>
      <el-row class="border">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10">卡盒粘口位宽:</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c text-color">
            <el-input v-model="form.dCardBoxStickyWidth" v-Empty-Zero v-Float size="mini" type="number" />
            (MM)
          </div>
        </el-col>
      </el-row>
      <el-row class="border">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10">坑盒粘口位宽:</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c text-color">
            <el-input v-model="form.dPitBoxStickyWidth" v-Empty-Zero v-Float size="mini" type="number" />
            (MM)
          </div>
        </el-col>
      </el-row>
      <el-row class="border">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10">钉盒粘口位宽:</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c text-color">
            <el-input v-model="form.dNailBoxStickyWidth" v-Empty-Zero v-Float size="mini" type="number" />
            (MM)
          </div>
        </el-col>
      </el-row>
      <el-row class="border" style="display: flex;">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10 center" style="height:100%">用于扣底盒:</div>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="12" class="children-wrap">
              <div class="">插盖利:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dGaryPlug" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap">
              <div class="">翼盖仔:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dWingCap" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap">
              <div class="">保险扣高:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dInsuranceHigh" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap">
              <div class="">挂钩总高:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dHookHigh" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap border-bottom-0">
              <div class="">固定盖高:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dFixedHigh" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap border-bottom-0">
              <div class="">粘口位宽:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dStickyWidth" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap border-bottom-0">
              <div class="">扣底插入:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dBottomInsert" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="border" style="display: flex;">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10 center" style="height:100%">用于飞机盒:</div>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="12" class="children-wrap">
              <div class="">钩扣宽:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dGaryPlug" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap">
              <div class="">反折高:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dWingCap" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap">
              <div class="">插翼高:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dInsuranceHigh" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap">
              <div class="">扣位:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dHookHigh" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap border-bottom-0">
              <div class="">折位:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dFixedHigh" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="border" style="display: flex;">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10 center" style="height:100%">用于平粘盒:</div>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="12" class="children-wrap">
              <div class="">外盖宽:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dOuterCoverWidth" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap">
              <div class="">内盖宽:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dInnerCoverWidth" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap border-bottom-0">
              <div class="">粘口位:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dPasteBoxStickyWidth" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="border " style="display: flex;">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10 center" style="height:100%">用于双插盒:</div>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="12" class="children-wrap" style="border-bottom: 0;">
              <div class="">上保险扣高:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dUpInsuranceHigh" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap  border-bottom-0">
              <div class="">下保险扣高:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dDownInsuranceHigh" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="border " style="display: flex;">
        <el-col :span="4">
          <div class="grid-content1 bg-purple-dark padding10 center" style="height:100%">用于手提盒:</div>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="12" class="children-wrap  border-bottom-0">
              <div class="">提手高度:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dHandleHigh" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap  border-bottom-0">
              <div class="">翼宽:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dCoverWidth" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap  border-bottom-0">
              <div class="">前插盖利:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dFrontGaryPlug" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
            <el-col :span="12" class="children-wrap  border-bottom-0">
              <div class="">后插盖利:</div>
              <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                <el-input v-model="form.dAfterGaryPlug" v-Empty-Zero v-Float size="mini" type="number" />
                (MM)
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- <el-row class="border">
                <el-col :span="4">
                    <div class="grid-content1 bg-purple-dark padding10">插盖利:</div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                        <el-input v-Empty-Zero size="mini" v-Float type="number" v-model="form.dGaryPlug"></el-input>
                        (MM)
                    </div>
                </el-col>
            </el-row>
            <el-row class="border">
                <el-col :span="4">
                    <div class="grid-content1 bg-purple-dark padding10">翼盖仔:</div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                        <el-input v-Empty-Zero size="mini" v-Float type="number" v-model="form.dWingCap"></el-input>
                        (MM)
                    </div>
                </el-col>
            </el-row>
            <el-row class="border">
                <el-col :span="4">
                    <div class="grid-content1 bg-purple-dark padding10">保险扣高:</div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                        <el-input v-Empty-Zero size="mini" v-Float type="number" v-model="form.dInsuranceHigh"></el-input>
                        (MM)
                    </div>
                </el-col>
            </el-row>
            <el-row class="border">
                <el-col :span="4">
                    <div class="grid-content1 bg-purple-dark padding10">挂钩总高:</div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                        <el-input v-Empty-Zero size="mini" v-Float type="number" v-model="form.dHookHigh"></el-input>
                        (MM)
                    </div>
                </el-col>
            </el-row>
            <el-row class="border">
                <el-col :span="4">
                    <div class="grid-content1 bg-purple-dark padding10">固定盖高:</div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                        <el-input v-Empty-Zero size="mini" v-Float type="number" v-model="form.dFixedHigh"></el-input>
                        (MM)
                    </div>
                </el-col>
            </el-row>
            <el-row class="border">
                <el-col :span="4">
                    <div class="grid-content1 bg-purple-dark padding10">扣底插入:</div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark padding10 d-flex fz-12 ai-c">
                        <el-input v-Empty-Zero size="mini" v-Float type="number" v-model="form.dBottomInsert"></el-input>
                        (MM)
                    </div>
                </el-col>
            </el-row> -->
    </div>
  </div>
</template>

<script>
import Api from '@/api/quotationSystem/basicData'
import { guid } from '@/utils/tool'
export default {
  name: 'ColorBoxParameters',
  components: {},
  props: ['tab'],
  data() {
    return {
      form: {
        iOrder: 1,
        sDesignUnitType: '1',
        isEdit: false,
        dPitLowSurface: 5,
        dPastingLowSurface: 2,
        dCardBoxStickyWidth: 15,
        dPitBoxStickyWidth: 25,
        dNailBoxStickyWidth: 35,
        dGaryPlug: 15,
        dInsuranceHigh: 15,
        dHookHigh: 70,
        dFixedHigh: 80,
        dBottomInsert: 20,
        dTemplateDesign: 0,
        dSampleDesign: 0,
        dWeight: 0,
        dCreativeDesign: 0
      },
      tableHeight: 400,
      parperTypes: [
        { label: '常用纸类', value: '1' },
        { label: '铜版纸类', value: '2' },
        { label: '双胶纸类', value: '3' },
        { label: '特种纸类', value: '4' },
        { label: '白卡纸类', value: '5' },
        { label: '白板纸类', value: '6' },
        { label: '牛卡纸类', value: '7' },
        { label: '其他纸类', value: '8' },
        { label: '瓦楞纸类', value: '9' }
      ],

      parperTypeData: {}
    }
  },
  computed: {
    parperNames() {
      const paperNameList = this.parperTypeData.paperNameList || []
      return paperNameList.filter(item => {
        return item.sPaperType == this.form.sPaperType
      })
    },
    parperWeights() {
      const paperWeightList = this.parperTypeData.paperWeightList || []
      return paperWeightList.filter(item => {
        return item.sPaperName == this.form.sPaperName
      })
    }
  },
  watch: {
    tab(v) {
      if (v == 'parameterSetting') {
        this.getForm()
        this.getTableH()
      }
    }
  },
  mounted() {
    this.getForm()
    this.getTableH()
  },
  methods: {
    changePaper(v, type) {
      console.log(type)
      if (type == 'type') {
        this.$set(this.form, 'sPaperName', '')
        this.$set(this.form, 'dWeight', '')
      } else {
        this.$set(this.form, 'dWeight', '')
      }
    },
    getTableH() {
      this.$nextTick(() => {
        const viewH = this.$refs.view.offsetHeight
        this.tableHeight = parseFloat(viewH) - 40
      })
    },
    getForm() {
      this.form = {}
      this.parperTypeData = {}
      Api.GetPaperPriceSettingPaperNameAndPaperWeightByItemName('彩盒')
        .then(res => {
          if (res.code == 200) {
            this.parperTypeData = res.data
            this.$set(this.form, 'sPaperType', '1')
          }
        })
        .catch(() => { })
      Api.GetColorBoxSettingParameter()
        .then(res => {
          if (res.code == 200) {
            this.form = res.data && res.data.length ? res.data[0] : {}
          }
        })
        .catch(() => { })
    },

    submit() {
      if (!this.form.uGuid1) {
        this.$set(this.form, 'uGuid1', guid())
      } else {
        this.$set(this.form, 'isEdit', true)
      }
      if (this.form.tCrtDate) {
        this.form.tCrtDate = new Date(this.form.tCrtDate).toISOString
      }
      if (this.form.tModDate) {
        this.form.tModDate = new Date(this.form.tModDate).toISOString
      }
      Api.SaveColorBoxSettingParameter({
        main: this.form
      })
        .then(res => {
          if (res.code == 200) {
            this.$message.success('操作成功！')
          }
        })
        .catch(() => { })
    }
  }
}
</script>
<style lang="scss" scoped>
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

ul>li {
    list-style-type: none;
}

.border {
    border-top: 1px solid #ececec;
    border-left: 1px solid #ececec;
    border-right: 1px solid #ececec;

    &:last-child {
        border-bottom: 1px solid #ececec;
    }
}

.border-right {
    border-right: 1px solid #ececec;
}

.bg-purple-dark {
    height: 50px;
    // border-bottom: 1px solid #ececec;
}

.border-right {
    .bg-purple-dark {
        height: 200px;
    }
}

.grid-content1 {
    text-align: right;
    font-size: 14px;
    border-right: 1px solid #ececec;

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

.el-input {
    width: auto !important;
}

::v-deep .grid-content .el-input {
    width: 100%;
}

.color-parameters-box {
    height: calc(100vh - 185px);
}

.set-box {

    overflow-y: auto;
}

.children-wrap {
    display: flex;
    align-items: center;
    color: #606266;
    font-size: 14px;
    padding-left: 10px;
    border-bottom: 1px solid #ececec;

    &:nth-child(n-1) {
        border-right: 1px solid #ececec;
    }
}

.border-bottom-0 {
    &:nth-last-child(-n+1) {
        border-bottom: 0;
    }
}

.text-color {
    color: #606266;
}
</style>
