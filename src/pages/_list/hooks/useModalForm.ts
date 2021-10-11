import { useEffect, useCallback } from 'react'
import { debounce } from 'lodash'

const useModalForm: ModalFormHooks = ({ NS, editConfig, loadingEffects = {}, ...props }) => {
  const { dispatch, editId, preEditId, itemInfo, computedMatch } = props
  const { params: matchParams } = computedMatch || {}
  useEffect(() => {
    if (editId && editId !== 'add') {
      if (editConfig.isFetchData) {
        dispatch({ type: `${NS}/fetchItemInfo`, payload: { matchParams, id: editId } })
      }
    } else {
      dispatch({ type: `${NS}/save`, payload: { itemInfo: {} } })
    }
  }, [editId])

  const handleValuesChange = useCallback(
    debounce((changedValues: any, allValues: any) => {
      if (typeof editConfig.onValuesChange === 'function') {
        editConfig.onValuesChange(changedValues, allValues, props)
      }
    }, 0.8e3),
    []
  )

  // 编辑 ｜｜ 编辑取消
  const edit = (editId && editId !== 'add') || (preEditId && !editId)

  return [
    {
      title: edit ? '编辑' : '添加',
      visible: editId ? true : false,
      ...editConfig,
      items: typeof editConfig.items === 'function' ? editConfig.items(props) : editConfig.items,
      data: itemInfo,
      onValuesChange: editConfig.onValuesChange && handleValuesChange,
      onOk: values => {
        let payload = <any>{ matchParams, ...values }
        editId !== 'add' && (payload.id = editId)
        dispatch({ type: `${NS}/editItem`, payload: payload, editId })
      },
      onCancel: () => {
        dispatch({
          type: `${NS}/save`,
          payload: { editId: null, preEditId: editId !== 'add' ? editId : null }
        })
      },
      confirmLoading: loadingEffects[`${NS}/editItem`]
    }
  ] as ReturnType<ModalFormHooks>
}

export default useModalForm
