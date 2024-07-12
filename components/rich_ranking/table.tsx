import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {Pagination} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {columns, fetchUsers} from "./data";
import { RenderCellForRichRanking } from "./render-cell";

export const TableWrapperForRichRanking = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1); // 新增

  useEffect(() => {
    fetchUsers(page).then(data => { // 使用 page 变量
      setUsers(data);
      setTotal(data.length);
    });
  }, [page]); // 添加 page 作为依赖项

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>
                  {RenderCellForRichRanking({ user: item, columnKey: columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination total={total/20+1} initialPage={1} className="pagination-center" onChange={(newPage) => setPage(newPage)} />
    </div>
  );
};
