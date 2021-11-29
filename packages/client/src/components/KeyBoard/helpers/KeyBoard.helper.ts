function translateKeyBoardCode(word: string) {
  switch (word) {
    case 'ShiftLeft':
      return 'Shift';
    case 'ShiftRight':
      return 'Shift';
    case 'Backspace':
      return '<-';
    case 'AltRight':
      return 'Alt';
    case 'AltLeft':
      return 'Alt';
    default: console.log();
  }
  if (word.charAt(0) === 'K') {
    return word.slice(3);
  }
  return word;
}

export { translateKeyBoardCode };
