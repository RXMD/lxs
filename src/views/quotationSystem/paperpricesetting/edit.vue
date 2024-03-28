<template>
  <transition name="el-zoom-in-center">
    <div class="content-box mini-form">
      <div class="content-header-box">
        <p class="title">增加自定义纸张</p>
        <div class="text-right">
          <!-- <el-button type="primary" size="mini" @click="copy">复制</el-button> -->
          <el-button type="primary" size="mini" @click="submit">保存</el-button>
          <el-button size="mini" @click="toLink()">退出</el-button>
        </div>
      </div>

      <div class="content-body-box">
        <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="排序:">
            <el-input v-model="form.iOrder" size="mini" />
          </el-form-item>
          <el-form-item label="纸名称:" prop="sPaperName">
            <el-input v-model="form.sPaperName" size="mini" placeholder="请填写纸名称" />
          </el-form-item>

          <el-form-item label="纸类型:" prop="sPaperType">
            <el-select v-model="form.sPaperType" size="mini" filterable placeholder="(UV印刷类、pvc不用选择)">
              <el-option v-for="(item, idx) in parperTypes" :key="idx" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="纸特性:">
            <el-checkbox v-model="form.bSelfinversion" label="是否允许自翻版、天地翻印刷" />
            <el-checkbox v-model="form.bUVprinting" label="是否UV印刷类纸张" />
            <el-checkbox v-model="form.bGoldsilvercard" label="是否金银卡" />
            <el-checkbox v-model="form.bBackUVprinting" label="背面UV印刷" />
            <el-checkbox v-model="form.bPVCfilm" label="是否胶片材料（使用UV机印刷）" />
          </el-form-item>
        </el-form>
      </div>

      <div style="position: relative">
        <el-button type="primary" size="mini" class="mb-10" style="position: absolute; right: 0; z-index: 100" @click="addRow">添加</el-button>
        <el-tabs class="mt-10" type="border-card">
          <el-tab-pane label="纸张参数设置">
            <el-table
              ref="Ele_PaperPriceSetting_Detail"
              :height="200"
              border
              :data="Ele_PaperPriceSetting_Detail"
              tooltip-effect="dark"
              class="w-100 YZ-common-table bd-table table-border-bottom"
              highlight-current-row
              stripe
              style="width: 100%"
              @row-click="row => rowClick(row)"
              @selection-change="chooseDetailTableRows"
            >
              <el-table-column align="center" type="selection" width="50" />
              <template v-for="(head, idx) in tableOpts.Ele_PaperPriceSetting_Detail">
                <table-columns v-if="!head.isHide" :key="idx" :idx="idx" :col="head" size="mini" @changeInput="changeInput" />
              </template>

              <!-- <el-table-column prop="numflag" label="按张算" width="70" align="center">
                              <template slot-scope="scope">
                                  <el-checkbox v-model="scope.row.numflag"></el-checkbox>
                              </template>
                          </el-table-column> -->
              <el-table-column prop="address" label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="copyRow(scope.row)">复制</el-button>
                  <el-button type="text" size="mini" @click="removeRow('Ele_PaperPriceSetting_Detail', scope.row, scope.$index, 'uGuid2')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="fz-12 d-flex ai-c mt-5">
        纸张适用项目
        <el-checkbox-group v-model="sItemNameArray" class="ml-10">
          <el-checkbox label="专版单页" disabled />
          <el-checkbox label="专版画册" disabled />
          <el-checkbox label="手提袋" disabled />
          <el-checkbox label="封套" disabled />
          <el-checkbox label="彩盒" disabled />
          <el-checkbox label="彩卡吊牌" disabled />
          <el-checkbox label="表格票券" disabled />
          <el-checkbox label="信封" disabled />
          <el-checkbox label="礼品盒" disabled />
        </el-checkbox-group>
      </div>
      <div style="position: relative">
        <el-button type="primary" size="mini" style="position: absolute; right: 0; z-index: 100" @click="addChildRow">添加</el-button>
        <el-tabs v-model="childTableTabName" class="mt-10" type="border-card" @tab-click="changeTab">
          <el-tab-pane label="卷筒纸规格" name="rollSet">
            <el-table ref="Ele_PaperPriceSetting_Detail_RollSet" :height="290" border stripe :data="Ele_PaperPriceSetting_Detail_RollSet" tooltip-effect="dark" style="width: 100%">
              <el-table-column align="center" type="selection" width="40" />

              <template v-for="(head, idx) in tableOpts.Ele_PaperPriceSetting_Detail_RollSet">
                <table-columns v-if="!head.isHide" :key="idx" :idx="idx" :col="head" size="mini" />
              </template>
              <el-table-column prop="address" align="center" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="removeRow('Ele_PaperPriceSetting_Detail_RollSet', scope.row, scope.$index, 'uGuid3')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="特规纸规格" name="specialSet">
            <el-table
              ref="Ele_PaperPriceSetting_Detail_SpecialSet"
              :height="290"
              border
              stripe
              class="w-100 YZ-common-table bd-table table-border-bottom"
              size="mini"
              :data="Ele_PaperPriceSetting_Detail_SpecialSet"
            >
              <template v-for="(head, idx) in tableOpts.Ele_PaperPriceSetting_Detail_SpecialSet">
                <table-columns v-if="!head.isHide" :key="idx" :idx="idx" :col="head" size="mini" />
              </template>
              <el-table-column prop="address" align="center" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="removeRow('Ele_PaperPriceSetting_Detail_SpecialSet', scope.row, scope.$index, 'uGuid3')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </transition>
</template>

<script>
import TableColumns from '@/components/tableColumns'
import Api from '@/api/quotationSystem/basicData'
import { paperpricesettingOpts } from '../config'
import editMixins from '../editMixins'
// import { deepClone } from '../../../components/Generator/utils';
export default {
  name: 'PaperPriceSetting',
  components: {
    TableColumns
  },
  mixins: [editMixins],
  data() {
    return {
      rules: {
        sPaperName: [
          {
            required: true,
            message: '纸名称不能为空',
            trigger: 'blur'
          }
        ],
        sPaperType: [
          {
            message: '纸类型不能为空',
            required: true,
            trigger: 'change'
          }
        ]
      },
      Ele_PaperPriceSetting_Detail: [],
      Ele_PaperPriceSetting_Detail_SpecialSet: [],
      Ele_PaperPriceSetting_Detail_SpecialSet_all: [],
      Ele_PaperPriceSetting_Detail_RollSet: [],
      Ele_PaperPriceSetting_Detail_RollSet_all: [],
      selectedDetailTableRows: [],
      detailRow: {},
      childTableTabName: 'rollSet',
      delteTableData: {},
      form: {},
      tableOpts: paperpricesettingOpts,
      tableRequired: {
        Ele_PaperPriceSetting_Detail: ['sPriceType', 'dPrice', 'dWeight', 'dThickness'],
        Ele_PaperPriceSetting_Detail_SpecialSet: ['dSpeciallength', 'dSpecialwidth', 'dPrice'],
        Ele_PaperPriceSetting_Detail_RollSet: ['dRollwidth']
      },
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

      sItemNameArray: [],
      isCreated: false
    }
  },
  methods: {
    init() {
      this.clearForm()
      if (this.id) {
        this.getDetail(this.id)
      } else {
        this.doLayout()
      }
    },
    clearForm() {
      this.form = {
        uGuid1: this.guid(),
        iOrder: 1
      };
      (this.sItemNameArray = ['彩盒']), (this.Ele_PaperPriceSetting_Detail = [])
      this.Ele_PaperPriceSetting_Detail_SpecialSet = []
      this.Ele_PaperPriceSetting_Detail_SpecialSet_all = []
      this.Ele_PaperPriceSetting_Detail_RollSet = []
      this.Ele_PaperPriceSetting_Detail_RollSet_all = []
      this.deleteData = {}
      this.childTableTabName = 'rollSet'
    },
    //
    getDetail(id) {
      Api.GetPaperPriceSettingDetail(id)
        .then(res => {
          if (res.code == 200) {
            this.initDetail(res.data)
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {})
    },
    initDetail(data, isCopy) {
      const { main, detailsList, paperPriceSetting_Detail_RollSetList, paperPriceSetting_Detail_SpecialSetList } = data
      main.isEdit = !isCopy
      this.form = main
      this.Ele_PaperPriceSetting_Detail = isCopy ? detailsList : this.fmrDataEditStatus(detailsList || [])
      this.Ele_PaperPriceSetting_Detail_SpecialSet_all = isCopy ? paperPriceSetting_Detail_SpecialSetList : this.fmrDataEditStatus(paperPriceSetting_Detail_SpecialSetList || [])
      this.Ele_PaperPriceSetting_Detail_RollSet_all = isCopy ? paperPriceSetting_Detail_RollSetList : this.fmrDataEditStatus(paperPriceSetting_Detail_RollSetList || [])

      this.sItemNameArray = this.form.sItemName.split(',')
      this.doLayout()
      if (detailsList && detailsList.length > 0) {
        this.rowClick(this.Ele_PaperPriceSetting_Detail[0])
      }
    },
    toLink() {
      this.$router.push('./paperpricesetting')
    },
    // 从表新增行
    addRow() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.Ele_PaperPriceSetting_Detail.push({
            isEdit: false,
            uGuid2: this.guid(),
            sPriceType: '2',
            dPrice: 0,
            dWeight: 0,
            dThickness: 0,
            uGuid1: this.form.uGuid1,
            sPaperName: this.form.sPaperName,
            iOrder: this.Ele_PaperPriceSetting_Detail.length + 1
          })
          this.rowClick(this.Ele_PaperPriceSetting_Detail[this.Ele_PaperPriceSetting_Detail.length - 1])
          this.$nextTick(() => {
            this.$refs.Ele_PaperPriceSetting_Detail.doLayout()
          })
        }
      })
    },
    // 保存
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 校验字段必填
          const matchTable = [
            {
              tableData: this.Ele_PaperPriceSetting_Detail,
              requireFields: this.tableRequired.Ele_PaperPriceSetting_Detail,
              errorTip: '纸张参数设置表'
            },
            {
              tableData: this.Ele_PaperPriceSetting_Detail_SpecialSet_all,
              requireFields: this.tableRequired.Ele_PaperPriceSetting_Detail_SpecialSet,
              tableName: '特定纸规格',
              pguidName: 'uGuid2',
              guidName: 'uGuid3',
              parentTables: {
                tableData: this.Ele_PaperPriceSetting_Detail,
                tableName: '从表',
                guidName: 'uGuid2'
              }
            },

            {
              tableData: this.Ele_PaperPriceSetting_Detail_RollSet_all,
              requireFields: this.tableRequired.Ele_PaperPriceSetting_Detail_RollSet,
              tableName: '卷筒纸规格',
              pguidName: 'uGuid2',
              guidName: 'uGuid3',
              parentTables: {
                tableData: this.Ele_PaperPriceSetting_Detail,
                tableName: '从表',
                guidName: 'uGuid2'
              }
            }
          ]
          const isTableValid = this.checkTableValues(matchTable)
          if (!isTableValid) return false
          // 判断重表克重不能重复
          const isCommonWeight = this.isCommonFiledValue(this.Ele_PaperPriceSetting_Detail, 'dWeight')
          if (isCommonWeight) {
            this.noticfy('从表克重不能重复，请重新修改！')
            return false
          }
          let isNotCheckbox = false
          for (let i = 0; i < this.Ele_PaperPriceSetting_Detail.length; i++) {
            const { bPositivedegree, bLargepaper, bSpecialpaper, bWebpaper } = this.Ele_PaperPriceSetting_Detail[i]
            if (!bPositivedegree && !bLargepaper && !bSpecialpaper && !bWebpaper) {
              isNotCheckbox = true
              break
            }
          }
          if (isNotCheckbox) {
            this.noticfy('从表材料规格必须选择一个！')
            return false
          }
          // 判断卷筒纸规格 门幅宽不能重复
          const isCommonRollWidth = this.isCommonRollWidth()
          if (isCommonRollWidth) {
            this.noticfy('门幅宽不能重复，请重新修改！')
            return false
          }
          // 校验特定纸规格 长度 * 宽度的唯一性
          const isCommonSpecLengthWidth = this.isCommonLengthWidth()
          if (isCommonSpecLengthWidth) {
            this.noticfy('特定纸规格长度*特定纸规格宽不能重复，请重新修改！')
            return false
          }
          this.$set(this.form, 'sItemName', this.sItemNameArray.join(','))
          // delete this.form.sItemNameArray;
          const postData = {
            main: this.form,
            detailsList: this.Ele_PaperPriceSetting_Detail,
            paperPriceSetting_Detail_RollSetList: this.Ele_PaperPriceSetting_Detail_RollSet_all,
            paperPriceSetting_Detail_SpecialSetList: this.Ele_PaperPriceSetting_Detail_SpecialSet_all,
            deleteData: JSON.stringify(this.delteTableData),
            mainList: []
          }
          const params = this.parperTypes.find(item => item.value === this.form.sPaperType)
          if (params) {
            postData.main.sPaperTypeName = params.label
          }
          if (!this.id) postData.main.isEdit = false
          if (postData.main.tCrtDate) {
            const date = new Date(postData.main.tCrtDate)
            postData.main.tCrtDate = date.toISOString()
          }
          if (postData.main.tModDate) {
            const date = new Date(postData.main.tModDate)
            postData.main.tModDate = date.toISOString()
          }
          // if (postData.main.hasOwnProperty('sCrtUserCode') && postData.main.sCrtUserCode === null) {
          //     postData.main.sCrtUserCode = ''
          // }
          // if (postData.main.hasOwnProperty('sCrtUserName') && postData.main.sCrtUserName === null) {
          //     postData.main.sCrtUserName = ''
          // }
          // if (postData.main.hasOwnProperty('sModUserCode') && postData.main.sModUserCode === null) {
          //     postData.main.sModUserCode = ''
          // }
          // if (postData.main.hasOwnProperty('sModUserName') && postData.main.sModUserName === null) {
          //     postData.main.sModUserName = ''
          // }
          postData.detailsList.map(item => {
            if (!this.id) item.isEdit = false
            Object.keys(item).forEach(key => {
              if (key.includes('ErrorValids')) {
                delete item[key]
              }
            })
            if (item.hasOwnProperty('tenantId') && item.tenantId === null) {
              item.tenantId = 0
            }
          })
          postData.paperPriceSetting_Detail_RollSetList.map(item => {
            if (!this.id) item.isEdit = false
            Object.keys(item).forEach(key => {
              if (key.includes('ErrorValids')) {
                delete item[key]
              }
            })
            if (item.hasOwnProperty('tenantId') && item.tenantId === null) {
              item.tenantId = 0
            }
          })
          postData.paperPriceSetting_Detail_SpecialSetList.map(item => {
            if (!this.id) item.isEdit = false
            Object.keys(item).forEach(key => {
              if (key.includes('ErrorValids')) {
                delete item[key]
              }
            })
            if (item.hasOwnProperty('tenantId') && item.tenantId === null) {
              item.tenantId = 0
            }
          })
          Api.SavePaperPriceSetting(postData)
            .then(res => {
              if (res.code == 200) {
                this.$message.success('操作成功！')
                this.id = this.form.id

                // this.changePageUrlDetail(this.form.id);
                this.init()
              }
            })
            .catch(() => {})
        }
      })
    },

    // 校验门幅宽
    isCommonRollWidth() {
      const Ele_PaperPriceSetting_Detail = this.Ele_PaperPriceSetting_Detail
      return Ele_PaperPriceSetting_Detail.some(({ uGuid2 }) => {
        const rollArrays = this.Ele_PaperPriceSetting_Detail_RollSet_all.filter(sitem => sitem.uGuid2 === uGuid2)
        if (rollArrays.length > 0) {
          return this.isCommonFiledValue(rollArrays, 'dRollwidth')
        }
        return false
      })
    },
    // 校验特定纸规格 长度 * 宽度的唯一性
    isCommonLengthWidth() {
      const Ele_PaperPriceSetting_Detail = this.Ele_PaperPriceSetting_Detail
      return Ele_PaperPriceSetting_Detail.some(({ uGuid2 }) => {
        const lengthWidthArrays = this.Ele_PaperPriceSetting_Detail_SpecialSet.filter(sitem => {
          sitem.dLengthWidth = sitem.dSpeciallength + '_' + sitem.dSpecialwidth
          return sitem.uGuid2 === uGuid2
        })

        if (lengthWidthArrays.length > 0) {
          return this.isCommonFiledValue(lengthWidthArrays, 'dLengthWidth')
        }
        return false
      })
    },
    // 选择从表行
    chooseDetailTableRows(selection) {
      this.selectedDetailTableRows = selection
    },
    doLayout() {
      this.$nextTick(() => {
        this.$refs.Ele_PaperPriceSetting_Detail.doLayout()
        this.$refs.Ele_PaperPriceSetting_Detail_SpecialSet.doLayout()
        this.$refs.Ele_PaperPriceSetting_Detail_RollSet.doLayout()
      })
    },
    changeTab() {
      const ref = this.childTableTabName == 'rollSet' ? 'Ele_PaperPriceSetting_Detail_RollSet' : 'Ele_PaperPriceSetting_Detail_SpecialSet'
      this.$nextTick(() => {
        this.$refs[ref].doLayout()
      })
    },
    // 点击二级表 筛选3级表数据
    rowClick(row) {
      if (row && row.uGuid2) {
        const uGuid2 = row.uGuid2
        this.detailRow = row
        this.Ele_PaperPriceSetting_Detail_SpecialSet = this.Ele_PaperPriceSetting_Detail_SpecialSet_all.filter(item => {
          return item.uGuid2 == uGuid2
        })
        this.Ele_PaperPriceSetting_Detail_RollSet = this.Ele_PaperPriceSetting_Detail_RollSet_all.filter(item => {
          return item.uGuid2 == uGuid2
        })
        this.$nextTick(() => {
          this.$refs.Ele_PaperPriceSetting_Detail.setCurrentRow(row, true)
        })
      }
    },
    // 三级表新增
    addChildRow() {
      const childTableName = this.childTableTabName == 'rollSet' ? 'Ele_PaperPriceSetting_Detail_RollSet' : 'Ele_PaperPriceSetting_Detail_SpecialSet'
      const detailRow = this.detailRow
      if (this.childTableTabName == 'rollSet' && !detailRow.bWebpaper) {
        this.noticfy('请先勾选卷筒分切！')
        return false
      } else if (this.childTableTabName == 'specialSet' && !detailRow.bSpecialpaper) {
        this.noticfy('请先勾选特规纸！')
        return false
      }
      if (detailRow && detailRow.uGuid2) {
        const row = {
          uGuid2: detailRow.uGuid2,
          uGuid1: this.form.uGuid1,
          uGuid3: this.guid(),
          isEdit: false,
          iOrder: this[childTableName].length + 1
        }
        if (this.childTableTabName == 'specialSet') {
          row.dPrice = 0
        } else {
          row.dRollwidth = 0
        }
        this[childTableName].push(row)
        this[childTableName + '_all'].push(row)
      } else {
        this.noticfy('请先选择从表数据！')
      }
    },
    //
    changeInput({ sidx, value, tableName, prop, opts, text, rowJson }) {
      if (prop == 'bWebpaper' && !value && this.Ele_PaperPriceSetting_Detail_RollSet.length > 0) {
        this.noticfy('请先清空卷筒纸规格数据')
        this.$set(rowJson, 'bWebpaper', 1)
      } else if (prop == 'bSpecialpaper' && !value && this.Ele_PaperPriceSetting_Detail_SpecialSet.length > 0) {
        this.noticfy('请先清空特规纸规格数据')
        this.$set(rowJson, 'bSpecialpaper', 1)
      }
    },
    // 三级表删除
    removeRow(tableName, row, idx, idName) {
      this[tableName].splice(idx, 1)
      this.setDeteleData(tableName, row[idName], idName)
      if (this[tableName + '_all']) {
        for (let i = 0; i < this[tableName + '_all'].length; i++) {
          if (this[tableName + '_all'][i].uGuid3 == row.uGuid3) {
            this[tableName + '_all'].splice(i, 1)
            break
          }
        }
      }
    },
    copyRow(row) {
      const nRow = deepClone(row)
      nRow.uGuid2 = this.guid()
      nRow.isEdit = false
      nRow.iOrder = this.Ele_PaperPriceSetting_Detail.length + 1
      this.Ele_PaperPriceSetting_Detail.push(nRow)
      const copyEle_PaperPriceSetting_Detail_RollSet = deepClone(this.Ele_PaperPriceSetting_Detail_RollSet).map(item => {
        item.uGuid3 = this.guid()
        item.uGuid2 = nRow.uGuid2
        item.isEdit = false
        return item
      })
      const copyEle_PaperPriceSetting_Detail_SpecialSet = deepClone(this.Ele_PaperPriceSetting_Detail_SpecialSet).map(item => {
        item.uGuid3 = this.guid()
        item.uGuid2 = nRow.uGuid2
        item.isEdit = false
        return item
      })
      this.Ele_PaperPriceSetting_Detail_RollSet_all.push(...copyEle_PaperPriceSetting_Detail_RollSet)
      this.Ele_PaperPriceSetting_Detail_SpecialSet_all.push(...copyEle_PaperPriceSetting_Detail_SpecialSet)
    },
    copy() {
      const guid1 = this.guid()
      const paperPriceSet = deepClone(this.form)
      paperPriceSet.uGuid1 = guid1
      paperPriceSet.sPaperName = ''

      const detailsList = this.Ele_PaperPriceSetting_Detail
      for (let i = 0; i < detailsList.length; i++) {
        const item = detailsList[i]
        item.uGuid1 = guid1
        item.isEdit = false
        item.oldGuid2 = item.uGuid2
        item.uGuid2 = this.guid()
      }
      const paperPriceSetting_Detail_SpecialSetList = this.Ele_PaperPriceSetting_Detail_SpecialSet_all
      const paperPriceSetting_Detail_RollSetList = this.Ele_PaperPriceSetting_Detail_RollSet_all
      if (paperPriceSetting_Detail_SpecialSetList.length > 0) {
        for (let s = 0; s < paperPriceSetting_Detail_SpecialSetList.length; s++) {
          const item = paperPriceSetting_Detail_SpecialSetList[s]

          item.uGuid1 = guid1
          item.uGuid3 = this.guid()
          item.isEdit = false
          const detailRow = detailsList.find(ditem => {
            return item.uGuid2 == ditem.oldGuid2
          })
          if (detailRow) {
            item.uGuid2 = detailRow.uGuid2
          }
        }
      }
      if (paperPriceSetting_Detail_RollSetList.length > 0) {
        for (let s = 0; s < paperPriceSetting_Detail_RollSetList.length; s++) {
          const item = paperPriceSetting_Detail_RollSetList[s]

          item.uGuid1 = guid1
          item.uGuid3 = this.guid()
          item.isEdit = false
          const detailRow = detailsList.find(ditem => {
            return item.uGuid2 == ditem.oldGuid2
          })
          if (detailRow) {
            item.uGuid2 = detailRow.uGuid2
          }
        }
      }
      this.id = ''
      this.clearForm()
      this.initDetail({ paperPriceSet, detailsList, paperPriceSetting_Detail_RollSetList, paperPriceSetting_Detail_SpecialSetList }, true)
    },
    // 编辑页面下设置删除id
    setDeteleData(tableName, id, name) {
      let delteTableData = this.delteTableData[tableName]
      delteTableData = delteTableData || []
      const json = {}
      json[name] = id
      delteTableData.push(json)
      this.$set(this.delteTableData, tableName, delteTableData)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-box {
    padding: 10px;
    background-color: #ffffff;
    height: calc(100vh - 136px);
    width: 100%;
    ::v-deep .el-table--small th,
    ::v-deep .el-table--small td {
        padding: 0px 0;
    }
    .content-header-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.el-form-item--small.el-form-item {
    margin-bottom: 10;
}
</style>
