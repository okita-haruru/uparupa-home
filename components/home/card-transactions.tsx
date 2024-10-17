import {Avatar, Card, CardBody} from "@nextui-org/react";
import React from "react";

const items = [
    {
        name: "Okita_Haruru",
        picture: "https://avatars.githubusercontent.com/u/76481033?v=4",
        amount: "23.18 USD",
        date: "9/30/2024",
    },
];

export const CardTransactions = () => {
    return (
        <Card className="bg-default-50 rounded-xl shadow-md px-3 overflow-x-hidden select-none">
            <CardBody className="py-5 gap-4">
                <div className="flex gap-2.5 justify-center">
                    <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
                        <span className="text-default-900 text-xl font-semibold">💰赞助者</span>
                    </div>
                </div>
                <div className="flex flex-col gap-6 overflow-auto max-h-[24rem]">
                    {items.map((item) => (
                        <div key={item.name} className="flex items-center w-full">
                            <div className="flex justify-center items-center m-1">
                                <Avatar
                                    isBordered
                                    color="secondary"
                                    src={item.picture}
                                    className="rounded-full w-12 h-12 object-cover"
                                />
                            </div>
                            <div className="flex-1 flex justify-between items-center ml-3">
                                <span className="text-default-800 font-semibold whitespace-nowrap">{item.name}</span>
                                <span className="text-success text-xs whitespace-nowrap">{item.amount}</span>
                                <span className="text-default-500 text-xs whitespace-nowrap">{item.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};
