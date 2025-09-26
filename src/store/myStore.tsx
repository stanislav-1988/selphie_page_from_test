import { makeAutoObservable } from 'mobx';

export interface IVideoDevicesList {
  id: string;
  nameDevice: string;
  uuid: string;
}

class MyStore {
  format: string = 'image/png';

  maxWidth: number = 900;

  numberCamera: number | undefined;

  textHeaderButton: string = '';

  framesCount: number = 15;

  widthMask: number = 50;

  videoRef!: React.MutableRefObject<HTMLVideoElement | null>;

  isVideoLoaded: boolean = false;

  isCameraRetry: boolean = true;

  videoDevicesList: Array<IVideoDevicesList> | null = null;

  isAuthenticationLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  clearStor = () => {
    this.format = 'image/png';
    this.maxWidth = 900;
    // this.minWidth = 1280;
    this.widthMask = 50;
    this.framesCount = 15;
  };

  setFormat = (format: string) => {
    this.format = format;
  };

  setMaxWidth = (width: number) => {
    this.maxWidth = width;
  };

  setNumberCamera = (camera: number) => {
    this.numberCamera = camera;
  };

  setWidthMask = (widthMask: number) => {
    this.widthMask = widthMask;
  };

  setFramesCount = (framesCount: number) => {
    this.framesCount = framesCount;
  };

  setTextHeaderButton = (textHeaderButton: string) => {
    this.textHeaderButton = textHeaderButton;
  };

  setVideoRef = (payload: React.MutableRefObject<HTMLVideoElement | null>) => {
    this.videoRef = payload;
  };

  setIsVideoLoaded = (isVideoLoaded: boolean) => {
    this.isVideoLoaded = isVideoLoaded;
  };

  setIsCameraRetry = (payload: boolean) => {
    this.isCameraRetry = payload;
  };

  setVideoDevicesList = (payload: Array<IVideoDevicesList>) => {
    this.videoDevicesList = payload;
  };

  setIsAuthenticationLoading = (payload: boolean) => {
    this.isAuthenticationLoading = payload;
  };
}

export default new MyStore();
