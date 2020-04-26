import { useEffect, useCallback } from 'react'
import router from 'umi/router'
import debounce from 'lodash.debounce'
import { BaseListHooksProps, BaseFormProps, EditFormConfig } from '../list-types'

function useEditForm({
  NS,
  editConfig = {},
  formConfig = {},
  loadingEffects = {},
  otherFilterParams,
  isPush,
  ...props
}: BaseListHooksProps): [BaseFormProps] {
  const { dispatch, itemInfo, computedMatch } = props
  const { params: matchParams } = computedMatch || {}
  const { id } = matchParams as { id: string }

  useEffect(() => {
    if (id) {
      dispatch({ type: `${NS}/fetchItemInfo`, payload: { matchParams } })
    }
  }, [NS, dispatch, id])

  const handleValuesChange = useCallback(
    editConfig.onValuesChange &&
      debounce((changedValues: any, allValues: any) => {
        if (typeof editConfig.onValuesChange === 'function') {
          editConfig.onValuesChange(changedValues, allValues, props)
        }
      }, 0.8e3),
    [],
  )

  const { handleFormValues, items, ...fmProps } = editConfig as EditFormConfig

  const formProps = {
    layout: 'vertical',
    col: 12,
    ...fmProps,
    items: typeof items === 'function' ? items(props) : items,
    onValuesChange: editConfig.onValuesChange && handleValuesChange,
    onSubmit: values => {
      let va = handleFormValues ? handleFormValues(values) : values
      if (va === null) return
      dispatch({ type: `${NS}/editItem`, payload: { matchParams, ...va }, editId: id, callback: () => router.goBack() })
    },
    data: id && itemInfo,
    loading: !!loadingEffects[`${NS}/editItem`],
    fetchLoading: !!loadingEffects[`${NS}/fetchItemInfo`],
    submitCol: 24,
  } as BaseFormProps

  return [formProps]
}

export default useEditForm
