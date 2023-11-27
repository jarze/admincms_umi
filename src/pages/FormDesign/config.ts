export default {
  propertyPackages: [
    {
      name: 'baseFormItemPackage',
      properties: [
        {
          type: 'String',
          id: 'id',
          label: 'ID',
          popular: true
        },
        {
          type: 'String',
          id: 'label',
          label: '标签',
          popular: true
        },
        {
          type: 'Boolean',
          id: 'required',
          label: '必填',
          popular: true
        },
        {
          type: 'String',
          id: 'defaultValue',
          label: '默认值',
          popular: true
        }
      ]
    }
  ],
  elements: [
    {
      type: 'Input',
      id: 'input',
      title: '文本',
      view: '',
      icon: '',
      groups: ['表单'],
      propertyPackages: ['baseFormItemPackage']
    },
    {
      type: 'TextArea',
      id: 'textarea',
      title: '文本',
      view: '',
      icon: '',
      groups: ['表单'],
      propertyPackages: ['baseFormItemPackage']
    }
  ]
}
