<template>
  <div class="wz_main">
    <section class="wz_content">
      <div class="left">
        <div class="title">权限信息</div>
        <el-tree
          ref="permissionTree"
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps"
        />
      </div>
      <div class="right">
        <div class="title">用户信息</div>
        <div class="content">
          <div class="item">
            <div class="name">用户名：</div>
            <div class="value">{{ form.userName }}</div>
          </div>
          <div class="item">
            <div class="name">邮箱：</div>
            <div class="value">{{ form.eMail }}</div>
          </div>
          <div class="item">
            <div class="name">真实姓名：</div>
            <div class="value">{{ form.realName }}</div>
          </div>
          <div class="item">
            <div class="name">性别：</div>
            <div class="value">{{ form.sexText }}</div>
          </div>
          <div class="item">
            <div class="name">是否主账号：</div>
            <div class="value">{{ form.isMain ? '主账号' : '子账号' }}</div>
          </div>
        </div>
        <div class="footer">
          <el-button class="filter-item" type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { saveList, UserMenu, AllList } from '@/api/user'
export default {
  data() {
    return {
      saveflag: true,
      defaultCheckedKeys: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      // userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : {},
      form: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
      paramsTree: [],
      parentList: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  mounted() {
    this.getAllList()
    this.getUserMenuList()
  },
  methods: {
    getUserMenuList() {
      UserMenu(this.form.id).then(res => {
        if (res.code === 200) {
          this.defaultCheckedKeys = []
          this.getCheckedKeys(res.data)
        }
      })
    },
    save() {
      if (this.saveflag) {
        this.saveflag = false
        this.paramsTree = []
        const checkedId = this.$refs.permissionTree.getCheckedKeys()
        this.getTree(this.treeData, checkedId)
        const params = {
          userId: this.form.id,
          tenantId: this.form.tenantId,
          treeList: this.treeData
        }
        saveList(params).then(res => {
          if (res.code === 200) {
            this.$message.success('保存成功')
            setTimeout(() => {
              this.saveflag = true
            }, 1000)
          }
        })
      }
    },
    getTree(tree, checkedId, isChild) {
      tree.forEach((item) => {
        if (!item.parentCode) {
          this.parentList = []
        }
        if (checkedId.includes(item.id)) {
          item.checked = true
          if (this.parentList.length && isChild) {
            this.parentList.forEach(ele => {
              if (item.menuCode.includes(ele.menuCode)) {
                ele.checked = true
              }
            })
          }
        } else {
          item.checked = false
        }
        if (item.children && item.children.length) {
          if (!item.checked) {
            this.parentList.push(item)
          }
          this.getTree(item.children, checkedId, true)
        }
      })
    },
    getAllList() {
      AllList(this.userInfo.id).then(res => {
        if (res.code === 200) {
          this.treeData = res.data
          console.log(res)
        }
      })
    },
    getCheckedKeys(tree) {
      tree.forEach(item => {
        if (item.checked && (!item.children || !item.children.length)) {
          this.defaultCheckedKeys.push(item.id)
        }
        if (item.children && item.children.length) {
          this.getCheckedKeys(item.children)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wz_content {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 8px;
    border-radius: 8px;
    .left {
        width: 35%;
        height: 100%;
        background: #fff;
        margin-right: 12px;
        .title {
            padding: 12px;
            font-size: 20px;
        }
    }
    .right {
        flex: 1;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        .title {
            padding: 12px;
            font-size: 20px;
            margin-bottom: 12px;
        }
        .content {
            flex: 1;
            padding: 0 20px;
            width: 100%;
            .item {
                display: flex;
                margin-bottom: 18px;
                .name {
                    width: 100px;
                    text-align: right;
                    font-size: 16px;
                    color: black;
                    margin-right: 20px;
                }
                .value {
                    flex: 1;
                    font-size: 16px;
                    color: #a8a8a8;
                }
            }
        }
    }
    .footer {
        margin-bottom: 20px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-right: 30px;
    }
    .sexRadio {
    ::v-deep .el-form-item__content {
        line-height: 28px !important;
    }
}
}
</style>
