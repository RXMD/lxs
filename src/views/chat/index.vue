<template>
  <div class="chat">
    <div class="header">
      <img src="../../assets/image/login_logo.png" alt="">
    </div>
    <div class="chat_content">
      <div class="chat_left">
        <el-input v-model="keyWord" class="search" placeholder="Search">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <div class="recent_list">
          <h5>Recent Chat</h5>
          <ul class="avtorList">
            <li v-for="item in filterOnlineList" :key="item.id">
              <el-badge :class="{ item: item.IsOnline }">
                <el-tooltip class="item" effect="dark" :content="item.UserName" placement="top-center">
                  <img src="../../assets/image/avtor.png" alt="" @click="handleClick(item)">
                </el-tooltip>
              </el-badge>
            </li>
          </ul>
          <h5>My Chat List</h5>
          <ul class="chatList scrollbar">
            <li
              v-for="(item, index) in chatList"
              :key="index"
              :class="[index === activeIndex ? 'active' : '']"
              @click="handleClick(item, index)"
            >
              <img src="../../assets/image/avtor.png" alt="">
              <div class="chatInfo">
                <div class="name">{{ item.UserName }}</div>
                <div v-if="item.MessageType === 0" class="msg">
                  {{ item.Message }}
                </div>
                <div v-if="item.MessageType === 1" class="msg">[文件]</div>
                <div v-if="item.MessageType === 2" class="msg">[图片]</div>
              </div>
              <div class="time">
                {{ item.time }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="chat_right">
        <div class="head">
          <img src="@/assets/image/avtor.png" class="avtor" alt="">
          <div class="chatInfo">
            <div class="name">online</div>
            <div class="msg">{{ activeUser.UserName }}</div>
          </div>
          <img src="../../assets/image/more.png" alt="">
        </div>
        <div class="msgcontent">
          <div ref="msgListRef" class="msgList scrollbar" @scroll="scroll">
            <Msg v-for="(item, index) in msgList" :key="index" :msg="item" />
          </div>
          <div class="actionSvg">
            <Emoji @getEmo="chooseEmo($event, 'visitor')" />
            <!-- <el-tooltip class="item" effect="dark" content="发送表情" placement="top-start"><svg-icon iconClass="emoji"></svg-icon></el-tooltip> -->
            <el-tooltip class="item" effect="dark" content="发送图片" placement="top-start">
              <svg-icon icon-class="photo" @click="chooseImg(2)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="发送文件" placement="top-start">
              <svg-icon icon-class="file" @click="chooseImg(1)" />
            </el-tooltip>
          </div>
          <div class="sendInput">
            <el-input
              v-model="msg"
              class="textarea"
              :autosize="{ maxRows: 4 }"
              type="textarea"
              @keydown.native="handleKeyCode($event)"
            >
              <template #icon>
                <img src="../../assets/image/send.png" alt="">
              </template>
            </el-input>
            <el-button
              type="warning"
              color="#F79552"
              class="btn"
              size="large"
              circle
              icon="el-icon-s-promotion"
              @click="sendMsg(false, false)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Emoji from './emoji.vue'
import Msg from './msg.vue'
import { parseTime } from '@/utils'
import * as signalR from '@microsoft/signalr'
import { getToken } from '@/utils/auth'
export default {
  name: 'Chat',
  components: {
    Msg,
    Emoji
  },
  data() {
    return {
      keyWord: '',
      activeIndex: 0,
      connection: null,
      msg: '',
      activeUser: {},
      msgList: [],
      chatList: [],
      onlineList: [],
      pageSize: 60,
      total: 0,
      pageIndex: 1,
      showMore: false,
      lastScrollHeight: 0
    }
  },
  computed: {
    filterOnlineList() {
      if (this.keyWord.trim()) {
        const key = this.keyWord.toLowerCase()
        return this.onlineList.filter(
          (item) => item.UserName && item.UserName.toLowerCase().includes(key)
        )
      }
      return this.onlineList
    },
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  created() {
    this.ConnectService()
  },
  methods: {
    scroll(e) {
      if (e.target.scrollTop < 1) {
        if (this.total > this.msgList.length) {
          if (!this.showMore) {
            this.showMore = true
            this.pageIndex++
            this.PushMessageHistoryList()
          }
        }
      }
    },
    chooseImg(type) {
      const input = document.createElement('input')
      input.type = 'file'
      if (type === 2) {
        input.accept = '.png,.jpg,.jpeg,.gif'
      }
      input.onchange = async() => {
        console.log(input.files)
        if (!input.files || !input.files.length) return
        const file = input.files[0]
        console.log(file)
        const { size } = file
        if (size > 1024 * 1024 * 4) {
          this.$message({
            message: '文件超过4M限制，请重新选择',
            type: 'warning'
          })
          return false
        }
        const formData = new FormData()
        formData.append('file', file)
        formData.append('bizType', 'onlinechat')
        formData.append('bizId', this.userInfo.id)
        // 发送上传请求
        axios
          .post(
            `${process.env.VUE_APP_BASE_API}/Res/Resource/UploadFolder`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data;charset=UTF-8',
                'Authorization': getToken() ? `Bearer ${getToken()}` : ''
              }
            }
          )
          .then((res) => {
            if (res && res.data.code === 200) {
              const { domainName, visitPath, fileName, extendName } =
                res.data.data
              const imgType = ['.png', '.jpg', '.jpeg', '.gif']
              if (imgType.includes(extendName)) {
                this.sendMsg(domainName + visitPath + fileName + extendName, 2)
              } else {
                this.sendMsg(JSON.stringify(res.data.data), 1)
              }
            }
          })
          .catch(() => {
            this.$message({
              message: '图片发送失败，请重试',
              type: 'warning'
            })
          })
      }
      input.click()
    },
    chooseEmo(role, emo) {
      this.msg += role
    },
    handleClick(item, index) {
      if (item.UserId === this.activeUser.UserId) {
        return
      }
      if (index >= 0) {
        this.activeIndex = index
      }
      this.pageIndex = 1
      this.activeUser = item
      this.showMore = false
      this.msgList = []
      this.PushMessageHistoryList()
    },
    sendMsg(url, type) {
      if (!this.msg && !url) {
        this.$message.warning('请输入内容!')
        return
      }
      const now = parseTime(new Date())
      this.connection
        .invoke(
          'SendMessage',
          this.activeUser.ConnectionId,
          this.activeUser.UserId,
          url || this.msg,
          type || 0,
          now
        )
        .then((a) => { })
      this.msgList.push({
        Message: url || this.msg,
        ClientSendTime: now,
        SenderUserId: this.userInfo.id,
        MessageType: type || 0
      })
      if (!url) {
        this.msg = ''
      }
      this.$nextTick(() => {
        this.$refs.msgListRef.scrollTop = this.$refs.msgListRef.scrollHeight
      })
    },
    handleKeyCode(event) {
      if (event.keyCode === 13) {
        if (!event.ctrlKey) {
          event.preventDefault()
          this.sendMsg(false, false)
        } else {
          this.msg += '\n'
        }
      }
    },
    // 网络连接服务端
    ConnectService: function() {
      console.log('---------------------1、建立网络连接-----------------')
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${process.env.VUE_APP_BASE_API}/Chat`)
        .build()
      console.log(
        '---------------------2、绑定服务端推送消息方法-----------------'
      )
      this.connection.on('ReceivedMessage', this.ReceivedMessage)
      this.connection.on('GetOnLineUser', this.GetOnLineUser)
      this.connection.on('GetChatList', this.GetChatList)
      this.connection.on('GetMessageHistoryList', this.GetMessageHistoryList)
      this.connection.onclose(async(data) => {
        this.connection.start()
        this.Login()
      })
      this.connection.start()
    },

    // 调用服务端登录
    Login() {
      console.log(this.userInfo, 'ooooooooooooooo', Number(this.userInfo.id), this.userInfo.userName)
      this.connection
        .invoke(
          'Login',
          Number(this.userInfo.id),
          this.userInfo.userName,
          'token',
          0,
          0
        )
        .then((a) => {
          this.isLogin = true
          console.log(a)
        })
      this.PushChatList()
    },

    // 客户端收到服务端推送的在线用户数据
    GetOnLineUser: function(data) {
      console.log(data, '客户端收到服务端推送的在线用户数据')
      this.onlineList = data
    },

    // 客户端收到服务端推送的消息
    ReceivedMessage: function(data) {
      console.log('收到消息', data)
      if (data.Type === 4) {
        this.Login()
      } else {
        if (data.SenderUserId === this.activeUser.UserId) {
          this.msgList.push({
            Message: data.Data,
            MessageType: data.Type || 0,
            ...data
          })
          console.log(
            this.$refs.msgListRef.scrollHeight,
            this.$refs.msgListRef.scrollTop,
            'ooooooooooooooooo'
          )
          if (
            this.$refs.msgListRef.scrollHeight -
            this.$refs.msgListRef.scrollTop <
            800
          ) {
            this.$nextTick(() => {
              this.$refs.msgListRef.scrollTop =
                this.$refs.msgListRef.scrollHeight
            })
          }
        }
      }
    },

    // 客户端收到服务端推送的聊天人列表数据
    GetChatList: function(data) {
      console.log(data, '客户端收到服务端推送的聊天人列表数据')
      if (data && data.length) {
        this.chatList = data
        if (Object.keys(this.activeUser).length === 0) {
          this.activeUser = data[0]
          this.activeIndex = 0
          this.PushMessageHistoryList()
        }
      }
    },

    // 客户端收到服务端推送的聊天列表数据
    GetMessageHistoryList: function(data) {
      console.log(
        '-----------------客户端收到服务端推送的聊天列表数据-----------------------',
        data
      )
      console.log()
      if (data) {
        if (data.Data) {
          this.total = data.Total
          this.msgList.unshift(...data.Data)
          console.log(this.pageIndex)
          if (this.pageIndex === 1) {
            this.$nextTick(() => {
              this.$refs.msgListRef.scrollTop =
                this.$refs.msgListRef.scrollHeight
              this.lastScrollHeight = this.$refs.msgListRef.scrollHeight
            })
          } else {
            this.$nextTick(() => {
              const height = this.$refs.msgListRef.scrollHeight
              console.log(
                this.lastScrollHeight,
                'ooooooooooooooooooooooooooooooo',
                height
              )
              this.$refs.msgListRef.scrollTop = height - this.lastScrollHeight
              this.lastScrollHeight = height
              this.showMore = false
            })
          }
        }
      }
    },

    // 手动拉取 聊天人列表数据
    PushChatList() {
      this.connection.invoke('PushChatList', Number(this.userInfo.id), 0).then((a) => {
        console.log(a)
      })
    },

    // 手动拉取 聊天记录列表数据
    PushMessageHistoryList() {
      console.log(parseInt(this.userInfo.id), this.activeUser.UserId)
      this.connection
        .invoke(
          'PushMessageHistoryList',
          this.pageIndex,
          this.pageSize,
          parseInt(this.userInfo.id),
          this.activeUser.UserId
        )
        .then((data) => {
          console.log(data)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.chat {
  width: 100%;
  height: 100%;
  padding: 6% 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: #f5f9f9;
  background-image: url(../../assets/image/chat.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .header {
    margin-bottom: 12px;
    width: 60%;
    min-width: 1000px;
  }

  .chat_content {
    display: flex;
    width: 60%;
    height: 100%;
    min-width: 1100px;

    .chat_right {
      flex: 1;
      height: 100%;
      background-color: #fff;
      display: flex;
      display: flex;
      flex-direction: column;

      .head {
        height: 90px;
        width: 100%;
        border-bottom: 1px dashed #dbdbdb;
        display: flex;
        align-items: center;
        padding: 0 32px;
        box-sizing: border-box;

        .avtor {
          width: 42px;
          height: 42px;
        }

        .chatInfo {
          flex: 1;
          padding: 24px 12px;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .msg {
            color: #000;
            font-size: 14px;
            font-weight: bold;
          }

          .name {
            color: #6a6a6a;
            font-size: 14px;
          }
        }

        .time {
          font-size: 14px;
          color: #bbbbbb;
        }
      }

      .msgcontent {
        flex: 1;
        padding: 38px;
        padding-right: 28px;
        padding-bottom: 12px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        .msgList {
          flex: 1 auto;
          overflow-y: auto;
          height: 0;
          padding-right: 10px;
          @include scrollBar;
        }

        .actionSvg {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          .svg-icon {
            width: 20px;
            height: 20px;
            margin-right: 20px;
          }
        }

        .sendInput {
          display: flex;
          min-height: 40px;
          width: 100%;

          .btn {
            margin-left: 20px;
            padding: 6px;

            ::v-deep .el-icon-s-promotion {
              font-size: 28px;
            }
          }

          .textarea {
            ::v-deep .el-textarea__inner {
              resize: none;
              min-height: 40px !important;
            }
          }
        }
      }
    }

    .chat_left {
      width: 400px;
      height: 100%;
      display: flex;
      flex-direction: column;

      .search {
        ::v-deep .el-input__inner {
          background-color: transparent;
        }

        :deep(.el-input__wrapper) {
          box-shadow: unset;
          border-bottom: 1px dashed #b9b9b9;
          background-color: transparent;
        }
      }

      .recent_list {
        flex: 1;
        display: flex;
        flex-direction: column;

        h5 {
          margin: 8px 0;
          font-size: 16px;
        }

        .avtorList {
          display: flex;
          margin-bottom: 12px;
          list-style: none;

          &>li {
            margin-right: 4px;

            .item {
              ::v-deep .el-badge__content.is-fixed {
                display: block !important;
                border-radius: 50%;
                width: 6px;
                top: 5px;
                right: 18px;
                background-color: #1ed85c;
                padding: 0 7px;
              }
            }
          }
        }

        .chatList {
          background: #fff;
          flex: 1;
          overflow-y: auto;
          padding-left: 0;
          margin: 0;

          &>li {
            width: 100%;
            height: 70px;
            background: #fff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            box-sizing: border-box;
            box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.1);

            &.active {
              background: #1a2256;

              .chatInfo {
                .name {
                  color: #fff;
                }

                .msg {
                  color: #fff;
                }
              }

              .time {
                color: #fff;
              }
            }

            img {
              width: 42px;
              height: 42px;
            }

            .chatInfo {
              flex: 1;
              padding: 17px 12px;
              height: 100%;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .name {
                color: #000;
                font-size: 14px;
                font-weight: bold;
              }

              .msg {
                color: #6a6a6a;
                font-size: 14px;
                width: 100%;
                overflow: hidden; // 溢出的内容隐藏
                text-overflow: ellipsis; // 溢出的部分用省略号...显示
                -webkit-line-clamp: 1; // 行数
                display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
                -webkit-box-orient: vertical;
              }
            }

            .time {
              font-size: 14px;
              color: #bbbbbb;
            }
          }
        }
      }
    }
  }
}
</style>
