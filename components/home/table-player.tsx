import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {User, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from '@nextui-org/react';
import {API_URL} from "@/config/apiconfig";
import {Spinner} from "@nextui-org/react";

interface Player {
  ping: number;
  name: string;
  uuid: string;
  avatar: string;
}

interface Data {
  lobby: {
    players: Player[];
    count: number;
  };
  survival: {
    players: Player[];
    count: number;
  };
}

// 数据转换函数
function transformData(data: Data, type: 'lobby' | 'survival') {
  const transformedData: { num: number; name: string; avatar: string; }[] = [];

  if (data[type].players !== null) {
    data[type].players.forEach((player: Player, index) => {
      transformedData.push({
        num: index + 1,
        name: player.name,
        avatar: player.avatar,
      });
    });
  }

  return transformedData;
}

// 表格组件
export function PlayerTable({type}: { type: 'lobby' | 'survival' }) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    axios.get(API_URL + '/player_list')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }, [type]);

  if (!data) {
    return <div className="mt-4 mb-4" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Spinner size="lg" label="加载中..." color="primary"/>
    </div>;
  }

  const transformedData = transformData(data, type);

  if (transformedData.length === 0) {
    return (
      <div>
        <h5 className="text-center text-m font-semibold mt-4 mb-4 select-none">暂无玩家捏</h5>
      </div>
    );
  }

  return transformedData.length === 0 &&
      <div><h5 className="text-center text-m font-semibold mt-4 mb-4 select-none">暂无玩家捏</h5></div>
    ||
      <Table aria-label="Player table">
          <TableHeader>
              <TableColumn className="equal-width select-none">序号</TableColumn>
              <TableColumn className="equal-width select-none">玩家</TableColumn>
          </TableHeader>
          <TableBody>
            {transformedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className='select-none'>{row.num}</TableCell>
                <TableCell>
                  <User avatarProps={{src: row.avatar, className: 'square-avatar select-none'}} name={row.name}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>;
}