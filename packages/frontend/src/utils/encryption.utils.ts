export function encodeRoomId(roomId: string) {
  return window.btoa(roomId);
}

export function decodeRoomId(encodedRoomId: string) {
  return window.atob(encodedRoomId);
}
