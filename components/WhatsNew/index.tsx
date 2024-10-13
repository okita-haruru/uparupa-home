"use client"
import {FC, useEffect, useState} from "react";
import {Card} from "@nextui-org/react";
import axios from "axios";

interface Update {
  version: string;
  date: string;
  content: string;
}

const testData: Update[] = [
  {
    version: '1.0.0',
    date: '2022-01-01',
    content: 'Initial release\n- Feature A\n- Feature B',
  },
  {
    version: '1.1.0',
    date: '2022-02-01',
    content: 'Added feature C\n- Updated feature A\n- Fixed bug in feature B',
  },
  {
    version: '1.1.1',
    date: '2022-02-15',
    content: 'Bug fixes\n- Fixed bug in feature C',
  },
];


interface WhatsNewData {
  version: string,
  ['release-date']: string,
  items: WhatsNewItem[]
}

interface WhatsNewItem {
  title: string;
  details: string[];
}

const whatsNewDataPromise = fetch("https://raw.githubusercontent.com/Ave-CRYCHIC/uparupa-whatsnew/refs/heads/main/whatsnew.json")

export const WhatsNew: FC = () => {
  const [whatsNewData, setWhatsNewData] = useState<WhatsNewData[]>([])

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Ave-CRYCHIC/uparupa-whatsnew/refs/heads/main/whatsnew.json")
      .then(async resp => {
        setWhatsNewData(await resp.json());
      })
  })

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh'}}>
      <h1>更新日志</h1>
      <p>这是我们项目的更新日志，你可以在这里查看我们每个版本的更新内容。</p>
      <div style={{maxWidth: '1500px', width: '100%', overflow: 'auto'}}>
        {
          whatsNewData.map(value => {
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
