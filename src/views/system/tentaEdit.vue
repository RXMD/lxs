<template>
  <el-dialog
    v-DialogDrag
    append-to-body
    :visible.sync="dialogTableVisible"
    :close-on-click-modal="false"
    :title="type === 'add' ? '新增租户' : '编辑租户'"
    width="400px"
    :show-close="false"
    @close="closeed"
  >

    <el-form ref="form" :rules="rules" label-width="80px" size="mini" :model="form">
      <el-form-item label="租户名称" prop="userName">
        <el-input v-model="form.userName" :disabled="form.uGuid1" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="手机号" prop="Tel">
        <el-input v-model.number="form.Tel" placeholder="请输入手机号" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button size="mini" @click="closeed">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addTenant } from '@/api/tenant'
export default {
  name: 'Dialogbox',
  props: ['showDidlog', 'currentItem', 'type'],
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3-9][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          // 具体错误信息没有提示
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      form: {
        userName: '',
        Tel: ''
      },
      dialogTableVisible: this.showDidlog,
      rules: {
        userName: [{ required: true, message: '租户名称不能为空！', trigger: 'blur' }],
        Tel: [{ required: true, trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }]
      }
    }
  },
  watch: {
    showDidlog(n) {
      this.dialogTableVisible = n
      if (n) {
        if (this.type === 'edit') {
          this.form.userName = this.currentItem.tenantName
          this.form.Tel = this.currentItem.phoneNumber
        }
      }
    }
  },
  created() { },
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
          const params = {
            tenantName: this.form.userName,
            phoneNumber: String(this.form.Tel)
          }
          if (this.currentItem.id) {
            params.id = this.currentItem.id
          }
          addTenant(params)
            .then(res => {
              if (res.code === 200) {
                this.$message.success('操作成功！')
                this.closeed()
                this.$parent.getUserListData()
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(() => { })
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

.sexRadio {
    ::v-deep .el-form-item__content {
        line-height: 28px !important;
    }
}
</style>
