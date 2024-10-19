"use client";

import React from "react";
import {TableWrapper} from "./table";

export const FishRanking = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">看看我又钓到了什么？</h3>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper/>
      </div>
    </div>
  );
};
