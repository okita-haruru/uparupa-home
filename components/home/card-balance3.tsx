import {Card, CardBody} from "@nextui-org/react";
import React from "react";
import {navigateUpdateLog} from "@/app/client-redirect";
import {LuFileClock} from "react-icons/lu";

export const CardBalance3 = () => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full select-none" isPressable onPress={() => navigateUpdateLog()}>
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <LuFileClock className='my-auto' size={30}/>
          <div className="flex flex-col">
            <span className="text-white">当前版本:ver.1.0</span>
            <span className="text-white text-xs">点击查看更新日志</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
