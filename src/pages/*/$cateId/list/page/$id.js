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
  text,
  computedMatch: { params: matchParams },
  ...props }) => {
  useEffect(() => {
    dispatch({
      type: `${NS}/fetchItemInfo`,
      payload: {
        matchParams
      }
    });
  }, []);
  return <SinglePage {...props} />;
};

export default connect(sto => ({
  ...sto[NS],
  loading: sto.loading.global
}))(Page);
