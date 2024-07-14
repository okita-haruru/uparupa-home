"use client";
import Link from "next/link";
import React from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { TableWrapperForFishAmount } from "./table_for_amount";
import {Button, Input} from "@nextui-org/react";
import {SettingsIcon} from "@/components/icons/sidebar/settings-icon";
import {TrashIcon} from "@/components/icons/accounts/trash-icon";
import {InfoIcon} from "@/components/icons/accounts/info-icon";
import {DotsIcon} from "@/components/icons/accounts/dots-icon";
import {ExportIcon} from "@/components/icons/accounts/export-icon"
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
export const FishRanking = () => {
    return (
        <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <ul className="flex">
                <li className="flex gap-2">
                    <HouseIcon/>
                    <Link href={"/"}>
                        <span>主页</span>
                    </Link>
                    <span> / </span>{" "}
                </li>

                <li className="flex gap-2">
                    <UsersIcon/>
                    <span>排行榜</span>
                    <span> / </span>{" "}
                </li>
                <li className="flex gap-2">
                    <span>钓鱼佬榜</span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">看看我又钓到了什么？</h3>

            <div className="max-w-[95rem] mx-auto w-full">
                <TableWrapperForFishAmount/>
            </div>
        </div>
    );
};
