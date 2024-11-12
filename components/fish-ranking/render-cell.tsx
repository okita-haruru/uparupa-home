import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { data_for_size,data_for_amount } from "./data";

interface PropsForSize {
  user: (typeof data_for_size)[number];
  columnKey: string | React.Key;
}
interface PropsForAmount {
    user: (typeof data_for_amount)[number];
    columnKey: string | React.Key;
}



export const RenderCell = ({ user, columnKey }: PropsForAmount) => {
    // @ts-ignore
    const cellValue = user[columnKey];
    switch (columnKey) {
        case "name":
            return (
                <User
                    avatarProps={{
                        src: user.avatar,
                        className: 'square-avatar'
                    }}
                    name={cellValue}
                >
                </User>
            );

        default:
            return cellValue;
    }
};

