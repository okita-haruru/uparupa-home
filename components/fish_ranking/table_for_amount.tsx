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
import {columns_for_amount, fetchAmount,fetchTotalAmount} from "./data";
import { RenderCellForAmount } from "./render-cell";
import {FaFilter} from "react-icons/fa6";
import map from "@/app/map/page";

export const TableWrapperForFishAmount = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [method, setMethod] = useState("total");
  const map = new Map();
    map.set("total","总渔获数");
    map.set("size","尺寸大小");
    map.set("amount","渔获数");
  useEffect(() => {
    fetchTotalAmount(page).then(data => {
      setUsers(data);
      setTotal(data.length);
    });
  }, [page]);

  return (

      <div className=" w-full flex flex-col gap-4">
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  <FaFilter/>{map.get(method)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="total" onClick={() => setMethod("total")} >总渔获数</DropdownItem>
                <DropdownItem key="size" onClick={() => setMethod("size")} >尺寸大小</DropdownItem>
                <DropdownItem key="amount" onClick={() => setMethod("amount")} >渔获数</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {method !== "total" && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      {map.get(method)}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="size" onClick={() => setMethod("size")} >尺寸大小</DropdownItem>
                    <DropdownItem key="amount" onClick={() => setMethod("amount")} >渔获数</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
            )}
          </div>
        </div>
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns_for_amount}>
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
                        {RenderCellForAmount({user: item, columnKey: columnKey})}
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
