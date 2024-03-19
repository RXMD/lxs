// 报价数据
/*
    {
        name：'大类名称'，
        params:{ // 若是单一的大类报价类型，此处为表格参数
            '后道工序':[],// 同一配置项也有不同，提交判断必填项也需要从此处取值
            '提交':[]
        },
        children:[// 若没有小类，此处为空数组
            {
                name:'小类名称',
                params:{}, //小类参数，同上
            }
        ],
    }
*/

export const BoxTypeOptions = [
  {
    name: '游戏卡牌',
    children: [
      {
        name: '棋盘',
        params: [
          { name: '展开尺寸', params: [] },
          { name: '数量', params: [] },
          { name: '包边选择', params: [] },
          { name: '开缝拼接', params: [] },
          { name: '半断折缝', params: [] },
          { name: '面纸', params: [] },
          { name: '中间加厚', params: [] },
          { name: '背纸', params: [] },
          { name: '后道工序', params: ['设计', '冲床', '模切', '自填刀模费', '正面压纹', '背面压纹', '烫金', '局部UV', '其他后工'] }
        ]
      },
      {
        name: '卡牌(扑克牌)',
        params: [
          { name: '成品尺寸', params: ['拼板间距'] },
          { name: '数量', params: ['每副卡牌数量'] },
          { name: '材料', params: [] },
          { name: '印刷', params: [] },
          { name: '后道工序', params: ['设计', '正面表面处理', '背面表面处理', '正面压纹', '背面压纹', '理牌', '配牌', '滚金边', '热缩膜', '内包装', '包装', '烫金', '局部UV', '其他后工'] }
        ]
      },
      {
        name: '钱币',
        params: [
          { name: '成品尺寸', params: [] },
          { name: '数量', params: [] },
          { name: '每套数量', params: [] },
          { name: '材料', params: [] },
          { name: '印刷', params: [] },
          { name: '后道工序', params: ['设计', '正面表面处理', '背面表面处理', '正面压纹', '背面压纹', '其他后工'] }
        ]
      },
      {
        name: '模切板',
        params: [
          { name: '成品尺寸', params: [] },
          { name: '数量', params: [] },
          { name: '类型', params: [] }// 三/五/七层板，单独处理
        ]
      },
      {
        name: '拼图',
        params: [
          // 模切与其他模切不同
          { name: '成品尺寸', params: [] },
          { name: '数量', params: [] },
          { name: '类型', params: [] }, // 根据类型选择，有二层和三层的区别，三层多了个背纸
          { name: '面纸', params: [] },
          { name: '中间加厚', params: [] },
          { name: '后道工序', params: ['设计', '模切', '压纹', '击凸', '烫金', 'UV', '其他'] }
        ]
      }
    ],
    submitParams: ['多数量', '自填利润率']// 自助其他参数
  },
  // 已有该分类 {
  //     name: "彩盒彩箱",
  // },
  {
    name: '特价礼品盒',
    children: [
      {
        name: '书型盒',
        params: [
          { name: '成品尺寸', params: ['长', '宽', '高'] },
          { name: '数量', params: [] },
          { name: '外盒芯纸', params: [] },
          { name: '外盒面纸', params: [] },
          { name: '外盒内衬', params: [] },
          { name: '内核面纸', params: [] },
          { name: '内托', params: [] },
          { name: '其他配件', params: [] }
        ]
      }, {
        name: '天地盒',
        params: [
          { name: '成品尺寸', params: ['长', '宽', '盒盖高', '底盒高'] },
          { name: '数量', params: ['顶加海绵', '指甲孔'] },
          { name: '盒盖芯纸', params: [] },
          { name: '盒盖面纸', params: [] },
          { name: '盒盖内贴', params: [] },
          { name: '底盒面纸', params: [] },
          { name: '底盒内贴', params: [] },
          { name: '内托', params: [] },
          { name: '其他配件', params: [] }
        ]
      }, {
        name: '围框天地盒',
        params: [
          { name: '成品尺寸', params: ['长', '宽', '高', '盒盖高', '底盒高'] },
          { name: '数量', params: ['顶加海绵'] },
          { name: '盒盖芯纸', params: [] },
          { name: '盒盖面纸', params: [] },
          { name: '盒盖内贴', params: [] },
          { name: '底盒面纸', params: [] },
          { name: '底盒内贴', params: [] },
          { name: '围框面纸', params: [] },
          { name: '围框芯纸', params: [] },
          { name: '内托', params: [] },
          { name: '其他配件', params: [] }
        ]
      }
    ],
    submitParams: []
  },
  {
    name: '手提袋',
    children: [
      {
        name: '常用',
        params: [
          { name: '成品尺寸', params: ['长宽高', '自定义尺寸', '展开尺寸'] },
          { name: '订单数量', params: ['高度为纸纹', '自来纸'] },
          { name: '材料', params: ['价格', '加底板'] },
          { name: '印刷颜色', params: [] },
          { name: '其他参数', params: [] },
          { name: '后道工序', params: ['设计', '模切', '压纹', '加铆钉', '击凸', '击凹', '绳子', '粘袋', '表面处理', '打包', '烫金', 'UV', '其他'] }

        ]
      }
    ],
    submitParams: ['自填运费', '客户']
  },
  {
    name: '封套',
    children: [],
    submitParams: ['自填运费', '客户'],
    params: [
      { name: '成品尺寸', params: ['选项', '自定义尺寸'] },
      { name: '订单数量', params: [] },
      { name: '材料', params: ['价格', '设计', '自来纸'] },
      { name: '印刷颜色', params: [] }

    ]
  },
  {
    name: '特价画册'
  },
  {
    name: '专版画册'
  },
  {
    name: '专版不干胶'
  },
  {
    name: '特价彩盒'
  },
  {
    name: '专业不干胶'
  },
  {
    name: '彩卡吊牌'
  },
  {
    name: '纸盒纸箱'
  },
  {
    name: '专版联单'
  },
  {
    name: '特价联单'
  },
  {
    name: '专版单页'
  },
  {
    name: '特价单张'
  },
  {
    name: '彩色名片'
  },
  {
    name: 'PVC卡'
  },
  {
    name: '标准便笺'
  },
  {
    name: '无纺布袋'
  },
  {
    name: '表格便签'
  },
  {
    name: '信封'
  },
  {
    name: '特价信封'
  },
  {
    name: '特价纸抽盒'
  },
  {
    name: '喷绘'
  },
  {
    name: '扣底盒',
    children: [{ name: '扣底盒' }, { name: '带保险扣底盒' }, { name: '带挂钩扣底盒' }, { name: '固定盖扣底盒' }, { name: '双盖扣底盒' }, { name: '扣底盒侧粘口' }]
  }
]
// 参数项
export const tableParameters = {

}

// 其他参数项
export const OtherParameters = {
  扣底盒: [
    { field: 'dOtherParameterStickyWidth', label: '粘口位宽', type: 'input' },
    { field: 'dOtherParameterGaryPlug', label: '插盖利', type: 'input' },
    { field: 'dOtherParameterBottomInsert', label: '扣底插入', type: 'input', olabel: '直角扣底', ofield: 'bOtherParameterAngleBuckleBottom', otype: 'checkbox' },
    { field: 'dOtherParameterWingcap', label: '翼盖仔', type: 'input' }
  ]
}

// 图片数据
export const imgsData = {
  棋盘: [
    { imgsrc: require('./imgs/qipan/1.jpg') }
  ],
  '卡牌(扑克牌)': [
    { imgsrc: require('./imgs/kapai/1.jpg') }
  ],
  钱币: [
    { imgsrc: require('./imgs/qianbi/1.jpg') }
  ],
  模切板: [
    { imgsrc: require('./imgs/moqieban/1.jpg') },
    { imgsrc: require('./imgs/moqieban/2.jpg') }
  ],
  拼图: [
    { imgsrc: require('./imgs/pintu/1.jpg') },
    { imgsrc: require('./imgs/pintu/2.jpg') },
    { imgsrc: require('./imgs/pintu/3.jpg') }
  ]

}
