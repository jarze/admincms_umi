const a = {
  id: '0d06facd-67fa-11ee-b630-1eefcb1a02ae',
  name: '请假申请',
  key: 'form-ask-for-leave',
  description: '请假申请基本信息',
  version: 1,
  lastUpdatedBy: 'admin',
  lastUpdated: 1697003636998,
  formDefinition: {
    name: '请假申请',
    key: 'form-ask-for-leave',
    version: 0,
    fields: [
      {
        fieldType: 'FormField',
        id: 'reason',
        name: '请假理由',
        type: 'text',
        value: null,
        required: true,
        readOnly: false,
        overrideId: true,
        placeholder: null,
        layout: null
      },
      {
        fieldType: 'OptionFormField',
        id: 'type',
        name: '请假类型',
        type: 'dropdown',
        value: '请选择一个...',
        required: true,
        readOnly: false,
        overrideId: true,
        placeholder: null,
        layout: null,
        optionType: null,
        hasEmptyValue: true,
        options: [
          {
            id: null,
            name: '请选择一个...'
          },
          {
            id: null,
            name: '年假'
          },
          {
            id: null,
            name: '调休'
          },
          {
            id: null,
            name: '事假'
          },
          {
            id: null,
            name: '病假'
          }
        ],
        optionsExpression: null
      },
      {
        fieldType: 'FormField',
        id: 'start',
        name: '开始时间',
        type: 'date',
        value: null,
        required: true,
        readOnly: false,
        overrideId: true,
        placeholder: null,
        layout: null
      },
      {
        fieldType: 'FormField',
        id: 'end',
        name: '结束时间',
        type: 'date',
        value: null,
        required: true,
        readOnly: false,
        overrideId: true,
        placeholder: null,
        layout: null
      }
    ],
    outcomes: []
  }
}
