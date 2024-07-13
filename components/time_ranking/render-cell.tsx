import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { playTime } from "./data";

interface Props {
  user: (typeof playTime)[number];
  columnKey: string | React.Key;
}

export const RenderCellForPlayTimeRanking = ({ user, columnKey }: Props) => {
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
