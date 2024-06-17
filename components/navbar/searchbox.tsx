import React from 'react';
import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import { SearchIcon } from "../icons/searchicon";

const MyComponent = () => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const query = (event.currentTarget as HTMLInputElement).value.trim(); // 获取输入框的值，并去除首尾空格
            if (query) {
                const url = `https://zh.minecraft.wiki/w/${encodeURIComponent(query)}`;
                window.open(url, '_blank');
            }
        }
    };

    return (
        <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
                input: "w-full",
                mainWrapper: "w-full",
            }}
            placeholder="搜索都内置了你不得用一下？"
            onKeyDown={handleKeyDown}
        />
    );
};

export default MyComponent;
