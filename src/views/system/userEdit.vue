<template>
  <el-dialog
    v-DialogDrag
    append-to-body
    :visible.sync="dialogTableVisible"
    :close-on-click-modal="false"
    :title="type === 'add' ? '新增用户' : '编辑用户'"
    width="400px"
    :show-close="false"
    @close="closeed"
  >

    <el-form ref="form" :rules="rules" label-width="80px" size="mini" :model="form">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" :disabled="form.uGuid1" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item v-if="type === 'add'" label="密码" prop="passWord">
        <el-input v-model="form.passWord" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item v-if="type === 'add'" label="确认密码" prop="copyPassWord">
        <el-input v-model="form.copyPassWord" placeholder="请再次输入密码" />
      </el-form-item>

      <el-form-item label="邮箱" prop="eMail">
        <el-input v-model="form.eMail" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="性别" prop="sex" class="sexRadio">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button size="mini" @click="closeed">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUser } from '@/api/user'
import Api from '@/api/quotationSystem/basicData'
export default {
  name: 'Dialogbox',
  props: ['showDidlog', 'currentItem', 'type'],
  data() {
    return {
      textList: ['项目配置-新增', '项目配置-编辑', '项目配置-详情'],
      ReportDesigner: null,
      activeStep: 1,
      form: {
        userName: '',
        passWord: '',
        copyPassWord: '',
        eMail: '',
        realName: '',
        sex: '男'
      },
      dialogTableVisible: this.showDidlog,
      rules: {
        userName: [{ required: true, message: '用户名称不能为空！', trigger: 'blur' }],
        passWord: [{ required: true, message: '密码不能为空！', trigger: 'blur' }],
        copyPassWord: [{ required: true, message: '重复密码不能为空！', trigger: 'blur' }],
        eMail: [
          { required: true, message: '邮箱不能为空！', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        realName: [{ required: true, message: '真实姓名不能为空！', trigger: 'blur' }]
      }
    }
  },
  watch: {
    showDidlog(n) {
      this.dialogTableVisible = n
      if (n) {
        if (this.type === 'edit') {
          this.form = this.currentItem
          this.form.sex = this.form.sexText
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
          if (this.form.passWord !== this.form.copyPassWord) {
            this.$message.error('两次密码输入不一致')
            return
          }
          const params = {
            userName: this.form.userName,
            realName: this.form.realName,
            eMail: this.form.eMail,
            sex: this.form.sex === '女' ? 0 : 1,
            passWord: this.form.passWord
          }
          if (this.form.id) {
            params.id = this.form.id
          }
          addUser(params)
            .then(res => {
              if (res.code == 200) {
                this.$message.success('操作成功！')
                this.closeed()
                this.$parent.getUserListData()
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
.sexRadio {
    ::v-deep .el-form-item__content {
        line-height: 28px !important;
    }
}
</style>
