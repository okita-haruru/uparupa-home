"use client";

import React from "react";
import {TableWrapperForKillsRanking} from "./table";

export const TimeRanking = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">小镇的资深居民</h3>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapperForKillsRanking/>
      </div>
    </div>
  );
};
