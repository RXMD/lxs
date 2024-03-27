import { login, logout, getInfo, UserMenu } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter, asyncRoutes } from '@/router'
let checkedKeys = []
function getCodes(tree) {
  tree.forEach(item => {
    if (item.checked) {
      checkedKeys.push(item.menuCode)
    }
    if (item.children && item.children.length) {
      getCodes(item.children)
    }
  })
}

function getRouters(tree) {
  tree.forEach((item) => {
    if (checkedKeys.includes(item.menuCode)) {
      item.hidden = false
    } else {
      item.hidden = true
    }
    if (item.children && item.children.length) {
      getRouters(item.children)
    }
  })
}
const state = {
  token: getToken(),
  name: '周涛',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  introduction: '我是周涛',
  roles: ['admin'],
  // userInfo: {
  //   "id": 518161268539461,
  //   "userName": "yeao",
  //   "realName": "yeao",
  //   "eMail": "1232@qq.com",
  //   "sex": 1,
  //   "sexText": "女",
  //   "isMain": true,
  //   "mainText": "主账号",
  //   "tenantId": null
  // },
  userInfo: {
    // 'id': 518161268539461,
    // 'userName': 'yeao',
    // 'realName': 'yeao',
    // 'eMail': '1232@qq.com',
    // 'sex': 1,
    // 'sexText': '女',
    // 'isMain': true,
    // 'mainText': '主账号',
    // 'tenantId': null
  },
  routers: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROUTERS: (state, data) => {
    state.routers = data
    checkedKeys = []
    getCodes(data)
    getRouters(asyncRoutes)
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERROUTERS: (state, data) => {
    console.log(routers, asyncRoutes)
    state.routers = data
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), passWord: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRoutes({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      UserMenu(state.userInfo.id, state.userInfo.tenantId).then(response => {
        if (response.code === 200) {
          commit('SET_ROUTERS', response.data)
          resolve(response.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  async getInfo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(async response => {
        const { data } = response
        commit('SET_USERINFO', data)
        localStorage.setItem('userInfo', JSON.stringify(data))
        const routers = await dispatch('getRoutes')
        resolve(routers)
        if (!data) {
          reject('Verification failed, please Login again.')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_USERINFO', {})
      localStorage.removeItem('userInfo')
      removeToken()
      // resetRouter()
      // dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()

      //   // reset visited views and cached views
      //   // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      //   dispatch('tagsView/delAllViews', null, { root: true })

      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
