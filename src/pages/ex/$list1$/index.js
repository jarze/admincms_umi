/* eslint-disable react-hooks/exhaustive-deps */
import {connect} from 'dva';
import {SearchList} from '@components/comm';
import {columns, filterItems} from './_logic';
import useSearchTable from '@utils/useSearchTable';
import {NS} from './model';

const Page=({
  loading,
  computedMatch: {
    params
  }, // 路由参数
  ...props
}) => {
  console.log(props, '=====', params)
  const [tbProps, fmProps]=useSearchTable(props, NS, columns, filterItems, loading);
  return <SearchList fmProps={
    fmProps
  }
    tbProps={
      {
        ...tbProps,
        rowKey: 'id',
        rowSelection: null
      }
    }
  />
};

export default connect(sto => ({
  ...sto[NS],
  loading: sto.loading.effects
}))(Page);
