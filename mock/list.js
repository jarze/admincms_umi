import { mock } from 'mockjs';

export default {
	// 获取列表信息
	'GET /api/list/:id': (req, res) => {
		res.send(mock({
			code: 1001,
			message: 'success',
			data: {
				"pageNum": Number(req.query.pageNo),
				"pageSize": Number(req.query.pageSize),
				"pages": "@integer(60, 100)",
				"total": "@integer(60, 100)",
				"data|10-50": [{
					"id|+1": 100,
					name: "@cname",
					title: "@title"
				}]
			}
		}));
	},
	'GET /api/page/:modelId/:id': (req, res) => {
		res.send(mock({
			code: 1001,
			message: 'success',
			data: {
				name: '@cname',
				title: '@ctitle',
				content: '@paragraph',
				...req.query
			}
		}));
	},
	'DELETE /api/delete/:id': (req, res) => {
		res.send(mock({
			code: 1001,
			message: '删除成功',
			data: null
		}));
	},
	'POST /api/edit/:id': (req, res) => {
		res.send(mock({
			"code": 1001,
			message: '编辑成功',
			data: null
		}));
	},
}
