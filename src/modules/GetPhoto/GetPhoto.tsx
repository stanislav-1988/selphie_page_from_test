import { observer } from 'mobx-react-lite';
import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';

import { LoaderComponent } from '../../components';
import { getUserMedia, setupCameraStream } from '../../helper/media';
import useMobileDetect from '../../hooks/useBreakpointState';
import myStore from '../../store/myStore';
import styles from './getPhoto.module.scss';

export const GetPhoto: FC = observer(() => {
  const [frameCollection, setFrameCollection] = useState<Array<string>>([]);
  const {
    setIsVideoLoaded, setTextHeaderButton, setVideoRef, setIsCameraRetry, isAuthenticationLoading, isCameraRetry, maxWidth, maxHeight, minWidth, minHeight, isVideoLoaded,
  } = myStore;

  useEffect(() => {
    setTimeout(() => { setTextHeaderButton('Сменить параметры'); }, 0);

    return () => {
      setTextHeaderButton('');
    };
  }, []);

  const { isMobile } = useMobileDetect();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setVideoRef(videoRef);

    return () => {
      setIsVideoLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupCameraStreamResult = useCallback(() => setupCameraStream(
    videoRef,
    maxWidth,
    maxHeight,
    () => [],
    () => [],
    () => [],
    () => [],
  )
    .then(() => {
      setIsVideoLoaded(true);
    })
    .catch((error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigator.permissions?.query({ name: 'camera' as any }).then((result) => {
        console.debug('result.state', result.state);
      });
      console.error('Camera initialization failed:', error);
    }), [maxWidth, maxHeight, setIsVideoLoaded]);

  useEffect(() => {
    if (!isVideoLoaded && isCameraRetry) {
      setIsCameraRetry(false);
      getUserMedia({ video: true })
        .then(() => {
          setupCameraStreamResult();
        })
        .catch(() => {
          setupCameraStreamResult();
        });
    }
  }, [isCameraRetry, isVideoLoaded, setIsCameraRetry, setupCameraStreamResult]);

  const captureSelfie = useCallback(() => {
    const player = videoRef.current;
    if (!player) return;
    const canvas = document.createElement('canvas');
    canvas?.setAttribute('width', String(player.videoWidth || minWidth));
    canvas?.setAttribute('height', String(player.videoHeight || minHeight));
    const context = canvas?.getContext('2d');
    if (context) {
      context?.drawImage(
        player as HTMLVideoElement,
        0,
        0,
        player.videoWidth || minWidth,
        player.videoHeight || minHeight,
      );
      canvas.toBlob(() => {
        const newFrameCollection = [...frameCollection, canvas.toDataURL('image/png', 1.0)];
        setFrameCollection(newFrameCollection);
      }, 'image/png', 1.0);
    }
  }, [frameCollection, minHeight, minWidth]);

  useEffect(() => {
    if (isAuthenticationLoading) {
      videoRef.current?.pause();
    }
    if (isVideoLoaded) {
      setTimeout(() => captureSelfie(), 100);
    }
  }, [captureSelfie, isAuthenticationLoading, isVideoLoaded]);

  return (

    <div className={styles.container}>
      <div
        id="videoContainer"
        style={isMobile()
          ? {
            minHeight: 'calc(100dvh - 68px)',
            width: `${window.innerWidth - 24}px`,
            overflow: 'hidden',
            touchAction: 'none',
            userSelect: 'none',
            margin: 'auto',
          }
          : {
            display: 'flex',
            minHeight: '716px',
            width: '600px',
            borderRadius: '16px',
            position: 'relative',
            maxWidth: '600px',
            overflow: 'hidden',
            marginBottom: '25px',
            margin: 'auto',
          }}
      >

        <video
          autoPlay
          muted
          playsInline
          ref={videoRef}
          style={{
            height: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%) rotateY(180deg)',
            visibility: isVideoLoaded ? 'visible' : 'hidden',
          }}
        />
        {!isVideoLoaded && <LoaderComponent />}
      </div>
      <div className={styles.content}>
        <button className={styles.button} type="button" onClick={() => {}}>Собрать фото</button>
      </div>
    </div>
  );
});
