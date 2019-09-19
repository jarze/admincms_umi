/**
 * Routes:
 *   - ./src/routes/list.js
 */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import { NS } from '../model';
import { SinglePage } from '@components/comm';

const Page = ({
  dispatch,
  computedMatch: { params: matchParams },
  pageConfig,
  ...props
}) => {
  useEffect(() => {
    dispatch({
      type: `${NS}/fetchItemInfo`,
      payload: {
        matchParams
      }
    });
	}, []);
	
	if (typeof pageConfig.items === 'function') {
		pageConfig.items = pageConfig.items(props);
	}
  return <SinglePage {...props} {...pageConfig} />;
};

export default connect(sto => ({
  ...sto[NS],
  loading: sto.loading.global
}))(Page);
