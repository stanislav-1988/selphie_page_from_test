import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConfirmButton } from '../../components/ConfirmButton';
import { InputLabel } from '../../components/InputLabel';
import { InputReusable } from '../../components/InputReusable';
import { cleanStream } from '../../helper/media';
import { ROUTES } from '../../providers';
import myStore from '../../store/myStore';
import styles from './formFields.module.scss';

export const FormFields: FC = observer(() => {
  const {
    maxWidth, maxHeight, format, videoRef, setFormat, setHeight, setWidth, clearStor,
  } = myStore;
  const navigate = useNavigate();

  const handleFormatChange = (event: any) => {
    console.debug(event.target.value);
    setFormat(event.target.value);
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };

  const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };

  const handleClickButton = () => {
    const savedParameters = {
      maxWidth, maxHeight, format,
      // textHeaderButton: 'Сменить параметры',
    };
    localStorage.setItem('TEST_DATA', JSON.stringify(savedParameters));
    navigate(ROUTES.GET_PHOTO);
  };

  const handleResetButton = () => {
    localStorage.removeItem('TEST_DATA');
    clearStor();
    cleanStream(videoRef);
  };

  return (
    <div className={styles.parameterList}>
      <div className={styles.parameterForm}>
        <div className={styles.form}>
          <h3 style={{ marginBottom: '20px' }}>Параметры для сбора фото</h3>
          <span style={{ marginBottom: '20px' }}>Указаны дефолтные, при необходимости смените!</span>
          <InputLabel text="Ширина" />
          <InputReusable
            id="width"
            type="number"
            value={`${maxWidth}`}
            onChange={handleWidthChange}
          />
          <InputLabel text="Высота" />
          <InputReusable
            id="height"
            type="number"
            value={`${maxHeight}`}
            onChange={handleHeight}
          />
          <InputLabel text="Формат" />
          <select onChange={handleFormatChange} className={styles.select}>
            <option value="image/png" selected={format === 'image/png'}>image/png</option>
            <option value="image/jpeg" selected={format === 'image/jpeg'}>image/jpeg</option>
            <option value="image/webp" selected={format === 'image/webp'}>image/webp</option>
          </select>
          <ConfirmButton onClick={handleClickButton} value="ДАЛЕЕ" />
          <ConfirmButton onClick={handleResetButton} value="Параметры по умолчанию" />
        </div>
      </div>
    </div>
  );
});
