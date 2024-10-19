"use client"
import {FC, useEffect, useState} from "react";
import {Card, CardBody, CardHeader, Spinner} from "@nextui-org/react";
import {CardFooter} from "@nextui-org/card";

interface WhatsNewData {
  version: string,
  ['release-date']: string,
  items: WhatsNewItem[]
}

interface WhatsNewItem {
  title: string;
  details: string[];
}

export const WhatsNew: FC = () => {
  const [whatsNewData, setWhatsNewData] = useState<WhatsNewData[]>([])

  useEffect(() => {
    fetch("/api/changelog", {cache: 'no-store'})
      .then(async resp => {
        setWhatsNewData(await resp.json());
      })
  }, [])

  return (
    <div className='flex flex-col lg:px-6 sm:pt-4'
         style={{alignItems: 'center', height: '100vh', maxHeight: '100vh'}}>
      <h1 className='select-none'>更新日志</h1>
      <p className='select-none'>这是我们项目的更新日志，你可以在这里查看我们每个版本的更新内容。</p>
      <div id='log-container' className='w-full'>
        {
          whatsNewData.length === 0 && (
            <div className='m-auto flex gap-2'>
              <Spinner id='spinner'/>
              <span className='select-none my-auto'>少女折寿中......</span>
            </div>
          )
          || whatsNewData.map(value => {
            return (
              <Card key={value.version} className='h-fit my-3 mx-1'>
                <CardHeader className='px-3 py-1.5'>
                  <h2 className='font-bold'>{value.version}</h2>
                </CardHeader>
                <CardBody className='px-3 py-0 h-fit overflow-auto'>
                  {
                    value.items.map((whatsNewItem, index) => {
                      return (
                        <div key={`news-${index}`}>
                          <span>{whatsNewItem.title}</span>
                          <div className='flex flex-col'>
                            {
                              whatsNewItem.details.map((detail, detailIndex) => {
                                return (
                                  <span className='ml-2' key={`detail-${index}-${detailIndex}`}>- {detail}</span>
                                )
                              })
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </CardBody>
                <CardFooter className='py-1'>
                  <span className='select-none text-sm ml-auto'>
                    更新日期:
                    <span className='font-medium'>{value["release-date"]}</span>
                  </span>
                </CardFooter>
              </Card>
            )
          })
        }
      </div>
    </div>
  );
};
