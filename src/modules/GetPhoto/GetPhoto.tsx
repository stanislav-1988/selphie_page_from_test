/* eslint-disable react/no-array-index-key */
import { observer } from 'mobx-react-lite';
import React, {
  FC, useCallback, useEffect, useRef,
  useState,
} from 'react';

import { LoaderComponent } from '../../components';
import { cleanStream, getUserMedia, setupCameraStream } from '../../helper/media';
import useMobileDetect from '../../hooks/useBreakpointState';
import myStore from '../../store/myStore';
import styles from './getPhoto.module.scss';

export const GetPhoto: FC = observer(() => {
  const [frameCollection, setFrameCollection] = useState<Array<string>>([]);
  const [renderCollection, setRenderCollection] = useState(false);
  const {
    setIsVideoLoaded, setTextHeaderButton, setVideoRef, setIsCameraRetry, framesCount, format, isCameraRetry, maxWidth, maxHeight, minWidth, minHeight, isVideoLoaded,
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

  const captureSelfie = () => {
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
        setFrameCollection((prev) => [...prev, canvas.toDataURL(format, 1.0)]);
      }, 'image/png', 1.0);
    }
  };

  const downloadFile = (blob: string, index: number) => {
    const url = blob;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Photo-${index}`); // Устанавливаем имя файла
    document.body.appendChild(link);
    link.click();
    link?.parentNode?.removeChild(link); // Очистка
    window.URL.revokeObjectURL(url); // Освобождение ресурса
  };

  const handleGetPhoto = () => {
    if (!renderCollection) {
      const interval = setInterval(() => {
        captureSelfie();
      }, (1000 / framesCount));
      setTimeout(() => {
        clearInterval(interval);
        cleanStream(videoRef);
        setRenderCollection(true);
        setIsVideoLoaded(false);
      }, 1000);
    } else {
      frameCollection.forEach((el, i) => downloadFile(el, i));
    }
  };

  return (

    <div className={styles.container}>
      {!renderCollection && (
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
      )}
      <div className={styles.content}>
        <button className={styles.button} type="button" onClick={handleGetPhoto}>{`${!renderCollection ? 'Собрать фото' : 'Скачать все'}`}</button>
        <div className={styles.cardResultContainer}>
          {renderCollection && frameCollection.map((el, i) => (
            <div key={`Photo-${i}`} className={styles.cardResult}>
              <img
                onClick={() => downloadFile(el, i)}
                id={`Photo-${i}`}
                alt="Verification in progress"
                src={el}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
