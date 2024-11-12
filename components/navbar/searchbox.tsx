import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Card, Dropdown, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { SearchResult } from '@/app/api/searching/route';
import { GoArrowUpRight } from "react-icons/go";

const startsWith = (value: string, input: string) => {
    return value.toLowerCase().startsWith(input.toLowerCase()) && input.length > 0;
};

interface PlayerInfo {
    uuid: string;
    name: string;
    avatar: string;
}

interface Player {
    ranking: number;
    playerInfo: PlayerInfo;
    balance: number;
}

export const SearchBar = () => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const query = (event.currentTarget as HTMLInputElement).value.trim(); // 获取输入框的值，并去除首尾空格
            if (query) {
                executeSearch({
                    text: query,
                    type: "wiki",
                    icon: ""
                });
            }
        }
    };

    const executeSearch = (searchResult: SearchResult) => {
        if (searchResult.type === "wiki") {
            const url = `https://zh.minecraft.wiki/w/${encodeURIComponent(searchResult.text)}`;
            if (typeof window !== 'undefined') {
                window.open(url, '_blank');
            }
        }
    }

    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        keyword && keyword.length > 0 && axios.get('/api/searching?keyword=' + keyword)
            .then(resp => {
                console.log(resp.data);
                return resp.data.data as SearchResult[];
            })
            .then(data => {
                const results = data.map(item => ({
                    text: item.text,
                    type: item.type,
                    icon: item.icon
                }));
                setSearchResults([...results]);
            })
    }, [keyword])

    return (
        <div className="relative w-full">
            <Input
                isClearable
                fullWidth
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onClear={() => setKeyword('')}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                placeholder="搜索 玩家 或 Minecraft Wiki..."
            />
            {isOpen && keyword && keyword.length > 0 && (
                <Card className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto">
                    <ul className="rounded">
                        {searchResults
                            .filter((searchItem) => searchItem.text.toLowerCase().includes(keyword.toLowerCase()))
                            .map((searchItem, index) => (
                                <li
                                    key={index}
                                    className="flex items-center p-2 cursor-pointer gap-3"
                                    onMouseDown={() => {
                                        executeSearch(searchItem);
                                        setIsOpen(false);
                                    }}
                                >
                                    <Button isIconOnly variant='light' onClick={() => setKeyword(searchItem.text)}>
                                        <GoArrowUpRight />
                                    </Button>
                                    {typeof searchItem.icon === 'string' ? (
                                        <Avatar radius='sm' src={searchItem.icon} alt={searchItem.text} />
                                    ) : (
                                        searchItem.icon
                                    )}
                                    <span>{searchItem.text}</span>
                                </li>
                            ))}
                    </ul>
                </Card>
            )}
        </div>
    );
};

export default SearchBar;
