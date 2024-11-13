import { KeyboardEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Badge, Button, Card, CardBody, Input, Listbox, ListboxItem } from '@nextui-org/react';
import { SearchResult } from '@/app/api/searching/route';
import { GoArrowUpRight } from "react-icons/go";
import { FaUser, FaWikipediaW } from "react-icons/fa";

export const SearchBar = () => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
    if (!window) return;

    if (searchResult.type === "wiki") {
      const url = `https://zh.minecraft.wiki/w/${encodeURIComponent(searchResult.text)}`;
      window.open(url, '_blank');
    } else {
      window.open(`/player/${searchResult.text}`);
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
        autoComplete='off'
        isClearable
        fullWidth
        value={keyword}
        type='search'
        onChange={(e) => setKeyword(e.target.value)}
        onClear={() => setKeyword('')}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        // onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder="搜索 玩家 或 Minecraft Wiki..."
      />
      {isOpen && keyword && keyword.length > 0 && (
        <div className="absolute left-0 right-0 mt-2">
          <Card>
            <CardBody className='px-0 max-h-60 overflow-y-auto'>
              <Listbox>
                {searchResults
                  .filter((searchItem) => searchItem.text.toLowerCase().includes(keyword.toLowerCase()))
                  .map((searchItem, index) => (
                    <ListboxItem
                      key={index}
                      className="flex items-center p-2 cursor-pointer gap-3"
                      onClick={(e) => {
                        // Left click
                        if (e.button === 0) {
                          executeSearch(searchItem);
                          setIsOpen(false);
                        }
                      }}
                    >
                      <Button isIconOnly variant='light' onClick={() => setKeyword(searchItem.text)}>
                        <GoArrowUpRight />
                      </Button>
                      {typeof searchItem.icon === 'string' ? (
                        <Badge content={searchItem.type === 'wiki' ? <FaWikipediaW /> : <FaUser />}>
                          <Avatar radius='sm' src={searchItem.icon} alt={searchItem.text} />
                        </Badge>
                      ) : (
                        searchItem.icon
                      )}
                      <span>{searchItem.text}</span>
                    </ListboxItem>
                  ))}
              </Listbox>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
