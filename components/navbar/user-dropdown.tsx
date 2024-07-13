import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import '@/styles/globals.css'; // 导入样式文件
import { DarkModeSwitch } from "./darkmodeswitch";
import { TiHeartFullOutline } from "react-icons/ti";
import {Card, CardBody,CardHeader} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";
import IconWithText from "@/components/icons/icon-with-text";
export const UserDropdown = () => {
  return (
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Avatar
                as="button"
                color="secondary"
                size="md"
                src="https://avatars.githubusercontent.com/u/76481033?v=4"
            />
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
            aria-label="User menu actions"
            onAction={(actionKey) => console.log({ actionKey })}
        >
          <DropdownItem >
            <div className="name" >Haruru_晴留々</div>
          </DropdownItem>
          <DropdownItem>
            <Textarea
                isReadOnly
                label="简介"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Enter your description"
                defaultValue="服主兼插件开发者。希望大家可以在我的服务器玩得愉快。"
                className="max-w-xs"
            />
          </DropdownItem>
          <DropdownItem>
            <IconWithText></IconWithText>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  );
};
