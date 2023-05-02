export enum StaticAlertEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  NEUTRAL = 'neutral'
}

export interface StaticAlertProps {
  message: string,
  type: StaticAlertEnum
}
