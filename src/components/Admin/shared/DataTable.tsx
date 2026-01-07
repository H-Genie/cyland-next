import React from "react";
import * as Style from "../Admin.styles";

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface TableAction {
  label: string | ((item: any) => string);
  type: "edit" | "delete" | "view";
  onClick: (item: any) => void;
}

interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
  statusColumn?: {
    key: string;
    activeValue?: any;
    inactiveValue?: any;
    onClick?: (item: any) => void;
  };
}

export default function DataTable({
  columns,
  data,
  actions = [],
  statusColumn
}: DataTableProps) {
  return (
    <Style.DataTable>
      <Style.TableHeader>
        {columns.map(column => (
          <th key={column.key} style={{ width: column.width }}>
            {column.label}
          </th>
        ))}
        {actions.length > 0 && <th>작업</th>}
      </Style.TableHeader>
      <Style.TableBody>
        {data.map((item, index) => (
          <tr key={item.id || index}>
            {columns.map(column => (
              <td key={column.key}>
                {statusColumn && column.key === statusColumn.key ? (
                  <Style.StatusBadge
                    active={item[column.key] === statusColumn.activeValue}
                    onClick={() => statusColumn.onClick?.(item)}
                    style={{ cursor: statusColumn.onClick ? "pointer" : "default" }}
                  >
                    {item[column.key] === statusColumn.activeValue
                      ? "활성"
                      : "비활성"}
                  </Style.StatusBadge>
                ) : (
                  item[column.key]
                )}
              </td>
            ))}
            {actions.length > 0 && (
              <td>
                {actions.map((action, actionIndex) => (
                  <Style.ActionButton
                    key={actionIndex}
                    edit={action.type === "edit"}
                    delete={action.type === "delete"}
                    onClick={() => action.onClick(item)}
                  >
                    {typeof action.label === "function"
                      ? action.label(item)
                      : action.label}
                  </Style.ActionButton>
                ))}
              </td>
            )}
          </tr>
        ))}
      </Style.TableBody>
    </Style.DataTable>
  );
}

