import { makeAutoObservable } from 'mobx';

class MyStore {
  format: string = 'image/png';

  width: string = '900';

  height: string = '1220';

  constructor() {
    makeAutoObservable(this);
  }

  clearStor = () => {
    this.format = 'image/png';
    this.height = '1220';
    this.width = '900';
  };

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
