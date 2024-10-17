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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh'}}>
      <h1>更新日志</h1>
      <p>这是我们项目的更新日志，你可以在这里查看我们每个版本的更新内容。</p>
      <div style={{maxWidth: '1500px', width: '100%', overflow: 'auto'}}>
        {
           <Spinner></Spinner> || whatsNewData.map(value => {
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
