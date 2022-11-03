import React, { useRef, useState } from 'react';
import { ColumnProps, HeaderProps, TableProps } from './Table.props';
import styles from './Table.module.scss';
import { theme } from '../../../styles/theme';
import { useWindowSize } from '../../hooks/useWindowSize';
import Select from '../Select/Select.component';

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
  const { isSmallScreen } = useWindowSize();
  return (
    <thead>
      <tr>
        {columns
          .map(
            (column: ColumnProps, columnIndex) => (
              <th
                style={{ background: columnIndex % 2 === 0 ? theme.quaternary : theme.tertiary, padding: ' 5px 10px', fontSize: isSmallScreen ? '12px' : '' }}
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

function Body({
  columns, dataSource, onRowClick, hoverableRow, emptyMessage = 'no data',
}: TableProps) {
  const [clickedRowIndex, setClickedRowIndex] = useState<number | undefined>(undefined);
  function handleClickedRow(data: Record<string, string>, index: number | undefined) {
    if (onRowClick) {
      onRowClick(clickedRowIndex !== undefined ? {} : data);
      setClickedRowIndex(clickedRowIndex !== undefined ? undefined : index);
    }
  }
  const wrapperRef = useRef<any>(null);
  // ! TODO: To uncomment once a solution is found to avoid action propagation on join button
  // useEffect(() => {
  //   /**
  //    * Alert if clicked on outside of element
  //    */
  //   function handleClickOutside(event: any) {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       handleClickedRow({}, undefined);
  //     }
  //   }
  //   // Bind the event listener
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [wrapperRef]);
  return (
    <tbody
      ref={wrapperRef}
    >
      {dataSource?.map((data: any, index: number) => ((
        <tr
          ref={wrapperRef}
          className={hoverableRow ? styles.tableRow : undefined}
          key={data?.id}
          onClick={() => handleClickedRow(data, index)}
          style={{ cursor: onRowClick ? 'pointer' : '' }}
        >
          {columns
            .map((column, columnIndex) => (
              <td
                // eslint-disable-next-line react/no-array-index-key
                key={columnIndex}
                style={{
                  textAlign: column.align || 'center',
                  background: columnIndex % 2 === 0 ? theme.quaternary : theme.tertiary,
                  backgroundColor: clickedRowIndex === index ? 'rgba(0, 0, 0, 0.075)' : '',
                }}
              >
                {column.render ? column
                  .render(data[column.dataIndex], data, index) : data[column.dataIndex]}
              </td>
            ))}
        </tr>
      )))}
      {!dataSource.length && <tr style={{ textAlign: 'center', opacity: 0.5 }}><td colSpan={columns.length}>{emptyMessage}</td></tr>}
    </tbody>
  );
}

function Footer({ columns, children }: TableProps) {
  return (
    <tfoot style={{ backgroundColor: theme.tertiary, borderTop: '3px solid black' }}>
      <tr>
        <td colSpan={columns.length}>{children}</td>
      </tr>
    </tfoot>
  );
}

function Table({
  dataSource, columns, onRowClick, style, footer, header, hoverableRow, emptyMessage, ref,
  pagination: initialPagination,
}: TableProps) {
  const [selectedPagination, setPagination] = useState(initialPagination);
  // Define table pagination step (e.g 10 elements/page 15 elements/page)
  const paginationSelectData = selectedPagination && initialPagination && Array
    .from( // Math.ceil to avoid having floats
      { length: Math.ceil(dataSource.length / initialPagination) },
      (_, i) => (i + 1) * initialPagination,
    );
  return (
    <div
      className={styles.tableWrapper}
      style={{ ...style, width: '100%', display: 'flex' }}
    >
      <table
        style={{ ...style, width: '100%' }}
      >
        {header && <Header content={header} colSpan={columns.length} />}
        <TableHeader dataSource={dataSource} columns={columns} />
        <Body
          onRowClick={onRowClick}
          dataSource={selectedPagination
            ? dataSource.slice(selectedPagination - (initialPagination || 0), selectedPagination)
            : dataSource}
          hoverableRow={hoverableRow}
          columns={columns}
          emptyMessage={emptyMessage}
          ref={ref}
        />
        {(footer || selectedPagination) && (
        <Footer dataSource={dataSource} columns={columns}>
          {selectedPagination && paginationSelectData && (dataSource.length > initialPagination ? (
            <div style={{ padding: '5px 10px', display: 'flex', justifyContent: 'flex-end' }}>
              <Select
                value={selectedPagination}
                onChange={(value: number) => setPagination(value)}
                data={paginationSelectData}
              />
            </div>
          ) : false)}
          {footer}
        </Footer>
        )}
      </table>
    </div>
  );
}

Table.defaultProps = {
  style: {},
};

export default Table;
