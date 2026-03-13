/* eslint-disable max-len */
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConfirmButton } from '../../components/ConfirmButton';
import { InputLabel } from '../../components/InputLabel';
import { InputReusable } from '../../components/InputReusable';
import { ROUTES } from '../../providers';
import myStore from '../../store/myStore';
import styles from './formFields.module.scss';

export const FormFields: FC = observer(() => {
  const [link, setLink] = useState('https://ebs.ru/v1/registration/start?initiatorSystem=CBIO&ResuttUrl=https://online.vtb.ru/i/bm&SrType=sr-only-photo&OGRN=1027739609391&agreement=true&SrAgreementType=AUTENTIFICATION_KBS_ESIA&SystemForAgreement=CBIO');
  const {
    maxWidth, format, framesCount, widthMask, setFormat, setFramesCount, setWidthMask, setMaxWidth, clearStor,
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

  const handleWidthMask = (e: ChangeEvent<HTMLInputElement>) => {
    setWidthMask(Number(e.target.value));
  };

  const handleClickButton = () => {
    const savedParameters = {
      maxWidth, widthMask, format, framesCount,
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
          <InputLabel text="Ширина маски" />
          <InputReusable
            id="widthMask"
            type="number"
            value={`${widthMask}`}
            onChange={handleWidthMask}
          />
          <InputLabel text="Колличество кадров в секунду" />
          <InputReusable
            id="count"
            type="number"
            value={`${framesCount}`}
            onChange={handleFramesCount}
          />
          <InputLabel text="переход по ссылке" />
          <InputReusable
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            type="text"
          />
          <InputLabel text="Формат" />
          <select defaultValue={format} onChange={handleFormatChange} className={styles.select}>
            <option value="image/png">image/png</option>
            <option value="image/jpeg">image/jpeg</option>
            <option value="image/webp">image/webp</option>
          </select>
          <ConfirmButton onClick={handleClickButton} value="ДАЛЕЕ" />
          <ConfirmButton onClick={handleResetButton} value="Параметры по умолчанию" />
          <ConfirmButton
            onClick={() => {
              window.location.href = link;
            }}
            value="Тест ссылки"
          />
        </div>
      </div>
    </div>
  );
});
