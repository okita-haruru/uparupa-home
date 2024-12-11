import {Card, CardBody, Spinner} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {navigateUpdateLog} from "@/app/client-redirect";
import {LuFileClock} from "react-icons/lu";

export interface WhatsNewData {
  version: string,
  ['release-date']: string,
  items: WhatsNewItem[]
}

export interface WhatsNewItem {
  title: string;
  details: string[];
}

export const CardVersion = () => {
  const [whatsNewData, setWhatsNewData] = useState<WhatsNewData[]>([])

  useEffect(() => {
    fetch("/api/changelog", {cache: 'no-store'})
        .then(async resp => {
          setWhatsNewData(await resp.json());
        })
  }, [])

  return (
      whatsNewData.length === 0 && (
          <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full select-none"
                isPressable
                onPress={() => navigateUpdateLog()}
          >
            <CardBody className="py-5 gap-2.5 flex-row">
              <LuFileClock className='my-auto' size={30}/>
              <div className="flex flex-col">
                <span className="text-white">当前版本:加载中</span>
                <span className="text-white text-xs">点击查看更新日志</span>
              </div>
            </CardBody>
          </Card>
      )
      ||
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full select-none"
          isPressable
          onPress={() => navigateUpdateLog()}
    >
      <CardBody className="py-5 gap-2.5 flex-row">
        <LuFileClock className='my-auto' size={30}/>
        <div className="flex flex-col">
          <span className="text-white">当前版本:{whatsNewData[0].version}</span>
          <span className="text-white text-xs">点击查看更新日志</span>
        </div>
      </CardBody>
    </Card>
  );
};
