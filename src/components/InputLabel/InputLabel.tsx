import React, { FC } from 'react';

import styles from './InputLabel.module.scss';

export interface InputLabelProps {
  text: string;
}

export const InputLabel: FC<InputLabelProps> = ({ text }) => <span className={styles.label}>{text}</span>;
