<template>
  <div v-loading="loading" class="YZ-common-layout-form mini-form">
    11111 普通报价，未完成------------------------------
    <div class="product-form h-97">
      <div class="product-form-box">
        <div class="product-images">
          <el-row>
            <div class="grid-content1 bg-purple-dark1">
              <img :src="bigimg" alt="">
            </div>
          </el-row>
          <el-row class="img-box m-t-10">
            <span style="width:50;height:50px;display:flex;align-items:center;">
              <img src="./leftArrows.png" alt="" class="cursor-pointer" @click="toright()">
            </span>
            <div style="display: flex;flex:1;overflow:auto;align-items:center;flex-flow:nowrap;">
              <img v-for="(item, index) in bigimgList" :key="index" :src="item.imgsrc" alt="" width="50" height="50" class="cursor-pointer m-l-5" @click="imgClick(index)">
            </div>
            <span style="width:50;height:50px;display:flex;align-items:center;">
              <img src="./rightArrows.png" alt="" class="cursor-pointer" @click="toleft()">
            </span>
          </el-row>
        </div>
        <div class="product-info-form h-100 form-right-box">
          <div class="grid-content1 bg-purple-dark">
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label" style="flex-direction: column;">
                  <span>产品选择</span>
                  <el-select v-model="form.sBoxType" size="mini" placeholder="请选择" @change="changeBoxTypePID">
                    <el-option v-for="item in boxTypeOptions" :key="item.name" :label="item.name" :value="item.name" />
                  </el-select>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12 text-left">
                  <el-radio-group v-model="form.sBoxName" class="type-radios" size="mini" @change="changeBoxType">
                    <el-radio v-for="item in boxTypeList" :key="item.name" :label="item.name" border>{{ item.name }}</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
            </el-row>
            <!-- 展开尺寸 -->
            <el-row v-if="haveTableParams('展开尺寸')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">展开尺寸</div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple-dark fz-12">
                  <el-input v-model="form.dSizeLength" size="mini" />
                  *
                  <el-input v-model="form.dSizeWidth" size="mini" @input="dSizeWidthChange" />
                  MM
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple-dark fz-12">
                  <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">要求精准</el-checkbox>
                </div>
              </el-col>
            </el-row>
            <!-- 尺寸 -->
            <el-row v-if="haveTableParams('尺寸')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">尺寸</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12">
                  长
                  <el-input v-model="form.dSizeLength" size="mini" />
                  * 宽
                  <el-input v-model="form.dSizeWidth" size="mini" @input="dSizeWidthChange" />
                  * 高
                  <el-input v-model="form.dSizeHigh" size="mini" />
                  MM
                </div>
              </el-col>
            </el-row>
            <!-- 成品尺寸 -->
            <el-row v-if="haveTableParams('成品尺寸')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">成品尺寸</div>
              </el-col>
              <el-col :span="haveExtraParams('成品尺寸', '拼板间距') ? 10 : 20">
                <div class="grid-content bg-purple-dark fz-12">
                  宽
                  <el-input v-model="form.dSizeWidth" size="mini" @input="dSizeWidthChange" />
                  * 长
                  <el-input v-model="form.dSizeHigh" size="mini" />
                  MM
                </div>
              </el-col>
              <el-col v-if="haveExtraParams('成品尺寸', '拼板间距')" :span="10">
                <div class="grid-content bg-purple-dark fz-12">
                  <span>拼板间距</span>
                  <el-input v-model="form.dSizeWidth" size="mini" @input="dSizeWidthChange" />
                  MM
                </div>
              </el-col>
            </el-row>
            <!-- 数量 -->
            <el-row v-if="haveTableParams('数量')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">数量</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12">
                  <el-input v-model="form.dQty" size="mini" />
                  <div v-if="haveExtraParams('数量', '每副卡牌数量')">
                    每副卡牌数量：
                    <el-input v-model="form.dQty" size="mini" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <!-- 类型 -->
            <!-- TODO:仅模切板和拼图有类型，仅模切板的类型为特殊，考虑单独写个组件处理，待定 -->
            <el-row v-if="haveTableParams('类型')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">类型</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12">
                  <!-- 模切板 -->
                  <el-radio-group v-if="form.sBoxName === '模切板'" v-model="radioType" @change="radioTypeChange">
                    <el-radio-button label="三层模切板" />
                    <el-radio-button label="五层模切板" />
                    <el-radio-button label="七层模切板" />
                  </el-radio-group>
                  <!-- 拼图 -->
                  <el-radio-group v-if="form.sBoxName === '拼图'" v-model="radioType" @change="radioTypeChange">
                    <el-radio-button label="二层拼图" />
                    <el-radio-button label="三层拼图" />
                  </el-radio-group>
                </div>
              </el-col>
            </el-row>
            <!-- 类型切换展示 ↓ ---------------------- -->
            <!-- 两层板 -->
            <el-row v-if="['五层模切板', '七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label" style="color:red">两层板</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12" />
              </el-col>
            </el-row>
            <!-- 面纸 -->
            <el-row v-if="['五层模切板', '七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">面纸</div>
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 中间加厚 -->
            <el-row v-if="['五层模切板', '七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">中间加厚</div>
              </el-col>
              <el-col :span="20">
                <el-row v-for="( item, index ) in dataArr " :key="index">
                  <el-col :span="20">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <span>材料</span>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-button v-if="index === 0" type="primary" size="mini" icon="el-icon-plus" @click="addMiddleParams()" />
                      <el-button v-if="index !== 0" type="primary" size="mini" icon="el-icon-close" @click="delMiddleParams(index)" />
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 后道工序 -->
            <el-row v-if="['五层模切板', '七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">后道工序</div>
              </el-col>
              <el-col :span="20">
                <el-row style="flex-wrap:wrap;">
                  <el-col :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      冲床
                    </el-checkbox>
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      模切
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessCutting" v-model="form.sAfterProcessCuttingName" size="mini" @change="changeAfterProcessCuttingName">
                      <el-option v-for="( item, idx ) in optionConfig.cuttingTemplateDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      自填刀模费
                    </el-checkbox>
                    <el-input
                      v-show="form.bAfterProcessCutting"
                      v-model="form.dAfterProcessCuttingAmount"
                      v-Int
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      style="width: 50px"
                      size="mini"
                    />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 三层板 -->
            <el-row v-if="['三层模切板', '五层模切板', '七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label" style="color:red">三层板</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12" />
              </el-col>
            </el-row>
            <!-- 面纸 -->
            <el-row v-if="['三层模切板', '五层模切板', '七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">面纸</div>
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 中间加厚 -->
            <el-row v-if="['三层模切板', '五层模切板', '七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">中间加厚</div>
              </el-col>
              <el-col :span="20">
                <el-row v-for="( item, index ) in dataArr " :key="index">
                  <el-col :span="20">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <span>材料</span>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-button v-if="index === 0" type="primary" size="mini" icon="el-icon-plus" @click="addMiddleParams()" />
                      <el-button v-if="index !== 0" type="primary" size="mini" icon="el-icon-close" @click="delMiddleParams(index)" />
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 背纸 -->
            <el-row v-if="['三层模切板', '五层模切板', '七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">背纸</div>
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">印刷</el-checkbox>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 后道工序 -->
            <el-row v-if="['三层模切板', '五层模切板', '七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">后道工序</div>
              </el-col>
              <el-col :span="20">
                <el-row style="flex-wrap:wrap;">
                  <el-col v-if="haveExtraParams('后道工序', '设计')" :span="24" class="grid-content fz-12">
                    <el-checkbox v-model="form.bAfterProcessMyDesiger" size="mini">设计</el-checkbox>
                    <el-select v-show="form.bAfterProcessMyDesiger" v-model="form.sAfterProcessMyDesigerName" size="mini">
                      <el-option label="简单" value="简单" />
                      <el-option label="一般" value="一般" />
                      <el-option label="复杂" value="复杂" />
                    </el-select>
                  </el-col>
                  <el-col :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      冲床
                    </el-checkbox>
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      模切
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessCutting" v-model="form.sAfterProcessCuttingName" size="mini" @change="changeAfterProcessCuttingName">
                      <el-option v-for="( item, idx ) in optionConfig.cuttingTemplateDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      自填刀模费
                    </el-checkbox>
                    <el-input
                      v-show="form.bAfterProcessCutting"
                      v-model="form.dAfterProcessCuttingAmount"
                      v-Int
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      style="width: 50px"
                      size="mini"
                    />
                  </el-col>
                  <el-col :span="12" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      正面压纹
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessBackSurface" v-model="form.sAfterProcessBackSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                  <el-col :span="12" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      背面压纹
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessBackSurface" v-model="form.sAfterProcessBackSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                  <el-col :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessHotGold"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_HotGold', 'hotGoldDataSourceList')"
                    >
                      烫金
                    </el-checkbox>

                    <p v-if="form.bAfterProcessHotGold" class="flex-row ml-10">
                      <el-select v-model="form.sAfterProcessHotGoldName" size="mini">
                        <el-option v-for="( item, idx ) in optionConfig.hotGoldDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                      </el-select>
                      长
                      <el-input v-model="form.dAfterProcessHotGoldLength" style="width: 50px" size="mini" />
                      宽
                      <el-input v-model="form.dAfterProcessHotGoldWidth" style="width: 50px" size="mini" />
                    </p>
                  </el-col>

                  <el-col :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <div class="flex-row fz-12">
                      <el-checkbox
                        v-model="form.bAfterProcessLocalUV"
                        size="mini"
                        @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_LocalUV', 'localUVDataSourceList')"
                      >
                        局部UV
                      </el-checkbox>
                      <p v-if="form.bAfterProcessLocalUV" class="flex-row ml-10">
                        <el-select v-model="form.sAfterProcessLocalUVName" size="mini">
                          <el-option v-for="( item, idx ) in optionConfig.localUVDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                        </el-select>
                        长
                        <el-input v-model="form.dAfterProcessLocalUVLength" style="width: 50px" size="mini" />
                        宽
                        <el-input v-model="form.dAfterProcessLocalUVWidth" style="width: 50px" size="mini" />
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox v-model="form.bAfterProcessOtherAfter" size="mini">其他后工</el-checkbox>
                    <el-popover placement="right" width="410" trigger="click">
                      <div style="padding-bottom: 20px">
                        <el-table v-show="form.bAfterProcessOtherAfter" class="mini-form" :data="otherPostWorkersEachData" size="mini">
                          <el-table-column width="300" label="设置（说明：要设置多其他后工请单击右边按钮）">
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.sName" size="mini" @change="value => changeAfterProcessName(value, scope.row)">
                                <el-option v-for="( item, idx ) in optionConfig.otherAfterDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                              </el-select>
                              <template v-if="scope.row.sUnitName == '元/个'">
                                <el-input v-model="scope.row.dQty" style="width: 50px" size="mini" />
                                个
                              </template>
                              <template v-if="scope.row.sUnitName == '元/㎡'">
                                长
                                <el-input v-model="scope.row.dLength" style="width: 50px" size="mini" />
                                宽
                                <el-input v-model="scope.row.dWidth" style="width: 50px" size="mini" />
                              </template>
                            </template>
                          </el-table-column>

                          <el-table-column width="80" align="center" label="操作">
                            <template slot-scope="scope">
                              <el-button type="success" size="mini" icon="el-icon-plus" circle class="v-mini-btn" @click.stop="addOtherPostRow" />
                              <el-button type="danger" size="mini" icon="el-icon-close" circle class="v-mini-btn" @click.stop="removeOtherPostRow(scope.$index)" />
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>

                      <el-button v-show="form.bAfterProcessOtherAfter" slot="reference" size="mini" class="m-l-5" @click="showpopover">设置</el-button>
                    </el-popover>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 背面两层板-------------- -->
            <el-row v-if="['七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label" style="color:red">背面两层板</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12" />
              </el-col>
            </el-row>
            <!-- 面纸 -->
            <el-row v-if="['七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">面纸</div>
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 中间加厚 -->
            <el-row v-if="['七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">中间加厚</div>
              </el-col>
              <el-col :span="20">
                <el-row v-for="( item, index ) in dataArr " :key="index">
                  <el-col :span="20">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <span>材料</span>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-button v-if="index === 0" type="primary" size="mini" icon="el-icon-plus" @click="addMiddleParams()" />
                      <el-button v-if="index !== 0" type="primary" size="mini" icon="el-icon-close" @click="delMiddleParams(index)" />
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 后道工序 -->
            <el-row v-if="['七层模切板'].includes(radioType)">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">后道工序</div>
              </el-col>
              <el-col :span="20">
                <el-row style="flex-wrap:wrap;">

                  <el-col :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      冲床
                    </el-checkbox>
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      模切
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessCutting" v-model="form.sAfterProcessCuttingName" size="mini" @change="changeAfterProcessCuttingName">
                      <el-option v-for="( item, idx ) in optionConfig.cuttingTemplateDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      自填刀模费
                    </el-checkbox>
                    <el-input
                      v-show="form.bAfterProcessCutting"
                      v-model="form.dAfterProcessCuttingAmount"
                      v-Int
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      style="width: 50px"
                      size="mini"
                    />
                  </el-col>
                </el-row>
                <el-row style="flex-wrap:wrap;">
                  <el-col :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      背面压纹
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessBackSurface" v-model="form.sAfterProcessBackSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 拼图 -->

            <!-- 类型切换展示 结束---------------------- -->

            <!-- 每套数量 -->
            <el-row v-if="haveTableParams('每套数量')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">每套数量</div>
              </el-col>
              <el-col :span="20" style="flex-wrap:wrap;">
                <el-row v-for="( item, index ) in everyCount " :key="index">
                  <el-col :span="3" class="grid-content bg-purple-dark fz-12">
                    <span>第{{ index + 1 }}款</span>
                  </el-col>
                  <el-col :span="18" class="grid-content bg-purple-dark fz-12">
                    数量
                    <el-input v-model="form.dQty" size="mini" />
                    备注
                    <el-input v-model="form.dQty" size="mini" />
                  </el-col>
                  <el-col :span="4" class="grid-content bg-purple-dark fz-12">
                    <el-button type="primary" size="mini" @click="addEveryCount(index)">+</el-button>
                    <el-button v-if="index + 1 === everyCount.length" type="primary" size="mini" icon="el-icon-delete" @click="delEveryCount(index)" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 材料 -->
            <el-row v-if="haveTableParams('材料')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">材料</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12">
                  <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                    <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                  </el-select>
                  <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                    <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                  </el-select>
                  <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                    <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <!-- 印刷 -->
            <el-row v-if="haveTableParams('印刷')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">印刷</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12">
                  <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                    <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                  </el-select>
                  <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">背面</el-checkbox>

                  <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                    <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <!-- 包边选择 -->
            <el-row v-if="haveTableParams('包边选择')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">包边选择</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12 text-left">
                  <el-radio-group v-model="form.wrapBorder" class="type-radios" size="mini">
                    <el-radio v-for=" item in wrapBorderOptions " :key="item.name" :label="item.value" border>{{ item.name }}</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
            </el-row>
            <!-- 开缝拼接 -->
            <el-row v-if="haveTableParams('开缝拼接')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">
                  <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">开缝拼接</el-checkbox>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12 text-left">
                  <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                    <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                  </el-select>
                  <el-input v-model="form.dFacePaperMaterialPrice" size="mini" />
                  <p>条</p>
                  <p class="m-l-10">缝宽</p>
                  <el-input v-model="form.dFacePaperMaterialPrice" size="mini" />
                </div>
              </el-col>
            </el-row>
            <!-- 半断折缝 -->
            <el-row v-if="haveTableParams('半断折缝')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">半断折缝</div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple-dark fz-12 text-left">
                  <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">正面：长边</el-checkbox>
                  <el-input v-model="form.dFacePaperMaterialPrice" size="mini" />
                  <span class="text-nowrap">条+短边</span>
                  <el-input v-model="form.dFacePaperMaterialPrice" size="mini" />
                  <span>条</span>
                  <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">加强胶带</el-checkbox>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple-dark fz-12 text-left">
                  <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">背面：长边</el-checkbox>
                  <el-input v-model="form.dFacePaperMaterialPrice" size="mini" />
                  <span class="text-nowrap">条+短边</span>
                  <el-input v-model="form.dFacePaperMaterialPrice" size="mini" />
                  <span>条</span>
                  <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">加强胶带</el-checkbox>
                </div>
              </el-col>
            </el-row>
            <!-- 面纸 -->
            <el-row v-if="haveTableParams('面纸')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">面纸</div>
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <!-- 中间加厚 -->
            <el-row v-if="haveTableParams('中间加厚')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">中间加厚</div>
              </el-col>
              <el-col :span="20">
                <el-row v-for="( item, index ) in dataArr " :key="index">
                  <el-col :span="20">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <span>材料</span>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-button v-if="index === 0" type="primary" size="mini" icon="el-icon-plus" @click="addMiddleParams()" />
                      <el-button v-if="index !== 0" type="primary" size="mini" icon="el-icon-close" @click="delMiddleParams(index)" />
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 背纸 -->
            <el-row v-if="haveTableParams('背纸')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">背纸</div>
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">印刷</el-checkbox>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-dark fz-12 text-left">
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                      <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                        <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 面纸印刷 -->
            <el-row v-if="haveTableParams('面纸印刷')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">面纸印刷</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12">
                  正面
                  <el-select v-model="form.sFacePaperPrintFrontColor" size="mini">
                    <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                  </el-select>
                  背面
                  <el-select v-model="form.sFacePaperPrintBackColor" size="mini">
                    <el-option v-for="( item, idx ) in colorList " :key="idx" :label="item.sPrintingColor" :value="item.sPrintingColor" />
                  </el-select>
                  <el-checkbox v-model="form.bFacePaperPrintLargeLand" size="mini" class="ml-5">大实地</el-checkbox>
                  <el-checkbox v-model="form.bFacePaperPrintHighQuality" size="mini" class="ml-5">高品质</el-checkbox>
                </div>
              </el-col>
            </el-row>
            <!-- 面纸材料 -->
            <el-row v-if="haveTableParams('面纸材料')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">面纸材料</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12">
                  <el-select v-model="form.sFacePaperMaterialType" size="mini" @change="changeMaterialType">
                    <el-option
                      v-for="( item, idx ) in optionConfig.facePaperMaterialPaperTypeDataSourceList "
                      :key="idx"
                      :label="item.sPaperTypeName"
                      :value="item.sPaperTypeName"
                    />
                  </el-select>
                  <el-select v-model="form.sFacePaperMaterialName" size="mini">
                    <el-option v-for="( item, idx ) in facePaperMaterialPaperNameDataSourceList " :key="idx" :label="item.sPaperName" :value="item.sPaperName" />
                  </el-select>
                  <el-select v-model="form.dFacePaperMaterialWeight" size="mini" @change="changeMaterialWeight">
                    <el-option v-for="( item, idx ) in optionConfig.facePaperMaterialWeightAndPriceDataSourceList " :key="idx" :label="item.dWeight" :value="item.dWeight" />
                  </el-select>
                  价格
                  <el-input v-model="form.dFacePaperMaterialPrice" size="mini" />

                  <el-checkbox v-model="form.bFacePaperMaterialSelfPaper" size="mini">自来纸</el-checkbox>
                </div>
              </el-col>
            </el-row>
            <!-- 裱纸材料 -->
            <el-row v-if="haveTableParams('裱纸材料')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">裱纸材料</div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-dark fz-12 flex-box a-start">
                  <p>
                    <el-checkbox v-model="form.bMountedPaperMaterialCorrugated" size="mini" />
                    裱瓦愣
                    <span v-if="form.bMountedPaperMaterialCorrugated">
                      <el-select v-model="form.sMountedPaperMaterialCorrugatedName" size="mini">
                        <el-option
                          v-for="( item, idx ) in optionConfig.mountedPaperMaterialCorrugatedDataSourceList "
                          :key="idx"
                          :label="item.sPaperName"
                          :value="item.sPaperName"
                        />
                      </el-select>
                      <el-input v-model="form.dAfterProcessCuttingAmount" style="width: 50px" size="mini" />
                    </span>
                  </p>
                  <p class="mt-5">
                    <el-checkbox v-model="form.bMountedPaperMaterialPastingCard" size="mini" />
                    裱卡
                    <span v-if="form.bMountedPaperMaterialPastingCard">
                      <el-select v-model="form.sMountedPaperMaterialPastingCardName" size="mini">
                        <el-option
                          v-for="( item, idx ) in optionConfig.mountedPaperMaterialPastingCardDataSourceList "
                          :key="idx"
                          :label="item.sPaperName"
                          :value="item.sPaperName"
                        />
                      </el-select>
                      <el-select v-model="form.dMountedPaperMaterialPastingCardWeight" size="mini" @change="changeBkMaterialWeight">
                        <el-option
                          v-for="( item, idx ) in optionConfig.facePaperMaterialWeightAndPriceDataSourceList "
                          :key="idx"
                          :label="item.dWeight"
                          :value="item.dWeight"
                        />
                      </el-select>
                      价格
                      <el-input v-model="form.dMountedPaperMaterialPastingCardPrice" size="mini" />
                    </span>
                  </p>
                </div>
              </el-col>
            </el-row>
            <!-- 其他参数 -->
            <el-row v-if="otherParameters[form.sBoxName] && otherParameters[form.sBoxName].length > 0">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">其他参数</div>
              </el-col>
              <el-col :span="20">
                <el-row class="grid-content bg-purple-dark fz-12 row-box">
                  <el-col v-for="( item, index ) in otherParameters[form.sBoxName]" :key="index" :span="12">
                    <template v-if="item.type == 'input'">
                      {{ item.label }}
                      <el-input
                        v-model="item.value"
                        v-Int
                        size="mini"
                        :disabled="item.disabled"
                        oninput="value=value.replace(/[^0-9.]/g,'')"
                        @change="changeFormField(item.value, item.field)"
                      />
                      mm
                      <template v-if="item.ofield">
                        <el-checkbox v-model="item.ovalue" size="mini" @change="changeFormField(item.ovalue, item.ofield)">{{ item.olabel }}</el-checkbox>
                      </template>
                    </template>

                    <template v-if="item.type == 'checkbox&input'">
                      <div style="display:flex">
                        <el-checkbox
                          v-model="item.value"
                          style="height:24px"
                          size="mini"
                          :checked="item.value"
                          @change="changeFormField(item.value, item.field, item, item.ofield)"
                        >{{ item.label }}</el-checkbox>
                        <span v-if="item.value" style="display: flex;">
                          <el-input
                            v-model="item.ovalue"
                            v-Int
                            oninput="value=value.replace(/[^0-9.]/g,'')"
                            size="mini"
                            @change="changeFormField(item.ovalue, item.ofield)"
                          />mm
                        </span>
                      </div>
                    </template>
                    <template v-if="item.type == 'checkbox&select'">
                      <div style="display:flex">
                        <el-checkbox
                          v-model="item.value"
                          style="height:24px"
                          size="mini"
                          :checked="item.value"
                          @change="changeFormField(item.value, item.field, item, item.ofield)"
                        >{{ item.label }}</el-checkbox>
                        <span v-if="item.value" style="display: flex;">
                          <el-select v-model="item.ovalue" size="mini" placeholder="请选择" class="long-mini" @change="changeFormField(item.ovalue, item.ofield, item)">
                            <el-option v-for=" i in item.options || [] " :key="i.value" :label="i.label" :value="i.value" />
                          </el-select>
                          <el-select
                            v-model="item.ovalue2"
                            size="mini"
                            placeholder="请选择"
                            :disabled="item.ofield2Disabled"
                            @change="changeFormField(item.ovalue2, item.ofield2, item)"
                          >
                            <el-option v-for=" i in item.options2 || [] " :key="i.value" :label="i.label" :value="i.value" />
                          </el-select>
                        </span>
                      </div>
                    </template>
                    <template v-if="item.type == 'null'">
                      <div style="height:24px" />
                    </template>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 后道工序 -->
            <el-row v-if="haveTableParams('后道工序')" class="">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">后道工序</div>
              </el-col>
              <el-col :span="20">
                <el-row style="flex-wrap:wrap;">
                  <el-col v-if="haveExtraParams('后道工序', '设计')" :span="24" class="grid-content fz-12">
                    <el-checkbox v-model="form.bAfterProcessMyDesiger" size="mini">设计</el-checkbox>
                    <el-select v-show="form.bAfterProcessMyDesiger" v-model="form.sAfterProcessMyDesigerName" size="mini">
                      <el-option label="简单" value="简单" />
                      <el-option label="一般" value="一般" />
                      <el-option label="复杂" value="复杂" />
                    </el-select>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '正面表面处理')" :span="12" class="grid-content fz-12 flex-box a-start">
                    <el-checkbox
                      v-model="form.bAfterProcessFrontSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      正面表面处理
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessFrontSurface" v-model="form.sAfterProcessFrontSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '粘盒')" :span="12" class="grid-content fz-12 flex-box a-start">
                    <el-checkbox v-model="form.bAfterProcessPasteBoxUniformPrice" @change="changeNh">粘盒</el-checkbox>
                    <el-select v-show="form.bAfterProcessPasteBoxUniformPrice" v-model="form.sAfterProcessPasteBoxUniformPriceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.pasteBoxUniformPriceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '背面表面处理')" :span="12" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      背面表面处理
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessBackSurface" v-model="form.sAfterProcessBackSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '正面压纹')" :span="12" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      正面压纹
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessBackSurface" v-model="form.sAfterProcessBackSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '背面压纹')" :span="12" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      背面压纹
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessBackSurface" v-model="form.sAfterProcessBackSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '理牌')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      理牌
                    </el-checkbox>
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      配牌
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessBackSurface" v-model="form.sAfterProcessBackSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '滚金边')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      滚金边
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessBackSurface" v-model="form.sAfterProcessBackSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '滚金边')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      热缩膜
                    </el-checkbox>

                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '滚金边')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessBackSurface"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Surface', 'surfaceDataSourceList')"
                    >
                      内包装
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessBackSurface" v-model="form.sAfterProcessBackSurfaceName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.surfaceDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '钉盒')" :span="12" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox v-model="form.bAfterProcessNailBox" @change="changeDh">钉盒</el-checkbox>
                    <span v-if="form.bAfterProcessNailBox" class="flex-row small-input">
                      <el-checkbox v-model="form.bAfterProcessNailLocation" size="mini">钉位</el-checkbox>
                      <el-input v-model="form.dAfterProcessNailBoxQty" size="mini" style="width: 40px" />
                      <el-radio-group v-model="form.sAfterProcessNailBoxType" size="mini">
                        <el-radio label="1">单钉</el-radio>
                        <el-radio label="2">双钉</el-radio>
                      </el-radio-group>
                    </span>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '手提绳')" :span="12" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessHandRope"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_HandRope', 'handRopeDataSourceList')"
                    >
                      手提绳
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessHandRope" v-model="form.sAfterProcessHandRopeName" size="mini">
                      <el-option
                        v-for="( item, idx ) in optionConfig.handRopeDataSourceList "
                        :key="idx"
                        :label="item.sHandRopeMaterialName"
                        :value="item.sHandRopeMaterialName"
                      />
                    </el-select>
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '模切')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      冲床
                    </el-checkbox>
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      模切
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessCutting" v-model="form.sAfterProcessCuttingName" size="mini" @change="changeAfterProcessCuttingName">
                      <el-option v-for="( item, idx ) in optionConfig.cuttingTemplateDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                    <!-- <el-input v-show="form.bAfterProcessCutting" v-Int oninput="value=value.replace(/[^0-9.]/g,'')" style="width: 50px" size="mini"
                                            v-model="form.dAfterProcessCuttingAmount"></el-input> -->
                    <el-checkbox
                      v-model="form.bAfterProcessCutting"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_CuttingTemplate', 'cuttingTemplateDataSourceList')"
                    >
                      自填刀模费
                    </el-checkbox>
                    <el-input
                      v-show="form.bAfterProcessCutting"
                      v-model="form.dAfterProcessCuttingAmount"
                      v-Int
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      style="width: 50px"
                      size="mini"
                    />
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '设计')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessPackage"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_Package', 'packageDataSourceList')"
                    >
                      包装
                    </el-checkbox>
                    <el-select v-show="form.bAfterProcessPackage" v-model="form.sAfterProcessPackageName" size="mini">
                      <el-option v-for="( item, idx ) in optionConfig.packageDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                    </el-select>
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '击凸')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox v-model="form.bAfterProcessEmboss" size="mini">击凸</el-checkbox>
                    <div v-if="form.bAfterProcessEmboss" class="flex-row fz-12 ml-10">
                      长
                      <el-input v-model="form.dAfterProcessEmbossLength" style="width: 50px" size="mini" />
                      宽
                      <el-input v-model="form.dAfterProcessEmbossWidth" style="width: 50px" size="mini" />
                    </div>
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '击凹')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox v-model="form.bAfterProcessDeboss" size="mini">击凹</el-checkbox>
                    <div v-if="form.bAfterProcessDeboss" class="flex-row fz-12 ml-10">
                      长
                      <el-input v-model="form.dAfterProcessDebossLength" style="width: 50px" size="mini" />
                      宽
                      <el-input v-model="form.dAfterProcessDebossWidth" style="width: 50px" size="mini" />
                    </div>
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '局部压纹')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessLocalEmbossing"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_LocalEmbossing', 'localEmbossingDataSourceList')"
                    >
                      局部压纹
                    </el-checkbox>
                    <p v-if="form.bAfterProcessLocalEmbossing" class="flex-row fz-12 ml-10">
                      <el-select v-model="form.sAfterProcessLocalEmbossingName" size="mini">
                        <el-option v-for="( item, idx ) in optionConfig.localEmbossingDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                      </el-select>
                      长
                      <el-input v-model="form.dAfterProcessLocalEmbossingLength" style="width: 50px" size="mini" />
                      宽
                      <el-input v-model="form.dAfterProcessLocalEmbossingWidth" style="width: 50px" size="mini" />
                    </p>
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '满版压纹')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessFullEmbossing"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_FullEmbossing', 'fullEmbossingDataSourceList')"
                    >
                      满版压纹
                    </el-checkbox>
                    <div v-show="form.bAfterProcessFullEmbossing" class="flex-row fz-12 ml-10">
                      <el-select v-model="form.sAfterProcessFullEmbossingName" size="mini">
                        <el-option v-for="( item, idx ) in optionConfig.fullEmbossingDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                      </el-select>
                      <!-- 长
                                                    <el-input style="width: 50px" size="mini" v-model="form.dAfterProcessFullEmbossingLength"></el-input>
                                                    宽
                                                    <el-input style="width: 50px" size="mini" v-model="form.dAfterProcessFullEmbossingWidth"></el-input> -->
                    </div>
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '开天窗贴胶片')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessPastingFilm"
                      size="mini"
                      @change="
                        changeAfterProcess(
                          $event,
                          'Ele_ColorBoxSetting_AfterProcess_PastingFilm',
                          'pastingFilmDataSourceList',
                          'pastingFilmThicknessAndPriceDataSourceList'
                        )
                      "
                    >
                      开天窗贴胶片
                    </el-checkbox>
                    <div v-if="form.bAfterProcessPastingFilm" class="fz-12">
                      <el-select v-model="form.sAfterProcessPastingFilmName" size="mini">
                        <el-option v-for="( item, idx ) in optionConfig.pastingFilmDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                      </el-select>
                      厚度
                      <el-select v-model="form.dAfterProcessPastingFilmThickness" size="mini">
                        <el-option
                          v-for="( item, idx ) in optionConfig.pastingFilmThicknessAndPriceDataSourceList "
                          :key="idx"
                          :label="item.dThickness"
                          :value="item.dThickness"
                        />
                      </el-select>
                      长
                      <el-input v-model="form.dAfterProcessPastingFilmLength" style="width: 50px" size="mini" />
                      宽
                      <el-input v-model="form.dAfterProcessPastingFilmWidth" style="width: 50px" size="mini" />
                    </div>
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '烫金')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox
                      v-model="form.bAfterProcessHotGold"
                      size="mini"
                      @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_HotGold', 'hotGoldDataSourceList')"
                    >
                      烫金
                    </el-checkbox>

                    <p v-if="form.bAfterProcessHotGold" class="flex-row ml-10">
                      <el-select v-model="form.sAfterProcessHotGoldName" size="mini">
                        <el-option v-for="( item, idx ) in optionConfig.hotGoldDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                      </el-select>
                      长
                      <el-input v-model="form.dAfterProcessHotGoldLength" style="width: 50px" size="mini" />
                      宽
                      <el-input v-model="form.dAfterProcessHotGoldWidth" style="width: 50px" size="mini" />
                    </p>
                  </el-col>

                  <el-col v-if="haveExtraParams('后道工序', '局部UV')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <div class="flex-row fz-12">
                      <el-checkbox
                        v-model="form.bAfterProcessLocalUV"
                        size="mini"
                        @change="changeAfterProcess($event, 'Ele_ColorBoxSetting_AfterProcess_LocalUV', 'localUVDataSourceList')"
                      >
                        局部UV
                      </el-checkbox>
                      <p v-if="form.bAfterProcessLocalUV" class="flex-row ml-10">
                        <el-select v-model="form.sAfterProcessLocalUVName" size="mini">
                          <el-option v-for="( item, idx ) in optionConfig.localUVDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                        </el-select>
                        长
                        <el-input v-model="form.dAfterProcessLocalUVLength" style="width: 50px" size="mini" />
                        宽
                        <el-input v-model="form.dAfterProcessLocalUVWidth" style="width: 50px" size="mini" />
                      </p>
                    </div>
                  </el-col>
                  <el-col v-if="haveExtraParams('后道工序', '其他后工')" :span="24" class="grid-content bg-purple-dark fz-12 text-left">
                    <el-checkbox v-model="form.bAfterProcessOtherAfter" size="mini">其他后工</el-checkbox>
                    <el-popover placement="right" width="410" trigger="click">
                      <div style="padding-bottom: 20px">
                        <el-table v-show="form.bAfterProcessOtherAfter" class="mini-form" :data="otherPostWorkersEachData" size="mini">
                          <el-table-column width="300" label="设置（说明：要设置多其他后工请单击右边按钮）">
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.sName" size="mini" @change="value => changeAfterProcessName(value, scope.row)">
                                <el-option v-for="( item, idx ) in optionConfig.otherAfterDataSourceList " :key="idx" :label="item.sName" :value="item.sName" />
                              </el-select>
                              <template v-if="scope.row.sUnitName == '元/个'">
                                <el-input v-model="scope.row.dQty" style="width: 50px" size="mini" />
                                个
                              </template>
                              <template v-if="scope.row.sUnitName == '元/㎡'">
                                长
                                <el-input v-model="scope.row.dLength" style="width: 50px" size="mini" />
                                宽
                                <el-input v-model="scope.row.dWidth" style="width: 50px" size="mini" />
                              </template>
                            </template>
                          </el-table-column>

                          <el-table-column width="80" align="center" label="操作">
                            <template slot-scope="scope">
                              <el-button type="success" size="mini" icon="el-icon-plus" circle class="v-mini-btn" @click.stop="addOtherPostRow" />
                              <el-button type="danger" size="mini" icon="el-icon-close" circle class="v-mini-btn" @click.stop="removeOtherPostRow(scope.$index)" />
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>

                      <el-button v-show="form.bAfterProcessOtherAfter" slot="reference" size="mini" class="m-l-5" @click="showpopover">设置</el-button>
                    </el-popover>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 运费 -->
            <el-row v-if="haveTableParams('运费')">
              <el-col :span="4">
                <div class="grid-content bg-purple-dark fz-12 grid-label">运费</div>
              </el-col>
              <el-col :span="20">
                <el-row class="grid-content bg-purple-dark fz-12 row-box">
                  <el-input v-model="form.dTransportMoney" v-Empty-Zero v-Float size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" />
                </el-row>
              </el-col>
            </el-row>
            <!-- 自主报价 -->
            <el-row class="footer">
              <el-button type="primary" @click="automaticQuotationSubmit">自动报价</el-button>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 报价明细 -->
      <el-row v-if="costPriceData.length > 0" class="w-100" :gutter="5">
        <el-col :span="14">
          <el-tabs v-model="quotationInfoActiveTab" type="border-card">
            <el-tab-pane label="成本价" name="costPrice">
              <el-table height="150" border highlight-current-row stripe class="w-100 YZ-common-table bd-table table-border-bottom" :data="costPriceData" size="mini">
                <el-table-column prop="dQty" label="数量" align="center" />
                <el-table-column prop="dPrice" label="单价（元）" align="center" />
                <el-table-column prop="dTotalMoney" label="总价（元）" align="center" />
                <el-table-column prop="sRemark" label="备注" align="center" />
              </el-table>
              <div class="fz-12 info-center-box border-box pd-5">
                <span>备注：</span>
                <el-input style="width: 300px" size="mini" />
                <span>总价：</span>
                <el-input style="width: 200px" size="mini" />
                <el-button size="mini" type="primary" class="v-mini-btn">保存</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="10">
          <div class="border-box calc-info-box">
            <div class="btns border-bottom-box">
              <el-button size="mini" class="ml-10" icon="el-icon-folder-opened" disabled>合同单</el-button>
              <el-button size="mini" icon="el-icon-folder-opened" disabled>报价单</el-button>
              <el-button size="mini" icon="el-icon-folder-opened" @click="costDetails">成本明细</el-button>
            </div>
            <!-- <p class="border-bottom-box fz-14 text-center pt-10 pb-10">
                                    <span class="el-icon-folder-opened"></span>
                                    印智互联报价系统演示版
                                </p>
                                <p class="border-bottom-box fz-14 text-center pt-10 pb-10 color-red">直接计算出来的成本</p> -->
            <div class="border-bottom-box info position-relative" style="height: 190px; font-size: 12px; overflow-y: auto">
              <template>
                【彩盒-{{ form.sBoxType }}-{{ form.sBoxName }}】报价ID:{{ form.uGuid1 }}
                <br>
                规格：{{ form.dSizeLength || 0 }}x{{ form.dSizeWidth || 0 }}x{{ form.dSizeHigh || 0 }}mm
                <br>
                拼版方向：{{ costPriceData[0].sPanelDirection }} ，横拼数: {{ costPriceData[0].dHPanel }} ，纵拼数: {{
                  costPriceData[0].dVPanel }}， 展开尺寸：{{ unfoldSize }}
                <br>
                材质：{{ form.sFacePaperMaterialName }}[{{ form.dFacePaperMaterialWeight }}克]（{{
                  costPriceData[0].dMaterialMoney }}）
                <br>
                数量：{{ costPriceData[0].dQty || 0 }}个
                <br>
                印刷：正面({{ form.sFacePaperPrintFrontColor }}),背面({{ form.sFacePaperPrintBackColor }})（{{
                  costPriceData[0].dPrintMoney }}）
                <br>
                印后工艺：{{ costPriceData[0].sAfterDetail }}
                <br>
                计算结果:{{ costPriceData.length > 0 ? costPriceData[0].dTotalMoney : 0 }}元 [{{
                  costPriceData.length > 0 ? costPriceData[0].dPrice : 0 }}元/个]
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog v-DialogDrag width="70%" title="报价成本明细" :visible.sync="quotationPriceDetailsVisible" append-to-body :close-on-click-modal="false" @close="quotationPriceDetailsVisible = false">
      <div id="quoteDetailDiv1">
        <div id="erpIframe" />
        <table id="aa1" width="100%" border="0" cellpadding="3" cellspacing="1" class="content">
          <tbody>
            <tr>
              <td width="15%" align="right">报价项目：</td>
              <td width="30%">
                <span id="quoteItemName1-1">{{ quotationPriceDetailsForm.sProjectName }}</span>
                报价
              </td>
              <td width="10%"><span id="quoteUser1">印智互联</span></td>
              <td width="8%" align="right">报价Id：</td>
              <td id="quoteId1" width="10%">{{ form.uGuid1 }}</td>
              <td width="8%" align="right">报价时间：</td>
              <td id="quoteTime1" width="16.6%">{{ form.tModDate }}</td>
            </tr>
            <tr>
              <td align="right">报价参数：</td>
              <td colspan="6">
                <table width="100%" border="0" cellspacing="1" class="content">
                  <tbody>
                    <tr>
                      <th align="right" style="width: 75px">印刷颜色：</th>
                      <td id="printColor1">{{ quotationPriceDetailsForm.sPrintColor }}</td>
                      <th width="10%" align="right">单 双 面：</th>
                      <td id="printType1" width="10%">
                        {{ form.sFacePaperPrintFrontColor && form.sFacePaperPrintFrontColor &&
                          form.sFacePaperPrintFrontColor != '空白' ? '双面印刷' : '单面印刷' }}
                      </td>
                    </tr>
                    <tr>
                      <th align="right">其它参数：</th>
                      <td id="otherParaString1" colspan="3">{{
                        quotationPriceDetailsForm.otherParameters }}</td>
                    </tr>
                    <tr>
                      <th align="right">后道工序：</th>
                      <td id="postprocessingString1" colspan="5">{{
                        quotationPriceDetailsForm.sPostPressProcess }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="right">
                <span id="quoteItemName2-1">彩盒</span>
                成品：
              </td>
              <td colspan="6">
                <table width="100%" border="0" cellspacing="1" class="content">
                  <tbody>
                    <tr>
                      <th width="40%" align="center">尺寸</th>
                      <th width="10%" align="center">数量</th>
                      <th width="50%" align="center">材料</th>
                    </tr>
                    <tr>
                      <td id="pSize1" align="center">
                        {{ form.dSizeLength }}*{{ form.dSizeWidth }}*{{ form.dSizeHigh }}
                        <span style="color: red">[{{ quotationPriceDetailsForm.sPanelDirection }}：{{
                          unfoldSize }}]</span>
                        <!-- <input type="checkbox" checked="checked" disabled="disabled" />
                                                高度为纸纹 -->
                      </td>
                      <td id="pQty1" align="center">{{ form.dQty }}</td>
                      <td id="pMaterial1" align="center" v-html="quotationPriceDetailsForm.sMaterial" />
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr style="display: none" />
            <tr id="otherPara1" style="display: none" />
            <tr id="cartonParts1" style="display: none" />
            <tr id="trMainSum1">
              <td align="right">合计：</td>
              <td colspan="6">
                <table width="100%" border="0" cellspacing="1" class="content">
                  <tbody>
                    <tr>
                      <th width="12%" align="right">重量：</th>
                      <td id="pWeight1" width="32%">约{{ quotationPriceDetailsForm.dWeight }}公斤</td>
                      <th width="17%" align="right">体积：</th>
                      <td id="pCubage1" width="39%">约{{ quotationPriceDetailsForm.dVolume }}立方米</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr id="trSumAmt1">
              <td colspan="7">
                <table width="100%" border="0" cellspacing="1" class="content">
                  <tbody>
                    <tr>
                      <td align="right" width="14.5%">材料费：</td>
                      <td id="paperAmt1" width="15%">
                        {{ (buckleBottomBoxCalcResultCostDetailOptimalList.length > 0 &&
                          buckleBottomBoxCalcResultCostDetailOptimalList[0].dMaterialMoney) || 0 }}
                      </td>
                      <td align="right"><span id="printAmtTitle1">印刷费：</span></td>
                      <td id="printAmt1">
                        {{ (buckleBottomBoxCalcResultCostDetailOptimalList.length > 0 &&
                          buckleBottomBoxCalcResultCostDetailOptimalList[0].dPrintMoney) || 0 }}
                      </td>
                      <td align="right">后加工费用：</td>
                      <td id="postprocessingAmt1">{{ quotationPriceDetailsForm.postProcessingCosts }}
                      </td>
                    </tr>
                    <tr>
                      <td align="right" width="20%">生产成本：</td>
                      <td id="costAmt1" width="15%">{{ quotationPriceDetailsForm.productionCosts }}
                      </td>
                      <td align="right" width="20%">
                        <span id="quoteItemName2-1" />
                        运费：
                      </td>
                      <td id="profixAmt1" width="15%">{{ form.dTransportMoney }}</td>
                      <td align="right">总成本：</td>
                      <td id="costAmt2-1" class="okps" style="color: red">
                        ￥{{ (parseFloat(quotationPriceDetailsForm.productionCosts) +
                          parseFloat(form.dTransportMoney)).toFixed(2) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="vquoteDetail1">
          <table width="100%" border="0" cellspacing="1" class="content">
            <tbody>
              <tr>
                <th width="60">工序</th>
                <th>机器名称</th>
                <th>上机尺寸</th>
                <th>净尺寸</th>
                <th>印刷方式</th>
                <th>版数</th>
                <th>每版拼数</th>
                <th>每版印数</th>
                <th>印刷纸</th>
                <th>印刷损耗</th>
                <th>材料费</th>
                <th>印工费</th>
                <th>小计</th>
                <th>买纸尺寸</th>
                <th>开纸类型</th>
                <th>买纸数</th>
                <th>操作</th>
              </tr>
              <tr v-for="( item, idx ) in buckleBottomBoxCalcResultCostDetailOptimalList " :key="idx" align="center" class="blue showmergeImg">
                <td>{{ item.sProcessName }}</td>
                <td v-if="item.sProcessName.indexOf('后工') > -1" colspan="11" align="center">
                  {{ item.sAfterDetail }}
                </td>
                <template v-else>
                  <td>{{ item.sOptimalName }}</td>
                  <td>{{ item.dMachineLength }}*{{ item.dMachineWidth }}</td>
                  <td />
                  <td>{{ item.sPrintMethod }}</td>
                  <td>{{ item.iPlateQty }}</td>
                  <td>
                    {{ item.sPlatePanelQty }}
                  </td>
                  <td>{{ item.dPlatePrintQty }}</td>
                  <td>{{ item.dProcessInQty }}</td>
                  <template v-if="item.sProcessName.indexOf('印刷') > -1">
                    <td>{{ item.dProcessLossQty }}</td>
                    <td>￥{{ item.dMaterialMoney }}</td>
                    <td>￥{{ item.dPrintMoney }}</td>
                  </template>
                  <td v-if="item.sProcessName.indexOf('模切') > -1" colspan="3" align="center">{{
                    item.sAfterDetail }}</td>
                </template>
                <td>￥{{ item.dSubTotalMoney }}</td>
                <td>{{ item.sPaperSource }}</td>
                <td>{{ item.sMaterialK }}</td>
                <td>{{ item.iBuyPaperQty }}</td>
                <td v-if="idx == 0" rowspan="3"><el-button size="mini" type="text" @click="vquoteDetail1More(buckleBottomBoxCalcResultCostDetailOptimalList[0])">更多</el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p />
        <div id="votherMachine1">
          <table width="100%" border="0" cellspacing="1" class="content">
            <tbody>
              <tr>
                <th colspan="15">其它印刷机生产成本</th>
              </tr>
              <tr>
                <!-- <th>接口数</th> -->
                <th>印刷机名称</th>
                <th>上机尺寸</th>
                <th>净尺寸</th>
                <th>版数</th>
                <th>每版拼数</th>
                <th>每版印数</th>
                <th>材料费</th>
                <!-- <th>印版费</th> -->
                <th>印工费</th>
                <th>模切费</th>
                <th>后工费</th>

                <th>生产成本</th>
                <th>运费</th>
                <th>总成本</th>
                <th>操作</th>
              </tr>
              <tr v-for="( item, idx ) in buckleBottomBoxCalcResultCostDetailOtherList " :key="idx" align="center">
                <!-- <td>&nbsp;1驳</td> -->
                <td>{{ item.sOptimalName }}</td>
                <td>{{ item.dMachineLength }}*{{ item.dMachineWidth }}</td>
                <td />
                <td>{{ item.iPlateQty }}</td>
                <td>
                  {{ item.sPlatePanelQty }}
                </td>
                <td>{{ item.dPlatePrintQty }}</td>
                <td>￥{{ item.dMaterialMoney }}</td>
                <!-- <td>&nbsp;</td> -->
                <td>￥{{ item.dPrintMoney }}</td>
                <td>￥{{ item.dCuttingMoney }}</td>
                <td>￥{{ item.dAfterMoney }}</td>
                <td>￥{{ parseFloat(item.dTotalMoney || 0) - parseFloat(item.dTransportMoney || 0) }}</td>
                <td>￥{{ item.dTransportMoney }}</td>
                <td>￥{{ item.dTotalMoney }}</td>
                <td><el-button size="mini" type="text" @click="vquoteDetail2More(item)">更多</el-button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer d-flex jc-ce ai-c">
        <el-button type="primary">打印</el-button>

        <el-button @click="quotationPriceDetailsVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog v-DialogDrag width="70%" title="更多结果" :visible.sync="costBreakdownOptimalResultVisible" append-to-body :close-on-click-modal="false" @close="costBreakdownOptimalResultVisible = false">
      <div id="quoteDetailDiv2">
        <div id="vquoteDetail2">
          <table width="100%" border="0" cellspacing="1" class="content">
            <template v-if="costBreakdownOptimalResultType == 1">
              <tbody>
                <tr>
                  <th>机器名称</th>
                  <th>上机尺寸</th>

                  <th>版数</th>
                  <th>每版拼数</th>
                  <th>每版印数</th>
                  <th>印刷纸</th>
                  <th>印刷损耗</th>
                  <th>材料费</th>
                  <th>印工费</th>
                  <th>模切费</th>
                  <th>后工费</th>
                  <th>小计</th>
                  <th>买纸尺寸</th>
                  <th>开纸类型</th>
                  <th>买纸数</th>
                  <th>操作</th>
                </tr>
                <tr v-for="( item, idx ) in costBreakdownOptimalResultData " :key="idx" align="center" class="blue showmergeImg">
                  <td>{{ item.sOptimalName }}</td>
                  <td>{{ item.dMachineLength }}*{{ item.dMachineWidth }}</td>

                  <td>{{ item.iPlateQty }}</td>
                  <td>
                    {{ item.sPlatePanelQty }}
                  </td>
                  <td>{{ item.dPlatePrintQty }}</td>
                  <td>{{ item.dProcessInQty }}</td>
                  <td>{{ item.dProcessLossQty }}</td>
                  <td>￥{{ item.dMaterialMoney }}</td>
                  <td>￥{{ item.dPrintMoney }}</td>
                  <!-- <td  colspan="3" align="center">{{ item.sAfterDetail }}</td> -->

                  <td>￥{{ item.dCuttingMoney }}</td>
                  <td>￥{{ item.dAfterMoney }}</td>
                  <td>￥{{ item.dSubTotalMoney }}</td>
                  <td>{{ item.sPaperSource }}</td>
                  <td>{{ item.sMaterialK }}</td>
                  <td>{{ item.iBuyPaperQty }}</td>
                  <th><el-button size="mini" type="text" @click="postWorkExpenses(item)">后工费用</el-button>
                  </th>
                </tr>
              </tbody>
            </template>
            <template v-else>
              <tbody>
                <tr>
                  <!-- <th>接口数</th> -->
                  <th>印刷机名称</th>
                  <th>上机尺寸</th>
                  <th>净尺寸</th>
                  <th>版数</th>
                  <th>每版拼数</th>
                  <th>每版印数</th>
                  <th>材料费</th>
                  <!-- <th>印版费</th> -->
                  <th>印工费</th>
                  <th>模切费</th>
                  <th>后工费</th>

                  <th>生产成本</th>
                  <th>运费</th>
                  <th>总成本</th>
                  <th>操作</th>
                </tr>
                <tr v-for="( item, idx ) in costBreakdownOptimalResultData " :key="idx" align="center">
                  <!-- <td>&nbsp;1驳</td> -->
                  <td>{{ item.sOptimalName }}</td>
                  <td>{{ item.dMachineLength }}*{{ item.dMachineWidth }}</td>
                  <td />
                  <td>{{ item.iPlateQty }}</td>
                  <td>
                    {{ item.sPlatePanelQty }}
                  </td>
                  <td>{{ item.dPlatePrintQty }}</td>
                  <td>￥{{ item.dMaterialMoney }}</td>
                  <!-- <td>&nbsp;</td> -->
                  <td>￥{{ item.dPrintMoney }}</td>
                  <td>￥{{ item.dCuttingMoney }}</td>
                  <td>￥{{ item.dAfterMoney }}</td>
                  <td>￥{{ parseFloat(item.dTotalMoney || 0) - parseFloat(item.dTransportMoney || 0) }}
                  </td>
                  <td>￥{{ item.dTransportMoney }}</td>
                  <td>￥{{ item.dTotalMoney }}</td>
                  <th><el-button size="mini" type="text" @click="postWorkExpenses(item)">后工费用</el-button>
                  </th>
                </tr>
              </tbody>
            </template>
          </table>
          <p v-if="buckleBottomBoxCalcResultCostDetailMoreAfterDetail" class="mt-10" style="color: red">{{
            buckleBottomBoxCalcResultCostDetailMoreAfterDetail }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import Api from '@/api/quotationSystem/basicData';
import { BoxTypeOptions, OtherParameters, imgsData } from './data.js'
import { deepClone, sortOrder, guid, getQueryObject } from '@/utils'
const postPressProcessFields = [
  { prop: 'bAfterProcessPasteBoxUniformPrice', text: '粘盒' },
  { prop: 'bAfterProcessNailBox', text: '{sAfterProcessNailBoxType}盒({dAfterProcessNailBoxQty}个钉位)' },
  { prop: 'bAfterProcessHandRope', text: '手提绳({sAfterProcessHandRopeName})' },
  { prop: 'bAfterProcessCutting', text: '模切-{sAfterProcessCuttingName}' },
  { prop: 'bAfterProcessPackage', text: '包装({sAfterProcessPackageName})' },
  { prop: 'bAfterProcessEmboss', text: '击凸({dAfterProcessEmbossLength}*{dAfterProcessEmbossWidth})' },
  { prop: 'bAfterProcessDeboss', text: '击凹({dAfterProcessDebossLength}*{dAfterProcessDebossWidth})' },
  { prop: 'bAfterProcessLocalEmbossing', text: '局部压纹({sAfterProcessLocalEmbossingName}:{dAfterProcessLocalEmbossingLength}*{dAfterProcessLocalEmbossingWidth})' },
  { prop: 'bAfterProcessFullEmbossing', text: '满版压纹({sAfterProcessFullEmbossingName})' },
  { prop: 'bAfterProcessPastingFilm', text: '开天窗贴胶片({sAfterProcessPastingFilmName}:{dAfterProcessPastingFilmThickness}:{dAfterProcessPastingFilmLength}*{dAfterProcessPastingFilmWidth})' },
  { prop: 'bAfterProcessHotGold', text: '烫金({sAfterProcessHotGoldName}:{dAfterProcessHotGoldLength}*{dAfterProcessHotGoldWidth})' },
  { prop: 'bAfterProcessLocalUV', text: '局部UV({sAfterProcessLocalUVName}:{dAfterProcessLocalUVLength}*{dAfterProcessLocalUVWidth})' },
  // { prop: 'bAfterProcessOtherAfter' },
  { prop: 'bAfterProcessFrontSurface', text: '正面表面处理({sAfterProcessFrontSurfaceName})' },
  { prop: 'bAfterProcessBackSurface', text: '背面表面处理({sAfterProcessBackSurfaceName})' }
]
export default {
  name: 'PaperPriceSetting',
  data() {
    return {
      bigimgList: imgsData['棋盘'], // 初始化为扣底盒
      bigimg: imgsData['棋盘'][0].imgsrc, // 初始化为扣底盒
      index: 0,
      loading: false,
      form: {
        sBoxType: '游戏卡牌',
        uGuid1: guid(),
        bAfterProcessCutting: true,
        sAfterProcessNailBoxType: '1',
        sBoxName: '棋盘'
      },
      readonly: false,
      quotationInfoActiveTab: 'costPrice',
      costPriceData: [],
      quotationPriceDetailsVisible: false,
      boxTypeOptions: BoxTypeOptions,
      boxTypeList: [],
      otherParameters: OtherParameters,
      otherPostWorkersEach: false,
      otherPostWorkersEachData: [],
      optionConfig: {},
      facePaperMaterialPaperNameDataSourceList: [],
      colorList: [
        {
          sPrintingColor: '空白'
        },
        {
          sPrintingColor: '单黑'
        },
        {
          sPrintingColor: '四色(彩色)'
        },
        {
          sPrintingColor: '彩色+过油'
        },
        {
          sPrintingColor: '1专色'
        },
        {
          sPrintingColor: '2专色'
        },
        {
          sPrintingColor: '3专色'
        },
        {
          sPrintingColor: '4专色'
        },
        {
          sPrintingColor: '彩色+1专色'
        },
        {
          sPrintingColor: '彩色+2专色'
        },
        {
          sPrintingColor: '彩色+3专色'
        },
        {
          sPrintingColor: '彩色+4专色'
        }
      ],

      costBreakdownOptimalResultData: [],
      costBreakdownOptimalResultVisible: false,
      costBreakdownOptimalResultType: 1,
      quotationPriceDetailsForm: {},
      buckleBottomBoxCalcResultCostDetailOptimalList: [],
      buckleBottomBoxCalcResultCostDetailOtherList: [],
      buckleBottomBoxCalcResultCostDetailMoreAfterDetail: '',
      wrapBorderOptions: [ // 包边选项
        { name: '背纸包边', value: 1 },
        { name: '面纸包边', value: 2 },
        { name: '不包边', value: 3 }
      ],
      dataArr: [{}],
      everyCount: [{}], // 每套数量
      radioType: ''
    }
  },
  computed: {
    // 展开尺寸
    unfoldSize() {
      let costPriceData = this.costPriceData
      if (costPriceData && costPriceData.length > 0) {
        costPriceData = costPriceData[0]
        const { sPanelDirection, dExpandLength, dExpandHigh } = costPriceData
        return sPanelDirection == '以展长方向' ? dExpandLength + '*' + dExpandHigh : dExpandHigh + '*' + dExpandLength
      } else {
        return ''
      }
    }
  },
  created() {
    this.getBoxType()
  },
  methods: {
    // 后工选中
    changeAfterProcessName(value, row) {
      let opt = this.optionConfig.otherAfterDataSourceList
      opt = opt.find(item => {
        return value == item.sName
      })
      this.$set(row, 'sUnitName', opt.sUnitName)
    },
    // 大类：选择盒型
    changeBoxTypePID(v) {
      this.getBoxType(v)
      this.getImgs()
    },
    imgClick(index) {
      this.index = index
      this.bigimg = this.bigimgList[index].imgsrc
    },
    toleft() {
      if (this.index == this.bigimgList.length - 1) {
        this.index = 0
      } else {
        this.index++
      }
      this.bigimg = this.bigimgList[this.index].imgsrc
    },
    toright() {
      if (this.index == 0) {
        this.index = this.bigimgList.length - 1
      } else {
        this.index--
      }
      this.bigimg = this.bigimgList[this.index].imgsrc
    },
    async showpopover() {
      const opts = this.optionConfig.otherAfterDataSourceList
      if (!opts || opts.length == 0) {
        this.getBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource('Ele_ColorBoxSetting_AfterProcess_OtherAfter', 'otherAfterDataSourceList')
      }
      if (!this.otherPostWorkersEachData.length > 0) {
        const res = await Api.GetBoxTypeQuotationBuckleBottomBoxOtherAfterDetail(this.form.uGuid1)

        if (res.code == 200 && res.data.buckleBottomBoxOtherAfterList && res.data.buckleBottomBoxOtherAfterList.length > 0) {
          this.otherPostWorkersEachData = res.data.buckleBottomBoxOtherAfterList.map(item => {
            item.isEdit = true
            return item
          })
        } else {
          this.addOtherPostRow()
        }
      }
    },

    initData() {
      // this.loading = true;

      // const GetBoxTypeQuotationBuckleBottomBoxDataSource = Api.GetBoxTypeQuotationBuckleBottomBoxDataSource();
      // //获取扣底数据
      // const GetBoxTypeQuotationBuckleBottomBoxListData = Api.GetBoxTypeQuotationBuckleBottomBoxListData(this.form.sBoxType, this.form.sBoxName);
      // //获取模切
      // const GetBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource = Api.GetBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource('Ele_ColorBoxSetting_AfterProcess_CuttingTemplate');
      // return Promise.all([GetBoxTypeQuotationBuckleBottomBoxDataSource, GetBoxTypeQuotationBuckleBottomBoxListData, GetBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource]).then(res => {
      //     this.optionConfig = res[0].data;
      //     if (res[1].code == 200 && res[1].data && res[1].data.length > 0) {
      //         this.form = res[1].data[0];
      //         this.$set(this.form, 'isEdit', true);
      //         let otherParameters = this.otherParameters[this.form.sBoxName];
      //         // if (otherParameters && otherParameters.length > 0) {
      //         //     for (let i = 0; i < otherParameters.length; i++) {
      //         //         let item = otherParameters[i];
      //         //         // 渲染已填写input值
      //         //         this.$set(item, 'value', this.form[item.field]);
      //         //         if (['直角扣底', '粘挂钩'].includes(item.olabel)) {
      //         //             this.$set(item, 'ovalue', this.form[item.ofield]);
      //         //         }

      //         //         // 渲染二级勾选或者下拉框值
      //         //         /*  TODO:
      //         //             解决思路：
      //         //             先提取特殊二级的小类字段数组，根据特殊二级数组进行额外数据的处理，数据还原
      //         //                 ofield ofield2这种类型，双面胶，易撕拉条，保险扣等等
      //         //             第二个问题，二段赋值，需要先取得所有选项下拉框的值
      //         //                 这里要等接口，等后端给个返回全部下拉框选项的接口
      //         //             取得选项后给对应的循环渲染输入框赋值，是第三个问题
      //         //                 直接循环当前的otherParameters，判断是否有对应的ofield字段，若有，根据对应数组进行赋值操作，需要识别下拉框或者其他
      //         //             解决以上问题后，才能进行赋值操作，否则下拉框没有对应的值，不会展示
      //         //         */

      //         //     }
      //         // }
      //     } else {
      //         this.form = {
      //             sBoxType: this.form.sBoxType,
      //             uGuid1: guid(),
      //             bAfterProcessCutting: true,
      //             sAfterProcessNailBoxType: '1',
      //             sBoxName: this.form.sBoxName,
      //             isEdit: false,
      //         }
      //         this.getBoxTypeQuotationBuckleBottomBoxDataSource();
      //     }

      //     if (res[2].code == 200) {
      //         this.$set(this.optionConfig, 'cuttingTemplateDataSourceList', res[2].data.cuttingTemplateDataSourceList);
      //     }
      //     this.loading = false;

      // });

      // this.getList();
    },
    // 获取默认值
    getBoxTypeQuotationBuckleBottomBoxDataSource() {
      Api.GetBoxTypeQuotationBuckleBottomBoxDataSource().then(res => {
        if (res.code == 200) {
          this.optionConfig = res.data
          this.setOtherParameterData(this.optionConfig.otherParameterDataSourceList[0])
        }
      })
    },
    // 修改粘盒 顶盒 2选1
    changeNh(v) {
      this.$set(this.form, 'bAfterProcessNailBox', false)
      this.changeAfterProcess(v, 'Ele_ColorBoxSetting_AfterProcess_PasteBoxUniformPrice', 'pasteBoxUniformPriceDataSourceList')
    },
    // 修改模切 带出金额
    changeAfterProcessCuttingName(v) {
      const opt = this.optionConfig.cuttingTemplateDataSourceList.find(item => {
        return v == item.sName
      })
      this.$set(this.form, 'dAfterProcessCuttingAmount', opt ? opt.dAmount : '')
    },
    // 根据小盒型，取得当前盒型图片
    getImgs() {
      this.bigimgList = imgsData[this.form.sBoxName]
      this.bigimg = this.bigimgList[0].imgsrc
    },
    // 变更小类盒型
    async changeBoxType() {
      this.getImgs()
      await this.initData()
      // 有类型的需要初始赋值
      const sBoxName = this.form.sBoxName
      const obj = {
        '模切板': '三层模切板',
        '拼图': '二层拼图'
      }
      this.radioType = obj[sBoxName]
    },
    // 修改钉盒
    changeDh(v) {
      this.$set(this.form, 'bAfterProcessPasteBoxUniformPrice', false)
    },
    // 设置其他参数
    setOtherParameterData(data) {
      const otherFields = [
        { field: 'dCardBoxStickyWidth', sfield: 'dOtherParameterStickyWidth' },
        { field: 'dGaryPlug', sfield: 'dOtherParameterGaryPlug' },
        { field: 'dBottomInsert', sfield: 'dOtherParameterBottomInsert' },
        { field: 'dOtherParameterWingcap', sfield: 'dOtherParameterWingcap' }
      ]

      const otherParameters = this.otherParameters[this.form.sBoxType]
      for (let i = 0; i < otherParameters?.length; i++) {
        const item = otherParameters[i]

        for (let s = 0; s < otherFields.length; s++) {
          const sitem = otherFields[s]

          if (sitem.sfield == item.field) {
            this.$set(item, 'value', data[sitem.field])
          }
        }
      }
      for (const field in data) {
        const opt = otherFields.find(item => {
          return item.field == field
        })
        if (opt) {
          this.$set(this.form, opt.sfield, data[field])
        }
      }
    },
    // 修改后道工序
    changeAfterProcess(v, tableName, sourceName, sourceName2) {
      console.log('v: ', v)
      const opts = this.optionConfig[tableName]
      if (!opts || opts.length == 0) {
        this.getBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource(tableName, sourceName, sourceName2)
      }
    },
    // 获取后工数据源 根据tablename
    getBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource(tableName, sourceName, sourceName2) {
      Api.GetBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource(tableName).then(res => {
        if (res.code == 200) {
          this.$set(this.optionConfig, sourceName, res.data[sourceName] || [])
          if (sourceName2) {
            this.$set(this.optionConfig, sourceName2, res.data[sourceName2] || [])
          }
        }
      })
    },

    // 获取盒类型
    getBoxType() {
      this.boxTypeList = this.boxTypeOptions.find(item => {
        return item.name == this.form.sBoxType
      }).children
      this.$set(this.form, 'sBoxName', this.boxTypeList[0].name)
      this.initData()
    },
    // 自动报价
    automaticQuotationSubmit() {
      this.costPriceData = []
      // 判断长宽高数量是否填写
      if (!this.form.dSizeLength || !this.form.dSizeWidth || !this.form.dSizeHigh || !this.form.dQty) {
        return this.noticfy('长宽高和数量不能为空或为0！')
      }
      // 判断其他参数，是否勾选了未填写 依次为：保险扣，双面胶, 易撕拉条
      const checkedArr = ['bOtherParameterInsurance', 'bOtherParameterDoubleSidedStrip', 'bOtherParameterEasyTearStrip']
      const required = ['dOtherParameterInsuranceHigh', ['sOtherParameterDoubleSidedStrip', 'dOtherParameterDoubleSidedStrip'], ['sOtherParameterEasyTearStrip', 'dOtherParameterEasyTearStrip']]
      let hintText = null
      checkedArr.forEach((e, i) => {
        if (typeof required[i] !== 'string') {
          required[i].forEach(el => {
            if (this.form[e] && !this.form[el]) {
              hintText = '请完善其他参数内已勾选的数据'
            }
          })
        } else {
          if (this.form[e] && !this.form[required[i]]) {
            hintText = '请完善其他参数内已勾选的数据'
          }
        }
      })
      if (hintText) {
        return this.noticfy(hintText)
      }
      if (!this.form.bAfterProcessFrontSurface && !this.form.bAfterProcessBackSurface) {
        this.noticfy('请至少选择正面表面处理！')
        return false
      }
      this.loading = true
      const postData = {
        buckleBottomBoxList: [this.form],
        buckleBottomBoxOtherAfterList: this.otherPostWorkersEachData
      }

      Api.SaveBoxTypeQuotationBuckleBottomBox(postData)
        .then(res => {
          if (res.code == 200) {
            this.noticfy('操作成功！', 'success')
            this.costPriceData = res.data.buckleBottomBoxCalcResultList || []
            this.$set(this.form, 'isEdit', true)

            // let buckleBottomBoxCalcResultProcessMoneyList = res.data.buckleBottomBoxCalcResultProcessMoneyList || [];
            // if (buckleBottomBoxCalcResultProcessMoneyList.length > 0) {
            //     for (let i = 0; i < buckleBottomBoxCalcResultProcessMoneyList.length; i++) {
            //         let item = buckleBottomBoxCalcResultProcessMoneyList[i];
            //         this.postPressProcessStr += `${item.sProcessName}(${item.dProcessMoney})` + ',';
            //     }
            // }

            for (let i = 0; i < this.otherPostWorkersEachData.length; i++) {
              this.$set(this.otherPostWorkersEachData[i], 'isEdit', true)
            }
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    Refresh() {
      this.getList()
    },
    // 面值材料
    changeMaterialType(v) {
      const opt = this.optionConfig.facePaperMaterialPaperTypeDataSourceList.find(item => {
        return item.sPaperTypeName == v
      })

      this.facePaperMaterialPaperNameDataSourceList =
                this.optionConfig.facePaperMaterialPaperNameDataSourceList.filter(item => {
                  return item.sPaperType == opt.sPaperType
                }) || []
    },
    changeMaterialWeight(v) {
      const opt = this.optionConfig.facePaperMaterialWeightAndPriceDataSourceList.find(item => {
        return item.dWeight == v
      })
      this.$set(this.form, 'sFacePaperMaterialPriceType', opt ? opt.sPriceType : '')
      this.$set(this.form, 'dFacePaperMaterialPrice', opt ? opt.dPrice : '')
    },
    // 裱卡
    changeBkMaterialWeight(v) {
      const opt = this.optionConfig.facePaperMaterialWeightAndPriceDataSourceList.find(item => {
        return item.dWeight == v
      })

      this.$set(this.form, 'dMountedPaperMaterialPastingCardPrice', opt ? opt.dPrice : '')
    },
    // 成本明细
    costDetails() {
      this.buckleBottomBoxCalcResultCostDetailOptimalList = []

      Api.GetBoxTypeQuotationBuckleBottomBoxCostDetail(this.form.uGuid1).then(res => {
        if (res.code == 200) {
          this.buckleBottomBoxCalcResultCostDetailOptimalList = res.data.buckleBottomBoxCalcResultCostDetailOptimalList
          this.buckleBottomBoxCalcResultCostDetailOtherList = res.data.buckleBottomBoxCalcResultCostDetailOtherList
          this.setQuotationPriceDetailsForm()
        }
        this.quotationPriceDetailsVisible = true
      })
    },
    // 价格明细 从表 更多操作
    vquoteDetail1More(row) {
      this.buckleBottomBoxCalcResultCostDetailMoreAfterDetail = ''
      if (row.sOptimalName && this.form.uGuid1) {
        Api.GetBoxTypeQuotationBuckleBottomBoxCostDetailOptimalMore(this.form.uGuid1, row.sOptimalName).then(res => {
          if (res.code == 200) {
            this.costBreakdownOptimalResultVisible = true
            this.costBreakdownOptimalResultType = 1
            this.costBreakdownOptimalResultData = res.data.buckleBottomBoxCalcResultCostDetailOptimalMoreList.map(item => {
              item.dCuttingMoney = row.dCuttingMoney
              item.dAfterMoney = row.dAfterMoney
              return item
            })
          }
        })
      }
    },
    // 其它印刷机生产成本 表 更多操作
    vquoteDetail2More(row) {
      this.buckleBottomBoxCalcResultCostDetailMoreAfterDetail = ''
      if (row.sOptimalName && this.form.uGuid1) {
        Api.GetBoxTypeQuotationBuckleBottomBoxCostDetailOtherMore(this.form.uGuid1, row.sOptimalName).then(res => {
          if (res.code == 200) {
            this.costBreakdownOptimalResultVisible = true
            this.costBreakdownOptimalResultType = 2
            this.costBreakdownOptimalResultData = res.data.buckleBottomBoxCalcResultCostDetailOtherMoreList.map(item => {
              return item
            })
          }
        })
      }
    },
    // 显示后工费用
    postWorkExpenses(row) {
      this.buckleBottomBoxCalcResultCostDetailMoreAfterDetail = ''
      if (row.uMachineGuid2) {
        Api.GetBoxTypeQuotationBuckleBottomBoxCostDetailMoreAfterDetail(this.form.uGuid1, row.sOptimalName, row.uMachineGuid2).then(res => {
          if (res.code == 200) {
            this.buckleBottomBoxCalcResultCostDetailMoreAfterDetail = `${row.sOptimalName}（${row.dMachineLength}*${row.dMachineWidth}）后工费用：${res.msg}`
          }
        })
      }
    },
    // 获取报价价格明细数据
    setQuotationPriceDetailsForm() {
      const form = this.form
      const regex = /\{([^{}]+)\}/g
      let postPressProcessStr = ''
      for (let i = 0; i < postPressProcessFields.length; i++) {
        const item = postPressProcessFields[i]
        let { prop, text } = item
        const isCheck = form[prop]

        if (isCheck) {
          text = text.replace(regex, (match, key) => {
            if (key == 'sAfterProcessNailBoxType') {
              return form[key] == '1' ? '单钉' : '双钉'
            } else {
              return form[key]
            }
          })
          postPressProcessStr += text + ','
        }
      }
      if (form.bAfterProcessOtherAfter && this.otherPostWorkersEachData.length > 0) {
        for (let i = 0; i < this.otherPostWorkersEachData.length; i++) {
          const item = this.otherPostWorkersEachData[i]
          let text = ''
          const { sName, sUnitName, dQty, dLength, dWidth } = item
          if (sName) {
            if (sUnitName == '元/个') {
              text = `${sName}:(${dQty})`
            } else {
              text = `${sName}:(${dLength}*${dWidth})`
            }
            postPressProcessStr += text + ','
          }
        }
      }

      this.$set(this.quotationPriceDetailsForm, 'sProjectName', `【彩盒-${this.form.sBoxType}-${this.form.sBoxName}】`)
      this.$set(this.quotationPriceDetailsForm, 'sPostPressProcess', postPressProcessStr)
      let sPrintColor = ''
      if (form.sFacePaperPrintFrontColor) {
        sPrintColor = `正面(${form.sFacePaperPrintFrontColor})`
      }
      if (form.sFacePaperPrintBackColor) {
        sPrintColor += `,背面(${form.sFacePaperPrintBackColor})`
      }
      // 颜色
      this.$set(this.quotationPriceDetailsForm, 'sPrintColor', sPrintColor)
      // 展开方向
      this.$set(this.quotationPriceDetailsForm, 'sPanelDirection', this.costPriceData[0].sPanelDirection == '横拼' ? '展开长*展开高' : '展开高*展开长')

      const buckleBottomBoxCalcResultCostDetailOptimalList = this.buckleBottomBoxCalcResultCostDetailOptimalList
      let postProcessingCosts = 0
      let productionCosts = 0
      if (buckleBottomBoxCalcResultCostDetailOptimalList && buckleBottomBoxCalcResultCostDetailOptimalList.length > 0) {
        const t2 = buckleBottomBoxCalcResultCostDetailOptimalList[1]
        const t3 = buckleBottomBoxCalcResultCostDetailOptimalList[2]
        postProcessingCosts = parseFloat(t2.dSubTotalMoney) + parseFloat(t3.dSubTotalMoney)
        for (let i = 0; i < buckleBottomBoxCalcResultCostDetailOptimalList.length; i++) {
          productionCosts += parseFloat(buckleBottomBoxCalcResultCostDetailOptimalList[i].dSubTotalMoney || 0)
        }
      } else {
        postProcessingCosts = 0
      }

      // 后加工费用
      this.$set(this.quotationPriceDetailsForm, 'postProcessingCosts', postProcessingCosts.toFixed(2))
      // 生产成本
      this.$set(this.quotationPriceDetailsForm, 'productionCosts', productionCosts.toFixed(2))
      // 其他参数
      const otherParametersByBox = this.otherParameters[this.form.sBoxType]
      let otherParameters = ''
      if (otherParametersByBox && otherParametersByBox.length > 0) {
        for (let i = 0; i < otherParametersByBox.length; i++) {
          const item = otherParametersByBox[i]
          otherParameters += item.label + ':' + item.value + ','
        }
      }
      this.$set(this.quotationPriceDetailsForm, 'otherParameters', otherParameters)
      // 重量
      const dWeight = (form.dSizeLength * form.dSizeWidth * form.dSizeHigh * form.dFacePaperMaterialWeight) / 1000000.0
      this.$set(this.quotationPriceDetailsForm, 'dWeight', dWeight.toFixed(2))
      // 体积
      const dVolume = (form.dSizeLength * form.dSizeWidth * form.dSizeHigh) / 1000000000.0
      this.$set(this.quotationPriceDetailsForm, 'dVolume', dVolume.toFixed(4))
      // 材料
      let sMaterial = `面纸:${form.sFacePaperMaterialName}<span style="color: red">[${form.dFacePaperMaterialWeight}克/${form.dFacePaperMaterialWeight}克]</span>(${form.dFacePaperMaterialPrice}元/吨)`
      if (form.bMountedPaperMaterialPastingCard) {
        sMaterial += `<br/>裱卡:${form.sMountedPaperMaterialPastingCardName}<span style="color: red">[${form.dMountedPaperMaterialPastingCardWeight}克/${form.dMountedPaperMaterialPastingCardWeight}克]</span>(${form.dMountedPaperMaterialPastingCardPrice}元/吨)`
      }
      if (form.bMountedPaperMaterialCorrugated) {
        sMaterial += `<br/>裱瓦愣:${form.sMountedPaperMaterialCorrugatedName}(${form.dAfterProcessCuttingAmount}元/吨)`
      }
      this.$set(this.quotationPriceDetailsForm, 'sMaterial', sMaterial)
    },
    // 其他参数选择 设置值 @params：v 传值 field 字段名称 item 用于判断是否有多个参数
    changeFormField(v, field, item = {}) {
      this.$set(this.form, field, v)
      // 勾选带出的输入框或者下拉框，取消勾选也清除值
      if (['checkbox&input', 'checkbox&select'].includes(item.type) && !v) {
        item.ovalue = ''
        this.$set(this.form, item.oField, '')
        if (item.type == 'checkbox&select') {
          item.ovalue2 = ''
          this.$set(this.form, item.oField2, '')
        }
      }
      const names = {
        '双面胶': 'Ele_ColorBoxSetting_AfterProcess_DoubleFilm',
        '易撕拉条': 'Ele_ColorBoxSetting_AfterProcess_EasyTearTape'
      }
      // 取得下拉选项数据赋值
      if (item.type == 'checkbox&select' && Object.keys(names).includes(item.label) && v) {
        this.getBuckleBottomBoxAfterProcessData(names[item.label], item.label)
      }
      // 选中勾选项需要从新set，否则可能不渲染选中值
      if (item.type == 'checkbox&select') {
        const obj = {
          '双面胶': ['sOtherParameterDoubleSidedStrip', 'dOtherParameterDoubleSidedStrip'],
          '易撕拉条': ['sOtherParameterEasyTearStrip', 'dOtherParameterEasyTearStrip']
        }
        const arr = ['ovalue', 'ovalue2']
        const otherParameters = this.otherParameters[this.form.sBoxName]
        const paramsIndex = otherParameters.findIndex(e => e.label == item.label)
        // 取得对应下拉框绑定名称
        const valIndex = obj[item.label].findIndex(e => field == e)
        const valName = obj[item.label][valIndex]
        this.$set(otherParameters[paramsIndex], arr[valIndex], v)
        // 易撕拉条同步选项,单位和规格对应
        if (valName == 'sOtherParameterEasyTearStrip') {
          const valueIndex = otherParameters[paramsIndex].options.findIndex(e => e.value == v)
          this.$set(this.form, 'dOtherParameterEasyTearStrip', otherParameters[paramsIndex].options2[valueIndex].value)
          this.$set(otherParameters[paramsIndex], 'ovalue2', otherParameters[paramsIndex].options2[valueIndex].value)
        }
      }
    },
    // 其他后工每个 新增
    addOtherPostRow() {
      this.otherPostWorkersEachData.push({
        uGuid1: this.form.uGuid1,
        uGuid2: guid(),
        isEdit: false
      })
    },
    // 其他后工每个 删除
    removeOtherPostRow(index) {
      if (this.otherPostWorkersEachData.length > 1) {
        this.otherPostWorkersEachData.splice(index, 1)
      }
    },
    // 改变宽度，同步到内盖宽，外盖宽
    dSizeWidthChange(val) {
      const boxNames = ['抽纸盒', '平粘口扣底盒', '平粘口扣底盒侧边粘', '平粘盒', '平粘盒侧边粘']
      if (boxNames.includes(this.form.sBoxName)) {
        this.$set(this.form, 'dOtherParameterOuterCoverWidth', val)
        this.$set(this.form, 'dOtherParameterInnerCoverWidth', val - 1)
        // 把值同步到输入框
        const otherParameters = this.otherParameters[this.form.sBoxName]
        const index = otherParameters.findIndex(e => e.label == '外盖宽')
        const index2 = otherParameters.findIndex(e => e.label == '内盖宽')
        this.$set(otherParameters[index], 'value', val)
        this.$set(otherParameters[index2], 'value', val - 1)
      }
    },
    // 获取其他参数 易撕拉条，双面胶选项数据 根据tablename
    getBuckleBottomBoxAfterProcessData(tableName, label) {
      Api.GetBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource(tableName).then(res => {
        if (res.code == 200) {
          // 把值同步到下拉框
          const otherParameters = this.otherParameters[this.form.sBoxName]
          const index = otherParameters.findIndex(e => e.label == label)
          const data = res.data
          // 需要匹配对应的取值
          const obj = {
            '双面胶': 'doubleFilmDataSourceList',
            '易撕拉条': 'easyTearTapeDataSourceList'
          }
          this.$set(otherParameters[index], 'options', data[obj[label]].map(e => {
            return {
              label: e.sName, value: e.sName
            }
          }))
          this.$set(otherParameters[index], 'options2', data[obj[label]].map(e => {
            return {
              label: e.dWidth + 'mm',
              value: e.dWidth
            }
          }))
        }
      })
    },

    // 取得当前大类小类的选项数据
    typeParams() {
      const typeData = this.boxTypeOptions.find(item => {
        return item.name == this.form.sBoxType
      }).children
      return typeData
    },
    // 小类选项数据 @params getStrArr 是否返回字符串数组
    classParams(getStrArr = false) {
      // classParams.find(e => e.name == "str").params.includes('str')
      let data = this.typeParams().find(e => e.name == this.form.sBoxName).params
      if (getStrArr) {
        data = data.map(e => e.name)
      }
      return data
    },
    // 是否拥有列表项 @params str 传入列表项中文字符
    haveTableParams(str) {
      if (this.form.sBoxName === '拼图') {
        console.log('this.form.sBoxName: ', this.form.sBoxName)
        console.log('1str: ', str)
        if (str == '背纸') {
          console.log('str: ', str)
          return this.radioType === '三层拼图'
        }
      }
      return this.classParams(true).includes(str)
    },
    // 中间加厚项TODO:真实数据未接入
    addMiddleParams() {
      const arr = this.dataArr
      this.$nextTick(function() {
        if (arr.length < 3) {
          arr.push({})
        }
      })
    },
    // 中间加厚项 删除
    delMiddleParams(index) {
      this.dataArr.splice(index, 1)
    },
    //  列表项是否拥有额外参数 @params paramsName:列表项名称，ExtraParams:列表项额外参数
    haveExtraParams(paramsName, extraParams) {
      return this.classParams().find(e => e.name == paramsName)?.params.includes(extraParams)
    },
    // 添加每套数量
    addEveryCount() {
      this.everyCount.push({})
    },
    // 删除每套数量
    delEveryCount(index) {
      this.everyCount.splice(index, 1)
    },
    // 类型变更
    radioTypeChange() {
      // 切换图片

    }
  }
}
</script>

<style lang="scss"  scoped>
// .el-row{
//     display:flex;
// }
.YZ-common-layout-form {
    height: calc(100vh - 136px);
    width: 100%;
    position: relative;
    background: #fff;

    z-index: 9;

    .form-right-box {
        .info-center-box {
            border: 1px solid #dcdfe6;
            border-bottom: none;
            border-top: none;
            padding: 5px 10px;
        }
    }
}

.mini-form .el-button--mini {
    padding: 5px 6px;
}

.el-button--mini.is-circle {
    padding: 3px;
}

.content {
    background-color: #b5d6e6;
    /* margin-top: 30px; */
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #3a81c8;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #3a81c8;
    line-height: 25px;
    width: 100%;
    border-collapse: collapse;
    background-color: #b5d6e6;
    margin-top: 2px;
}

.content th,
.content td {
    border-left-width: 1px;
    border-left-style: solid;
    border-left-color: #3a81c8;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #3a81c8;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #3a81c8;
    padding: 5px;
}

.content td {
    background-color: white;
    line-height: 20px;
    padding-left: 5px;
    font-size: 14px;
}

.content th {
    font-weight: normal;
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    background: linear-gradient(#e9f7fc, #cde9fc);
}

.opacity-box {
    opacity: 0;
}

.flex-row {
    display: flex;
    align-items: center;
}

.footer {
    text-align: center;
    padding: 10px;
}

.img-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.bg-purple-dark1 {
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #d8d8d880;
}

.grid-content1 {
    border-top: 1px solid #d8d8d880;
    border-left: 1px solid #d8d8d880;

    img {
        width: 100%;
        height: 100%;
    }
}

.content {
    overflow: auto;
    height: 100%;
}

.el-row {
    display: flex;
}

.grid-content {
    background-color: #fff;
    border-right: 1px solid #d8d8d880;
    border-bottom: 1px solid #d8d8d880;
    box-sizing: border-box;

    padding: 5px 10px;
    height: 100%;
    display: flex;
    align-items: center;

    // ;
    &.grid-label {
        justify-content: center;
        flex-wrap: wrap;
        padding: 0;
    }
}

.width100 {
    width: 100%;
}

.hight-level1 {
    .grid-content {
        height: 100px;
    }
}

.hight-level2 {
    .grid-content {
        // height: 382px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        >div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;

            p {
                display: flex;
                align-items: center;
            }

            p:last-child {
                width: 200px;
                justify-content: flex-start;
            }
        }
    }

    .bg-purple-dark {
        align-items: center;
    }
}

.flex-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    p {
        width: 100%;
        text-align: left;
    }
}

.a-start {
    align-items: flex-start;
    justify-content: space-around;
}

.row-box {
    display: block !important;

    text-align: left;
    width: 100%;

    .el-col {
        margin-top: 10px;

        &:nth-child(1) {
            margin-top: 0;
        }

        &:nth-child(2) {
            margin-top: 0;
        }
    }
}

/deep/ {
    .el-checkbox {
        margin-right: 0 !important;
    }

    .grid-content {
        .el-input__inner {
            padding: 0 5px;
        }
    }

    .hight-level1 {
        .el-input {
            margin: 10px 5px;
        }
    }

    .el-input {
        width: 85px;
        margin: 0px 5px;
    }

    .hight-level2 {
        text-align: center;
    }

    .el-input--small .el-input {
        width: 90px;
        text-align: center;
        margin-right: 10px;
        height: 27px;
        line-height: 27px;
    }

    .long-mini .el-input {
        width: 110px;
    }

    .short-mini .el-input {
        width: 70px;
    }

    .small-input {
        .el-input {
            margin: 0 3px;
        }

        .el-input__inner {
            width: 100%;
            height: 22px;
            line-height: 22px;
            margin: 0px;
        }
    }
}

.product-form {
    width: 70%;
    margin: 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;

    .product-form-box {
        display: flex;
    }

    .border-box {
        border: 1px solid #dcdfe6;
    }

    .border-bottom-box {
        border-bottom: 1px solid #dcdfe6;
    }

    .calc-info-box {
        .btns {}

        .info {
            padding: 15px;
        }
    }

    .product-images {
        width: 450px;
        background: #f1f1f1;
    }

    .product-info-form {
        flex: 1;

        /deep/.type-radios {
            .el-radio {
                margin-right: 10px;
                margin-left: 0;
                padding: 4px 5px;
                height: 24px;

                .el-radio__input {
                    display: none;
                }

                .el-radio__label {
                    padding-left: 0 !important;
                }
            }
        }
    }
}

.el-radio {
    margin-right: 10px;
}
</style>
