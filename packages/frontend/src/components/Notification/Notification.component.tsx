import React from 'react';
import PropTypes from 'prop-types';

import './Notification.style.scss';

interface NotificationProps {
  message: string,
  type: 'info' | 'warn' | 'error',
}

const Notification = ({ message, type }: NotificationProps) => {
  let className;

  switch (type) {
    case 'info':
      className = 'notification info';
      break;
    case 'warn':
      className = 'notification warn';
      break;
    case 'error':
      className = 'notification error';
      break;
    default:
      className = 'notification';
      break;
  }

  return (
    <div className={className}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'warn', 'error']).isRequired,
};

export default Notification;
