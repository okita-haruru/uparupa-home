"use client";

import React from "react";
import {TableWrapperForRichRanking} from "./table";

export const RichRanking = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">是路灯挂件捏</h3>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapperForRichRanking/>
      </div>
    </div>
  );
};
