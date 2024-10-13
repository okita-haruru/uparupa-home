import {API_URL} from "@/config/apiconfig";

export const columns_for_size = [
    {name: '排名', uid: 'ranking'},
    {name: '玩家', uid: 'name'},
    {name: '尺寸', uid: 'size'},
];
export const columns_for_amount = [
    {name: '排名', uid: 'ranking'},
    {name: '玩家', uid: 'name'},
    {name: '数量', uid: 'amount'},
];
export const data_for_size = [
    {
        id: 1,
        ranking: 1,
        name: 'Tony Reichert',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        size: 0.00,
    },
];
export const data_for_amount = [
    {
        id: 1,
        ranking: 1,
        name: 'Tony Reichert',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        amount: 0,
    },
];
import axios from 'axios';

interface RecordForAmount {
    ranking: number,
    player_id: string,
    player_name: string,
    avatar: string
    amount: number
}

interface RecordForSize {
    ranking: number,
    player_id: string,
    player_name: string,
    avatar: string
    size: number
}

export function fetchSize(fish: string, page: number = 1) {
    console.log(API_URL + '/ranking/fish/size?fish=' + fish + '&page=' + page);
    return axios.get(API_URL + '/ranking/fish/size?fish=' + fish + '&page=' + page)
        .then(response => {
            if (response.data.code === 200 && response.data.data !== null) {
                return response.data.data.map((data: RecordForSize) => ({
                    id: data.ranking,
                    ranking: data.ranking,
                    name: data.player_name,
                    avatar: data.avatar,
                    size: data.size,
                }));
            } else if (response.data.data == null) {
                return [];
            } else {
                throw new Error('API request failed');
            }
        });
}

export function fetchAmount(fish: string, page: number = 1) {
    return axios.get(API_URL + '/ranking/fish/amount?fish=' + fish + '&page=' + page)
        .then(response => {
            if (response.data.code === 200 && response.data.data !== null) {
                return response.data.data.map((data: RecordForAmount) => ({
                    id: data.ranking,
                    ranking: data.ranking,
                    name: data.player_name,
                    avatar: data.avatar,
                    amount: data.amount,
                }));
            } else if (response.data.data == null) {
                return [];

            } else {
                throw new Error('API request failed');
            }
        });
}

export function fetchTotalAmount(page: number = 1) {
    return axios.get(API_URL + '/ranking/fish/total_amount?page=' + page)
        .then(response => {
            if (response.data.code === 200) {
                return response.data.data.map((data: RecordForAmount) => ({
                    id: data.ranking,
                    ranking: data.ranking,
                    name: data.player_name,
                    avatar: data.avatar,
                    amount: data.amount,
                }));
            } else {
                throw new Error('API request failed');
            }
        });
}

export function fetchFishes() {
    const map = new Map();

    axios.get(API_URL + '/fish')
        .then(response => {
            if (response.data.code === 200) {
                response.data.data.forEach((item: { name: any; key: any; }) => {
                    map.set(item.key, item.name);
                });
            } else {
                throw new Error('API request failed');
            }
        })
        .catch(error => {
            console.error(error);
        });
    return map;
}