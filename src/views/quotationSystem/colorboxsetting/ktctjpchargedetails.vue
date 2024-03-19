<template>
  <transition name="el-zoom-in-center">
    <el-tabs type="border-card" class="w-100 h-100">
      <el-tab-pane label="开天窗贴胶片设置" class="w-100 h-100">
        <div ref="view" class="YZ-preview-main">
          <div class="w-100 pd-0">
            <el-button type="primary" size="mini" @click="close()">返回后工页面</el-button>
            <el-button v-loading="loading" type="primary" size="mini" @click="sumbit">保存</el-button>
            <el-button type="primary" size="mini" @click="add">新增</el-button>
            <el-table
              ref="table"
              v-loading="loading"
              :data="tableData2"
              border
              class="w-100 YZ-common-table bd-table table-border-bottom"
              style="margin-top: 10px"
              size="mini"
              stripe
              highlight-current-row
            >
              <el-table-column align="center">
                <template slot="header">
                  <div class="d-flex ai-c jc-ce">胶片人工设置</div>
                </template>
                <el-table-column align="center" prop="sName" label="名称">
                  <template slot-scope="scope">贴胶片人工</template>
                </el-table-column>
                <el-table-column align="center" prop="dPrice" label="单价">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPrice" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="sUnitName" label="单位">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.sUnitName" class="w-100" size="mini" filterable clearable>
                      <el-option label="元/CM(周长)" value="元/CM(周长)" />
                      <el-option label="元㎡" value="元㎡" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dMinAmount" label="最低消费开机费（元）">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dMinAmount" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dMinPrice" label="每张(个)最低单价（元）">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dMinPrice" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
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
              <el-table-column align="center">
                <template slot="header">
                  <div class="d-flex ai-c jc-ce">胶片材料设置</div>
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

                <el-table-column align="center" label="操作" width="200" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="edit(scope.row)">编辑厚度及价格</el-button>
                    <el-button size="mini" type="text" @click="copy(scope.row, scope.$index)">复制</el-button>
                    <el-button size="mini" type="text" class="YZ-table-delBtn" @click="remove(scope.row, scope.$index, 'Ele_ColorBoxSetting_AfterProcess_PastingFilm')">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-dialog v-DialogDrag width="70%" title="选择数据" :visible.sync="editVisible" append-to-body :close-on-click-modal="false" @close="editVisible = false">
          <div class="content-box mini-form">
            <div class="table-box">
              <div class="text-right">
                <el-button type="primary" size="mini" class="mb-10" @click="addThicknessRow">新增行</el-button>
                <el-button type="primary" size="mini" class="mb-10" @click="submitThicknessPriceTable">保存</el-button>
                <el-button type="primary" size="mini" class="mb-10" @click="editVisible = false">关闭</el-button>
              </div>
              <el-table class="YZ-common-table bd-table table-border-bottom mb-5" highlight-current-row stripe border :height="500" size="mini" :data="table3" style="width: 100%">
                <el-table-column width="40" label="序号" align="center" type="index" />
                <el-table-column label="名称" prop="sName" align="center" width="140" />
                <el-table-column align="center" prop="dThickness" label="厚度">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dThickness" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dDensity" label="密度">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dDensity" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="dPrice" label="单价(元/公斤)">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dPrice" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="120" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="copyt(scope.row, scope.$index)">复制</el-button>
                    <el-button size="mini" type="text" class="YZ-table-delBtn" @click="removet(scope.row, scope.$index)">删除</el-button>
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
  name: 'Ktctjpchargedetails',
  mixins: [postWorkSetEditMixins],
  props: {
    uGuid1: String
  },
  data() {
    return {
      editVisible: false,
      tableData: [],
      tableData2: [
        {
          dPrice: 0,
          sUnitName: '元/CM(周长)',
          dMinAmount: 0,
          dMinPrice: 0
        }
      ],
      currentRow: {},

      table3: [],
      delteTableDataThick: {}
    }
  },
  mounted() {},

  methods: {
    getList() {
      this.tableData = []

      this.loading = true
      Api.GetColorBoxSettingAfterProcessPastingFilmListData()
        .then(res => {
          if (res.code == 200) {
            this.tableData =
                            res.data.map(item => {
                              item.isEdit = true
                              return item
                            }) || []
          }
          this.setInitRow()
          this.loading = false
        })
        .catch(() => {
          this.setInitRow()
          this.loading = false
        })
    },
    setInitRow() {
      if (this.tableData.length == 0) {
        const s = ['进口PET透明', 'PVC透明', 'APET', '高透明PET', '蓝宝石', 'PP透片蓝', 'PP透片黄', 'PP透片红', 'PP透明片', 'PP磨砂白', 'PP磨砂黄', 'PP磨砂红', 'PP磨砂绿', 'PP磨砂蓝']
        for (let i = 0; i < s.length; i++) {
          this.tableData.push({
            isEdit: false,
            uGuid1: this.uGuid1,
            uGuid2: this.guid(),
            sName: s[i],
            iOrder: i + 1
          })
        }
      } else {
        const d = this.tableData[0]
        this.$set(this.tableData2[0], 'dPrice', d.dPrice)
        this.$set(this.tableData2[0], 'sUnitName', d.sUnitName)
        this.$set(this.tableData2[0], 'dMinAmount', d.dMinAmount)
        this.$set(this.tableData2[0], 'dMinPrice', d.dMinPrice)
      }
    },
    getTableH() {
      this.$nextTick(() => {
        const viewH = this.$refs.view.offsetHeight

        this.tableHeight = parseFloat(viewH) - 40 - 95
      })
    },

    add() {
      this.tableData.unshift({
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
      let flag = true
      for (let i = 0; i < this.tableData.length; i++) {
        if (!this.tableData[i].sName) {
          this.$notify.error({
            title: '提示',
            message: '名称不能为空！',
            offset: 0
          })
          flag = false
          break
        }
      }
      if (!flag) return
      const tableData2 = this.tableData2[0]
      for (const field in tableData2) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.$set(this.tableData[i], field, tableData2[field])
        }
      }
      Api.SaveColorBoxSettingAfterProcessPastingFilm({
        PastingFilmDetailsList: this.tableData,
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
    edit(row) {
      if (row.uGuid2) {
        this.currentRow = row
        this.table3 = []
        Api.GetColorBoxSettingAfterProcessPastingFilmDetailListData(row.uGuid2).then(res => {
          if (res.code == 200) {
            this.table3 =
                            res.data.map(item => {
                              item.isEdit = true
                              return item
                            }) || []
            this.editVisible = true
          }
        })
      }
    },
    async copy(row, idx) {
      const nRow = JSON.parse(JSON.stringify(row))
      nRow.uGuid2 = this.guid()
      nRow.isEdit = false
      nRow.iOrder = this.tableData.length + 1
      this.tableData.splice(idx + 1, 0, nRow)

      if (nRow.uGuid2) {
        this.currentRow = nRow
        this.table3 = []
        const res = await Api.GetColorBoxSettingAfterProcessPastingFilmDetailListData(row.uGuid2)
        if (res.code == 200) {
          const data =
                        res.data.map(item => {
                          item.isEdit = false
                          item.uGuid2 = nRow.uGuid2
                          item.uGuid3 = this.guid()
                          return item
                        }) || []
          const sres = await Api.SaveColorBoxSettingAfterProcessPastingFilmDetail({
            PastingFilmThicknessAndPriceDetailsList: data,
            deleteData: JSON.stringify(this.delteTableDataThick)
          })
          if (sres.code == 200) {
            this.$notify.success({
              title: '提示',
              message: '厚度价格表复制成功！',
              offset: 0
            })
          }
        }
      }
    },
    // 厚度价格
    submitThicknessPriceTable() {
      Api.SaveColorBoxSettingAfterProcessPastingFilmDetail({
        PastingFilmThicknessAndPriceDetailsList: this.table3,
        deleteData: JSON.stringify(this.delteTableDataThick)
      })
        .then(res => {
          if (res.code == 200) {
            this.$notify.success({
              title: '提示',
              message: '操作成功！',
              offset: 0
            })
            this.table3 = this.table3.map(item => {
              item.isEdit = true
              return item
            })
          } else {
          }
        })
        .catch(() => {})
    },
    addThicknessRow() {
      this.table3.push({
        uGuid1: this.uGuid1,
        uGuid2: this.currentRow.uGuid2,
        uGuid3: this.guid(),
        iOrder: this.table3.length + 1,
        isEdit: false,
        sName: this.currentRow.sName,
        dThickness: 0,
        dDensity: 0,
        dPrice: 0
      })
    },
    removet(row, idx) {
      let delteTableDataThick = this.delteTableDataThick.Ele_ColorBoxSetting_AfterProcess_PastingFilm_Detail
      delteTableDataThick = delteTableDataThick || []
      const json = {}
      json.uGuid3 = row.uGuid3
      delteTableDataThick.push(json)
      this.$set(this.delteTableDataThick, 'Ele_ColorBoxSetting_AfterProcess_PastingFilm_Detail', delteTableDataThick)
      this.table3.splice(idx, 1)
    },
    copyt(row, idx) {
      const nRow = JSON.parse(JSON.stringify(row))
      nRow.uGuid3 = this.guid()
      nRow.isEdit = false
      nRow.iOrder = this.table3.length + 1

      this.table3.splice(idx + 1, 0, nRow)
    }
  }
}
</script>
<style lang="scss" scoped>
.YZ-preview-main {
    height: calc(100vh - 216px);
}
</style>
