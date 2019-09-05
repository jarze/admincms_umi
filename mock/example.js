import { mock } from 'mockjs';

export default {
	// 拉闸限电统计
	'GET /api/load-reduction/power-cut/statistic/list': (req, res) => {
		res.send(mock({
			code: 1001,
			message: 'success',
			"data": {
				"pageNum": Number(req.query.pageNo),
				"pageSize": Number(req.query.pageSize),
				"pages": "@integer(60, 100)",
				"total": "@integer(60, 100)",
				"data|1-60": [{
					"cellStyleMap": {},
					"circuitName": "@ctitle",
					"substationName": "@ctitle",
					"demandPlanCode": "@ctitle",
					"id|+1": 22,
					"nonResponders": "@ctitle",
					"powerCutTime": "@datetime",
					"unVisibleProjectList|0-10": ["@cname"],
					"visibleProjectList|0-10": ["@cname"]
				}]
			}
		}));
	},

};
