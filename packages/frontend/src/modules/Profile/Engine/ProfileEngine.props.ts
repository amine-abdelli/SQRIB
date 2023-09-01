import { ReactElement } from "react";

export interface ProfileEngineProps {
  userDetail: any
}

export interface ProfileEngineChildren {
  children: ReactElement<ProfileEngineProps> | ReactElement<ProfileEngineProps>[];
}