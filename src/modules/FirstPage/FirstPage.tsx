import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import styles from './FirstPage.module.scss';

export const FirstPage: FC = observer(() => (
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
));
