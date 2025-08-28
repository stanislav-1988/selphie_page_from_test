import React, { FC } from 'react';

import styles from './header.module.scss';

export const Header: FC = () => (
  <div className={styles.headerContainer}>
    <h1 className={styles.h1}>Стенд тестирования</h1>
  </div>
);
