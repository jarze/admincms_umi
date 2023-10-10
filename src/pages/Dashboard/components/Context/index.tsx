import React, {
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
  useRef,
  useEffect,
} from 'react';
import Setting from '../setting';
import { Tabs, Button, Tooltip, Drawer, Popconfirm } from 'antd';
import { ChartConfigMap, baseConfig } from '../../_config';
import Source from '../DataSource/tabs';
import uuid from 'uuid';

const { TabPane } = Tabs;

type actionsType = { id?; onCancel?; onSave?; onChange? };
interface ItemSettingContextProps {
  filter?: Record<string, any>;
  /** 设置 */
  onSetting?: (item: any, actions: actionsType) => void;
  id?: string;
  editable?: boolean;
}

export const ItemSettingContext = createContext<ItemSettingContextProps>({});

export default function SettingProvider(params) {
  const [visible, setVisible] = useState(false);
  const actionsRef = useRef<actionsType>(null);
  const [filter, setFilter] = useState<any>({});

  const handleVisible = (v, e?) => {
    e?.stopPropagation?.();
    setVisible(v);
    if (!v) {
      actionsRef.current = null;
    }
  };

  const showItemSetting = useCallback((item, actions) => {
    actionsRef.current = actions;
    setFilter(item);
    handleVisible(true);
  }, []);

  const onSetting = useCallback((item, actions) => {
    if (actionsRef.current) {
      // Modal.confirm({
      //   title: '是否保存当前组件配置',
      //   onOk() {
      //     actionsRef?.current?.onSave?.();
      //     setTimeout(() => {
      //       showItemSetting(item, actions);
      //     });
      //   },
      //   onCancel() {
      //     actionsRef?.current?.onCancel?.();
      //     setTimeout(() => {
      //       showItemSetting(item, actions);
      //     });
      //   },
      // });
      return;
    } else {
      showItemSetting(item, actions);
    }
  }, []);

  /** 更新配置 */
  const changeFilter = useCallback((newV, refresh = false) => {
    setFilter(p => ({ ...p, ...newV }));
    actionsRef?.current?.onChange?.(newV, refresh);
  }, []);

  const config = useMemo(() => ChartConfigMap[filter.type], [filter.type]);

  const value = useMemo(
    () => ({ editable: params?.editable, filter, onSetting, id: actionsRef?.current?.id }),
    [filter, onSetting, actionsRef?.current],
  );

  const hasBindSource = filter?.type && config?.bindSource !== false;

  return (
    <ItemSettingContext.Provider value={value}>
      {params.children}
      {params?.editable && (
        <Drawer
          width={450}
          title={'设置'}
          placement="right"
          mask={false}
          maskClosable={false}
          closable={false}
          onClose={e => handleVisible(false, e)}
          visible={visible}
          bodyStyle={{
            paddingBottom: 100,
            width: 440,
          }}
        >
          <Tabs defaultActiveKey="1" style={{ marginTop: -24 }} size="small">
            <TabPane tab="基础配置" key="1">
              <Setting
                data={filter}
                items={baseConfig?.items}
                className="basic-info-setting"
                onChange={(v, changeValue) => {
                  // 更改类型需要把内容配置重置
                  const changeType = Object.keys(changeValue || {}).includes('type');
                  changeFilter(changeType ? { ...v, setting: null } : v);
                }}
              />
            </TabPane>
            {filter?.type && config?.items && (
              <TabPane tab="内容配置" key="2" disabled={!filter.type}>
                <Setting
                  data={filter?.setting || config?.Component?.defaultProps}
                  items={config?.items}
                  onChange={v => {
                    changeFilter({ setting: { ...filter.setting, ...v } });
                  }}
                />
              </TabPane>
            )}
            {hasBindSource && (
              <TabPane tab="数据源绑定" key="3">
                <Source
                  key={filter?.sourceId}
                  sourceId={filter?.sourceId}
                  onChange={sourceId => changeFilter({ sourceId }, true)}
                />
              </TabPane>
            )}
          </Tabs>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Tooltip title="将不会保存本次修改">
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={e => {
                  actionsRef?.current?.onCancel?.();
                  handleVisible(false, e);
                }}
              >
                取消
              </Button>
            </Tooltip>
            {hasBindSource ? (
              <Popconfirm
                title="请确认是否已更新绑定数据源"
                onConfirm={e => {
                  actionsRef?.current?.onSave?.();
                  handleVisible(false, e);
                }}
              >
                <Button type="primary">保存</Button>
              </Popconfirm>
            ) : (
              <Button
                onClick={e => {
                  actionsRef?.current?.onSave?.();
                  handleVisible(false, e);
                }}
                type="primary"
              >
                保存
              </Button>
            )}
          </div>
        </Drawer>
      )}
    </ItemSettingContext.Provider>
  );
}

export const SettingItem = ({
  icon = 'setting',
  text = null,
  item,
  onChange,
  onCancel,
  onSave,
}) => {
  const { onSetting, id } = useContext(ItemSettingContext);
  const uid = useMemo(() => uuid(), []);

  const paramsRef = useRef({ id: uid, onCancel, onSave, onChange });

  useEffect(() => {
    Object.assign(paramsRef.current, { id: uid, onCancel, onSave, onChange });
    return () => {};
  }, [uid, onCancel, onSave, onChange]);

  const active = id === uid;

  return (
    <Button
      type="primary"
      disabled={!active && !!id}
      style={{
        position: 'absolute',
        right: 10,
        bottom: 10,
        opacity: active ? 1 : 0.6,
        zIndex: 100,
        border: 'none',
        transition: 'all 0.2s',
        transform: active ? 'scale(2)' : 'scale(1.5)',
      }}
      ghost={true}
      icon={icon}
      onClick={e => {
        if (active) return;
        onSetting?.(item, paramsRef.current);
      }}
    >
      {text}
    </Button>
  );
};
