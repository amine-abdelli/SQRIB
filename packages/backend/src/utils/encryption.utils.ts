export function encodeRoomId(roomId: string) {
  return Buffer.from(roomId).toString('base64');
}

export function decodeRoomId(encodedRoomId: string) {
  return Buffer.from(encodedRoomId, 'base64').toString('utf8');
}
