import request from '@/utils/request'

export default {
  // 获取项目显示设置列表
  GetitemConfigListData() {
    return request({
      url: `/api/QuotationSystem/GetitemConfigListData`,
      method: 'GET'
    })
  },

  // 保存项目显示设置
  SaveItemConfig(data) {
    return request({
      url: `/Ele_ItemConfiguration/SaveData`,
      method: 'POST',
      data
    })
  },
  // //删除项目显示设置
  // DelItemConfig(id) {
  //     return request({
  //         url: `/api/QuotationSystem/DelItemConfig?uGuid1=${id}`,
  //         method: 'DELETE',
  //     });
  // },
  // 删除项目显示设置
  DelItemConfig(id) {
    return request({
      url: `/Ele_ItemConfiguration/DeleDataById?id=${id}`,
      method: 'DELETE'
    })
  },
  // 获取彩盒设置彩盒参数
  GetcolorboxsettingPara(data) {
    return request({
      url: `api/QuotationSystem/GetcolorboxsettingPara`,
      method: 'GET',
      data
    })
  },
  // 保存彩盒设置彩盒参数
  SavecolorboxsettingPara(data) {
    return request({
      url: `api/QuotationSystem/SavecolorboxsettingPara`,
      method: 'POST',
      data
    })
  },

  // 获取彩盒设置彩盒参数
  GetPaperPriceSettingListData(data) {
    return request({
      url: `/Ele_PaperPriceSetting/ListData`,
      method: 'GET',
      data
    })
  },
  // 保存纸张价格设置
  SavePaperPriceSetting(data) {
    return request({
      url: `/Ele_PaperPriceSetting/SaveData`,
      method: 'POST',
      data
    })
  },
  // 获得某条纸张价格设置的数据（主表、明细、卷筒规格设置明细、特规纸规格设置明细）
  GetPaperPriceSettingDetail(id) {
    return request({
      url: `/Ele_PaperPriceSetting/SingleData?id=${id}`,
      method: 'GET'
    })
  },
  // 删除
  DeletePaperPriceSetting(id) {
    return request({
      url: `/Ele_PaperPriceSetting/DeleDataById?id=${id}`,
      method: 'DELETE'
    })
  },
  // 获取机台设置列表
  GetPrintMachineSettingListData(data) {
    return request({
      url: `/Ele_PrintMachineSetting/ListData`,
      method: 'GET',
      data
    })
  },
  // 保存纸张价格设置
  SavePrintMachineSetting(data) {
    return request({
      url: `/Ele_PrintMachineSetting/SaveData`,
      method: 'POST',
      data
    })
  },
  // 获取纸张价格设置 详情
  GetPrintMachineSettingDetail(id) {
    return request({
      url: `/Ele_PrintMachineSetting/SingleData?uGuid1=${id}`,
      method: 'GET'
    })
  },
  // 删除纸张价格设置 详情
  DeletePrintMachineSetting(id) {
    return request({
      url: `/Ele_PrintMachineSetting/DeleDataById?id=${id}`,
      method: 'DELETE'
    })
  },
  // 获取报价首页列表
  GetQuotationHomePageListData() {
    return request({
      url: `api/QuotationSystem/GetQuotationHomePageListData`,
      method: 'GET'
    })
  },
  // 获取彩盒设置 参数设置
  GetColorBoxSettingParameter() {
    return request({
      url: `/Ele_ColorBoxSetting_Parameter/ListData`,
      method: 'GET'
    })
  },
  // 保存彩盒设置 参数设置
  SaveColorBoxSettingParameter(data) {
    return request({
      url: `/Ele_ColorBoxSetting_Parameter/SaveData`,
      method: 'POST',
      data
    })
  },
  // 通过项目名称类别来获取印刷机台数据（主表、明细表）
  GetPrintMachineSettingDetailByItemName(sItemName) {
    return request({
      url: `/Ele_ColorBoxSetting_PrintMachineSetting/PrintMachineSettingDetailByItemName?sItemName=${sItemName}`,
      method: 'GET'
    })
  },
  // 获取彩盒设置-印刷机台参数设置列表
  GetColorBoxSettingPrintMachineSettingListData() {
    return request({
      url: `/Ele_ColorBoxSetting_PrintMachineSetting/ListData`,
      method: 'GET'
    })
  },
  // 保存彩盒设置-印刷机台参数设置
  SaveColorBoxSettingPrintMachineSetting(data) {
    return request({
      url: `/Ele_ColorBoxSetting_PrintMachineSetting/SaveData`,
      method: 'POST',
      data
    })
  },
  // 获得某条获取彩盒设置-印刷机台参数设置的数据（主表、明细）
  GetColorBoxSettingPrintMachineSettingDetail(uGuid1) {
    return request({
      url: `/Ele_ColorBoxSetting_PrintMachineSetting/SingleData?uGuid1=${uGuid1}`,
      method: 'GET'
    })
  },
  // 删除某条保存彩盒设置-印刷机台参数设置数据
  DeleteColorBoxSettingPrintMachineSetting(id) {
    return request({
      url: `/Ele_ColorBoxSetting_PrintMachineSetting/DeleDataById?id=${id}`,
      method: 'DELETE'
    })
  },

  // 保存彩盒设置-纸张设置
  SaveColorBoxSettingPrintMachineSetting(data) {
    return request({
      url: `/Ele_ColorBoxSetting_PrintMachineSetting/SaveData`,
      method: 'POST',
      data
    })
  },
  // 获得某条获取彩盒设置-纸张设置列表
  GetColorBoxSettingPaperListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingPaperListData`,
      method: 'GET'
    })
  },
  // 通过项目名称类别来获取纸张设置数据（主表、明细表）
  GetPaperPriceSettingDetailByItemName(sItemName) {
    return request({
      url: `api/QuotationSystem/GetPaperPriceSettingDetailByItemName?sItemName=${sItemName}`,
      method: 'GET'
    })
  },
  // 获取彩盒设置-参数设置，纸张名称、纸张克重（从纸张价格设置读取）
  GetPaperPriceSettingPaperNameAndPaperWeightByItemName(sItemName) {
    return request({
      url: `/Ele_ColorBoxSetting_Parameter/PaperPriceSettingPaperNameAndPaperWeightByItemName?sItemName=${sItemName}`,
      method: 'GET'
    })
  },
  // 保存彩盒纸张设置
  SaveColorBoxSettingPaper(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingPaper`,
      method: 'POST',
      data
    })
  },
  // 删除某条保存彩盒设置-纸张设置设置数据
  DeleteColorBoxSettingPaper(id) {
    return request({
      url: `api/QuotationSystem/DeleteColorBoxSettingPaper?uGuid1=${id}`,
      method: 'DELETE'
    })
  },

  // 获得某条获取彩盒设置--纸张设置设置数据
  GetColorBoxSettingPaperDetail(uGuid1) {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingPaperDetail?uGuid1=${uGuid1}`,
      method: 'GET'
    })
  },
  // 获取彩盒设置-后工设置列表
  GetColorBoxSettingAfterProcessListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置 保存
  SaveColorBoxSettingAfterProcess(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcess`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 局部压纹
  GetColorBoxSettingAfterProcessLocalEmbossingListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessLocalEmbossingListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置  局部压纹 保存
  SaveColorBoxSettingAfterProcessLocalEmbossing(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessLocalEmbossing`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 满版压纹
  GetColorBoxSettingAfterProcessFullEmbossingListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessFullEmbossingListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置  满版压纹 保存
  SaveColorBoxSettingAfterProcessFullEmbossing(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessFullEmbossing`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 局部Uv
  GetColorBoxSettingAfterProcessLocalUVListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessLocalUVListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置  局部Uv 保存
  SaveColorBoxSettingAfterProcessLocalUV(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessLocalUV`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 手工绳
  GetColorBoxSettingAfterProcessHandRopeListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessHandRopeListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置  手工绳 保存
  SaveColorBoxSettingAfterProcessHandRope(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessHandRope`,
      method: 'POST',
      data
    })
  },

  // 获取彩盒设置-后工设置 烫金
  GetColorBoxSettingAfterProcessHotGoldListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessHotGoldListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置  烫金 保存
  SaveColorBoxSettingAfterProcessHotGold(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessHotGold`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 表面处理
  GetColorBoxSettingAfterProcessSurfaceListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessSurfaceListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置  表面处理 保存
  SaveColorBoxSettingAfterProcessSurface(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessSurface`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 开天窗贴胶片
  GetColorBoxSettingAfterProcessPastingFilmListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessPastingFilmListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置 开天窗贴胶片 保存
  SaveColorBoxSettingAfterProcessPastingFilm(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessPastingFilm`,
      method: 'POST',
      data
    })
  },

  // 获取彩盒设置-后工设置 厚度及价格
  GetColorBoxSettingAfterProcessPastingFilmDetailListData(uGuid2) {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessPastingFilmDetailListData?uGuid2=${uGuid2}`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置 厚度及价格 保存
  SaveColorBoxSettingAfterProcessPastingFilmDetail(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessPastingFilmDetail`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 双面胶
  GetColorBoxSettingAfterProcessDoubleFilmListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessDoubleFilmListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置 双面胶 保存
  SaveColorBoxSettingAfterProcessDoubleFilm(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessDoubleFilm`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 易撕带
  GetColorBoxSettingAfterProcessEasyTearTapeListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessEasyTearTapeListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置 易撕带 保存
  SaveColorBoxSettingAfterProcessEasyTearTape(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessEasyTearTape`,
      method: 'POST',
      data
    })
  },

  // 获取彩盒设置-后工设置 模切
  GetColorBoxSettingAfterProcessCuttingListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessCuttingListData`,
      method: 'GET'
    })
  },
  // 获取彩盒设置-后工设置 模切模板费列
  GetColorBoxSettingAfterProcessCuttingTemplateListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessCuttingTemplateListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置 模切 保存
  SaveColorBoxSettingAfterProcessCutting(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessCutting`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 其他后工
  GetColorBoxSettingAfterProcessOtherAfterListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessOtherAfterListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置 其他后工 保存
  SaveColorBoxSettingAfterProcessOtherAfter(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessOtherAfter`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 包装
  GetColorBoxSettingAfterProcessPackageListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessPackageListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置 包装 保存
  SaveColorBoxSettingAfterProcessPackage(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessPackage`,
      method: 'POST',
      data
    })
  },

  // 获取彩盒设置-后工设置 粘盒
  GetColorBoxSettingAfterProcessPasteBoxUniformPriceListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessPasteBoxUniformPriceListData`,
      method: 'GET'
    })
  },

  // 获取彩盒设置-后工设置 粘盒 保存
  SaveColorBoxSettingAfterProcessPasteBoxUniformPrice(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessPasteBoxUniformPrice`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 裱卡
  GetColorBoxSettingAfterProcessMountedPaperListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessMountedPaperListData`,
      method: 'GET'
    })
  },
  // 获取彩盒设置-后工设置 裱卡 保存
  SaveColorBoxSettingAfterProcessMountedPaper(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessMountedPaper`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒设置-后工设置 瓦楞
  GetColorBoxSettingAfterProcessCorrugatedListData() {
    return request({
      url: `api/QuotationSystem/GetColorBoxSettingAfterProcessCorrugatedListData`,
      method: 'GET'
    })
  },
  // 获取彩盒设置-后工设置 瓦楞 保存
  SaveColorBoxSettingAfterProcessCorrugated(data) {
    return request({
      url: `api/QuotationSystem/SaveColorBoxSettingAfterProcessCorrugated`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒彩箱报价扣底盒
  GetBoxTypeQuotationBuckleBottomBoxListData(sBoxType, sBoxName) {
    return request({
      url: `api/BoxTypeQuotation/GetBoxTypeQuotationBuckleBottomBoxListData?sBoxType=${sBoxType}&sBoxName=${sBoxName}`,
      method: 'GET'
    })
  },
  // 获得某条彩盒彩箱报价-扣底盒-其他后工数据明细
  GetBoxTypeQuotationBuckleBottomBoxOtherAfterDetail(uGuid1) {
    return request({
      url: `api/BoxTypeQuotation/GetBoxTypeQuotationBuckleBottomBoxOtherAfterDetail?uGuid1=${uGuid1}`,
      method: 'GET'
    })
  },
  // 获得彩盒彩箱报价-扣底盒的页面数据源
  GetBoxTypeQuotationBuckleBottomBoxDataSource() {
    return request({
      url: `api/BoxTypeQuotation/GetBoxTypeQuotationBuckleBottomBoxDataSource`,
      method: 'GET'
    })
  },
  // 获得某条彩盒彩箱报价-扣底盒-后道工序数据源
  GetBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource(tableName) {
    return request({
      url: `api/BoxTypeQuotation/GetBoxTypeQuotationBuckleBottomBoxAfterProcessDataSource?tableName=${tableName}`,
      method: 'GET'
    })
  },
  // 保存彩盒彩箱报价-扣底盒
  SaveBoxTypeQuotationBuckleBottomBox(data) {
    return request({
      url: `api/BoxTypeQuotation/SaveBoxTypeQuotationBuckleBottomBox`,
      method: 'POST',
      data
    })
  },
  // 获取彩盒扣底 报价成本明细
  GetBoxTypeQuotationBuckleBottomBoxCostDetail(uGuid1) {
    return request({
      url: `api/BoxTypeQuotation/GetBoxTypeQuotationBuckleBottomBoxCostDetail?uGuid1=${uGuid1}`,
      method: 'GET'
    })
  },
  // 获得某条彩盒彩箱报价-扣底盒-成本明细-最优结果-更多/详情
  GetBoxTypeQuotationBuckleBottomBoxCostDetailOptimalMore(uGuid1, sMachineName) {
    return request({
      url: `api/BoxTypeQuotation/GetBoxTypeQuotationBuckleBottomBoxCostDetailOptimalMore?uGuid1=${uGuid1}&sMachineName=${sMachineName}`,
      method: 'GET'
    })
  },

  // 获得某条彩盒彩箱报价-扣底盒-成本明细-其他结果-更多/详情
  GetBoxTypeQuotationBuckleBottomBoxCostDetailOtherMore(uGuid1, sMachineName) {
    return request({
      url: `api/BoxTypeQuotation/GetBoxTypeQuotationBuckleBottomBoxCostDetailOtherMore?uGuid1=${uGuid1}&sMachineName=${sMachineName}`,
      method: 'GET'
    })
  },
  // 获得某条彩盒彩箱报价-扣底盒-成本明细-更多/详情-后工详细费用
  GetBoxTypeQuotationBuckleBottomBoxCostDetailMoreAfterDetail(uGuid1, sMachineName, uMachineGuid2) {
    return request({
      url: `api/BoxTypeQuotation/GetBoxTypeQuotationBuckleBottomBoxCostDetailMoreAfterDetail?uGuid1=${uGuid1}&sMachineName=${sMachineName}&uMachineGuid2=${uMachineGuid2}`,
      method: 'GET'
    })
  }

}
