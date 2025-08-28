import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FC } from 'react';
import { createPortal } from 'react-dom';

import myStore from '../../store/myStore';
import { ConfirmButton } from '../ConfirmButton';
import { InputLabel } from '../InputLabel';
import { InputReusable } from '../InputReusable';
import styles from './formFields.module.scss';

export const FormFields: FC = observer(() => {
  const {
    width, height, format, setFormat, setHeight, setWidth,
  } = myStore;

  const handleFormatChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormat(e.target.value);
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };

  const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleClickButton = () => {
    console.debug(width, height, format);
  };

  return createPortal(
    <div className={styles.registrationList}>
      <div className={styles.registrationForm}>
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
          <InputReusable
            id="format"
            type="text"
            value={format}
            onChange={handleFormatChange}
          />
          <ConfirmButton onClick={handleClickButton} value="Все гуд? собираем?" />
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement,
  );
});
