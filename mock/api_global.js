var Mock = require('mockjs');

export default {
	// 获取当前用户菜单
	'GET /api/users/menu': (req, res) => {
		res.send(Mock.mock({
			code: 1001,
			message: 'success',
			data: require('./json/menu.json')
		}));
	}
}
