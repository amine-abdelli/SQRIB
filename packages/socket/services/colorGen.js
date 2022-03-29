function colorGenerator(roomSize) {
  const index = roomSize || 0;
  const colors = [
    '#264653',
    '#2a9d8f',
    '#e9c46a',
    '#f4a261',
    '#e76f51',
  ];
  return colors[index];
}

module.exports = { colorGenerator };
