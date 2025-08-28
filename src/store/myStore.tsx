import { makeAutoObservable } from 'mobx';

class MyStore {
  format: string = 'image/png';

  width: string = '100';

  height: string = '123';

  constructor() {
    makeAutoObservable(this);
  }

  setFormat = (format: string) => {
    this.format = format;
  };

  setWidth = (width: string) => {
    this.width = width;
  };

  setHeight = (height: string) => {
    this.height = height;
  };
}

export default new MyStore();
