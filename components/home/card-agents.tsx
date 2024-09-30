import { Avatar, AvatarGroup, Card, CardBody } from "@nextui-org/react";
import React from "react";


export const CardAgents = () => {
  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-4 py-6 w-full">
      <CardBody className="py-5 gap-6">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              {"⭐"}开发者
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-col">
          <span className="text-xs">
            争取提供令玩家满意的游戏体验
          </span>
          <AvatarGroup isBordered>
            <Avatar src="https://avatars.githubusercontent.com/u/64072801?v=4" />
            <Avatar src="https://avatars.githubusercontent.com/u/76481033?v=4" />
            <Avatar src="https://avatars.githubusercontent.com/u/61079983?v=4" />
            <Avatar src="https://avatars.githubusercontent.com/u/23549756?v=4" />
            <Avatar src="https://avatars.githubusercontent.com/u/35602393?v=4" />

            {/*<Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />*/}
            {/*<Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />*/}
          </AvatarGroup>
        </div>
      </CardBody>
    </Card>
  );
};
