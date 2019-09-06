import { mock } from 'mockjs';

export default {
	// 获取当前用户菜单
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
	}
}
