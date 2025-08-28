import classNames from 'classnames';
import React, { ChangeEvent, FC } from 'react';

import styles from './InputReusable.module.scss';

export interface InputReusableProps {
  type: string;
  placeholder?: string;
  autoComplete?: string;
  id?: string;
  value?: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputReusable: FC<InputReusableProps> = ({
  type, placeholder, autoComplete, id, value, name, onChange,
}) => (
  <div className={classNames(styles.InputReusable)}>
    <input
      value={value}
      id={id}
      name={name}
      onChange={onChange}
      autoComplete={autoComplete}
      className={styles.styleInput}
      type={type}
      placeholder={placeholder}
    />
  </div>
);
