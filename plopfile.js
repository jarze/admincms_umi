const fs = require('fs');

// const PageTypes = ['simple', 'modelPage', 'modelListPage'];
const PageTypes = fs
	.readdirSync(`${__dirname}/plop-templates`)
	.filter(f => !f.startsWith('.'))
// .map(f => {
// 	return {
// 		name: `${f.padEnd(15)} - ${chalk.gray(require(`./generators/${f}/meta.json`).description)}`,
// 		value: f,
// 		short: f,
// 	};
// });
module.exports = plop => {

	plop.setGenerator('page', {
		description: 'generate a new page',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'please input page name',
				validate: function (value) {
					if ((/.+/).test(value)) { return true; }
					return 'name is required';
				}
			}, {
				type: 'list',
				name: 'type',
				message: 'which type of page?',
				choices: PageTypes.map(item => ({ name: item, value: item }))
			}, {
				type: 'confirm',
				name: 'ts',
				message: 'ts?'
			}, {
				type: 'input',
				name: 'path',
				message: 'where would you like to put this page? (/src/pages/...)'
			}
		],
		actions: function (data) {
			const { name, type, ts, path } = data;
			var actions = [
				`${JSON.stringify(data)}`,
				`🚩start creat page.......`,
			];
			if (ts) {
				actions = actions.concat([
					{
						type: 'addMany',
						destination: 'src/pages/{{path}}/{{properCase name}}',
						base: `plop-templates/{{type}}`,
						stripExtensions: ['tpl'],
						templateFiles: `plop-templates/{{type}}`
					}
				]);
			} else {
				// actions = actions.concat([
				// 	{
				// 		type: 'add',
				// 		path: 'folder/{{dashCase name}}-potatoes.txt',
				// 		templateFile: 'plop-templates/templates/potatoes.txt',
				// 		abortOnFail: true
				// 	}, {
				// 		type: 'modify',
				// 		path: 'folder/{{dashCase name}}-burger.txt',
				// 		pattern: /(!\n)/gi,
				// 		template: '$1Your potatoes: {{dashCase name}}-potatoes.txt'
				// 	}
				// ]);
			}
			return actions;
		}
	})
};