import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@nextui-org/react';
import {API_URL} from "@/config/apiconfig";

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

export function TotalOnlinePlayers() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        axios.get(API_URL + '/player_list')
            .then(response => {
                const data: PlayerListData = response.data.data;
                const totalCount = data.lobby.count + data.survival.count;
                setCount(totalCount);
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
            });
    }, []);

    if (count === null) {
        return  <Card className="full-width">
            <h3 className="text-center text-xl font-semibold mt-4 mb-4">总在线玩家：？？？</h3>
        </Card>;
    }

    return (
        <Card className="full-width">
            <h3 className="text-center text-xl font-semibold mt-4 mb-4">总在线玩家：{count}</h3>
        </Card>
    );
}