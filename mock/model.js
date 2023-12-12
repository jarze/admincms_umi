import { mock } from 'mockjs'

export default {
  'GET /api/model/:id': (req, res) => {
    res.send(
      mock({
        code: 1001,
        message: 'message',
        data: {
          name: '@cname',
          desc: '@paragraph',
          tb_name: '@title',
          'model_tb|3-10': [
            {
              rowKey: 'rowKey-@string',
              type: '@string',
              desc: '@ctitle',
              auth: '@string',
              len: '@integer(0, 1000000)'
            }
          ]
        }
      })
    )
  }
}
