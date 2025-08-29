import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import myStore from '../../store/myStore';
import styles from './getPhoto.module.scss';

export const GetPhoto: FC = observer(() => {
  const { setTextHeaderButton } = myStore;

  useEffect(() => {
    setTimeout(() => { setTextHeaderButton('Сменить параметры'); }, 0);

    return () => {
      setTextHeaderButton('');
    };
  }, []);

  return (
    <div className={styles.container}>
      fhgjkjkhjgfhjj
    </div>
  );
});
