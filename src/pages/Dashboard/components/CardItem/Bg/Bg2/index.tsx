import React, { useRef, useLayoutEffect, useState, forwardRef, Fragment } from 'react';
import { throttle } from 'lodash';
import { themeInstance } from '../../../Theme/_theme';

let idCount = 0;
const marID = 'c';

const Background = forwardRef<any, any>(
  ({ type = 'border', style, children, ...props }, originRef) => {
    const ref = useRef<any>(originRef);
    const idRef = useRef<string>(`${marID}${++idCount}`);
    const id = idRef.current;

    const [map, setMap] = useState<any>({});
    useLayoutEffect(() => {
      if (!ref.current) return;
      const handlePath = throttle(() => {
        const [w, h] = [ref.current.clientWidth, ref.current.clientHeight];

        const [width, height] = [760, 464];
        const transform = `matrix(${w / width} 0 0 ${h / height} 0 0)`;
        const grid = [(46 / height) * h, (22 / width) * w, (40 / width) * w, (22 / width) * w];
        setMap({ transform, viewBox: `0 0 ${w} ${h}`, grid });
      }, 300);
      handlePath();
      window.addEventListener('resize', handlePath);
      return () => {
        window.removeEventListener('resize', handlePath);
      };
    }, [type]);

    const { transform, viewBox, grid = [] } = map || {};
    const [top = 0, right = 0, bottom = 0, left = 0] = grid;

    return (
      <Fragment>
        <svg
          width="100%"
          height="100%"
          viewBox={viewBox}
          ref={ref}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            mixBlendMode: 'hard-light',
            color: `var(--screen-theme-color, ${themeInstance.vars.themeColor})`,
            ...style,
          }}
          {...props}
        >
          <defs>
            <polygon id={id} points="270.304337 18 489.673483 18 488.785002 20 271.201393 20" />
            <filter
              x="-3.0%"
              y="-300.0%"
              width="106.0%"
              height="700.0%"
              filterUnits="objectBoundingBox"
              id={`${id}-2`}
            >
              <feMorphology
                radius="0.5"
                operator="dilate"
                in="SourceAlpha"
                result="shadowSpreadOuter1"
              />
              <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
              <feGaussianBlur
                stdDeviation="1.5"
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
              />
              <feColorMatrix
                values="0 0 0 0 0.141176471   0 0 0 0 0.988235294   0 0 0 0 1  0 0 0 0.7 0"
                type="matrix"
                in="shadowBlurOuter1"
              />
            </filter>
            <filter
              x="-2.8%"
              y="-275.0%"
              width="105.5%"
              height="650.0%"
              filterUnits="objectBoundingBox"
              id={`${id}-3`}
            >
              <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1" />
              <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1" />
              <feComposite
                in="shadowOffsetInner1"
                in2="SourceAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
                result="shadowInnerInner1"
              />
              <feColorMatrix
                values="0 0 0 0 0.141176471   0 0 0 0 0.988235294   0 0 0 0 1  0 0 0 0.87 0"
                type="matrix"
                in="shadowInnerInner1"
              />
            </filter>
          </defs>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform={transform}>
            <g>
              <g transform="translate(0, 2)">
                <path
                  d="M20.5,19.2071068 L20.5,40.2071068 L10.5,50.2071068 L10.5,387.720166 L20.5,393.855699 L20.5,440.792893 L30.2071068,450.5 L151.427137,450.5 L161.427137,440.5 L597.84135,440.5 L607.84135,450.5 L730.808132,450.5 L740.5,441.777319 L740.5,393.85127 L749.5,388.494416 L749.5,50.1957981 L739.5,39.3855277 L739.5,19.2071068 L729.792893,9.5 L607.831235,9.5 L597.831235,19.5 L530.207107,19.5 L520.207107,29.5 L239.792893,29.5 L229.792893,19.5 L161.601769,19.5 L151.601769,9.5 L30.2071068,9.5 L20.5,19.2071068 Z"
                  stroke="currentColor"
                  fillOpacity="0.5"
                  fill="var(--screen-text-color-0, #000000)"
                />
                <g
                  transform="translate(589, 12) rotate(-270) translate(-589, -12) translate(586, 2)"
                  fill="var(--screen-theme-color-1,  #05babd)"
                >
                  <polygon points="-2.27373675e-12 4 6 10 6 12 -2.27373675e-12 6" />
                  <polygon points="0 1.8189894e-12 6 6 6 8 0 2" />
                  <polygon points="-5.68434189e-13 8 6 14 6 16 -9.09494702e-13 10" />
                  <polygon points="-5.68434189e-13 12 6 18 6 20 -9.09494702e-13 14" />
                </g>
                <g
                  transform="translate(172, 12) scale(-1, 1) rotate(-270) translate(-172, -12) translate(169, 2)"
                  fill="var(--screen-theme-color-1,  #05babd)"
                >
                  <polygon points="4.54747351e-13 1.8189894e-12 6 6 6 8 4.54747351e-13 2" />
                  <polygon points="1.70530257e-12 4 6 10 6 12 1.36424205e-12 6" />
                  <polygon points="2.16004992e-12 8 6 14 6 16 1.8189894e-12 10" />
                  <polygon points="2.16004992e-12 12 6 18 6 20 1.8189894e-12 14" />
                </g>
                <g>
                  <use fill="black" fillOpacity="1" filter={`url(#${id}-2)`} href={`#${id}`} />
                  <use
                    fill="var(--screen-theme-color-2, #CCF8F9)"
                    fillRule="evenodd"
                    href={`#${id}`}
                  />
                  <use fill="black" fillOpacity="1" filter={`url(#${id}-3)`} href={`#${id}`} />
                </g>
                <polyline
                  stroke="currentColor"
                  strokeWidth="6"
                  points="741 394 741 442 731 451 607.612876 451 598.032335 441 161.047551 441.044269 151.047551 449.044269 30 451 20 441 20 394"
                />
                <g transform="translate(17, 6)">
                  <polygon
                    fill="currentColor"
                    transform="translate(3, 35) scale(-1, -1) translate(-3, -35) "
                    points="6 32 6 38 0 38"
                  />
                  <polyline
                    stroke="currentColor"
                    strokeWidth="6"
                    points="3 32 3 13 12.9614442 3 132 3"
                  />
                  <polygon fill="currentColor" points="132 -9.09494702e-13 138 6 132 6" />
                </g>
                <g transform="translate(605, 6)">
                  <polygon
                    fill="currentColor"
                    transform="translate(135, 35) scale(1, -1) translate(-135, -35) "
                    points="138 32 138 38 132 38"
                  />
                  <polyline
                    stroke="currentColor"
                    strokeWidth="6"
                    transform="translate(70.500000, 17.500000) scale(-1, 1) translate(-70.500000, -17.500000) "
                    points="6 32 6 13 15.9614442 3 135 3"
                  />
                  <polygon fill="currentColor" points="6 -9.09494702e-13 6 6 0 6" />
                </g>
                <g transform="translate(744, 369)" stroke="var(--screen-theme-color-1, #05babd)">
                  <polyline strokeLinecap="square" points="13 6 13 48.5 0 57" />
                  <circle cx="13" cy="3" r="2.5" />
                </g>
                <g
                  transform="translate(78, 17.500000) scale(-1, 1) rotate(-270) translate(-78, -17.500000) translate(73, -25)"
                  stroke="var(--screen-theme-color-1, #05babd)"
                >
                  <polyline strokeLinecap="square" points="7 6 7 78.5 0 85" />
                  <circle cx="7" cy="3" r="2.5" />
                </g>
                <g
                  transform="translate(682, 17.500000) rotate(-270) translate(-682, -17.500000) translate(677, -25)"
                  stroke="var(--screen-theme-color-1, #05babd)"
                >
                  <polyline strokeLinecap="square" points="7 6 7 78.5 0 85" />
                  <circle cx="7" cy="3" r="2.5" />
                </g>
                <g
                  transform="translate(8.500000, 397.500000) scale(-1, 1) translate(-8.500000, -397.500000) translate(0, 369)"
                  stroke="var(--screen-theme-color-1, #05babd)"
                >
                  <polyline strokeLinecap="square" points="14 6 14 48.5 3.18323146e-12 56.5" />
                  <circle cx="14" cy="3" r="2.5" />
                </g>
                <polyline
                  stroke="currentColor"
                  strokeWidth="3"
                  points="750 443 750 450.025511 739 460.025511 732 460.025511"
                />
                <polyline
                  stroke="currentColor"
                  strokeWidth="3"
                  transform="translate(19, 451.512755) scale(-1, 1) translate(-19, -451.512755) "
                  points="28 443 28 450.025511 17 460.025511 10 460.025511"
                />
                <polyline
                  stroke="currentColor"
                  strokeWidth="3"
                  transform="translate(741, 8.512755) scale(1, -1) translate(-741, -8.512755) "
                  points="750 -4.72789123e-13 750 7.0255106 739 17.0255106 732 17.0255106"
                />
                <polyline
                  stroke="currentColor"
                  strokeWidth="3"
                  transform="translate(19, 8.512755) scale(-1, -1) translate(-19, -8.512755) "
                  points="28 -3.30680576e-13 28 7.0255106 17 17.0255106 10 17.0255106"
                />
              </g>
            </g>
          </g>
        </svg>
        <div style={{ position: 'absolute', top, left, right, bottom, zIndex: 1 }}>{children}</div>
      </Fragment>
    );
  },
);

export default Background;
