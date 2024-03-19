<template>
  <el-dialog
    v-DialogDrag
    append-to-body
    :visible.sync="dialogTableVisible"
    :close-on-click-modal="false"
    :title="textList[titleText ? titleText : 0]"
    width="400px"
    :show-close="false"
    @close="closeed"
  >

    <el-form ref="form" :disabled="titleText == 2" :rules="rules" label-width="80px" size="mini" :model="form">
      <el-form-item label="项目编号" prop="sItemCode">
        <el-input v-model="form.sItemCode" :disabled="form.uGuid1" placeholder="请输入项目编号" />
      </el-form-item>

      <el-form-item label="项目名称" prop="sItemName">
        <el-input v-model="form.sItemName" placeholder="请输入项目名称" />
      </el-form-item>

      <el-form-item label="显示顺序">
        <el-input-number v-model="form.idraworder" placeholder="请输入显示顺序" :min="1" :max="10" />
      </el-form-item>
      <el-form-item label="专版">
        <el-switch v-model="form.bSpecialEdition" />
      </el-form-item>

      <!-- <el-form-item label="绑定模块" prop="sModulePath">
                <el-cascader
                    class="w-100"
                    v-model="form.sModulePath"
                    filterable
                    clearable
                    :options="menuList"
                    :show-all-levels="false"
                    :props="{
                        value: 'urlAddress',
                        label: 'fullName',
                        emitPath: false,
                    }"
                ></el-cascader>
            </el-form-item> -->

      <!-- <el-form-item label="图片">
                <upload-img style="width: 100px" :value="form.sImageUrl" @input="json => handleUpload(json)"></upload-img>
            </el-form-item> -->
      <el-form-item label="可用">
        <el-switch v-model="form.bUsable" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button v-if="titleText != 2" type="primary" size="mini" @click="submit">保存</el-button>
      <el-button size="mini" @click="closeed">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Api from '@/api/quotationSystem/basicData'
// import UploadImg from '@/components/uploadImg.vue';
export default {
  name: 'Dialogbox',
  props: ['showDidlog', 'titleText', 'currentItem', 'menuList'],
  // components: {
  //     UploadImg,
  // },
  data() {
    return {
      textList: ['项目配置-新增', '项目配置-编辑', '项目配置-详情'],
      ReportDesigner: null,
      activeStep: 1,
      form: {
        bSpecialEdition: false,
        bUsable: false
      },
      dialogTableVisible: this.showDidlog,
      rules: {
        sItemCode: [{ required: true, message: '项目编号不能为空！', trigger: 'blur' }],
        sItemName: [{ required: true, message: '项目名称不能为空！', trigger: 'blur' }]
        // sModulePath: [{ required: true, message: '绑定模块不能为空！', trigger: 'blur' }],
      }
    }
  },
  watch: {
    showDidlog(n) {
      this.dialogTableVisible = n
      if (n) {
        this.form = this.currentItem || {
          bSpecialEdition: false,
          bUsable: false
        }
      }
    }
  },
  created() {},
  methods: {
    handleUpload(json) {
      this.$set(this.form, 'sImageUrl', json.url)
    },
    closeed() {
      this.$emit('closed')
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          Api.SaveItemConfig(this.form)
            .then(res => {
              if (res.code == 200) {
                this.$message.success('操作成功！')
                this.closeed()
                this.$parent.getList()
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(() => {})
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.input-title {
    text-align: center;
}
.text-right {
    padding: 0 0 10px 0;
}
</style>
