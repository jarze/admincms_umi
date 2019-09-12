/**
 * title: 示例页面
 * Routes:
 *   - ./src/routes/a.js
 *   - ./src/routes/b.js
 */

// 权限路由

import React, { useEffect } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { NS } from './model';

const Page = ({ loading, dispatch, text, ...props }) => {
	useEffect(() => {
		dispatch({
			type: `${NS}/fetch`,
		});
	}, [dispatch]);

	return <div className={styles.container}>{text}</div>;
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.global
}))(Page);
