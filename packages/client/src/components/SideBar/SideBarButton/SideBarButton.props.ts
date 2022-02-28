import { MaybeElement, IconName } from '@blueprintjs/core';

export interface ISideBarButton {
  onClick?: () => void,
  text: string,
  icon: IconName | MaybeElement,
}
