import { useEffect, useCallback } from 'react'
import router from 'umi/router'
import { debounce } from 'lodash'

const useEditForm: EditFormHooks = ({
  editConfig = {},
  loadingEffects = {},
  otherFilterParams,
  ...props
}) => {
  const { NS, dispatch, itemInfo, computedMatch } = props
  const { params: matchParams } = computedMatch || {}
  const { id } = matchParams

  useEffect(() => {
    return () => {
      dispatch({ type: `${NS}/save`, payload: { editId: null, itemInfo: {} } })
    }
  }, [])

  useEffect(() => {
    if (id) {
      dispatch({ type: `${NS}/fetchItemInfo`, payload: { matchParams, ...otherFilterParams } })
    }
  }, [id, otherFilterParams])

  const handleValuesChange = useCallback(
    debounce((changedValues: any, allValues: any) => {
      if (typeof editConfig.onValuesChange === 'function') {
        editConfig.onValuesChange(changedValues, allValues, props)
      }
    }, 0.8e3),
    []
  )

  const { handleFormValues, items, ...fmProps } = editConfig

  return [
    {
      layout: 'vertical',
      ...fmProps,
      items: typeof items === 'function' ? items(props) : items,
      onValuesChange: editConfig.onValuesChange && handleValuesChange,
      onSubmit: values => {
        let va = handleFormValues ? handleFormValues(values) : values
        if (va === null) return
        dispatch({
          type: `${NS}/editItem`,
          payload: { matchParams, ...va },
          editId: id,
          callback: () => router.goBack()
        })
      },
      data: id && itemInfo,
      loading: !!loadingEffects[`${NS}/editItem`],
      fetchLoading: !!loadingEffects[`${NS}/fetchItemInfo`],
      submitCol: 24
    }
  ] as ReturnType<EditFormHooks>
}

export default useEditForm
