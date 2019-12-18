import { mock, Random } from 'mockjs';

export default {
	// 获取当前用户菜单
	'GET /api/users/menu': (req, res) => {
		res.send(mock({
			code: 1001,
			message: 'success',
			data: require('./json/menuList.json')
		}));
	},
	// 获取当前登录用户信息
	'GET /api/users/current': (req, res) => {
		res.send(mock({
			code: 1001,
			message: 'success',
			"data": {
				userId: "@ctitle",
				userName: "@cname",
				avatar: Random.image('200x200', '#FF6600')
			}
		}));
	},
}
