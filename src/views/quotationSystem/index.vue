<template>
  <div class="YZ-common-layout">
    <ul class="list">
      <li v-for="(item, idx) in list" :key="idx" class="item" @click="to(item.sModulePath)">
        <img :src="imgUrl+item.sImageUrl">
        <p class="fz-12">{{ item.sItemName }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
const IPConfig = window.IPConfig
import Api from '@/api/quotationSystem/basicData'
export default {
  name: 'QuotationSystemIndex',
  data() {
    return {
      list: [],
      imgUrl: this.$store.getters.userInfo.sFileUploadDownloadPath
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.list = []
      Api.GetQuotationHomePageListData()
        .then(res => {
          if (res.code === 200) {
            this.list = res.data
          }
        })
        .catch(() => {})
    },
    to(path) {
      if (!path) {
        this.$message.error('未绑定模块！')
        return false
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
    display: flex;
    width: 600px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    .item {
        list-style: none;
        cursor: pointer;
        img {
            height: 90px;
            width: 90px;
            border: none;
        }
        p{
            text-align: center;
        }
    }
}
</style>
