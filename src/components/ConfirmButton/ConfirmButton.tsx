import React, { FC } from 'react';

import styles from './ConfirmButton.module.scss';

export interface ConfirmButtonProps {
  value: string;
  onClick?: () => void
  color?: string;
}

export const ConfirmButton: FC<ConfirmButtonProps> = ({ value, onClick, color }) => (
  <button
    style={{ background: color }}
    onClick={onClick}
    className={styles.submit_form}
    type="button"
  >
    {value}
  </button>
);
