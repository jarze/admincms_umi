/**
 * Routes:
 *   - ./src/routes/list.js
 */

/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment } from 'react';
import { connect } from 'dva';
import { SearchList, ModalForm, } from '@components/comm';
import useSearchTable from '@/pages/_hooks/useSearchTable';
import useModalForm from '@/pages/_hooks/useModalForm';
import { NS } from './model';

const Page = ({
	loading,
	tableConfig,// table定义
	formConfig,// search定义
	editConfig,
	otherFilterParams,
	children,
	actions,
	...props
}) => {

	const { isPush } = tableConfig || {};

	const [tbProps, fmProps, onItemAction] = useSearchTable(props, NS, tableConfig, formConfig, loading, otherFilterParams);

	const [modalProps] = useModalForm(props, NS, editConfig, loading);

	return (
		<Fragment>
			{tableConfig ?
				<SearchList fmProps={fmProps} tbProps={tbProps}>
					{actions && (
						<Fragment>
							<div>
								{actions(onItemAction, props)}
							</div>
							<br />
						</Fragment>
					)}
				</SearchList> :
				<div>请检查！！ 缺少相关配置文件</div>
			}
			{!isPush && editConfig && <ModalForm {...modalProps} />}
		</Fragment>
	);
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.effects
}))(Page);
