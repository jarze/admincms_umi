import { SearchList, Modal } from '@/components/comm'
import { message } from 'antd'
import { Fragment, useState, useMemo, cloneElement } from 'react'
import useSearchTable from '@/pages/_list/hooks/useSearchTable'
import { connect } from 'dva'

export default connect((sto, { NS }) => ({ ...sto[NS], NS, loadingEffects: sto.loading.effects }))(
  ({ info, children, modalProps, onOkHandler, logic, ...props }) => {
    const { NS } = props
    const [isRequest, setIsRequest] = useState(false)
    const computedMatch = useMemo(() => ({ params: { menuId: NS } }), [NS])
    const [modalLoading, setModalLoading] = useState(false)

    const [tbProps, fmProps, onItemAction] = useSearchTable({
      NS,
      isRequest,
      computedMatch,
      ...props,
      ...logic
    })

    const { onOk, ...mP } = modalProps || {}
    const actions = info || logic.actions

    // 弹窗显示再进行数据请求
    const handleClick = e => {
      setIsRequest(true)
    }

    const mbProps = {
      content: (
        <SearchList fmProps={fmProps} tbProps={tbProps}>
          {actions && (
            <Fragment>
              <div>{actions(onItemAction, props)}</div>
              <br />
            </Fragment>
          )}
        </SearchList>
      ),
      onOk: cb => {
        if (tbProps.rowSelection && props.selectedRowKeys.length === 0) {
          message.info('请先选择！')
          return
        }
        let id = props.selectedRowKeys[0].split('-')[0]
        setModalLoading(true)
        onOkHandler(id)
          .then(res => {
            if (res && res.__error__) return
            onOk && onOk(id, res)
            cb()
          })
          .finally(() => {
            setModalLoading(false)
          })
      },
      confirmLoading: modalLoading,
      afterClose: () => setIsRequest(false),
      ...mP
    }
    return <Modal {...mbProps}>{cloneElement(children, { onClick: handleClick })}</Modal>
  }
)
