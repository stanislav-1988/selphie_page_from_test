import { observer } from 'mobx-react-lite';
import React, { type FC, useEffect, useState } from 'react';

import myStore from '../store/myStore';

export const AnimationProcess: FC = observer(() => {
  const [widthAnimationContainer, setWidthAnimationContainer] = useState(0);
  const { widthMask } = myStore;

  useEffect(() => {
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
      const newWidthAnimationContainer: number = ((videoContainer.offsetWidth as number) / 100) * widthMask;

      setWidthAnimationContainer(newWidthAnimationContainer);
    }
  }, [setWidthAnimationContainer, widthMask]);

  return (
    <div
      id="tester"
      style={{
        transform: 'translate(-50%, 30%)',
        position: 'absolute',
        left: '50%',
        boxShadow: '0px 0px 0px 500px rgba(0, 0, 0, 0.52)',
        width: `${widthAnimationContainer}px`,
        height: `${widthAnimationContainer * 1.35}px`,
        border: '5px solid rgba(255, 255, 255, 1)',
        borderRadius: '16px',
      }}
    />
  );
});
