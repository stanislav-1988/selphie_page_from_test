import React from 'react';

import styles from './LoaderComponent.module.scss';

export const LoaderComponent = () => (
  <div className={styles.container}>
    <span className={styles.loader} />
  </div>
);
