export interface TableProps {
  dataSource: unknown[];
  columns: ColumnProps[];
  style?: object;
  header?: JSX.Element | string
  footer?: JSX.Element | string
  scrollable?: boolean
}

export interface ColumnProps {
  title: string,
  dataIndex: string,
  key?: string | number,
  render?: (item?: unknown, data?: unknown, index?: number) => JSX.Element | void
}

export interface HeaderProps {
  content: string | JSX.Element,
  colSpan: number
}
