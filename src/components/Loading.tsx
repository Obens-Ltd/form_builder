/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';

import ImageFallback from '@components/common/ImageFallback';

export default function Loading({ inside }: { inside?: boolean }) {
  return (
    <div
      className={classNames(
        !!inside && 'loading-overlay',
        'fixed top-0 right-0 h-screen w-full flex flex-col justify-center items-center z-50',
      )}
      style={{ zIndex: 9999, backgroundColor: '#FFFFFFB0' }}
    >
      <div className="absolute top-0 left-0 w-full" style={{ zIndex: 9999 }}>
        <div className="progress-materializecss">
          <div className="indeterminate"></div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen opacity-50 login-bg"></div>
      <div className="flex items-center" style={{ zIndex: 9999 }}>
        <ImageFallback
          draggable={false}
          src="/assets/images/obens.png"
          width={230}
          height={135}
          alt="OBENS"
        />
      </div>
      <style jsx>
        {`
          @media (max-width: 767px) {
            .loading-overlay {
              max-height: calc(100% - 5rem);
              top: 5rem;
            }
          }

          @media (min-width: 768px) {
            .loading-overlay {
              max-width: calc(100% - 16rem);
            }
          }

          .progress-materializecss {
            margin: 0;
            position: relative;
            height: 8px;
            display: block;
            width: 100%;
            background-color: #45ad953f;
            overflow: hidden;
          }

          .progress-materializecss .indeterminate {
            background: linear-gradient(45deg, #d5c469, #45ad95);
          }

          .progress-materializecss .indeterminate::before {
            content: '';
            position: absolute;
            background: inherit;
            top: 0;
            left: 0;
            bottom: 0;
            will-change: left, right;
            animation: indeterminate 2.1s
              cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
          }

          .progress-materializecss .indeterminate::after {
            content: '';
            position: absolute;
            background: inherit;
            top: 0;
            left: 0;
            bottom: 0;
            will-change: left, right;
            animation: indeterminate-short 2.1s
              cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
            animation-delay: 1.15s;
          }

          @keyframes indeterminate {
            0% {
              left: -35%;
              right: 100%;
            }
            60% {
              left: 100%;
              right: -90%;
            }
            100% {
              left: 100%;
              right: -90%;
            }
          }

          @keyframes indeterminate-short {
            0% {
              left: -200%;
              right: 100%;
            }
            60% {
              left: 107%;
              right: -8%;
            }
            100% {
              left: 107%;
              right: -8%;
            }
          }
        `}
      </style>
    </div>
  );
}
