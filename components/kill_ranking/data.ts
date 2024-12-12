import {API_URL} from "@/config/apiconfig";

export const columns = [
   {name: '排名', uid: 'ranking'},
   {name: '玩家', uid: 'name'},
   {name: '坚守者', uid: 'warden_kills'},
   {name: '末影龙', uid: 'ender_dragon_kills'},
   {name: '凋零', uid: 'wither_kills'},
   {name: '远古守卫者', uid: 'ancient_guardian_kills'},
   {name: '幻翼', uid: 'phantom_kills'},
   {name: '猪灵蛮兵', uid: 'piglin_brute_kills'},
   {name: '总击杀数', uid: 'total_kills'},

];
export const kills = [
   {
       id: 1,
       ranking: 1,
       name: 'Tony Reichert',
       avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
       warden_kills: '0',
       ender_dragon_kills: '0',
       wither_kills: '0',
       ancient_guardian_kills: '0',
       phantom_kills: '0',
       piglin_brute_kills: '0',
       total_kills: '0',
   },
];
import axios from 'axios';

interface Player {
    ranking: number,
    player_id: string,
    player_name: string,
    ancient_guardian_kills: number,
    phantom_kills: number,
    piglin_brute_kills: number,
    ender_dragon_kills: number,
    wither_kills: number,
    warden_kills: number,
    total_kills: number,
    avatar: string
}

export function fetchKills(method: string = "total",page: number = 1) {
    return axios.get(API_URL+'/ranking/kills/'+method+'?page='+page)
        .then(response => {
            if (response.data.code === 200) {
                return response.data.data.map((player: Player) => ({
                    id: player.ranking,
                    ranking: player.ranking,
                    name: player.player_name,
                    avatar: player.avatar,
                    warden_kills: player.warden_kills,
                    ender_dragon_kills: player.ender_dragon_kills,
                    wither_kills:  player.wither_kills,
                    ancient_guardian_kills: player.ancient_guardian_kills,
                    phantom_kills: player.phantom_kills,
                    piglin_brute_kills: player.piglin_brute_kills,
                    total_kills: player.total_kills,
                }));
            } else {
                throw new Error('API request failed');
            }
        });
}