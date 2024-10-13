"use client";
import Link from "next/link";
import React from "react";
import {HouseIcon} from "@/components/icons/breadcrumb/house-icon";
import {UsersIcon} from "@/components/icons/breadcrumb/users-icon";
import {TableWrapperForKillsRanking} from "./table";

export const TimeRanking = () => {
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
                    <span>肝帝榜</span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">小镇的资深居民</h3>

            <div className="max-w-[95rem] mx-auto w-full">
                <TableWrapperForKillsRanking/>
            </div>
        </div>
    );
};
