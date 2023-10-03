import React from "react";

import Select from "../Select/Select.component";
import { ColumnProps, HeaderProps, TableProps } from "./Table.props";
import { useWindowSize } from "../../hooks";
import { COLORS } from "../../theme/colors";

import "./Table.style.scss";

function Header({ content, colSpan }: HeaderProps) {
  return (
    <thead className='headerWrapper'>
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
                style={{ background: COLORS.LIGHT_GREEN_FULL, padding: '5px 10px', fontSize: isSmallScreen ? '12px' : '' }}
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
  const [clickedRowIndex, setClickedRowIndex] = React.useState<number | undefined>(undefined);
  function handleClickedRow(data: Record<string, string>, index: number | undefined) {
    if (onRowClick) {
      onRowClick(clickedRowIndex !== undefined ? {} : data);
      setClickedRowIndex(clickedRowIndex !== undefined ? undefined : index);
    }
  }
  const wrapperRef = React.useRef<any>(null);
  return (
    <tbody
      ref={wrapperRef}
    >
      {dataSource?.map((data: any, index: number) => ((
        <tr
          ref={wrapperRef}
          className={hoverableRow ? 'tableRow' : undefined}
          key={data?.id}
          onClick={() => handleClickedRow(data, index)}
          style={{ cursor: onRowClick ? 'pointer' : '' }}
        >
          {columns
            .map((column, columnIndex) => (
              <td
                // eslint-disable-next-line react/no-array-index-key
                key={columnIndex}
                className={clickedRowIndex === index ? 'clickedRow' : undefined}
                style={{
                  textAlign: column.align || 'center',
                  background: columnIndex % 2 === 0 ? COLORS.WHITE : COLORS.LIGHT_GREEN_FULL,
                  backgroundColor: clickedRowIndex === index ? 'rgba(0, 0, 0, 0.075)' : '',
                  padding: '0.4rem 1rem',
                }}
              >
                {column.render ? column
                  .render(data[column.dataIndex], data, index) : data[column.dataIndex]}
              </td>
            ))}
        </tr>
      )))}
      {!dataSource.length && (
        <tr style={{ textAlign: 'center', opacity: 0.5, height: '1rem' }}>
          <td colSpan={columns.length}>{emptyMessage}</td>
        </tr>
      )}
    </tbody>
  );
}

function Footer({ columns, children }: TableProps) {
  return (
    <tfoot style={{ backgroundColor: COLORS.LIGHT_GREEN_FULL, borderTop: '3px solid black' }}>
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
  const [selectedPagination, setPagination] = React.useState(initialPagination);
  // Define table pagination step (e.g 10 elements/page 15 elements/page)
  const paginationSelectData = selectedPagination && initialPagination && Array
    .from( // Math.ceil to avoid having floats
      { length: Math.ceil(dataSource.length / initialPagination) },
      (_, i) => (i + 1) * initialPagination,
    );
  return (
    <div
      className='tableWrapper'
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
            {selectedPagination && paginationSelectData && (dataSource.length > initialPagination
              ? (
                <div style={{ padding: '5px 10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Select
                    value={selectedPagination}
                    onChange={(value: number) => setPagination(value)}
                    data={paginationSelectData.map((pages) => ({ label: pages, value: pages }))}
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
