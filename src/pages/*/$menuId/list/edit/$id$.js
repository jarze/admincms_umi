/**
 * Routes:
 *   - ./src/routes/list.js
 */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import { NS } from '../model';
import { Form } from '@components/comm';
import router from 'umi/router';

const Page = ({
  dispatch,
  itemInfo,
  computedMatch: { params: matchParams },
  editConfig,
  ...props
}) => {
  const { id } = matchParams;
  useEffect(() => {
    if (id) {
      dispatch({
        type: `${NS}/fetchItemInfo`,
        payload: {
          matchParams
        }
      });
    }
  }, []);

  const formProps = {
    type: 'center',
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    layout: 'horizontal',
    ...editConfig,
    onSubmit: (values) => {
      dispatch({
        type: `${NS}/editItem`,
        payload: {
          matchParams,
          ...values
        },
        editId: id,
        callback: () => {
          router.goBack();
        }
      })
    },
    data: id && itemInfo
  }
  return <Form {...formProps} />;
};

export default connect(sto => ({
  ...sto[NS],
  loading: sto.loading.global
}))(Page);
