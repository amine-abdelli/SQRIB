export const MODAL_ID = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  SCOREBOARD: 'SCOREBOARD',
  AFK: 'AFK',
  AVATAR_CROP: 'AVATAR_CROP',
  AVATAR_COLOR: 'AVATAR_COLOR',
  CONFIRM_AVATAR_DELETION: 'CONFIRM_AVATAR_DELETION',
  CONFIRM_DELETE_ACCOUNT: 'CONFIRM_DELETE_ACCOUNT',
} as const;
/** Add 'as const' to narrow down the types
Without the as const, the type of keyof typeof MODAL_ID type would be string */