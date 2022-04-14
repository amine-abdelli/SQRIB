function order(index: number) {
  switch (index) {
    case 1:
      return `${index}st`;
    case 2:
      return `${index}nd`;
    case 3:
      return `${index}rd`;
    default:
      return `${index}th`;
  }
}

export { order };
