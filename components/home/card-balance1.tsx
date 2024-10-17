import {Card, CardBody} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {BsFillHousesFill} from "react-icons/bs";
import axios from "axios";
import {API_URL} from "@/config/apiconfig";

export const CardBalance1 = () => {
  const [count, setCount] = useState<number | null>(null);
  const [code, setCode] = useState<number | null>(null);

  interface PlayerListData {
    lobby: {
      players: Player[];
      count: number;
    };
    survival: {
      players: Player[];
      count: number;
    };
  }

  interface Player {
    ping: number;
    name: string;
    uuid: string;
    avatar: string;
  }

  useEffect(() => {
    axios.get(API_URL + '/player_list')
      .then(response => {
        // console.log("res-code"+response.status); // 打印状态码
        const data: PlayerListData = response.data.data;
        setCode(response.status);
        const totalCount = data.lobby.count + data.survival.count;
        setCount(totalCount);
      })
      .catch(error => {
        if (error.response) {
          const status = error.response.status;
          setCode(status);
        } else {
          // 设置一个默认的状态码
          setCode(502);
        }
        if (error.code === 'ECONNABORTED') {
          setCode(401);
          console.error('Request timed out:', error);
        } else {
          console.error('Failed to fetch data:', error);
        }
      });
  }, []);

  return <Card
    className={`${
      code === 501 && 'bg-warning' ||
      code === 200 && 'bg-success' ||
      code === 502 && 'bg-danger' || 'bg-default'
    } xl:max-w-sm rounded-xl shadow-md px-3 w-full`}>
    <CardBody className="py-5 overflow-hidden">
      <div className="flex gap-2.5" style={{userSelect: 'none'}}>
        <BsFillHousesFill style={{marginTop: 'auto', marginBottom: 'auto'}} size={30}/>
        <div className="flex flex-col">
          <span className="text-white">
            {code === 501 && "小镇状态：修缮中" || code === 200 && "小镇状态：营业中" || code === 502 && "小镇状态：你服炸了"}
          </span>
          {code === 200 && <span className="text-white text-xs">{count} 位公民在线</span>}
        </div>
      </div>
    </CardBody>
  </Card>
};
