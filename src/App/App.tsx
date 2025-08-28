import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { FormFields } from '../components/FormFields';
import { FirstPage, Header } from '../modules';
import { GetPhoto } from '../modules/GetPhoto/GetPhoto';
import { ROUTES } from '../providers';
import styles from './App.module.scss';

export const App: FC = () => (
  <div className={styles.body}>
    <Header />
    <Routes>
      <Route path={ROUTES.ROOT_ROUTE} element={<FirstPage />} />
      <Route path={ROUTES.GET_PHOTO} element={<GetPhoto />} />
      <Route path="*" element={<FirstPage />} />
    </Routes>
    <FormFields />
  </div>
);
