import { Avatar, Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface SponsorInfo {
  avatar: string;
  name: string;
  amount: string;
  date: string;
}

export const CardSponsor = () => {
  // 明确指定 items 的类型为 SponsorInfo[]
  const [items, setItems] = useState<SponsorInfo[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        // 从本地 API 获取数据
        const { data } = await axios.get("/api/sponsor");
        if (data.success && Array.isArray(data.sponsors)) {
          setItems(data.sponsors);
        } else {
          console.error("Failed to fetch sponsors:", data.error);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching sponsors data:", error.message);
        } else {
          console.error("Unknown error fetching sponsors data:", error);
        }
      }
    };

    fetchSponsors();
  }, []);

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
                        src={item.avatar}
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
