const data = [
  {
    title: '应用',
    key: 'rx-139',
    children: [
      {
        title: '两列布局',
        key: 'rx-140',
        children: [
          {
            title: '页眉',
            key: 'rx-141',
            children: []
          },
          {
            title: '侧边栏',
            key: 'rx-142',
            children: [
              {
                title: 'Logo',
                key: 'rx-143',
                children: []
              },
              {
                title: '菜单',
                key: 'rx-144',
                children: []
              },
              {
                title: '菜单',
                key: 'rx-149',
                children: []
              },
              {
                title: '开关',
                key: 'rx-170',
                children: []
              },
              {
                title: '级联选择',
                key: 'rx-185',
                children: []
              }
            ]
          },
          {
            title: '内容区',
            key: 'rx-145',
            children: [
              {
                title: '页面容器',
                key: 'rx-146',
                children: [
                  {
                    title: '页面',
                    key: 'rx-147',
                    children: []
                  }
                ]
              }
            ]
          },
          {
            title: '页脚',
            key: 'rx-148',
            children: []
          }
        ]
      }
    ]
  }
]

const tree = {
  id: 'rx-139',
  isSlot: false,
  documentId: 'frame',
  title: '应用',
  children: ['rx-140'],
  meta: {
    componentName: 'App'
  },
  rxProps: {
    'rx-id': 'rx-139'
  },
  propsSchema: {
    componentName: 'Tabs',
    props: {},
    children: [
      {
        componentName: 'TabPanel',
        props: {
          title: '$properties',
          key: 'props'
        },
        children: [
          {
            componentName: 'PropLayout',
            props: {
              label: '$themeMode'
            },
            slots: {
              expressionSetter: {
                componentName: 'ExpressionInput',
                'x-data': {
                  name: 'exprs.themeMode'
                }
              }
            },
            children: [
              {
                componentName: 'Radio.Group',
                props: {
                  optionType: 'button',
                  size: 'small',
                  options: [
                    {
                      label: '$dark',
                      value: 'dark'
                    },
                    {
                      label: '$light',
                      value: 'light'
                    }
                  ],
                  defaultValue: 'light'
                },
                'x-data': {
                  name: 'props.themeMode',
                  label: '$themeMode'
                }
              }
            ]
          },
          {
            componentName: 'PropLayout',
            props: {
              label: '$themeColor'
            },
            slots: {
              expressionSetter: {
                componentName: 'ExpressionInput',
                'x-data': {
                  name: 'exprs.token'
                }
              }
            },
            children: [
              {
                componentName: 'ThemeTokenSetter',
                props: {},
                'x-data': {
                  name: 'props.token',
                  label: '$themeColor'
                }
              }
            ]
          }
        ]
      },
      {
        componentName: 'TabPanel',
        props: {
          title: '$style',
          key: 'style'
        },
        children: [
          {
            componentName: 'StyleSetter',
            'x-data': {
              name: 'props.style'
            }
          }
        ]
      },
      {
        componentName: 'TabPanel',
        props: {
          title: '$reaction',
          key: 'reaction'
        },
        children: [
          {
            componentName: 'ControllerSetter',
            props: {},
            'x-data': {
              name: 'x-controller'
            }
          }
        ]
      }
    ]
  },
  slots: {}
}

const schema = {
  componentName: 'Tabs',
  props: {},
  children: [
    {
      componentName: 'TabPanel',
      props: {
        title: '属性',
        key: 'props'
      },
      children: [
        {
          componentName: 'PropLayout',
          props: {
            label: '标题'
          },
          slots: {
            expressionSetter: {
              componentName: 'ExpressionInput',
              'x-data': {
                name: 'exprs.title'
              }
            }
          },
          children: [
            {
              componentName: 'Input',
              props: {
                allowClear: true
              },
              'x-data': {
                name: 'props.title',
                label: '标题'
              }
            }
          ]
        },
        {
          componentName: 'PropLayout',
          props: {
            label: '类型'
          },
          slots: {
            expressionSetter: {
              componentName: 'ExpressionInput',
              'x-data': {
                name: 'exprs.type'
              }
            }
          },
          children: [
            {
              componentName: 'Select',
              props: {
                options: [
                  {
                    value: 'primary',
                    label: 'Primary'
                  },
                  {
                    value: 'ghost',
                    label: 'Ghost'
                  },
                  {
                    value: 'dashed',
                    label: 'Dashed'
                  },
                  {
                    value: 'link',
                    label: 'Link'
                  },
                  {
                    value: 'text',
                    label: 'Text'
                  },
                  {
                    value: 'default',
                    label: 'Default'
                  }
                ]
              },
              'x-data': {
                name: 'props.type',
                defaultValue: 'primary',
                label: '类型'
              }
            }
          ]
        },
        {
          componentName: 'PropLayout',
          props: {
            label: '禁用'
          },
          slots: {
            expressionSetter: {
              componentName: 'ExpressionInput',
              'x-data': {
                name: 'exprs.disabled'
              }
            }
          },
          children: [
            {
              componentName: 'Switch',
              'x-data': {
                name: 'props.disabled',
                label: '禁用'
              }
            }
          ]
        },
        {
          componentName: 'PropLayout',
          props: {
            label: '充满'
          },
          slots: {
            expressionSetter: {
              componentName: 'ExpressionInput',
              'x-data': {
                name: 'exprs.block'
              }
            }
          },
          children: [
            {
              componentName: 'Switch',
              'x-data': {
                name: 'props.block',
                label: '充满'
              }
            }
          ]
        },
        {
          componentName: 'PropLayout',
          props: {
            label: '警醒'
          },
          slots: {
            expressionSetter: {
              componentName: 'ExpressionInput',
              'x-data': {
                name: 'exprs.danger'
              }
            }
          },
          children: [
            {
              componentName: 'Switch',
              'x-data': {
                name: 'props.danger',
                label: '警醒'
              }
            }
          ]
        },
        {
          componentName: 'PropLayout',
          props: {
            label: '透明'
          },
          slots: {
            expressionSetter: {
              componentName: 'ExpressionInput',
              'x-data': {
                name: 'exprs.ghost'
              }
            }
          },
          children: [
            {
              componentName: 'Switch',
              'x-data': {
                name: 'props.ghost',
                label: '透明'
              }
            }
          ]
        },
        {
          componentName: 'PropLayout',
          props: {
            label: '形状'
          },
          slots: {
            expressionSetter: {
              componentName: 'ExpressionInput',
              'x-data': {
                name: 'exprs.shape'
              }
            }
          },
          children: [
            {
              componentName: 'Radio.Group',
              props: {
                optionType: 'button',
                size: 'small',
                options: [
                  {
                    label: '默认',
                    value: 'default'
                  },
                  {
                    label: '圆形',
                    value: 'circle'
                  },
                  {
                    label: '圆角',
                    value: 'round'
                  }
                ],
                defaultValue: 'default'
              },
              'x-data': {
                name: 'props.shape',
                label: '形状'
              }
            }
          ]
        },
        {
          componentName: 'PropLayout',
          props: {
            label: '尺寸'
          },
          slots: {
            expressionSetter: {
              componentName: 'ExpressionInput',
              'x-data': {
                name: 'exprs.size'
              }
            }
          },
          children: [
            {
              componentName: 'Radio.Group',
              props: {
                optionType: 'button',
                size: 'small',
                options: [
                  {
                    label: '大',
                    value: 'large'
                  },
                  {
                    label: '中',
                    value: 'middle'
                  },
                  {
                    label: '小',
                    value: 'small'
                  }
                ],
                defaultValue: 'middle'
              },
              'x-data': {
                name: 'props.size',
                label: '尺寸'
              }
            }
          ]
        },
        {
          componentName: 'FormItem',
          props: {
            label: '图标'
          },
          children: [
            {
              componentName: 'SlotSwitch',
              props: {
                name: 'icon'
              }
            }
          ]
        }
      ]
    },
    {
      componentName: 'TabPanel',
      props: {
        title: '样式',
        key: 'style'
      },
      children: [
        {
          componentName: 'StyleSetter',
          'x-data': {
            name: 'props.style'
          }
        }
      ]
    },
    {
      componentName: 'TabPanel',
      props: {
        title: '交互',
        key: 'reaction'
      },
      children: [
        {
          componentName: 'ControllerSetter',
          props: {},
          'x-data': {
            name: 'x-controller'
          }
        }
      ]
    }
  ]
}
