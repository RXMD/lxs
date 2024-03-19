<template>
  <div v-loading="loading" class="content-box mini-form">
    <div class="table-box">
      <div class="text-right">
        <el-button type="primary" size="mini" class="mb-10" @click="submit">保存</el-button>
        <el-button type="primary" size="mini" class="mb-10" @click="goBack">关闭</el-button>
      </div>
      <el-table ref="table" highlight-current-row stripe border :max-height="300" size="mini" :data="formTable" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column v-if="!formId" width="40" type="selection" />
        <el-table-column width="40" label="序号" type="index" />

        <el-table-column prop="sPaperType" label="纸张类型" width="120">
          <template slot="header">
            纸张类型
            <el-select v-model="paperType" clearable filterable @change="changePaperType">
              <el-option v-for="(item, idx) in parperTypes" :key="idx" :label="item.label" :value="item.value" />
            </el-select>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sPaperType" disabled>
              <el-option v-for="(item, idx) in parperTypes" :key="idx" :label="item.label" :value="item.value" />
            </el-select>
          </template>

        </el-table-column>
        <el-table-column label="纸张名称" prop="sPaperName" width="140">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sPaperName" disabled />
          </template>
        </el-table-column>

        <el-table-column prop="bSelfinversion" label="自翻">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.bSelfinversion" />
          </template>
        </el-table-column>
        <el-table-column prop="bUVPrinting" label="UV印刷">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.bUVPrinting" />
          </template>
        </el-table-column>
        <el-table-column prop="bPVCFilm" label="PVC胶片">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.bPVCFilm" />
          </template>
        </el-table-column>
        <el-table-column prop="bPastingCard" label="可用于裱卡">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.bPastingCard" />
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import Api from '@/api/quotationSystem/basicData'
export default {
  name: 'Printingmachinesetting',

  props: {
    id: String
  },
  data() {
    return {
      loading: false,
      formRow: {
        project: []
      },
      formTableAll: [],
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
      paperType: '',

      formId: this.id,
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
      ]
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    changePaperType(v) {
      this.formTable = this.paperType ? this.formTableAll.filter(item => {
        return item.sPaperType == this.paperType
      }) : this.formTableAll
    },
    // 初始化
    async init() {
      this.loading = true
      this.formTableAll = []
      this.formTable = []
      let res = ''
      if (this.formId) {
        res = await Api.GetColorBoxSettingPaperDetail(this.formId)
      } else {
        res = await Api.GetPaperPriceSettingDetailByItemName('彩盒')
      }

      if (res.code === 200) {
        const { mainList } = res.data
        this.formTableAll = this.formId ? this.fmrDataEditStatus(mainList) : mainList
        this.formTable = this.formTableAll
        this.loading = false
      }
    },
    fmrDataEditStatus(data) {
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

      if (!multipleSelection || multipleSelection.length == 0) {
        this.noticfy('请选择一级表！')
        return false
      }

      const postData = {
        mainList: multipleSelection,

        isEdit: !!this.formId
      }

      Api.SaveColorBoxSettingPaper(postData)
        .then(res => {
          if (res.code == 200) {
            this.init()
            this.$message.success('操作成功！')
          }
        })
        .catch(() => {})
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
.input-box {
    width: 55px;
    padding: 2px;
}
.content-box {
    ::v-deep.el-table--small th,
    ::v-deep.el-table--small td {
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
