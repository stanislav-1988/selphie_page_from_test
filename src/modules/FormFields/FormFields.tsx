import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConfirmButton } from '../../components/ConfirmButton';
import { InputLabel } from '../../components/InputLabel';
import { InputReusable } from '../../components/InputReusable';
import { ROUTES } from '../../providers';
import myStore from '../../store/myStore';
import styles from './formFields.module.scss';

export const FormFields: FC = observer(() => {
  const {
    maxWidth, maxHeight, format, framesCount, minHeight, minWidth, setFormat, setFramesCount, setMinHeight, setMinWidth, setMaxHeight, setMaxWidth, clearStor,
  } = myStore;
  const navigate = useNavigate();

  const handleFormatChange = (event: any) => {
    console.debug(event.target.value);
    setFormat(event.target.value);
  };

  const handleMaxWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxWidth(Number(e.target.value));
  };

  const handleFramesCount = (e: ChangeEvent<HTMLInputElement>) => {
    setFramesCount(Number(e.target.value));
  };

  const handleMaxHeight = (e: ChangeEvent<HTMLInputElement>) => {
    console.debug(Number(e.target.value));
    setMaxHeight(Number(e.target.value));
  };

  const handleMinHeight = (e: ChangeEvent<HTMLInputElement>) => {
    console.debug(Number(e.target.value));
    setMinHeight(Number(e.target.value));
  };

  const handleMinWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinWidth(Number(e.target.value));
  };

  const handleClickButton = () => {
    const savedParameters = {
      maxWidth, maxHeight, minHeight, minWidth, format, framesCount,
    };
    localStorage.setItem('TEST_DATA', JSON.stringify(savedParameters));
    navigate(ROUTES.GET_PHOTO);
  };

  const handleResetButton = () => {
    localStorage.removeItem('TEST_DATA');
    clearStor();
  };

  return (
    <div className={styles.parameterList}>
      <div className={styles.parameterForm}>
        <div className={styles.form}>
          <h3 style={{ marginBottom: '20px' }}>Параметры для сбора фото</h3>
          <span style={{ marginBottom: '20px' }}>Указаны дефолтные, при необходимости смените!</span>
          <InputLabel text="Максимальная ширина" />
          <InputReusable
            id="maxWidth"
            type="number"
            value={`${maxWidth}`}
            onChange={handleMaxWidthChange}
          />
          <InputLabel text="Максимальная высота" />
          <InputReusable
            id="maxHeight"
            type="number"
            value={`${maxHeight}`}
            onChange={handleMaxHeight}
          />
          <InputLabel text="Минимальная ширина" />
          <InputReusable
            id="minWidth"
            type="number"
            value={`${minWidth}`}
            onChange={handleMinWidthChange}
          />
          <InputLabel text="Минимальная высота" />
          <InputReusable
            id="minHeight"
            type="number"
            value={`${minHeight}`}
            onChange={handleMinHeight}
          />
          <InputLabel text="Колличество кадров в секунду" />
          <InputReusable
            id="count"
            type="number"
            value={`${framesCount}`}
            onChange={handleFramesCount}
          />
          <InputLabel text="Формат" />
          <select defaultValue={format} onChange={handleFormatChange} className={styles.select}>
            <option value="image/png">image/png</option>
            <option value="image/jpeg">image/jpeg</option>
            <option value="image/webp">image/webp</option>
          </select>
          <ConfirmButton onClick={handleClickButton} value="ДАЛЕЕ" />
          <ConfirmButton onClick={handleResetButton} value="Параметры по умолчанию" />
        </div>
      </div>
    </div>
  );
});
