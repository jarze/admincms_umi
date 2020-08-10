const fs = require('fs')

const PageTypes = fs.readdirSync(`${__dirname}/templates`).filter(f => !f.startsWith('.'))

// 通用搜索列表特殊处理
const isSearchList = ({ type }) => (type === 'SearchList' ? false : true)

module.exports = plop => {
  plop.setGenerator('page', {
    description: 'generate a new page',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'which type of page?',
        choices: PageTypes.map(item => ({ name: item, value: item })),
      },
      {
        type: 'input',
        name: 'name',
        message: 'please input page name',
        validate: function(value) {
          if (/.+/.test(value)) {
            return true
          }
          return 'name is required'
        },
      },
      {
        type: 'input',
        name: 'path',
        message: 'where would you like to put this page? (/src/pages/...)',
        when: isSearchList,
      },
      {
        type: 'confirm',
        name: 'route',
        message: 'whether to add path?',
        when: isSearchList,
      },
    ],
    actions: function(data) {
      const { type, route } = data
      var actions = [`${JSON.stringify(data)}`, `😄 start creat page.......\n\n`]
      if (type === 'SearchList') {
        actions = actions.concat([
          {
            type: 'addMany',
            destination: '../../src/pages/_list/',
            base: `templates/{{type}}/`,
            stripExtensions: ['tpl'],
            skipIfExists: true,
            templateFiles: `templates/{{type}}`,
          },
          {
            type: 'append',
            path: '../../src/config/page.js',
            pattern: /(\/\*GEN: APPEND SEARCH LIST HERE\*\/)/g,
            template: `'{{name}}',`,
          },
        ])
      } else {
        // 复制对应文件夹模版文件
        actions = actions.concat([
          {
            type: 'addMany',
            destination: '../../src/pages/{{path}}/{{properCase name}}',
            base: `templates/{{type}}`,
            stripExtensions: ['tpl'],
            skipIfExists: true,
            templateFiles: `templates/{{type}}`,
          },
        ])
        if (route) {
          actions = actions.concat([
            {
              type: 'append',
              path: '../../config/routes.js',
              pattern: /(\/\*GEN: APPEND ROUTER HERE\*\/)/g,
              template: `\t{
                path: '/{{path}}/{{properCase name}}',
                name: '{{name}}',
                component: './{{path}}/{{properCase name}}',
              },`,
            },
          ])
        }
      }
      return actions
    },
  })
}
