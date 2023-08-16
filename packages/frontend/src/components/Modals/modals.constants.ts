export const MODAL_ID = {
  LOGIN: 'loginModal',
  SIGNUP: 'signupModal',
  VICTORY: 'victoryModal',
  OPTIONS: 'optionsModal',
} as const;
/** Add 'as const' to narrow down the types
Without the as const, the type of keyof typeof MODAL_ID type would be string */