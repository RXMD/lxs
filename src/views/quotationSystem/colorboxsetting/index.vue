<template>
  <transition name="el-zoom-in-center">
    <div class="content-box">
      <el-tabs v-model="colorBoxSettingTab" type="border-card">
        <el-tab-pane label="彩盒参数" name="parameterSetting">
          <color-box-parameters :tab="colorBoxSettingTab" />
        </el-tab-pane>
        <el-tab-pane label="彩盒印刷机" name="printingMachineParameterSettings">
          <printing-machine-setting :tab="colorBoxSettingTab" />
        </el-tab-pane>
        <el-tab-pane label="彩盒纸张" name="paperSetting">
          <paper-setting :tab="colorBoxSettingTab" />
        </el-tab-pane>
        <el-tab-pane label="彩盒后工" name="postWorkSettings">
          <post-work-setting :tab="colorBoxSettingTab" />
        </el-tab-pane>
      </el-tabs>
      <div class="padding1" />
    </div>
  </transition>
</template>

<script>
import ColorBoxParameters from './colorBoxParameters.vue'
import PrintingMachineSetting from './printingmachinesetting.vue'
import PaperSetting from './paperSetting.vue'
import PostWorkSetting from './postWorkSetting.vue'

export default {
  name: 'Colorboxsetting',
  components: {
    ColorBoxParameters,
    PrintingMachineSetting,
    PaperSetting,
    PostWorkSetting
  },
  data() {
    return {
      colorBoxSettingTab: 'parameterSetting'
    }
  },
  watch: {},
  created() {},
  methods: {}
}
</script>
