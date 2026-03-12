import React from 'react';
import { StaticAlertProps } from './StaticAlert.props';
import styles from './StaticAlert.module.scss';

function StaticAlert({ message, type }: StaticAlertProps) {
  return (
    <p className={styles[type]}>{message}</p>
  );
}

export default StaticAlert;
