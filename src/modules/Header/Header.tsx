import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../providers';
import myStore from '../../store/myStore';
import styles from './header.module.scss';

export const Header: FC = observer(() => {
  const { textHeaderButton } = myStore;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(ROUTES.ROOT_ROUTE);
    // const localStorageData = localStorage.getItem('TEST_DATA');
    // if (localStorageData) {
    //   const data = JSON.parse(localStorageData);
    //   data.textHeaderButton = '';
    //   localStorage.setItem('TEST_DATA', JSON.stringify(data));
    // }
  };

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.h1}>Стенд тестирования</h1>
      {textHeaderButton && <button className={styles.button} type="button" onClick={handleButtonClick}>{textHeaderButton}</button>}
    </div>
  );
});
