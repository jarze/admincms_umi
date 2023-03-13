import React, { useMemo, Fragment } from 'react';
import { Icon } from 'antd';
import TypeA from './Bg/Bg1';
import TypeB from './Bg/Bg2';
import styles from './index.less';

import { SCREEN_COMPONENT_PROPS } from '../../type';

const Cover = ({ children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.2em',
        fontWeight: 600,
        color: '#fca608',
        background: 'radial-gradient(rgba(255, 255, 255, 0.2), transparent 70%)',
        textShadow: '2px 2px 8px #fca608',
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    >
      <span>
        <Icon type="warning" />
        {children}
      </span>
    </div>
  );
};

const CardItem = ({
  background,
  children,
  hasToBindSource,
  title,
  titlePosition,
}: Pick<SCREEN_COMPONENT_PROPS, 'background' | 'title' | 'titlePosition'> & {
  children: React.ReactChild;
  hasToBindSource?: boolean;
}) => {
  let [CardComp, rest = {}] = useMemo(() => {
    const [card = 'bg1', type = 'none'] = background?.split?.('-') || [];
    switch (card) {
      case 'bg0':
        return [Fragment];
      case 'bg2':
        return [TypeB];
      default:
        return [TypeA, { type }];
    }
  }, [background]);

  return (
    <CardComp {...(rest as any)}>
      <>
        {title && (
          <div className={styles.title} style={{ textAlign: titlePosition }}>
            {title}
          </div>
        )}
        <div className={styles.content}>{children}</div>
        {hasToBindSource && <Cover>请绑定数据源</Cover>}
      </>
    </CardComp>
  );
};

export default CardItem;
