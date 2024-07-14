import {
  Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
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
import {columns_for_size,fetchSize} from "./data";
import { RenderCellForSize } from "./render-cell";

export const TableWrapperForFishSize = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [fish, setFish] = useState("fish");
  useEffect(() => {
    fetchSize(fish,page).then(data => {
      setUsers(data);
      setTotal(data.length);
    });
  }, [page]);

  return (

      <div className=" w-full flex flex-col gap-4">
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns_for_size}>
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
                        {RenderCellForSize({user: item, columnKey: columnKey})}
                      </TableCell>
                  )}
                </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination total={total / 20 + 1} initialPage={1} className="pagination-center"
                    onChange={(newPage) => setPage(newPage)}/>
      </div>
  );
};
