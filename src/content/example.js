export default {
	list: [
		{ title: '操作时间', key: 'time', columns: { width: 200 } },
		{ title: '操作者', key: 'account' },
		{ title: '消息', key: 'content' }
	],
	profile: [
		{ title: '名称', key: 'title', rules: [{ required: true }] },
		{ title: '来源', key: 'source', type: 'uploadVideo' },
		{ title: '作者', key: 'author', type: 'img' },
		{ title: '内容', key: 'content', type: 'content' }
	],
};
