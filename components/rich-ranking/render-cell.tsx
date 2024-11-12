import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { users } from "./data";

interface Props {
  user: (typeof users)[number];
  columnKey: string | React.Key;
}

export const RenderCellForRichRanking = ({ user, columnKey }: Props) => {
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
