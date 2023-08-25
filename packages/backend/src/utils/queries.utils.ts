/**
 * Transform an object into an sql query string
 * e.g { foo: 'bar', baz: 'qux' } => "foo='bar', baz='qux'"
 * @param data { object }
 * @returns a query string
 */
function objectToQueryString(data: Record<string, unknown>) {
  const obj = Object.entries(data);
  return obj.map(([key, value], i: number) => `${key}='${value}'${i === obj.length - 1 ? '' : ', '}`).join('');
}

export { objectToQueryString };

export function serializeBigInt(data: any) {
  return JSON.parse(JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() : value)));
}
