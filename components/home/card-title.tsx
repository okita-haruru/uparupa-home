import React from "react";
import {AcmeIcon} from "@/components/icons/acme-icon";

export const CardTitle = () => {
  return (
    // <div className="flex items-center gap-4">
    //   <AcmeIcon/>
    //   <div className="flex flex-col gap-4">
    //     <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
    //       乌帕鲁帕小镇
    //     </h3>
    //     <span className="text-xs font-medium text-default-500">
    //       123123
    //     </span>
    //   </div>
    // </div>
    <div className="flex items-center gap-4">
      <AcmeIcon/>
      <div  className="flex flex-col gap-4 select-none">
        <h3 className="text-xl font-semibold m-0 text-default-900 whitespace-nowrap f">
          乌帕鲁帕小镇
        </h3>
      </div>
    </div>
  );
};
