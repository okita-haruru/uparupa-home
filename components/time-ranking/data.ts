import {API_URL} from "@/config/apiconfig";

export const columns = [
   {name: '排名', uid: 'ranking'},
   {name: '玩家', uid: 'name'},
   {name: '总在线时长', uid: 'play_time'},
   {name: '最后登录', uid: 'last_login'},
   {name: '首次游玩', uid: 'first_login'},

];
export const playTime = [
   {
       id: 1,
       ranking: 1,
       name: 'Tony Reichert',
       avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
       play_time: "",
       last_login: "2021-10-10 10:10:10",
       first_login: "2021-10-10 10:10:10",
   },
];
import axios from 'axios';

interface Player {
    ranking: number,
    player_id: string,
    player_name: string,
    play_time: string,
    last_login: string,
    first_login: string,
    avatar: string
}

export function fetchPlayTime(page: number = 1) {
    return axios.get(API_URL+'/ranking/play_time?page='+page)
        .then(response => {
            if (response.data.code === 200) {
                return response.data.data.map((player: Player) => ({
                    id: player.ranking,
                    ranking: player.ranking,
                    name: player.player_name,
                    avatar: player.avatar,
                    play_time: player.play_time,
                    last_login: player.last_login,
                    first_login: player.first_login,
                }));
            } else {
                throw new Error('API request failed');
            }
        });
}