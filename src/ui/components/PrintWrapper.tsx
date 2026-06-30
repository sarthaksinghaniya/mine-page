/**
 * @file src/ui/components/PrintWrapper.tsx
 * @description A wrapper component that strips dark themes for printing/exporting.
 */

import React from 'react';

export const PrintWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-dashboard, #printable-dashboard * {
              visibility: visible;
              color: #000 !important;
              background-color: #fff !important;
              border-color: #ccc !important;
              box-shadow: none !important;
            }
            #printable-dashboard {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
      <div id="printable-dashboard" style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </>
  );
};
