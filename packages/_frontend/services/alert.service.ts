/* eslint-disable no-param-reassign */
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear,
};

export const AlertType = {
  Success: 'Success',
  Error: 'Error',
  Info: 'Info',
  Warning: 'Warning',
};

const alertSubject = new Subject();
const defaultId = 'default-alert';

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
  return alertSubject.asObservable().pipe(filter((x: any) => x && x.id === id));
}

// convenience methods
function success(message: string, options: any) {
  alert({ ...options, type: AlertType.Success, message });
}

function error(message: string, options: any) {
  alert({ ...options, type: AlertType.Error, message });
}

function info(message: string, options: any) {
  alert({ ...options, type: AlertType.Info, message });
}

function warn(message: string, options: any) {
  alert({ ...options, type: AlertType.Warning, message });
}

// core alert method
function alert(notification: any) {
  notification.id = notification.id || defaultId;
  notification.autoClose = (notification.autoClose === undefined ? true : notification.autoClose);
  alertSubject.next(notification);
}

// clear alerts
function clear(id = defaultId) {
  alertSubject.next({ id });
}
