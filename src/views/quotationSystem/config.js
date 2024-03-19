export const paperpricesettingOpts = {
  Ele_PaperPriceSetting_Detail: [
    {
      dataType: 'int',
      align: 'center',

      label: '排序',
      prop: 'iOrder',
      isHide: false,
      key: 'intNumInput',
      width: 40,

      required: false,
      isTableField: true,
      isEdit: false
    },

    {
      dataType: 'varchar',
      align: 'center',

      label: '价格类型',
      prop: 'sPriceType',
      isHide: false,
      key: 'select',

      required: true,
      isTableField: true,
      isEdit: false,
      width: 100,
      options: [
        { sID: '1', sDesc: '平方米' },
        { sID: '2', sDesc: '吨' },
        { sID: '3', sDesc: '张' }
      ]
    },
    {
      dataType: 'int',
      align: 'center',

      label: '价格',
      prop: 'dPrice',
      isHide: false,
      key: 'intNumInput',
      width: 100,

      required: true,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'decimal',
      align: 'center',

      label: '克重',
      prop: 'dWeight',
      isHide: false,
      width: 80,
      key: 'ftNumInput',
      required: true,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'decimal',
      align: 'center',

      label: '厚度',
      prop: 'dThickness',
      isHide: false,
      width: 80,
      key: 'ftNumInput',
      required: true,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'bit',
      align: 'center',

      label: '正度纸',
      prop: 'bPositivedegree',
      isHide: false,
      key: 'checkbox',
      width: 70,
      required: false,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'bit',
      align: 'center',

      label: '大度纸',
      prop: 'bLargepaper',
      isHide: false,
      key: 'checkbox',
      width: 70,
      required: false,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'bit',
      align: 'center',

      label: '特规纸',
      prop: 'bSpecialpaper',
      isHide: false,
      key: 'checkbox',
      width: 70,
      required: false,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'bit',
      align: 'center',
      label: '启用卷筒分切纸',
      prop: 'bWebpaper',
      isHide: false,
      key: 'checkbox',
      width: 120,
      required: false,
      isTableField: true,
      isEdit: false
    }
  ],
  Ele_PaperPriceSetting_Detail_SpecialSet: [
    {
      dataType: 'int',
      align: 'center',

      label: '排序',
      prop: 'iOrder',
      isHide: false,
      key: 'intNumInput',
      width: 40,

      required: false,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'int',
      align: 'center',
      label: '特规纸长度(mm)',
      prop: 'dSpeciallength',
      isHide: false,
      key: 'ftNumInput',
      width: 200,
      required: true,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'int',
      align: 'center',
      label: '特规纸宽度(mm)',
      prop: 'dSpecialwidth',
      isHide: false,
      key: 'ftNumInput',
      width: 200,
      required: true,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'int',
      align: 'center',
      label: '吨价上下调价(元)',
      prop: 'dPrice',
      isHide: false,
      key: 'ftNumInput',
      width: 200,
      required: true,
      isTableField: true,
      isEdit: false
    }
  ],
  Ele_PaperPriceSetting_Detail_RollSet: [
    {
      dataType: 'int',
      align: 'center',
      label: '排序',
      prop: 'iOrder',
      isHide: false,
      key: 'intNumInput',
      width: 40,
      required: false,
      isTableField: true,
      isEdit: false
    },
    {
      dataType: 'int',
      align: 'center',
      label: '门幅宽',
      prop: 'dRollwidth',
      isHide: false,
      key: 'ftNumInput',
      width: 200,
      required: true,
      isTableField: true,
      isEdit: false
    }
  ]
}
