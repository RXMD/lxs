<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="粘盒参数设置（方式一）" class="w-100 h-100">
        <div ref="view" class="YZ-preview-main">
          <div class="w-100 pd-0">
            <el-button type="primary" size="mini" @click="close()">返回后工页面</el-button>
            <el-button v-loading="loading" type="primary" size="mini" @click="sumbit">保存</el-button>

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
              <!-- <el-table-column align="center" prop="iOrder" label="排序" width="60">
                                <template slot-scope="scope">
                                    <el-input class="w-100" size="mini" v-Int v-model="scope.row.iOrder"></el-input>
                                </template>
                            </el-table-column> -->
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
              <el-table-column align="center" prop="sName" label="名称" />

              <el-table-column align="center" prop="dPrice" label="单价">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dPrice" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>

              <el-table-column align="center" prop="sUnitName" label="单位" />

              <el-table-column align="center" prop="dMinAmount" label="最低消费开机费（元）">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dMinAmount" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMinPrice" label="每张(个)最低单价（元）">
                <template slot-scope="scope">
                  <el-input v-if="scope.row.sName != '自动扣底(加)'" v-model="scope.row.dMinPrice" v-Empty-Zero v-Float class="w-100" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="dMultiplesPrice">
                <template slot-scope="scope">
                  <div v-if="scope.row.sName != '自动扣底(加)'" class="d-flex ai-c">
                    <span>(长+宽)/2>高时</span>
                    <el-input v-model="scope.row.dMultiplesPrice" v-Empty-Zero v-Float style="flex:1;" oninput="value=value.replace(/[^0-9.]/g,'')" size="mini" />
                    <span>倍单价</span>
                  </div>
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
  name: 'Nhchargedetails',
  mixins: [postWorkSetEditMixins],
  data() {
    return {
      tableData: [
        {
          iOrder: 1,
          sName: '自动扣底(加)',
          dPrice: 0.01,
          sUnitName: '元/个',
          dMinAmount: 50,
          dMinPrice: '',
          dMultiplesPrice: ''
        },
        {
          iOrder: 2,
          sName: '粘卡盒',
          dPrice: 0.0015,
          sUnitName: '元/cm(高)',
          dMinAmount: 60,
          dMinPrice: 0.01,
          dMultiplesPrice: 2
        },
        {
          iOrder: 3,
          sName: '粘裱坑盒',
          dPrice: 0.003,
          sUnitName: '元/cm(高)',
          dMinAmount: 80,
          dMinPrice: 0.03,
          dMultiplesPrice: 2
        },
        {
          iOrder: 4,
          sName: '粘PVC盒',
          dPrice: 0.003,
          sUnitName: '元/cm(高)',
          dMinAmount: 60,
          dMinPrice: 0.03,
          dMultiplesPrice: 2
        },
        {
          iOrder: 5,
          sName: '双粘口粘盒',
          dPrice: 0.003,
          sUnitName: '元/cm(高)',
          dMinAmount: 60,
          dMinPrice: 0.06,
          dMultiplesPrice: 2
        }
      ]
    }
  },
  mounted() {},

  methods: {
    getList() {
      this.loading = true
      Api.GetColorBoxSettingAfterProcessPasteBoxUniformPriceListData(this.uGuid1)
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
    setTableData() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.$set(this.tableData[i], 'uGuid1', this.uGuid1)
        this.$set(this.tableData[i], 'uGuid2', this.guid())
        this.$set(this.tableData[i], 'isEdit', false)
      }
    },

    sumbit() {
      Api.SaveColorBoxSettingAfterProcessPasteBoxUniformPrice({
        PasteBoxUniformPriceDetailsList: this.tableData,
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

.e-input {
    height: 24px;
    line-height: 24px;
    border-radius: 0;
    border: 1px solid #dcdfe6;
}
</style>
