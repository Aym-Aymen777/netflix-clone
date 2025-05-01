import React, { Suspense } from 'react';

const PerformanceWrapper = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {React.Children.map(children, child => 
        React.memo(child, (prevProps, nextProps) => {
          return JSON.stringify(prevProps) === JSON.stringify(nextProps);
        })
      )}
    </Suspense>
  );
};

export default React.memo(PerformanceWrapper);