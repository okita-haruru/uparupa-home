import { Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { GithubIcon } from "../icons/navbar/github-icon";
import { BurguerButton } from "./burguer-button";
import { DarkModeSwitch } from "@/components/navbar/darkmodeswitch";
import { SearchBar } from "@/components/navbar/searchbar";
import { SiMinecraft } from "react-icons/si";

interface Props {
    children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
    return (
        <div className="relative flex flex-col flex-1 overflow-y-scroll overflow-x-hidden max-h-dvh">
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
                    <SearchBar></SearchBar>
                </NavbarContent>
                <NavbarContent justify="end" className="w-fit data-[justify=end]:flex-grow-0">
                    <div className="flex items-center gap-2 max-md:hidden">
                        <SiMinecraft size={140} />
                    </div>
                    <Link href="https://github.com/Ave-CRYCHIC" target={"_blank"}>
                        <GithubIcon />
                    </Link>
                    <NavbarContent>
                        <DarkModeSwitch />
                    </NavbarContent>
                </NavbarContent>
            </Navbar>
            {children}
        </div>
    );
};
