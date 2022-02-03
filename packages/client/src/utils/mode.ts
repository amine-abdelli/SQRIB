// This element has implicitly an any type because other it can't be user as an object index
export interface IGameOption {
  timer: number,
  stackLength: number
}

export interface IGameOptions {
  one: IGameOption,
  two: IGameOption
}

export const GameOptions: any = {
  countdown: {
    timer: 60,
    stackLength: 400,
  },
  countup: {
    timer: 0,
    stackLength: 75,
  },
};
