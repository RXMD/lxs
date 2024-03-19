<template>
  <div class="chatIcon">
    <el-tooltip class="item" effect="dark" content="发送表情" placement="top-start">
      <el-popover placement="top-start" width="400" trigger="click">
        <div class="emotionList">
          <a
            v-for="(item, index) in faceList"
            :key="index"
            href="javascript:void(0);"
            class="emotionItem"
            @click="getEmo(index)"
          >{{ item }}</a>
        </div>
        <svg-icon
          slot="reference"
          icon-class="emoji"
          style="width: 20px; height: 20px; margin-right: 20px;"
        />
      </el-popover>
    </el-tooltip>
  </div>
</template>
<script>
import emojiData from '@/assets/emoji.json'
export default {
  data() {
    return {
      faceList: []
    }
  },
  mounted() {
    for (const i in emojiData) {
      this.faceList.push(emojiData[i].char)
    }
  },
  methods: {
    getEmo(index) {
      this.$emit('getEmo', this.faceList[index])
    }
  }
}
</script>

<style scoped>
.chatIcon {
    font-size: 25px;
}

.emotionList {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
}

.emotionItem {
    width: 10%;
    font-size: 20px;
    text-align: center;
}

/*包含以下四种的链接*/
.emotionItem {
    text-decoration: none;
}

/*正常的未被访问过的链接*/
.emotionItem:link {
    text-decoration: none;
}

/*已经访问过的链接*/
.emotionItem:visited {
    text-decoration: none;
}

/*鼠标划过(停留)的链接*/
.emotionItem:hover {
    text-decoration: none;
}

/* 正在点击的链接*/
.emotionItem:active {
    text-decoration: none;
}
</style>
