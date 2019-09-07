import listModel from '@/pages/list/$list/model';
const {
  state: listState,
  effects: listEffects,
  reducers: listReducers
} = listModel;

/* 继承list model */
export const extendsListModel = ({
  state,
  effects,
  reducers,
  ...props
}) => {
  return {
    state: {
      ...listState,
      ...state
    },
    effects: {
      ...listEffects,
      ...effects
    },
    reducers: {
      ...listReducers,
      ...reducers
    },
    ...props
  };
}
