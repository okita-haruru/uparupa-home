import { Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import {DarkModeSwitch} from "@/components/navbar/darkmodeswitch";
import {ContentBox} from "@/components/navbar/content";
import SearchBox from "@/components/navbar/searchbox";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">

         <SearchBox></SearchBox>
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div className="flex items-center gap-2 max-md:hidden">
            <FeedbackIcon />
            <span>Feedback?</span>
          </div>

          <NotificationsDropdown />

          <div className="max-md:hidden">
            <ContentBox/>
          </div>

          <Link
            href="https://github.com/okita-haruru"
            target={"_blank"}
          >
            <GithubIcon />
          </Link>
          <NavbarContent>
            <DarkModeSwitch />
            {/*<UserDropdown />*/}
            {/*<UserDropdownToy/>*/}
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
