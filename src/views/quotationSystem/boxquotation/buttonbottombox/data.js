// 盒型
export const BoxTypeOptions = [
  {
    F_TypeName: '扣底盒',
    children: [
      { F_TypeName: '扣底盒' },
      { F_TypeName: '带保险扣底盒' },
      { F_TypeName: '带挂钩扣底盒' },
      { F_TypeName: '固定盖扣底盒' },
      { F_TypeName: '双盖扣底盒' },
      { F_TypeName: '扣底盒侧粘口' }
    ]
  },
  {
    F_TypeName: '双插盒',
    children: [
      { F_TypeName: '双插盒' },
      { F_TypeName: '保险扣双插盒' },
      { F_TypeName: '带挂钩双插盒' },
      { F_TypeName: '双插盒侧粘口' },
      { F_TypeName: '同边插双插盒' },
      { F_TypeName: '同边双插盒带保险扣' },
      { F_TypeName: '同边插侧粘口' },
      { F_TypeName: '下固定双插盒' }
    ]
  },
  {
    F_TypeName: '天地盒',
    children: [
      { F_TypeName: '天地盒1' },
      { F_TypeName: '天地盒2' },
      { F_TypeName: '天地盒3' },
      { F_TypeName: '天地盒展开尺寸' },
      { F_TypeName: '锁扣天地盒' },
      { F_TypeName: '钩扣天地盒' },
      { F_TypeName: '四边折天地箱' },
      { F_TypeName: '上下盖手提盒' }
    ]
  },
  {
    F_TypeName: '平口箱',
    children: [{ F_TypeName: '平口箱' }, { F_TypeName: '无盖箱' }, { F_TypeName: '双合箱' }, { F_TypeName: '西瓜箱' }]
  },
  {
    F_TypeName: '飞机盒',
    children: [
      { F_TypeName: '飞机盒' },
      { F_TypeName: '带保险飞机盒' },
      { F_TypeName: '带钩扣保险扣飞机盒' }
      // 暂时用不上
      // {  F_TypeName: '飞机盒2',   },
      // {  F_TypeName: '展托1',   },
      // {  F_TypeName: '展托2',   },
      // {  F_TypeName: '展托3',   },
      // {  F_TypeName: '展托4',   },
      // {  F_TypeName: '套装飞机盒',   },
      // {  F_TypeName: '闭合式自带提手盒',   },
    ]
  },
  {
    F_TypeName: '手提盒',
    children: [
      { F_TypeName: '手提盒' },
      { F_TypeName: '提扣盒' },
      { F_TypeName: '提绳盒' },
      { F_TypeName: '斜盖型礼品盒' },
      { F_TypeName: '直边型礼品盒' },
      { F_TypeName: '平口型礼品盒' },
      { F_TypeName: '双插手提盒' },
      { F_TypeName: '凹顶手提盒' }
    ]
  },
  {
    F_TypeName: '抽屉盒',
    children: [{ F_TypeName: '抽屉盒' }, { F_TypeName: '筒套' }]
  },
  {
    F_TypeName: '平粘盒',
    children: [
      // {  F_TypeName: '抽纸盒',   },
      { F_TypeName: '平粘口扣底盒' },
      { F_TypeName: '平粘口扣底盒侧边粘' },
      { F_TypeName: '平粘盒' },
      { F_TypeName: '平粘盒侧边粘' }
    ]
  },
  { F_TypeName: '食品包装盒', children: [{ F_TypeName: '折叠蛋糕盒' }] }
  // {  F_TypeName: '展示盒', children: [{  F_TypeName: '一号展示盒',   }] },
  // {  F_TypeName: '刀版尺寸', children: [{  F_TypeName: '其它箱',   }] },
]
// 其他参数
export const OtherParameters = {
  // ==========  扣底盒类型  ==========
  扣底盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣底插入', type: 'input', olabel: '直角扣底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],
  带保险扣底盒: [
    { field: 'dOtherParameterInsuranceHigh', label: '保险扣高', type: 'input' },
    { type: 'null' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣底插入', type: 'input', olabel: '直角扣底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],
  带挂钩扣底盒: [
    { field: 'dOtherParameterHookHigh', label: '挂钩总高', type: 'input', olabel: '粘挂钩', ofield: 'bOtherParameterPasteHook', otype: 'checkbox' },
    { type: 'null' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣底插入', type: 'input', olabel: '直角扣底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],
  固定盖扣底盒: [
    { field: 'dOtherParameterFixedCoverTotalHigh', label: '固定盖总高', type: 'input' },
    { type: 'null' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣底插入', type: 'input', olabel: '直角扣底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],
  双盖扣底盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣底插入', type: 'input', olabel: '直角扣底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],
  扣底盒侧粘口: [
    { field: 'dOtherParameterInsuranceHigh', label: '保险扣高', type: 'input' },
    { field: 'dOtherParameterHookHigh', label: '挂钩总高', type: 'input' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣底插入', type: 'input', olabel: '直角扣底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],

  双插盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],

  // ==========  飞机盒类型 ==========
  飞机盒: [
    { field: 'dOtherParameterFoldPosition', label: '折位', type: 'input' },
    { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield: 'dOtherParameterInsuranceHigh' },
    { field: 'dOtherParameterBucklePosition', label: '扣位', type: 'input' },
    { field: 'dOtherParameterInsertWingHigh', label: '插翼高', type: 'input' }
  ],
  带保险飞机盒: [
    { field: 'dOtherParameterFoldPosition', label: '折位', type: 'input' },
    { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield: 'dOtherParameterInsuranceHigh' },
    { field: 'dOtherParameterBucklePosition', label: '扣位', type: 'input' },
    { field: 'dOtherParameterInsertWingHigh', label: '插翼高', type: 'input' }
  ],
  带钩扣保险扣飞机盒: [
    { field: 'dOtherParameterFoldPosition', label: '折位', type: 'input' },
    { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield: 'dOtherParameterInsuranceHigh' },
    { field: 'dOtherParameterReverseFoldHigh', label: '反折高', type: 'input' },
    { field: 'dOtherParameterInsertWingHigh', label: '插翼高', type: 'input' },
    { field: 'dOtherParameterHookWidth', label: '钩扣宽', type: 'input' }
  ],
  // 暂时用不上，先注释掉
  // '飞机盒2':[
  //     { field: 'dOtherParameterFoldPosition', label: '折位', type: 'input' },
  //     { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield:'dOtherParameterInsuranceHigh' },
  //     { field: 'dOtherParameterReverseFoldHigh', label: '反折高', type: 'input' },
  //     { field: 'dOtherParameterInsertWingHigh', label: '插翼高', type: 'input' },
  //     { field: 'dOtherParameterInsertWingHigh', label: '钩扣宽', type: 'input' },
  // ],
  // '展托1':[
  //     { field: 'dOtherParameterFoldPosition', label: '盖位', type: 'input' },
  // ],
  // '展托2':[
  //     { field: 'dOtherParameterFoldPosition', label: '盖位', type: 'input' },
  // ],
  // '展托3':[
  //     { field: 'dOtherParameterFoldPosition', label: '盖位', type: 'input' },
  // ],
  // '展托4':[
  //     { field: 'dOtherParameterFoldPosition', label: '盖位', type: 'input' },
  // ],
  // '套装飞机盒':[
  //     { field: 'dOtherParameterFoldPosition', label: '折位', type: 'input' },
  //     { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield:'dOtherParameterInsuranceHigh' },
  //     { field: 'bOtherParameterInsurance', label: '延伸部分', type: 'checkbox', ofield:'dOtherParameterInsuranceHigh' },

  // ],
  // '闭合式自带提手盒':[
  //     { field: 'dOtherParameterFoldPosition', label: '提手高', type: 'input' },
  //     { field: 'dOtherParameterFoldPosition', label: '耳朵边', type: 'input' },
  // ],

  //  TODO: field字段还没调  ========== 双插盒 ==========
  双插盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],
  保险扣双插盒: [
    { field: 'dOtherParameterUpInsuranceHigh', label: '上保险扣高', type: 'input' },
    { field: 'dOtherParameterDownInsuranceHigh', label: '下保险扣高', type: 'input' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],
  带挂钩双插盒: [
    { field: 'dOtherParameterBottomInsert', label: '挂钩总高度', type: 'input', olabel: '粘挂钩', ofield: 'bOtherParameterPasteHook', otype: 'checkbox' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ],
  双插盒侧粘口: [
    { field: 'dOtherParameterBottomInsert', label: '挂钩总高度', type: 'input', olabel: '粘挂钩', ofield: 'bOtherParameterPasteHook', otype: 'checkbox' },
    { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield: 'dOtherParameterInsuranceHigh' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '拉手', type: 'input' }
  ],
  同边插双插盒: [
    { field: 'dOtherParameterBottomInsert', label: '挂钩总高度', type: 'input' },
    { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield: 'dOtherParameterInsuranceHigh' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '拉手', type: 'input' }
  ],
  同边双插盒带保险扣: [
    { field: 'dOtherParameterBottomInsert', label: '挂钩总高度', type: 'input' },
    { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield: 'dOtherParameterInsuranceHigh' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '拉手', type: 'input' }
  ],
  同边插侧粘口: [
    { field: 'dOtherParameterBottomInsert', label: '挂钩总高度', type: 'input' },
    { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield: 'dOtherParameterInsuranceHigh' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '拉手', type: 'input' }
  ],
  下固定双插盒: [
    { field: 'dOtherParameterBottomInsert', label: '下固定盖总高度', type: 'input' },
    { type: 'null' },
    { field: 'bOtherParameterInsurance', label: '挂钩总高度', type: 'checkbox&input', ofield: 'dOtherParameterInsuranceHigh' },
    { field: 'bOtherParameterInsurance', label: '保险扣', type: 'checkbox&input', ofield: 'dOtherParameterInsuranceHigh' },
    { field: 'dOtherParameterStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' },
    { field: 'dOtherParameterWingcap', label: '拉手', type: 'input' }
  ],
  // TODO:字段还没调 ==========  天地盒类型  ============================================================
  天地盒1: [],
  天地盒2: [{ field: 'dOtherParameterFoldPosition', label: '折位', type: 'input' }],
  天地盒3: [
    { field: 'dOtherParameterFoldPosition', label: '底折位', type: 'input' },
    { field: 'dOtherParameterFoldPosition', label: '顶折位', type: 'input' }
  ],
  天地盒展开尺寸: [],
  锁扣天地盒: [],
  钩扣天地盒: [
    { field: 'dOtherParameterFoldPosition', label: '折位', type: 'input' },
    { field: 'dOtherParameterHookWidth', label: '钩扣宽', type: 'input' }
  ],
  四边折天地箱: [{ field: 'dOtherParameterFoldPosition', label: '顶折位', type: 'input' }],
  上下盖手提盒: [{ field: 'dOtherParameterFoldPosition', label: '折位宽', type: 'input' }],
  // TODO:字段还没调 ========== 平口箱 ============================================================
  平口箱: [{ field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' }],
  无盖箱: [{ field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' }],
  双合箱: [{ field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' }],
  西瓜箱: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterStickyWidth', label: '盖宽', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '面纸包底', type: 'input', olabel: '全包', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' }
  ],
  // TODO:字段还没调 ========== 手提盒 ============================================================
  手提盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input', olabel: '平口底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterStickyWidth', label: '提手高度', type: 'input' },
    { field: 'dOtherParameterFrontGaryPlug', label: '前插盖利', type: 'input' },
    { field: 'dOtherParameterAfterGaryPlug', label: '后插盖利', type: 'input' }
  ],
  提扣盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input', olabel: '平口底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterStickyWidth', label: '插口', type: 'input' }
  ],
  提绳盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input', olabel: '平口底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' },
    { field: 'dOtherParameterStickyWidth', label: '插口', type: 'input' }
  ],
  斜盖型礼品盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input', olabel: '平口底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '翼宽', type: 'input' },
    { field: 'dOtherParameterStickyWidth', label: '盖插', type: 'input' }
  ],
  直边型礼品盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input', olabel: '平口底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterStickyWidth', label: '盖插', type: 'input' }
  ],
  平口型礼品盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input', olabel: '平口底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' }
  ],
  双插手提盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input', olabel: '平口底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '前插盖利', type: 'input' },
    { field: 'dOtherParameterStickyWidth', label: '后插盖利', type: 'input' }
  ],
  凹顶手提盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input', olabel: '平口底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '凹顶高度', type: 'input' },
    { field: 'dOtherParameterStickyWidth', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterStickyWidth', label: '折位宽', type: 'input' }
  ],
  // ========== 抽屉盒  ============================================================
  抽屉盒: [{ field: 'dOtherParameterPasteBoxStickyWidth', label: '粘口位', type: 'input' }],
  筒套: [{ field: 'dOtherParameterPasteBoxStickyWidth', label: '粘口位', type: 'input' }],
  // ========== 平粘盒  ============================================================
  // '抽纸盒':[
  //     { field: 'dOtherParameterOuterCoverWidth', label: '外盖宽', type: 'input', disabled:true, },
  //     { field: 'dOtherParameterInnerCoverWidth', label: '内盖宽', type: 'input', disabled:true, },
  //     { field: 'dOtherParameterPasteBoxStickyWidth', label: '粘口位', type: 'input' },

  // ],
  平粘口扣底盒: [
    { field: 'dOtherParameterOuterCoverWidth', label: '外盖宽', type: 'input', disabled: true },
    { type: 'null' },
    { field: 'bOtherParameterDoubleSidedStrip', label: '双面胶', type: 'checkbox&select', ofield: 'sOtherParameterDoubleSidedStrip', ofield2: 'dOtherParameterDoubleSidedStrip', ofield2Disabled: true },
    { field: 'dOtherParameterInnerCoverWidth', label: '内盖宽', type: 'input', disabled: true },
    { field: 'bOtherParameterEasyTearStrip', label: '易撕拉条', type: 'checkbox&select', ofield: 'sOtherParameterEasyTearStrip', ofield2: 'dOtherParameterEasyTearStrip', ofield2Disabled: true },
    { type: 'null' },
    { field: 'dOtherParameterPasteBoxStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input' }
  ],
  平粘口扣底盒侧边粘: [
    { field: 'dOtherParameterOuterCoverWidth', label: '外盖宽', type: 'input', disabled: true },
    { type: 'null' },
    { field: 'bOtherParameterDoubleSidedStrip', label: '双面胶', type: 'checkbox&select', ofield: 'sOtherParameterDoubleSidedStrip', ofield2: 'dOtherParameterDoubleSidedStrip' },
    { field: 'dOtherParameterInnerCoverWidth', label: '内盖宽', type: 'input', disabled: true },
    { field: 'bOtherParameterEasyTearStrip', label: '易撕拉条', type: 'checkbox&select', ofield: 'sOtherParameterEasyTearStrip', ofield2: 'dOtherParameterEasyTearStrip', ofield2Disabled: true },
    { type: 'null' },
    { field: 'dOtherParameterPasteBoxStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input' }
  ],
  平粘盒: [
    { field: 'dOtherParameterOuterCoverWidth', label: '外盖宽', type: 'input', disabled: true },
    { type: 'null' },
    { field: 'bOtherParameterDoubleSidedStrip', label: '双面胶', type: 'checkbox&select', ofield: 'sOtherParameterDoubleSidedStrip', ofield2: 'dOtherParameterDoubleSidedStrip' },
    { field: 'dOtherParameterInnerCoverWidth', label: '内盖宽', type: 'input', disabled: true },
    { field: 'bOtherParameterEasyTearStrip', label: '易撕拉条', type: 'checkbox&select', ofield: 'sOtherParameterEasyTearStrip', ofield2: 'dOtherParameterEasyTearStrip', ofield2Disabled: true },
    { type: 'null' },
    { field: 'dOtherParameterPasteBoxStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input' }
  ],
  平粘盒侧边粘: [
    { field: 'dOtherParameterOuterCoverWidth', label: '外盖宽', type: 'input', disabled: true },
    { type: 'null' },
    { field: 'bOtherParameterDoubleSidedStrip', label: '双面胶', type: 'checkbox&select', ofield: 'sOtherParameterDoubleSidedStrip', ofield2: 'dOtherParameterDoubleSidedStrip' },
    { field: 'dOtherParameterInnerCoverWidth', label: '内盖宽', type: 'input', disabled: true },
    { field: 'bOtherParameterEasyTearStrip', label: '易撕拉条', type: 'checkbox&select', ofield: 'sOtherParameterEasyTearStrip', ofield2: 'dOtherParameterEasyTearStrip', ofield2Disabled: true },
    { type: 'null' },
    { field: 'dOtherParameterPasteBoxStickyWidth', label: '粘口位', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣抵插入', type: 'input' }
  ],
  // ========== 食品包装盒  ============================================================
  折叠蛋糕盒: [],
  // ========== 展示盒  ============================================================
  '1号展示盒': [
    { field: 'dOtherParameterFoldPosition', label: '折位宽', type: 'input' },
    { field: 'dOtherParameterFoldPosition', label: '插翅长', type: 'input' }
  ],
  // ========== 刀版尺寸  ============================================================
  其他箱: []
}

// 图片数据
export const imgsData = {
  扣底盒: [
    { imgsrc: require('./imgs/koudihe/koudihe/1.jpg') },
    { imgsrc: require('./imgs/koudihe/koudihe/2.jpg') },
    { imgsrc: require('./imgs/koudihe/koudihe/3.jpg') },
    { imgsrc: require('./imgs/koudihe/koudihe/4.jpg') },
    { imgsrc: require('./imgs/koudihe/koudihe/5.jpg') }
  ],
  带保险扣底盒: [
    { imgsrc: require('./imgs/koudihe/daibaoxiankoudihe/1.jpg') },
    { imgsrc: require('./imgs/koudihe/daibaoxiankoudihe/2.jpg') },
    { imgsrc: require('./imgs/koudihe/daibaoxiankoudihe/3.jpg') },
    { imgsrc: require('./imgs/koudihe/daibaoxiankoudihe/4.jpg') }
  ],
  带挂钩扣底盒: [
    { imgsrc: require('./imgs/koudihe/daiguagoukoudihe/1.jpg') },
    { imgsrc: require('./imgs/koudihe/daiguagoukoudihe/2.jpg') },
    { imgsrc: require('./imgs/koudihe/daiguagoukoudihe/3.jpg') }
  ],
  固定盖扣底盒: [{ imgsrc: require('./imgs/koudihe/gudinggaikoudihe/1.jpg') }, { imgsrc: require('./imgs/koudihe/gudinggaikoudihe/2.jpg') }],
  双盖扣底盒: [
    { imgsrc: require('./imgs/koudihe/shuanggaikoudihe/1.jpg') },
    { imgsrc: require('./imgs/koudihe/shuanggaikoudihe/2.jpg') },
    { imgsrc: require('./imgs/koudihe/shuanggaikoudihe/3.jpg') }
  ],
  扣底盒侧粘口: [
    { imgsrc: require('./imgs/koudihe/koudihecezhankou/1.jpg') },
    { imgsrc: require('./imgs/koudihe/koudihecezhankou/2.jpg') },
    { imgsrc: require('./imgs/koudihe/koudihecezhankou/3.jpg') }
  ],
  双插盒: [
    { imgsrc: require('./imgs/shuangchahe/shuangchahe/1.jpg') },
    { imgsrc: require('./imgs/shuangchahe/shuangchahe/2.jpg') },
    { imgsrc: require('./imgs/shuangchahe/shuangchahe/3.jpg') },
    { imgsrc: require('./imgs/shuangchahe/shuangchahe/4.jpg') }
  ],
  飞机盒: [{ imgsrc: require('./imgs/feijihe/feijihe/1.jpg') }, { imgsrc: require('./imgs/feijihe/feijihe/2.jpg') }],
  带保险飞机盒: [{ imgsrc: require('./imgs/feijihe/daibaoxianfeijihe/1.jpg') }, { imgsrc: require('./imgs/feijihe/daibaoxianfeijihe/2.jpg') }],
  带钩扣保险扣飞机盒: [{ imgsrc: require('./imgs/feijihe/daigoukoufeijihe/1.jpg') }],
  双插盒: [
    { imgsrc: require('./imgs/shuangchahe/shuangchahe/1.jpg') },
    { imgsrc: require('./imgs/shuangchahe/shuangchahe/2.jpg') },
    { imgsrc: require('./imgs/shuangchahe/shuangchahe/3.jpg') },
    { imgsrc: require('./imgs/shuangchahe/shuangchahe/4.jpg') }
  ],
  保险扣双插盒: [{ imgsrc: require('./imgs/shuangchahe/baoxiankoushuangchahe/1.jpg') }, { imgsrc: require('./imgs/shuangchahe/baoxiankoushuangchahe/2.jpg') }],
  带挂钩双插盒: [{ imgsrc: require('./imgs/shuangchahe/daiguagoushuangchahe/1.jpg') }, { imgsrc: require('./imgs/shuangchahe/daiguagoushuangchahe/2.jpg') }],
  双插盒侧粘口: [{ imgsrc: require('./imgs/shuangchahe/shuangchahecezhankou/1.jpg') }],
  同边插双插盒: [
    { imgsrc: require('./imgs/shuangchahe/tongbianchashuangchahe/1.jpg') },
    { imgsrc: require('./imgs/shuangchahe/tongbianchashuangchahe/2.jpg') }
  ],
  同边双插盒带保险扣: [
    { imgsrc: require('./imgs/shuangchahe/tongbianchashuangchahe/4.jpg') },
    { imgsrc: require('./imgs/shuangchahe/tongbianchashuangchahe/5.jpg') }
  ],
  同边双插盒带挂钩保险扣: [
    { imgsrc: require('./imgs/shuangchahe/tongbianchashuangchahe/3.jpg') }
  ],
  同边插侧粘口: [
    { imgsrc: require('./imgs/shuangchahe/tongbianchacezhankou/1.jpg') },
    { imgsrc: require('./imgs/shuangchahe/tongbianchacezhankou/2.jpg') },
    { imgsrc: require('./imgs/shuangchahe/tongbianchacezhankou/3.jpg') },
    { imgsrc: require('./imgs/shuangchahe/tongbianchacezhankou/4.jpg') }
  ],
  下固定双插盒: [
    { imgsrc: require('./imgs/shuangchahe/xiagudingshuangchahe/1.jpg') },
    { imgsrc: require('./imgs/shuangchahe/xiagudingshuangchahe/2.jpg') },
    { imgsrc: require('./imgs/shuangchahe/xiagudingshuangchahe/3.jpg') },
    { imgsrc: require('./imgs/shuangchahe/xiagudingshuangchahe/4.jpg') }
  ],
  天地盒1: [{ imgsrc: require('./imgs/tiandihe/tiandihe1/1.jpg') }],
  天地盒2: [
    { imgsrc: require('./imgs/tiandihe/tiandihe2/1.jpg') },
    { imgsrc: require('./imgs/tiandihe/tiandihe2/2.jpg') },
    { imgsrc: require('./imgs/tiandihe/tiandihe2/3.jpg') },
    { imgsrc: require('./imgs/tiandihe/tiandihe2/4.jpg') },
    { imgsrc: require('./imgs/tiandihe/tiandihe2/5.jpg') }
  ],
  天地盒3: [
    { imgsrc: require('./imgs/tiandihe/tiandihe3/1.jpg') },
    { imgsrc: require('./imgs/tiandihe/tiandihe3/2.jpg') },
    { imgsrc: require('./imgs/tiandihe/tiandihe3/3.jpg') },
    { imgsrc: require('./imgs/tiandihe/tiandihe3/4.jpg') },
    { imgsrc: require('./imgs/tiandihe/tiandihe3/5.jpg') }
  ],
  天地盒展开尺寸: [{ imgsrc: require('./imgs/tiandihe/tiandihezhankaichicun/1.jpg') }],
  锁扣天地盒: [
    { imgsrc: require('./imgs/tiandihe/suokoutiandihe/1.jpg') },
    { imgsrc: require('./imgs/tiandihe/suokoutiandihe/2.jpg') },
    { imgsrc: require('./imgs/tiandihe/suokoutiandihe/3.jpg') },
    { imgsrc: require('./imgs/tiandihe/suokoutiandihe/4.jpg') },
    { imgsrc: require('./imgs/tiandihe/suokoutiandihe/5.jpg') }
  ],
  钩扣天地盒: [
    { imgsrc: require('./imgs/tiandihe/goukoutiandihe/1.jpg') },
    { imgsrc: require('./imgs/tiandihe/goukoutiandihe/2.jpg') },
    { imgsrc: require('./imgs/tiandihe/goukoutiandihe/3.jpg') },
    { imgsrc: require('./imgs/tiandihe/goukoutiandihe/4.jpg') },
    { imgsrc: require('./imgs/tiandihe/goukoutiandihe/5.jpg') }
  ],
  四边折天地箱: [
    { imgsrc: require('./imgs/tiandihe/sibianzhetiandihe/1.jpg') },
    { imgsrc: require('./imgs/tiandihe/sibianzhetiandihe/2.jpg') },
    { imgsrc: require('./imgs/tiandihe/sibianzhetiandihe/3.jpg') }
  ],
  上下盖手提盒: [
    { imgsrc: require('./imgs/tiandihe/shangxiagaishoutihe/1.jpg') },
    { imgsrc: require('./imgs/tiandihe/shangxiagaishoutihe/2.jpg') },
    { imgsrc: require('./imgs/tiandihe/shangxiagaishoutihe/3.jpg') },
    { imgsrc: require('./imgs/tiandihe/shangxiagaishoutihe/4.jpg') },
    { imgsrc: require('./imgs/tiandihe/shangxiagaishoutihe/5.jpg') }
  ],
  平口箱: [
    { imgsrc: require('./imgs/pingkouxiang/pingkouxiang/1.jpg') },
    { imgsrc: require('./imgs/pingkouxiang/pingkouxiang/2.jpg') },
    { imgsrc: require('./imgs/pingkouxiang/pingkouxiang/3.jpg') }
  ],
  无盖箱: [{ imgsrc: require('./imgs/pingkouxiang/wugaixiang/1.jpg') }, { imgsrc: require('./imgs/pingkouxiang/wugaixiang/2.jpg') }],
  双合箱: [{ imgsrc: require('./imgs/pingkouxiang/shuanghexiang/1.jpg') }],
  西瓜箱: [
    { imgsrc: require('./imgs/pingkouxiang/xiguaxiang/1.jpg') },
    { imgsrc: require('./imgs/pingkouxiang/xiguaxiang/2.jpg') },
    { imgsrc: require('./imgs/pingkouxiang/xiguaxiang/3.jpg') },
    { imgsrc: require('./imgs/pingkouxiang/xiguaxiang/4.jpg') },
    { imgsrc: require('./imgs/pingkouxiang/xiguaxiang/5.jpg') }
  ],
  手提盒: [{ imgsrc: require('./imgs/shoutihe/shoutihe/1.jpg') }, { imgsrc: require('./imgs/shoutihe/shoutihe/2.jpg') }, { imgsrc: require('./imgs/shoutihe/shoutihe/3.jpg') }],
  提扣盒: [{ imgsrc: require('./imgs/shoutihe/tikouhe/1.jpg') }, { imgsrc: require('./imgs/shoutihe/tikouhe/2.jpg') }],
  提绳盒: [{ imgsrc: require('./imgs/shoutihe/tishenghe/1.jpg') }, { imgsrc: require('./imgs/shoutihe/tishenghe/2.jpg') }],
  斜盖型礼品盒: [
    { imgsrc: require('./imgs/shoutihe/xiegaixinglipinhe/1.jpg') },
    { imgsrc: require('./imgs/shoutihe/xiegaixinglipinhe/2.jpg') },
    { imgsrc: require('./imgs/shoutihe/xiegaixinglipinhe/3.jpg') }
  ],
  直边型礼品盒: [{ imgsrc: require('./imgs/shoutihe/zhibianxinglipinhe/1.jpg') }, { imgsrc: require('./imgs/shoutihe/zhibianxinglipinhe/2.jpg') }],
  平口型礼品盒: [{ imgsrc: require('./imgs/shoutihe/pingkouxinglipinhe/1.jpg') }, { imgsrc: require('./imgs/shoutihe/pingkouxinglipinhe/2.jpg') }],
  双插手提盒: [{ imgsrc: require('./imgs/shoutihe/shuangchashoutihe/1.jpg') }, { imgsrc: require('./imgs/shoutihe/shuangchashoutihe/2.jpg') }],
  凹顶手提盒: [
    { imgsrc: require('./imgs/shoutihe/aodingshoutihe/1.jpg') },
    { imgsrc: require('./imgs/shoutihe/aodingshoutihe/2.jpg') },
    { imgsrc: require('./imgs/shoutihe/aodingshoutihe/3.jpg') },
    { imgsrc: require('./imgs/shoutihe/aodingshoutihe/4.jpg') },
    { imgsrc: require('./imgs/shoutihe/aodingshoutihe/5.jpg') }
  ],
  抽屉盒: [
    { imgsrc: require('./imgs/choutihe/choutihe/1.jpg') },
    { imgsrc: require('./imgs/choutihe/choutihe/2.jpg') },
    { imgsrc: require('./imgs/choutihe/choutihe/3.jpg') },
    { imgsrc: require('./imgs/choutihe/choutihe/4.jpg') },
    { imgsrc: require('./imgs/choutihe/choutihe/5.jpg') }
  ],
  筒套: [{ imgsrc: require('./imgs/choutihe/taotong/1.jpg') }, { imgsrc: require('./imgs/choutihe/taotong/2.jpg') }],
  // '抽纸盒':[
  //     { imgsrc: require('./imgs/pingzhanhe/chouzhihe/1.jpg') },
  //     { imgsrc: require('./imgs/pingzhanhe/chouzhihe/2.jpg') },
  //     { imgsrc: require('./imgs/pingzhanhe/chouzhihe/3.jpg') },
  //     { imgsrc: require('./imgs/pingzhanhe/chouzhihe/4.jpg') },
  // ],
  平粘口扣底盒: [
    { imgsrc: require('./imgs/pingzhanhe/pingzhankoukoudihe/1.jpg') },
    { imgsrc: require('./imgs/pingzhanhe/pingzhankoukoudihe/2.jpg') },
    { imgsrc: require('./imgs/pingzhanhe/pingzhankoukoudihe/3.jpg') },
    { imgsrc: require('./imgs/pingzhanhe/pingzhankoukoudihe/4.jpg') }
  ],
  平粘口扣底盒侧边粘: [{ imgsrc: require('./imgs/pingzhanhe/pingzhankoukoudihecebianzhan/1.jpg') }, { imgsrc: require('./imgs/pingzhanhe/pingzhankoukoudihecebianzhan/2.jpg') }],
  平粘盒: [
    { imgsrc: require('./imgs/pingzhanhe/pingzhanhe/1.jpg') },
    { imgsrc: require('./imgs/pingzhanhe/pingzhanhe/2.jpg') },
    { imgsrc: require('./imgs/pingzhanhe/pingzhanhe/3.jpg') },
    { imgsrc: require('./imgs/pingzhanhe/pingzhanhe/4.jpg') },
    { imgsrc: require('./imgs/pingzhanhe/pingzhanhe/5.jpg') }
  ],
  平粘盒侧边粘: [
    { imgsrc: require('./imgs/pingzhanhe/pingzhanhecebianzhan/1.jpg') },
    { imgsrc: require('./imgs/pingzhanhe/pingzhanhecebianzhan/2.jpg') },
    { imgsrc: require('./imgs/pingzhanhe/pingzhanhecebianzhan/3.jpg') }
  ],
  折叠蛋糕盒: [
    { imgsrc: require('./imgs/shipinbaozhuanghe/zhediedangaohe/1.jpg') },
    { imgsrc: require('./imgs/shipinbaozhuanghe/zhediedangaohe/2.jpg') },
    { imgsrc: require('./imgs/shipinbaozhuanghe/zhediedangaohe/3.jpg') },
    { imgsrc: require('./imgs/shipinbaozhuanghe/zhediedangaohe/4.jpg') }
  ],
  '1号展示盒': [{ imgsrc: require('./imgs/zhanshihe/yihaozhanshihe/1.jpg') }, { imgsrc: require('./imgs/zhanshihe/yihaozhanshihe/2.jpg') }],
  其他箱: [{ imgsrc: require('./imgs/daobanchicun/qitaxiang/1.jpg') }]
}
