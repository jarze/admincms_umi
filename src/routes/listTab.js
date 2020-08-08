// import useSearchTable from '@/utils/useSearchTable';
import { useMemo, cloneElement } from 'react'
import { Card } from 'antd'

export default props => {
  const {
    match: { params },
  } = props
  const { menuId, tabKey } = params
  const logicParams = useMemo(() => {
    try {
      if (tabKey) {
        return require(`@/pages/_logic/list/${menuId}-${tabKey}.js`)
      }
    } catch (err) {
      //alert(err, '\n 请配置相关文件') // 可执行
    }
  }, [menuId, tabKey])

  return (
    <Card>
      {logicParams && logicParams.getTabs && logicParams.getTabs(tabKey)}
      {cloneElement(props.children, logicParams)}
    </Card>
  )
  // return cloneElement(props.children, logicParams);
}
