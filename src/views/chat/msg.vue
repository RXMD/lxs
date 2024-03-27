<template>
  <div v-if="msg.SenderUserId === userInfo.id" class="sendmsg">
    <div class="msg">
      <el-image
        v-if="msg.MessageType === 2"
        class="msgImg"
        :src="msg.Message"
        :preview-src-list="[msg.Message]"
      />
      <div
        v-else-if="msg.MessageType === 1 && isJson(msg.Message)"
        class="file"
        @click="download(msg.Message)"
      >
        <svg-icon
          icon-class="file1"
          style="width: 30px; height: 30px; color: #8b8b8b"
        />
        <div class="file-info">
          <p>{{ getFile(msg.Message, "original") }}</p>
          <span>{{ getFile(msg.Message, "fileSize") }}</span>
        </div>
      </div>
      <!-- <img class="msgImg" :src="msg.Message" alt="" v-if="msg.MessageType === 2"> -->
      <div v-else class="text">{{ msg.Message }}</div>
      <div class="time">{{ getTimeStr(msg.ClientSendTime) }}</div>
    </div>
    <img class="avatar" src="../../assets/image/avtor.png" alt="">
  </div>
  <div v-else class="receivemsg">
    <img class="avatar" src="../../assets/image/avtor.png" alt="">
    <div class="msg">
      <el-image
        v-if="msg.MessageType === 2"
        class="msgImg"
        :src="msg.Message"
        :preview-src-list="[msg.Message]"
      />
      <div
        v-else-if="msg.MessageType === 1 && isJson(msg.Message)"
        class="file"
        @click="download(msg.Message)"
      >
        <svg-icon
          icon-class="file1"
          style="width: 30px; height: 30px; color: #8b8b8b"
        />
        <div class="file-info">
          <p>{{ getFile(msg.Message, "original") }}</p>
          <span>{{ getFile(msg.Message, "fileSize") }}</span>
        </div>
      </div>
      <!-- <img class="msgImg" :src="msg.Message" alt="" v-if="msg.MessageType === 2"> -->
      <div v-else class="text">{{ msg.Message }}</div>
      <div class="time">{{ getTimeStr(msg.ClientSendTime) }}</div>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  name: 'Msg',
  props: {
    msg: Object
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    isJson(str) {
      try {
        JSON.parse(str)
        return true
      } catch (e) {
        return false
      }
    },
    download(data) {
      const params = JSON.parse(data)
      const { domainName, visitPath, fileName, extendName } = params
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none' // 防止影响页面
      iframe.style.height = 0 // 防止影响页面
      iframe.src = `${domainName}${visitPath}${fileName}${extendName}` // 下载url
      document.body.appendChild(iframe) // 这一行必须，iframe挂在到dom树上才会发请求
      setTimeout(function() {
        // iframe.remove();
        document.body.removeChild(iframe)
      }, 100)
      // window.open(`${domainName}${visitPath}${fileName}${extendName}`);
    },
    getFile(data, type) {
      try {
        const params = JSON.parse(data)
        return params[type]
      } catch (error) {
        console.log(error)
      }
    },
    getTimeStr(time) {
      return parseTime(new Date(time))
    }
  }
}
</script>
<style lang="scss" scope>
.sendmsg {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
  padding-left: 30px;
  box-sizing: border-box;
  .avatar {
    width: 42px;
    height: 42px;
    margin-left: 8px;
  }
  .msg {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .file {
      cursor: pointer;
      border-radius: 8px;
      width: 260px;
      height: 80px;
      background: #cfe2f7;
      display: flex;
      align-items: center;
      padding: 0 12px;
      .file-info {
        flex: 1;
        margin-left: 8px;
        p {
          width: 100%;
          font-size: 14px;
          overflow: hidden; // 溢出的内容隐藏
          text-overflow: ellipsis; // 溢出的部分用省略号...显示
          -webkit-line-clamp: 2; // 行数
          display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
          -webkit-box-orient: vertical;
        }
        span {
          color: #6666;
          font-size: 12px;
          margin-top: 6px;
        }
      }
    }
    .msgImg {
      border-radius: 6px;
      cursor: pointer;
      display: inline-block;
      max-height: 500px;
      max-width: 60%;
    }
    .time {
      text-align: right;
      color: #b8b8b8;
      font-size: 12px;
      margin-top: 6px;
    }
    .text {
      background-color: #cfe2f7;
      padding: 12px;
      border-radius: 6px;
      color: #2b2b2b;
      font-size: 14px;
      width: fit-content;
    }
  }
}
.receivemsg {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;
  padding-right: 30px;
  box-sizing: border-box;
  .avatar {
    width: 42px;
    height: 42px;
    margin-right: 8px;
  }
  .msg {
    .file {
      cursor: pointer;
      border-radius: 8px;
      width: 260px;
      height: 80px;
      background: #cfe2f7;
      display: flex;
      align-items: center;
      padding: 0 12px;
      .file-info {
        flex: 1;
        margin-left: 8px;
        p {
          width: 100%;
          font-size: 14px;
          overflow: hidden; // 溢出的内容隐藏
          text-overflow: ellipsis; // 溢出的部分用省略号...显示
          -webkit-line-clamp: 2; // 行数
          display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
          -webkit-box-orient: vertical;
        }
        span {
          color: #6666;
          font-size: 12px;
          margin-top: 6px;
        }
      }
    }
    .msgImg {
      border-radius: 6px;
      cursor: pointer;
      display: inline-block;
      max-height: 500px;
      max-width: 60%;
    }
    .time {
      color: #b8b8b8;
      font-size: 12px;
      margin-top: 6px;
    }
    .text {
      background-color: #cfe2f7;
      padding: 12px;
      border-radius: 6px;
      color: #2b2b2b;
      font-size: 14px;
    }
  }
}
</style>
