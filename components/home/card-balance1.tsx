import { Card, CardBody } from "@nextui-org/react";
import React, {useEffect, useState} from "react";
// import { Community } from "../icons/community";
import { BsFillHousesFill } from "react-icons/bs";
import {Spinner} from "@nextui-org/react";
import { BiServer } from "react-icons/bi";
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

    // console.log("cooooooooooode"+code);

    if (code === 501) {//服务器寄了
        return   <Card className="xl:max-w-sm bg-warning rounded-xl shadow-md px-3 w-full">
            <CardBody className="py-5 overflow-hidden">
                <div className="flex gap-2.5">
                    <BsFillHousesFill size={25} />
                    <div className="flex flex-col">
                        <span className="text-white">小镇状态：修缮中</span>
                        {/*<span className="text-white text-xs">已启动 114514</span>*/}
                        {/*<span className="text-white text-xs">1311 位玩家在线</span>*/}

                    </div>
                </div>
            </CardBody>
        </Card>
    }
    if (code === 200) {
        return  <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
            <CardBody className="py-5 overflow-hidden">
                <div className="flex gap-2.5">
                    <BsFillHousesFill size={25} />
                    <div className="flex flex-col">
                        <span className="text-white">小镇状态：营业中</span>
                        <span className="text-white text-xs">{count} 位公民在线</span>

                    </div>
                </div>
            </CardBody>
        </Card>
    }
    if (code === 502) {
        return   <Card className="xl:max-w-sm bg-danger rounded-xl shadow-md px-3 w-full">
            <CardBody className="py-5 overflow-hidden">
                <div className="flex gap-2.5">
                    <BsFillHousesFill size={25} />
                    <div className="flex flex-col">
                        <span className="text-white">小镇状态：你服炸了</span>
                        {/*<span className="text-white text-xs">已启动 12h12m</span>*/}
                        {/*<span className="text-white text-xs">1311 位玩家在线</span>*/}

                    </div>
                </div>
            </CardBody>
        </Card>
    }
    return (
    <Card className="xl:max-w-sm bg-default rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <BsFillHousesFill size={25} />
            <div className="flex flex-col">
                <span className="text-white">小镇状态：
                <Spinner size="sm"/></span>
                {/*<span className="text-white text-xs">已启动 12h12m</span>*/}
                {/*<span className="text-white text-xs">1311 位玩家在线</span>*/}

            </div>
        </div>
      </CardBody>
    </Card>
  );
};
