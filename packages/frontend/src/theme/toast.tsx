import React from 'react';
import { AiFillWarning } from 'react-icons/ai';

export const baseToast = {
  style: {
    border: '3px solid black',
    boxShadow: '4px 4px 0px black',
    color: 'black',
    fontFamily: 'Fira Code',
    padding: '16px',
  }
}
export const warnToast = { icon: <AiFillWarning size={22} color='#fadb14' />, style: { ...baseToast.style, background: 'white' } }

export enum TOAST_ID {
  PICK_USERNAME_WARNING = 'pick_username_warning',
  FULL_ROOM = 'staging_error',
}

export const ToasterConfigs = {
  ...baseToast,
  success: {
    duration: 3000
  }
}