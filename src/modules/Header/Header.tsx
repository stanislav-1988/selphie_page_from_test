import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import styles from './header.module.scss';

export const Header: FC = observer(() => (
  <div className={styles.headerContainer}>
    <h1 className={styles.h1}>Стенд тестирования</h1>
  </div>
));
