"use client"
import {FC, useEffect, useState} from "react";
import {Card, Spinner} from "@nextui-org/react";

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
    fetch("./api/changelog")
      .then(async resp => {
        setWhatsNewData(await resp.json());
      })
  }, [])

  return (
    <div className='flex lg:px-6 sm:pt-4'
         style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', maxHeight: '100vh'}}>
      <h1 className='select-none'>更新日志</h1>
      <p className='select-none'>这是我们项目的更新日志，你可以在这里查看我们每个版本的更新内容。</p>
      <div id='log-container' className='flex flex-col' style={{width: '100%', overflow: 'auto', height: '100%'}}>
        {
          whatsNewData.length === 0 && <div className='m-auto flex gap-2'>
                <Spinner id='spinner'/>
                <span className='select-none my-auto'>少女折寿中......</span>
            </div>
          || whatsNewData.map(value => {
            return (
              <Card key={value.version} style={{margin: '20px', padding: '20px'}}>
                <h2>版本：{value.version}</h2>
                <h3>更新日期: {value["release-date"]}</h3>
                {
                  value.items.map((whatsNewItem, index) => {
                    return (
                      <div key={`news-${index}`}>
                        <span>{whatsNewItem.title}</span>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          {
                            whatsNewItem.details.map((detail, detailIndex) => {
                              return (
                                <span key={`detail-${index}-${detailIndex}`}>- {detail}</span>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </Card>
            )
          })
        }
      </div>
    </div>
  );
};
