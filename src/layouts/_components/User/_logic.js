export const items = [
	{
		label: '用户名称',
		key: 'name',
	},
	{
		label: '旧密码',
		key: 'oldPassword',
		options: {
			rules: [
				{
					required: true,
				},
			],
		}
	},
	{
		label: '新密码',
		key: 'newPassword',
		options: {
			rules: [
				{
					required: true,
				},
			],
		}
	},
	{
		label: '再次确认',
		key: 'confirmNewPwd',
		options: {
			rules: [
				{
					required: true,
				},
			],
		}
	},
];
