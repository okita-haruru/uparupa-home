'use client';

import { PlayerInfo } from '@/app/api';
import { Button, Card, CardBody, CardFooter, Chip, Image, Skeleton, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { SkinViewer, WalkingAnimation } from 'skinview3d';
import { FaCheckCircle as OnlineIcon, FaTimesCircle as OfflineIcon, FaCrown, FaSkull } from "react-icons/fa";
import { GiSkeleton } from 'react-icons/gi';


export interface PlayerProps {
  name: string;
}

export const Player = ({ name }: PlayerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPlayerData = () => {
    setLoading(true);
    console.log(name);
    axios.get(`/api/player?username=${name}`).then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return {};
      }
    }).then(data => {
      const playerInfo = data.data.data as PlayerInfo;
      console.log("PlayerInfo", playerInfo);
      setPlayerInfo(playerInfo);
      setLoading(false);
    })
  }

  useEffect(() => {
    loadPlayerData();
  }, [name])

  useEffect(() => {
    setLoading(true);
    if (!canvasRef.current) return;

    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width: 300,
      height: 400,
    });

    viewer.loadSkin(`https://mc-heads.net/skin/${name}`);
    viewer.background = '#39C5BB';
    viewer.autoRotate = true;
    viewer.autoRotateSpeed = 0.5
    viewer.zoom = 0.6
    viewer.fov = 10;
    viewer.animation = new WalkingAnimation();

    setLoading(false);
    return () => {
      viewer.dispose();
    };
  }, [name]);

  return (
    <div className="h-full w-full">
      <Card className='w-fit max-w-fit my-auto'>
        <CardBody className='p-0'>
          <Skeleton isLoaded={!loading} className='h-fit w-fit'>
            <div className="relative">
              <Card className="absolute top-0 left-0 m-2 p-1 bg-default-500 rounded select-none">
                <ul className='flex flex-col gap-1'>
                  <li className='flex flex-row items-center gap-1'>
                    <FaSkull />
                    <span>{playerInfo?.states.death.value}</span>
                    <span>#{playerInfo?.states.death.rank}</span>
                  </li>
                </ul>
              </Card>
              <canvas ref={canvasRef} width={300} height={400} />
            </div>
          </Skeleton>
        </CardBody>
        <CardFooter className='flex select-none justify-between'>
          <div className='flex flex-col'>
            <span className='text-medium'>{name}</span>
            <div className='flex flex-row gap-1 text-sm text-default-500'>
              <span className='text-pink-500'>❀{playerInfo?.states.balance.value}</span>
              <span>#{playerInfo?.states.balance.rank}</span>
              <div className='h-fit my-auto'>
                {playerInfo?.states.balance.rank === 1 && <FaCrown className='text-yellow-500' />}
                {playerInfo?.states.balance.rank === 2 && <FaCrown className='text-gray-500' />}
                {playerInfo?.states.balance.rank === 3 && <FaCrown className='text-yellow-800' />}
              </div>
            </div>
          </div>
          <Tooltip content={playerInfo && !playerInfo.isOnline ? `上次在线：${new Date(playerInfo?.lastSeen * 1000).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}` : ''}>
            <Chip variant='shadow'
              color={playerInfo == null ? 'warning' : playerInfo?.isOnline ? "success" : "danger"}
              startContent={playerInfo?.isOnline ? <OnlineIcon /> : <OfflineIcon />}>
              {playerInfo == null ? '加载中' : playerInfo?.isOnline ? "在线" : `离线`}
            </Chip>
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  );
}
