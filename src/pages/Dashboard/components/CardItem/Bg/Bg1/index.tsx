import React, { useRef, useLayoutEffect, useState, forwardRef, Fragment } from 'react';
import { throttle } from 'lodash';
import { themeInstance } from '../../../Theme/_theme';

const pathsToD = paths =>
  paths?.length > 0 ? paths.reduce((p, i, j) => `${p}${j ? 'L' : ''}${i.join(',')}`, 'M') : null;

export interface TypeAProps extends React.HTMLAttributes<any> {
  type:
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'border'
    | 'corner'
    | 'leftTop'
    | 'rightTop'
    | 'leftBottom'
    | 'rightBottom';
}

const createPath = (w, h, type: TypeAProps['type']) => {
  const gap = 1.0;
  let angle = +themeInstance.vars.fontSize + 2;
  // 16.0;
  const d = gap + angle;
  // 装饰角样式
  let tw = Math.min(+themeInstance.vars.fontSize * 11, h - d - angle);
  const viewBox = `0 0 ${w} ${h}`;

  const transformMap = {
    topLeft: `matrix(1 0 0 1 0 0)`,
    topRight: `matrix(-1 0 0 1 ${w} 0)`,
    bottomLeft: `matrix(1 0 0 -1 0 ${h})`,
    bottomRight: `matrix(-1 0 0 -1 ${w} ${h})`,

    leftTop: `matrix(1 0 0 1 0 0)`,
    rightTop: `matrix(-1 0 0 1 ${w} 0)`,
    leftBottom: `matrix(1 0 0 -1 0 ${h})`,
    rightBottom: `matrix(-1 0 0 -1 ${w} ${h})`,
  };

  switch (type) {
    case 'border': {
      const pathPoints = [
        [gap, d],
        [d, gap],
        [w - d, gap],
        [w - gap, d],
        [w - gap, h - d],
        [w - d, h - gap],
        [d, h - gap],
        [gap, h - d],
        [gap, d],
      ];
      const path = pathPoints.reduce((p, i, j) => `${p}${j ? 'L' : ''}${i.join(',')}`, 'M');
      const paths = [{ d: path, strokeOpacity: 0.4 }];
      return {
        path: pathPoints.reduce((p, i, j) => `${p}${j ? 'L' : ''}${i.join(',')}`, 'M'),
        paths,
        viewBox,
        grid: [d, d, d, d],
      };
    }
    case 'corner': {
      angle = 8;
      const pathPoints = [
        [gap, d + angle],
        [gap, d],
        [d, gap],
        [d + angle, gap],
        [w - d, gap],
        [w - gap, d],
        [w - gap, h - d],
        [w - d, h - gap],
        [d, h - gap],
        [gap, h - d],
        [gap, d + angle],
      ];
      const path = pathPoints.reduce((p, i, j) => `${p}${j ? 'L' : ''}${i.join(',')}`, 'M');
      const cornerPath = pathsToD(pathPoints?.slice?.(0, 4));
      const paths = [
        { d: path, strokeOpacity: 0.4 },
        // corners
        ...Object.values(transformMap).map(transform => ({
          d: cornerPath,
          strokeWidth: 4.0,
          transform,
        })),
      ];
      return {
        path: pathPoints.reduce((p, i, j) => `${p}${j ? 'L' : ''}${i.join(',')}`, 'M'),
        paths,
        viewBox,
        grid: [d, d, d, d],
      };
    }
    case 'leftTop':
    case 'rightTop':
    case 'leftBottom':
    case 'rightBottom': {
      let tw = Math.min(350, w - d - angle);

      const pathPoints = [
        [gap, d],
        [d, gap],
        [tw, gap],
        [tw + angle, d],
        [w - d, d],
        [w - gap, d + angle],
        [w - gap, h - d],
        [w - d, h - gap],
        [d, h - gap],
        [gap, h - d],
        [gap, d],
      ];

      const dotW = 8;
      const dotHS = tw - dotW * 1.5;

      const dot = [
        [dotHS, d],
        [dotHS, d - dotW],
        [dotHS + dotW, d - dotW],
        [dotHS + dotW, d],
      ];

      const dotsPath = new Array(Math.max(0, Math.min(4, Math.floor((tw - d) / (dotW * 2)))))
        .fill(-dotW * 2)
        .map((i, j) => pathsToD(dot.map(([x, y]) => [x + j * i, y])) + 'Z');

      const path = pathPoints.reduce((p, i, j) => `${p}${j ? 'L' : ''}${i.join(',')}`, 'M');

      const paths = [
        { d: path, strokeOpacity: 0.4 },
        //dot
        ...dotsPath?.map?.((i, j) => ({ opacity: 0.3, d: i, fill: 'currentColor' })),
      ];
      const grid = {
        leftTop: [d, d, d, d],
        rightTop: [d, d, d, d],
        leftBottom: [d, d, d + angle, d],
        rightBottom: [d, d, d + angle, d],
      };
      return { path, paths, dotsPath, viewBox, transform: transformMap[type], grid: grid[type] };
    }
    case 'topLeft':
    case 'topRight':
    case 'bottomLeft':
    case 'bottomRight': {
      const pathPoints = [
        [gap, d + angle],
        [gap, d],
        [d, gap],
        [d + angle, gap],
        [w - d, gap],
        [w - gap, d],
        [w - gap, h - d],
        [w - d, h - gap],
        [d + angle, h - gap],
        [d, h - d],
        [d, tw + angle],
        [gap, tw],
        [gap, d + angle],
      ];

      const dotW = 8;
      const dotHS = tw - dotW * 1.5;
      const dot = [
        [d, dotHS],
        [d, dotHS + dotW],
        [d - dotW, dotHS + dotW],
        [d - dotW, dotHS],
      ];

      const dotsPath = new Array(Math.max(0, Math.min(4, Math.floor((tw - d) / (dotW * 2)))))
        .fill(-dotW * 2)
        .map((i, j) => pathsToD(dot.map(([x, y]) => [x, y + j * i])) + 'Z');

      const path = pathPoints.reduce((p, i, j) => `${p}${j ? 'L' : ''}${i.join(',')}`, 'M');

      const paths = [
        { d: path, strokeOpacity: 0.4 },
        // corners
        { d: pathsToD(pathPoints?.slice?.(0, 4)), strokeWidth: 4.0 },
        //dot
        ...dotsPath?.map?.((i, j) => ({ opacity: 0.3, d: i, fill: 'currentColor' })),
      ];
      const grid = {
        topLeft: [d, d, d, d + angle],
        bottomLeft: [d, d, d, d + angle],
        topRight: [d, d + angle, d, d],
        bottomRight: [d, d + angle, d, d],
      };
      return { path, paths, dotsPath, viewBox, transform: transformMap[type], grid: grid[type] };
    }
    default:
      break;
  }
  return {};
};

let idCount = 0;
const marID = 'xric7b7w8';

const Background = forwardRef<any, TypeAProps>(
  ({ type = 'border', style, children, ...props }, originRef) => {
    const ref = useRef<any>(originRef);
    const idRef = useRef<string>(`${marID}${++idCount}`);
    const id = idRef.current;

    const [map, setMap] = useState<any>({});
    useLayoutEffect(() => {
      if (!ref.current) return;
      const handlePath = throttle(() => {
        const [w, h] = [ref.current.clientWidth, ref.current.clientHeight];
        setMap(createPath(w, h, type));
      }, 300);
      handlePath();
      window.addEventListener('resize', handlePath);
      return () => {
        window.removeEventListener('resize', handlePath);
      };
    }, [type]);

    const { transform, viewBox, path, paths, grid = [] } = map || {};
    const [top = 0, right = 0, bottom = 0, left = 0] = grid;

    return (
      <Fragment>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            mixBlendMode: 'hard-light',
            color: `var(--screen-theme-color, ${themeInstance.vars.themeColor})`,
            ...style,
          }}
          ref={ref}
          {...props}
        >
          <defs>
            <filter
              x="-6.6%"
              y="-4.3%"
              width="113.2%"
              height="108.7%"
              filterUnits="objectBoundingBox"
              id={id}
            >
              <feGaussianBlur stdDeviation="30" in="SourceAlpha" result="shadowBlurInner1" />
              <feOffset in="shadowBlurInner1" result="shadowOffsetInner1" />
              <feComposite
                in="shadowOffsetInner1"
                in2="SourceAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
                result="shadowInnerInner1"
              />
              <feColorMatrix
                // values="0 0 0 0 0 0 0 0 0 0.3264 0 0 0 0 0.72 0 0 0 0.5 0"
                values={themeInstance.vars.themeBgColor3Matrix}
                in="shadowInnerInner1"
              />
            </filter>
            <path id={`${id}__1`} d={path} />
          </defs>
          <g fill="none" transform={transform}>
            <use fill="var(--screen-text-color-0)" filter={`url(#${id})`} href={`#${id}__1`} />
            {paths?.map?.((i, j) => (
              <path key={j} stroke="currentColor" {...i} />
            ))}
          </g>
        </svg>
        <div style={{ position: 'absolute', top, left, right, bottom, zIndex: 1 }}>{children}</div>
      </Fragment>
    );
  },
);

export default Background;
