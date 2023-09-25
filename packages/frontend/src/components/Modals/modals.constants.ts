export const MODAL_ID = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  SCOREBOARD: 'SCOREBOARD',
  AFK: 'AFK',
  AVATAR_CROP: 'AVATAR_CROP',
} as const;
/** Add 'as const' to narrow down the types
Without the as const, the type of keyof typeof MODAL_ID type would be string */