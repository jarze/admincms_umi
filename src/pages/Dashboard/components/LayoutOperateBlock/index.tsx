import styles from '../../index.less';

import React, { useEffect, useState } from 'react';
import { Button, Input, Popconfirm } from 'antd';

import { dispatchUpdate, createBlock } from '../../index';

type OperateTypes = {
  direction: 'row' | 'column' | '';
  blockNum: string;
  blocks: string[];
};

function LayoutOperateBlock(props) {
  const { block, level } = props;

  const [operate, setOperate] = useState<OperateTypes>({
    direction: '',
    blockNum: '',
    blocks: [],
  });

  const updateState = (state: Partial<OperateTypes>) => setOperate(o => ({ ...o, ...state }));

  useEffect(() => {
    if (!block.onLayout) return;
    const valueKey = block.direction === 'row' ? 'width' : 'height';
    updateState({
      direction: block.direction,
      blockNum: block.blocks.length,
      blocks: block.blocks.map(b => b[valueKey].slice(0, -1)),
    });
  }, [block.onLayout]);

  const operateBtns = [
    <Button key="0" type="link" size="small" onClick={() => updateState({ direction: 'row' })}>
      水平分割
    </Button>,
    <Button key="1" type="link" size="small" onClick={() => updateState({ direction: 'column' })}>
      垂直分割
    </Button>,
    <Button key="2" type="link" size="small" onClick={() => (block.data = {}) && dispatchUpdate()}>
      组件配置
    </Button>,
  ];

  let operateContent = level > 8 ? operateBtns[2] : operateBtns;

  if (operate.direction && !operate.blocks.length) {
    operateContent = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          autoFocus={true}
          size="small"
          value={operate.blockNum}
          className={styles.blockNumInput}
          onChange={e => updateState({ blockNum: String(Math.min(+e.target.value, 20)) })}
          prefix={operate.direction === 'row' ? '水平分割为' : '垂直分割为'}
          suffix="块"
        />
        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <Button
            type="link"
            size="small"
            disabled={!/^\d+$/.test(operate.blockNum) || +operate.blockNum < 2}
            onClick={() => {
              updateState({ blocks: new Array(+operate.blockNum).fill('') });
            }}
          >
            确认
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => updateState({ direction: '', blockNum: '' })}
          >
            返回
          </Button>
        </div>
      </div>
    );
  }

  if (operate.direction && operate.blocks.length) {
    const styleAttr = operate.direction === 'row' ? 'marginLeft' : 'marginTop';
    const inputWrapStyle = { flexDirection: operate.direction, [styleAttr]: -8 };

    operateContent = (
      <div className={styles.blockRatioOpe}>
        {block.onLayout && (
          <Popconfirm
            title="重置将初始化该区域内容，确认重置？"
            onConfirm={() => {
              block.blocks = [];
              block.onLayout = undefined;
              setOperate({ direction: '', blockNum: '', blocks: [] });
              dispatchUpdate();
            }}
          >
            <Button size="small" type="danger" className={styles.resetBlock}>
              重置
            </Button>
          </Popconfirm>
        )}

        <div style={{ display: 'flex', ...inputWrapStyle }}>
          {operate.blocks.map((value, i) => (
            <Input
              key={i}
              size="small"
              value={value}
              autoFocus={i === 0}
              onChange={e => {
                const blocks = operate.blocks.slice();
                blocks[i] = e.target.value;
                updateState({ blocks });
              }}
              style={{ maxWidth: 100, [styleAttr]: 8 }}
              suffix="%"
            />
          ))}
        </div>

        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <Button
            type="link"
            size="small"
            disabled={operate.blocks.some(n => !n || !/^\d+(\.\d+)?$/.test(n))}
            onClick={() => {
              const key = operate.direction === 'row' ? 'width' : 'height';
              operate.blocks.forEach((value, i) => {
                if (block.blocks[i]) block.blocks[i][key] = value + '%';
                else block.blocks[i] = createBlock({ [key]: value + '%' });
              });
              block.direction = operate.direction;
              if (block.onLayout) block.onLayout = undefined;

              dispatchUpdate();
            }}
          >
            确定
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              if (!block.onLayout) updateState({ blocks: [] });
              else !(block.onLayout = undefined) && dispatchUpdate();
            }}
          >
            返回
          </Button>
        </div>
      </div>
    );
  }

  return <div className={styles.operateContent}>{operateContent}</div>;
}

export default LayoutOperateBlock;
