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
import { DarkModeSwitch } from "./darkmodeswitch";
import {Textarea} from "@nextui-org/input";
import IconWithText from "@/components/icons/icon-with-text";

export const UserDropdownToy = () => {
  return (
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Avatar
                as="button"
                color="secondary"
                size="md"
                src="https://avatars.githubusercontent.com/u/61079983?v=4"
            />
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
            aria-label="User menu actions"
            onAction={(actionKey) => console.log({ actionKey })}
        >
          <DropdownItem >
            <div className="name" >Stuffed_Toy</div>
          </DropdownItem>
          <DropdownItem>
            <Textarea
                isReadOnly
                label="简介"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Enter your description"
                defaultValue="主城建筑师，贴图画师。"
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
