import { mock } from 'mockjs'

export default {
  // 获取列表信息
  'GET /api/list/:id': (req, res) => {
    const { pageNo, pageSize } = req.query
    const d = mock({
      [`data|${pageSize || 10}`]: [
        {
          id: '@id',
          'index|+1': Number(pageNo * pageSize) + 1,
          name: '@cname',
          title: '@title',
          desc: '@ctitle',
          a: '@ctitle',
          b: '@word',
          c: '@word',
          d: '@word',
          e: '@word',
          f: '@word',
          g: '@word'
        }
      ]
    }).data

    res.send(
      mock({
        code: 1001,
        message: 'success',
        data: pageSize
          ? {
              pageNum: Number(pageNo),
              pageSize: Number(pageSize),
              pages: '@integer(60, 100)',
              total: '@integer(60, 100)',
              data: d
            }
          : d
      })
    )
  },
  'GET /api/page/:id': (req, res) => {
    res.send(
      mock({
        code: 1001,
        message: 'success',
        data: {
          name: '@cname',
          title: '@ctitle',
          content: '@paragraph',
          ...req.query
        }
      })
    )
  },
  'DELETE /api/delete/:id': (req, res) => {
    res.send(
      mock({
        code: 1001,
        message: '删除成功',
        data: null
      })
    )
  },
  'POST /api/edit/:id': (req, res) => {
    res.send(
      mock({
        code: 1001,
        message: '编辑成功',
        data: null
      })
    )
  },
  'PUT /api/edit/:id': (req, res) => {
    res.send(
      mock({
        code: 1001,
        message: '编辑成功',
        data: null
      })
    )
  },
  'POST /api/action/:id': (req, res) => {
    res.send(
      mock({
        code: 1001,
        message: 'action成功',
        data: null
      })
    )
  },
  'GET /api/menu/55': (req, res) => {
    res.send(
      mock({
        code: 1001,
        message: 'success',
        data: {
          data: require('./json/menu_privilege.json').children
        }
      })
    )
  }
}
