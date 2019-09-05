import { mock } from 'mockjs';

export default {
	// 获取当前用户菜单
	'GET /api/list/:id': (req, res) => {
		res.send(mock({
			code: 1001,
			message: 'success',
			"data|10-50": [{
				"id|+1": 1,
				name: "@cname",
				title: "@title"
			}]
		}));
	}
}
