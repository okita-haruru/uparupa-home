import {Card, CardBody} from "@nextui-org/react";
import React from "react";
// import { Community } from "../icons/community";
import {Link} from "@nextui-org/link";
import {FaDropbox} from "react-icons/fa";

export const CardBalance3 = () => {
    return (
        <Link href="/update-log">
            <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
                <CardBody className="py-5">
                    <div className="flex gap-2.5">
                        <FaDropbox size={25}/>
                        <div className="flex flex-col">
                            <span className="text-white">当前版本:ver.1.0</span>
                            <span className="text-white text-xs">点击查看更新日志</span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
};
