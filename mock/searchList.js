import { mock } from 'mockjs'

export default {
	'GET /api/searchList': (req, res) => {
		res.send(
			mock({
				code: 1001,
				message: 'message',
				data: {
					pageNum: Number(req.query.pageNo),
					pageSize: Number(req.query.pageSize),
					pages: '@integer(60, 100)',
					total: '@integer(60, 100)',
					[`data|${req.query.pageSize}`]: [
						{
							'id|+1': Number(req.query.pageNo * req.query.pageSize) + 100,
							remark: '@cword(10,255)',
							//产值收入
							countYear: '@integer(1000, 9999)',
							outputValue: 'outputValue-@string',
							addedValue: 'addedValue-@string',
							salesIncome: 'salesIncome-@string',
						},
					],
				},
			})
		)
	},
	'POST /api/searchList': (req, res) => {
		res.send(
			mock({
				code: 1001,
				message: '添加成功',
				data: null
			})
		)
	},
	'PUT /api/searchList': (req, res) => {
		res.send(
			mock({
				code: 1001,
				message: '编辑成功',
				data: null
			})
		)
	},
	'DELETE /api/searchList': (req, res) => {
		res.send(
			mock({
				code: 1001,
				message: '删除成功',
				data: null
			})
		)
	}
}