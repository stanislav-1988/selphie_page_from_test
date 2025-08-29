import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { FormFields, Header } from '../modules';
import { GetPhoto } from '../modules/GetPhoto/GetPhoto';
import { ROUTES } from '../providers';
import myStore from '../store/myStore';
import styles from './App.module.scss';

export const App: FC = () => {
  const {
    setFormat, setHeight, setWidth,
  } = myStore;

  useEffect(() => {
    const localStorageData = localStorage.getItem('TEST_DATA');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      if (data.width) setWidth(data.width);
      if (data.height) setHeight(data.height);
      if (data.format) setFormat(data.format);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.container}>
        <div className={styles.earth_demo}>
          <div className={styles.earth}>
            <div className={styles.more_info} />
            <img src="https://cssanimation.rocks/images/random/earth.png" alt="" />
          </div>
          <div className={styles.moon_container}>
            <div className={styles.moon}>
              <img src="https://cssanimation.rocks/images/random/moon.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path={ROUTES.GET_PHOTO} element={<GetPhoto />} />
        <Route path="*" element={<FormFields />} />
      </Routes>
    </div>
  );
};
