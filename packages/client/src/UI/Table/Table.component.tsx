import React from 'react';
import { ColumnProps, HeaderProps, TableProps } from './Table.props';
import styles from './Table.module.scss';
import { theme } from '../../../styles/theme';

function Header({ content, colSpan }: HeaderProps) {
  return (
    <thead className={styles.headerWrapper}>
      <tr>
        <td colSpan={colSpan}>
          {content}
        </td>
      </tr>
    </thead>
  );
}

function TableHeader({ columns }: TableProps) {
  return (
    <thead>
      <tr>
        {columns
          .map(
            (column: ColumnProps, columnIndex) => (
              <th
                style={{ background: columnIndex % 2 === 0 ? theme.quaternary : theme.tertiary, padding: ' 5px 10px' }}
                colSpan={1}
                key={column.title}
              >
                {column.title}
              </th>
            ),
          )}
      </tr>
    </thead>
  );
}

function Body({ columns, dataSource }: TableProps) {
  return (
    <tbody>
      {dataSource?.map((data: any, index: number) => ((
        <tr key={data?.id}>
          {columns
            .map((column, columnIndex) => (
              <td
                key={data[column.dataIndex]}
                style={{
                  textAlign: 'center',
                  background: columnIndex % 2 === 0 ? theme.quaternary : theme.tertiary,
                }}
              >
                {column.render ? column
                  .render(data[column.dataIndex], data, index) : data[column.dataIndex]}
              </td>
            ))}
        </tr>
      )))}
    </tbody>
  );
}

function Footer({ columns }: TableProps) {
  return (
    <tfoot style={{ backgroundColor: 'green' }}>
      <tr>
        <td colSpan={columns.length}>and finally the Footer</td>
      </tr>
    </tfoot>
  );
}

function Table({
  dataSource, columns, style, footer, header,
}: TableProps) {
  return (
    <div
      className={styles.tableWrapper}
      style={{ width: '100%', display: 'flex', ...style }}
    >
      <table
        style={{ width: '100%', ...style }}
      >
        {header && <Header content={header} colSpan={columns.length} />}
        <TableHeader dataSource={dataSource} columns={columns} />
        <Body dataSource={dataSource} columns={columns} />
        {footer && <Footer dataSource={dataSource} columns={columns} />}
      </table>
    </div>
  );
}

Table.defaultProps = {
  style: {},
};

export default Table;
