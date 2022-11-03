export interface TableProps {
  dataSource: unknown[],
  columns: ColumnProps[],
  style?: object,
  header?: JSX.Element | string,
  footer?: JSX.Element | string | false,
  scrollable?: boolean,
  children?: any,
  onRowClick?: (value: Record<string, string | number>) => void,
  hoverableRow?: boolean,
  emptyMessage?: string,
  ref?: any,
  pagination?: number
}

export interface ColumnProps {
  title: string,
  dataIndex: string,
  key?: string | number,
  align?: 'start' | 'center' | 'end',
  render?: (item?: unknown, data?: unknown, index?: number) => JSX.Element | void
}

export interface HeaderProps {
  content: string | JSX.Element,
  colSpan: number
}
