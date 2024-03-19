<template>
  <el-table-column
    v-if="col"
    :align="col && (col.align ? col.align : 'center')"
    :width="col && (col.width ? col.width : '')"
    :prop="col.prop"
  >
    <template slot="header">
      <div
        style="text-align: center"
        @contextmenu.prevent="
          showContextMenu($event, '2', tableOptsName, tableName)
        "
      >
        <span v-if="col.required" style="color: #f56c6c">*</span>
        {{ col.label }}
        <el-tooltip v-if="col.tip" class="item" effect="dark" :content="col.tip" placement="top">
          <i class="el-icon-question" />
        </el-tooltip>
      </div>
    </template>
    <template slot-scope="scope">
      <!-- <TagTemplate
        :detail="detail"
        :head="col"
        :item="scope.row[col.prop]    :idx="idx"
      ></TagTemplate>-->
      <span
        v-if="detail || (isOpenDetailEdit && !scope.row.isEdit)"
        class="position-relative d-block"
        :style="detail ? 'height:30px;line-height:30px' : ''"
      >
        <span v-if="col.key == 'date'">{{
          scope.row[col.prop] | filterDateT
        }}</span>
        <span v-else-if="col.key == 'select'">
          {{
            yz.getSelectField(
              scope.row[col.prop],
              getSelectOpts(col, scope.row),
              "sID",
              "sDesc"
            )
          }}
        </span>
        <span v-else-if="col.key == 'checkbox' || col.key == 'switch'">{{
          scope.row[col.prop] ? "是" : "否"
        }}</span>
        <template v-else-if="col.key == 'custom'">
          <slot name="custionContent" :data="scope.row[col.prop]" />
        </template>
        <span v-else-if="col.key == 'time'">
          {{ scope.row[col.prop].split(" ")[1] }}
        </span>
        <span v-else>
          <span v-if="col.options && col.options.length > 0">
            {{
              yz.getSelectField(
                scope.row[col.prop],
                col.options,
                "sID",
                "sDesc"
              )
            }}
          </span>
          <span v-else>{{ scope.row[col.prop] }}</span>
        </span>
      </span>
      <span v-else class="position-relative d-block line-height-100">
        <template v-if="col.key == 'checkbox'">
          <el-checkbox
            v-model="scope.row[col.prop]"
            :size="size"
            :disabled="getReadonly(col, scope.row)"
            @change="(value) => change(value, col, scope.$index, idx, scope.row)
            "
          />
        </template>
        <template v-if="col.key == 'date'">
          <el-date-picker
            v-if="isShow(col)"
            :ref="`timePicker${scope.$index}`"
            v-model="scope.row[col.prop]"
            class="w-100"
            :size="size"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :readonly="getReadonly(col, scope.row)"
            @contextmenu.native.prevent="rightClick($event, scope, col)"
            @change="(value) => change(value, col, scope.$index, idx, scope.row)
            "
          />
          <el-date-picker
            v-else
            v-model="scope.row[col.prop]"
            class="w-100"
            :size="size"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :readonly="getReadonly(col, scope.row)"
            @change="(value) => change(value, col, scope.$index, idx, scope.row)
            "
          />
        </template>
        <template v-else-if="col.key == 'intNumInput'">
          <!-- :readonly="getReadonly(col, scope.row)" -->
          <el-input
            v-model.number="scope.row[col.prop]"
            v-Int
            :size="size"
            :min="col.min"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            :readonly="getReadonly(col, scope.row)"
            :max="col.max"
            @blur="
              blurInput(scope.$index, idx, col, scope.row, col.min, col.max)
            "
            @change="(value) => change(value, col, scope.$index, idx, scope.row)
            "
            @keyup.enter.native="enterInput(col)"
          />
        </template>
        <template v-else-if="col.key == 'switch'">
          <el-switch
            v-model="scope.row[col.prop]"
            active-color="#13ce66"
            :disabled="getReadonly(col, scope.row)"
            inactive-color="#ff4949"
          />
        </template>
        <template v-else-if="col.key == 'searchSelect'">
          <el-select
            :ref="'select_' + tableName + '_' + col.prop + '_' + scope.$index"
            v-model="scope.row[col.prop]"
            class="search-select"
            :disabled="getReadonly(col, scope.row)"
            placeholder
            :clearable="!scope.row.isCancelEdit"
            :size="size"
            :remote-method="(query) => searchSelect(query, col)"
            filterable
            default-first-option
            remote
            @change="(value) => change(value, col, scope.$index, idx, scope.row)
            "
            @visible-change="searchVisibleChange"
          >
            <el-option
              v-for="(opt, oindex) in searchSelectOpts"
              :key="oindex"
              :value="col.selectValue ? opt[col.selectValue] : opt.sDesc"
            >
              <span style="float: left; margin-right: 20px">{{
                opt[col.selectValue ? col.selectValue : "sID"]
              }}</span>
              <span style="float: right; font-size: 12px">{{
                opt[col.selectLabel ? col.selectLabel : "sDesc"]
              }}</span>
            </el-option>
          </el-select>
        </template>
        <template v-else-if="col.key == 'select'">
          <el-select
            :ref="'select_' + tableName + '_' + col.prop + '_' + scope.$index"
            v-model="scope.row[col.prop]"
            :disabled="getReadonly(col, scope.row)"
            placeholder
            filterable
            clearable
            :size="size"
            @change="(value) => change(value, col, scope.$index, idx, scope.row)
            "
          >
            <el-option
              v-for="(opt, oindex) in getSelectOpts(col, scope.row)"
              :key="oindex"
              :label="col.selectLabel ? opt[col.selectLabel] : opt.sDesc"
              :value="col.selectValue ? opt[col.selectValue] : opt.sID"
            >
              <span v-if="col.secondaryField" style="float: left; margin-right: 20px">{{ opt[col.secondaryField] }}</span>
              <span v-if="col.secondaryField" style="float: right; font-size: 12px">{{ col.selectLabel ?
                opt[col.selectLabel] : opt.sDesc }}</span>
            </el-option>
          </el-select>
        </template>
        <template v-else-if="col.key == 'input'">
          <div
            class="sql-input"
            @dblclick="
              col.isDblClick &&
                dblClickInput(scope.$index, scope.row, scope.row[col.prop], col)
            "
          >
            <el-input
              v-model="scope.row[col.prop]"
              :size="size"
              :readonly="getReadonly(col, scope.row)"
              @focus.stop
              @keyup.enter.native="enterInput(col)"
              @focus="focusInputFocus(scope.row, col.prop, scope.$index)"
              @change="(value) => change(value, col, scope.$index, idx, scope.row)
              "
              @blur="blurInput(scope.$index, idx, col, scope.row, col.min)"
            />
          </div>
        </template>
        <template v-else-if="col.key == 'ftNumInput'">
          <!-- oninput="value=value.replace(/[^0-9.]/g,'')" -->
          <!-- v-Float -->

          <el-input
            v-model="scope.row[col.prop]"
            v-Float
            :size="size"
            :readonly="getReadonly(col, scope.row)"
            type="text"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            class="num-input"
            @keyup.enter.native="enterInput(col)"
            @focus="focusInputFocus(scope.row, col.prop, scope.$index)"
            @blur="blurInput(scope.$index, idx, col, scope.row, col.min)"
            @change="(value) => change(value, col, scope.$index, idx, scope.row)
            "
          />
        </template>
        <template v-else-if="col.key == 'nftNumInput'">

          <!-- oninput="value=value.replace(/[^0-9.]/g,'')" -->
          <!-- v-Float -->
          <el-input
            v-model="scope.row[col.prop]"
            :size="size"
            :readonly="getReadonly(col, scope.row)"
            type="text"
            oninput="value=value.replace(/[^(\-|\+)?\d+(\.\d+)?$]/g,'')"
            class="num-input"
            @keyup.enter.native="enterInput(col)"
            @change="(value) => change(value, col, scope.$index, idx, scope.row)
            "
            @focus="focusInputFocus(scope.row, col.prop, scope.$index)"
            @blur="blurInput(scope.$index, idx, col, scope.row, col.min)"
          />
        </template>

        <template v-else-if="col.key == 'text'">
          <span @focus.stop>{{ scope.row[col.prop] }}</span>
        </template>
        <template v-if="col.key == 'custom'">
          <slot name="custionContent" :data="scope.row[col.prop]" />
        </template>
        <template v-else-if="col.key == 'time'">
          <el-time-picker
            v-model="scope.row[col.prop]"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            placeholder="任意时间点"
            class="w-100"
            @change="(value) => change(value, col, scope.$index, idx, scope.row)
            "
          />
        </template>
        <div
          v-if="col.isSql && !getSourceHide(col.prop, scope.row)"
          @mouseover="btnHover(scope.row, col.prop, true)"
          @mouseleave="btnHover(scope.row, col.prop, false)"
        >
          <el-button
            :ref="tableName + col.prop + scope.$index"
            class="input-right-btn input-right-btn-2 btn-dd"
            :class="scope.row[col.prop + 'dd'] ? 'btn-dd-b' : ''"
            @focus.stop
            @click="showMoreData(col, scope.$index, scope.row)"
          >...</el-button>

          <el-button
            class="input-right-btn input-right-btn-2 btn-del"
            icon="el-icon-close"
            @focus.stop
            @click="deleteValue(col, scope.row, scope.$index)"
          />
        </div>
      </span>
      <div v-show="scope.row[col.prop + 'ErrorValids']" class="error-tip" @focus.stop>
        不能为空
      </div>
    </template>
    <template v-if="col.children">
      <table-columns
        v-for="item in col.children"
        :key="item.index"
        :idx="item.index"
        :size="size"
        :col="item"
        :detail="detail"
        @blurInput="childBlurInput"
        @changeSelect="childChangeSelect"
        @showContextMenu="showChildContextMenu"
      />
    </template>

  </el-table-column>
</template>

<script>
// import BasicData from "@/api/custom/basicData";
export default {
  name: 'TableColumns',
  props: {
    col: {
      type: Object,
      default: () => { }
    },
    detail: {
      type: Boolean
    },
    isOpenDetailEdit: {
      type: Boolean,
      default: false
    },
    idx: Number,
    tableData: Array,
    tableName: {
      type: String
    },
    valids: Array,
    readonlyList: Array,
    size: {
      type: String,
      default: 'medium'
    },
    tableOptsName: String
  },
  data() {
    return {
      searchSelectOpts: []
    }
  },
  watch: {},
  methods: {
    rightClick(event, scope, col) {
      event.preventDefault()
      this.$nextTick(() => {
        this.$refs[`timePicker${scope.$index}`].handleClose()
      })
      this.$emit('rightClick', event, scope, col)
    },
    isShow(col) {
      if (col.table === 'Mft_ProduceReport_Detail') {
        return true
      }
    },
    // 选择下拉列表
    change(value, col, sidx, idx, row) {
      let { key, prop, options, selectName, selectValue, selectLabel } = col
      if (prop.charAt(0) === 'd' && !this.yz.isNumber(value)) {
        this.$set(row, prop, 0)
        value = 0
      }
      const tableName = this.tableName
      const json = {
        sidx: sidx,
        idx: idx,
        col: col,
        tableName: tableName,
        prop: prop,
        value: value,
        rowJson: row,
        tableOptsName: this.tableOptsName
      }
      if (
        key.indexOf('input') > -1 ||
        key == 'date' ||
        key == 'checkbox' ||
        key.indexOf('Input') > -1 ||
        key == 'time'
      ) {
        this.$emit('changeInput', json)
      } else if (key == 'select' || key == 'searchSelect') {
        const ref = 'select_' + tableName + '_' + prop + '_' + sidx
        if (key == 'searchSelect') {
          options = this.searchSelectOpts
        }
        this.$nextTick(() => {
          const text = this.$refs[ref] && this.$refs[ref].selectedLabel

          this.$emit('changeSelect', {
            sidx,
            value,
            tableName,
            prop,
            options,
            text,
            row,
            selectValue,
            selectLabel
          })
          if (selectName) {
            this.$set(row, selectName, text || '')
          }
        })
      }
    },
    // 组件获得焦点
    focusInputFocus(row, prop, rowIndex) {
      this.$emit('focusInputFocus', row, prop, this.tableName, rowIndex)
    },

    searchSelect(query, col) {
      if (query !== '') {
        const searchSql = col.searchSql
        const postData = {
          enCode: searchSql,
          searchDataList: query
        }

        BasicData.GetInfoByEnCode(postData).then((res) => {
          if (res.code == 200) {
            this.searchSelectOpts = res.data[0].table
          }
        })
      } else {
      }
    },
    searchVisibleChange() {
      this.searchSelectOpts = []
    },
    // 回车
    enterInput(col) {
      this.$emit('enterInput', col)
    },
    btnHover(row, prop, type) {
      const value = row[prop]
      if ((value && type) || !type) {
        this.$set(row, prop + 'dd', type)
      }
    },
    // 失去焦点
    blurInput(sidx, idx, col, row, min, max) {
      const value = row[col.prop]
      const defaultValue = col.value
      const isReadonly = this.getReadonly(col, row)
      const json = {
        sidx: sidx,
        idx: idx,
        col: col,
        tableName: this.tableName,
        value: value,
        rowJson: row,
        tableOptsName: this.tableOptsName
      }
      if ((defaultValue || defaultValue == '0') && !value) {
        this.$set(row, col.prop, defaultValue)
      }
      if (value > 24 && max) {
        this.$set(row, col.prop, max)
      }
      if (!isReadonly) {
        this.$emit('blurInput', json)
      }
    },
    focus(event) {
      return false
      event.stopPropagation()
    },
    // 双击
    dblClickInput(sidx, row, value, col) {
      const data = {
        sidx: sidx,
        col: col,
        tableName: this.tableName,
        value: value,
        rowJson: row
      }
      this.$emit('dblClickInput', data)
    },
    // 判断能否编辑
    getReadonly(col, row) {
      const prop = col.prop
      const readOnlyProp = `${prop}Readonly`
      if (row.hasOwnProperty(readOnlyProp)) {
        return row[readOnlyProp]
      } else {
        return col.isReadonly
      }
    },
    // 判断弹窗按钮是否隐藏
    getSourceHide(prop, row) {
      const sourceHideProp = prop + 'SourceHide'
      return row[sourceHideProp]
    },
    getSelectOpts(col, row) {
      if (col.sqlOptionsProp) {
        return row[col.sqlOptionsProp]
      } else {
        return col.options
      }
    },
    deleteValue(col, row, idx) {
      const { prop, selectName } = col
      this.$set(row, selectName, '')
      this.$set(row, prop, '')
      this.$emit('deleteSqlValue', prop, row)
    },
    // 鼠标右键 表头
    showContextMenu(event, type, tableOptsName, tableName) {
      this.$emit('showContextMenu', event, type, tableOptsName, tableName)
    },
    childBlurInput(json) {
      json.tableName = this.tableName
      json.tableOptsName = this.tableOptsName
      this.$emit('blurInput', json)
    },
    childChangeSelect(json) {
      json.tableName = this.tableName

      this.$emit('changeSelect', json)
    },
    showChildContextMenu(event, type) {
      this.showContextMenu(event, type, this.tableOptsName, this.tableName)
    },
    showMoreData(col, sidx, row) {
      this.$emit('showSqlDialog', col, sidx, this.tableName, row)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-select-box {
  position: relative;

  .search-select {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
