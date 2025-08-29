import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import myStore from '../../store/myStore';
import { ConfirmButton } from '../ConfirmButton';
import { InputLabel } from '../InputLabel';
import { InputReusable } from '../InputReusable';
import styles from './formFields.module.scss';

export const FormFields: FC = observer(() => {
  const {
    width, height, format, setFormat, setHeight, setWidth, clearStor,
  } = myStore;

  useEffect(() => {
    const localStorageData = localStorage.getItem('TEST_DATA');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      setWidth(data.width);
      setHeight(data.height);
      setFormat(data.format);
    }
  }, []);

  const handleFormatChange = (event: any) => {
    console.debug(event.target.value);
    setFormat(event.target.value);
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };

  const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleClickButton = () => {
    const savedParameters = { width, height, format };
    localStorage.setItem('TEST_DATA', JSON.stringify(savedParameters));
  };

  const handleResetButton = () => {
    localStorage.removeItem('TEST_DATA');
    clearStor();
  };

  return createPortal(
    <div className={styles.parameterList}>
      <div className={styles.parameterForm}>
        <div className={styles.form}>
          <h3 style={{ marginBottom: '20px' }}>Параметры для сбора фото</h3>
          <span style={{ marginBottom: '20px' }}>Указаны дефолтные, при необходимости смените!</span>
          <InputLabel text="Ширина" />
          <InputReusable
            id="width"
            type="number"
            value={width}
            onChange={handleWidthChange}
          />
          <InputLabel text="Высота" />
          <InputReusable
            id="height"
            type="number"
            value={height}
            onChange={handleHeight}
          />
          <InputLabel text="Формат" />
          <select onChange={handleFormatChange} className={styles.select}>
            <option value="image/png" selected={format === 'image/png'}>image/png</option>
            <option value="image/jpeg" selected={format === 'image/jpeg'}>image/jpeg</option>
            <option value="image/webp" selected={format === 'image/webp'}>image/webp</option>
          </select>
          <ConfirmButton onClick={handleClickButton} value="Все гуд? собираем?" />
          <ConfirmButton onClick={handleResetButton} value="Параметры по умолчанию" />
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement,
  );
});
