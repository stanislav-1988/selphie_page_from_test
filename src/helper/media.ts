/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
import type React from 'react';
import { type MutableRefObject } from 'react';

export interface CameraState {
  width?: number;
  height?: number;
  aspectRatio?: number;
}

export const hasUserMedia = () => 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;

export const getUserMedia = async (constraints: MediaStreamConstraints): Promise<MediaStream | undefined> => {
  if (hasUserMedia()) {
    return new Promise((resolve, reject) => {
      const getMediaStream = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

          resolve(mediaStream);
        } catch (e: any) {
          if (e?.name === 'NotReadableError') {
            setTimeout(getMediaStream, 1000);
          } else {
            reject(e);
          }
        }
      };

      getMediaStream();
    });
  }
};

export const setupCameraStream = (
  videoRef: React.RefObject<HTMLVideoElement>,
  maxWidth: number,
  maxHeight: number,
  setIsErrorPageOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorPageDetails: React.Dispatch<React.SetStateAction<string>>,
  setCameraState: React.Dispatch<React.SetStateAction<CameraState | undefined>>,
  setIsShowingInstruction: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  const checkPermissions = (): Promise<boolean> | undefined => navigator.permissions
    ?.query({ name: 'camera' as any })
    .then((permissionStatus) => {
      if (permissionStatus.state === 'denied') {
        setIsShowingInstruction(true);

        return false;
      }
      if (permissionStatus.state === 'granted') {
        setIsShowingInstruction(false);

        return true;
      }

      return true;
    })
    .catch(() => true);

  const attemptSetup = (): Promise<void> => Promise.resolve()
    .then(() => {
      checkPermissions();
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    })
    .then(() => navigator.mediaDevices.enumerateDevices())
    .then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      if (videoDevices.length <= 0) {
        setIsErrorPageOpen(true);
        console.debug('NO DEVICES FOUND ', videoDevices);
        throw new Error('No devices found for video devices');
      }

      return videoDevices[0].deviceId;
    })
    .then((deviceId) => navigator.mediaDevices.getUserMedia({
      video: {
        deviceId,
        width: { ideal: maxWidth },
        height: { ideal: maxHeight },
      },
    }))
    .then((initialStream) => {
      if (!initialStream || !videoRef.current) return;
      const track = initialStream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      let idealWidth = maxWidth;
      let idealHeight = maxHeight;
      if (capabilities.width?.max) {
        idealWidth = Math.min(capabilities.width.max, maxWidth);
      }
      if (capabilities.height?.max) {
        idealHeight = Math.min(capabilities.height.max, maxHeight);
      }

      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      if (isPortrait) [idealWidth, idealHeight] = [idealHeight, idealWidth];

      // Stop initial stream before getting high-res one
      track.stop();

      return navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: track.getSettings().deviceId!,
          width: { ideal: idealWidth, max: maxWidth },
          height: { ideal: idealHeight, max: maxHeight },
        },
      });
    })
    .then((finalStream) => {
      if (!finalStream || !videoRef.current || !('srcObject' in videoRef.current)) return;

      // eslint-disable-next-line no-param-reassign
      videoRef.current.srcObject = finalStream;

      return new Promise<void>((resolve) => {
        // eslint-disable-next-line no-param-reassign
        if (videoRef.current && 'onloadedmetadata' in videoRef.current) {
          videoRef.current.onloadedmetadata = () => {
            const width = videoRef.current?.videoWidth;
            const height = videoRef.current?.videoHeight;
            setCameraState({
              width,
              height,
              aspectRatio: width && height ? width / height : undefined,
            });
            setIsShowingInstruction(false);
            resolve();
          };
        }
      });
    })
    .catch((error) => {
      if (error?.name === 'NotReadableError') {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(attemptSetup);
      }

      if (error?.name === 'NotAllowedError') {
        setIsShowingInstruction(true);
      } else {
        setIsErrorPageOpen(true);
        setErrorPageDetails(error?.toString());
      }
    });

  return attemptSetup();
};

export const cleanStream = (videoRef: MutableRefObject<HTMLVideoElement | null>) => {
  const stream = videoRef.current?.srcObject as MediaStream | undefined;
  if (stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
      stream.removeTrack(track);
    });
  }
};
