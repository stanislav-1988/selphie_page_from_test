import { makeAutoObservable } from 'mobx';

class MyStore {
  format: string = 'image/png';

  maxWidth: number = 900;

  maxHeight: number = 1220;

  textHeaderButton: string = '';

  minWidth: number = 600;

  framesCount: number = 15;

  minHeight: number = 800;

  videoRef!: React.MutableRefObject<HTMLVideoElement | null>;

  isVideoLoaded: boolean = false;

  isCameraRetry: boolean = true;

  isAuthenticationLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  clearStor = () => {
    this.format = 'image/png';
    this.maxHeight = 1220;
    this.maxWidth = 900;
    this.minHeight = 800;
    this.minWidth = 600;
    this.framesCount = 15;
  };

  setFormat = (format: string) => {
    this.format = format;
  };

  setMaxWidth = (width: number) => {
    this.maxWidth = width;
  };

  setMaxHeight = (height: number) => {
    this.maxHeight = height;
  };

  setMinWidth = (width: number) => {
    this.minWidth = width;
  };

  setMinHeight = (height: number) => {
    this.minHeight = height;
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

  setIsAuthenticationLoading = (payload: boolean) => {
    this.isAuthenticationLoading = payload;
  };
}

export default new MyStore();
