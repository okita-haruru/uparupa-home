import React from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { SidebarItem } from "./sidebar-item";
import { LuSwords } from "react-icons/lu";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { GiFishing } from "react-icons/gi";
import { IoDocumentText } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { GiTreasureMap } from "react-icons/gi";
import { GiLiver } from "react-icons/gi";
import {CardTitle} from "@/components/home/card-title";
import { LuFileClock } from "react-icons/lu";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
      <aside className="h-screen z-[20] sticky top-0">
        {collapsed ? (
            <div className={Sidebar.Overlay()} onClick={setCollapsed} />
        ) : null}
        <div
            className={Sidebar({
              collapsed: collapsed,
            })}
        >
          <div className={Sidebar.Header()}>
            <CardTitle />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className={Sidebar.Body()}>
              <SidebarItem
                  title="主页"
                  icon={<HomeIcon />}
                  isActive={pathname === "/"}
                  href="/"
              />
              <SidebarMenu title="服务器信息">
                <SidebarItem
                    title="服务器文档"
                    icon={<IoDocumentText/>}
                    href="https://doc.uparupa.town/"
                />
                {/*<SidebarItem*/}
                {/*    isActive={pathname === "/event"}*/}
                {/*    title="活动日程"*/}
                {/*    icon={<BsGiftFill  />}*/}
                {/*/>*/}
                <SidebarItem
                    isActive={pathname === "/update-log"}
                    title="更新日志"
                    icon={<LuFileClock  />}
                    href="update-log"
                />
                {/*<SidebarItem*/}
                {/*  isActive={pathname === "/reports"}*/}
                {/*  title="公开日志"*/}
                {/*  icon={<HiMiniDocumentText   />}*/}
                {/*/>*/}
              </SidebarMenu>

              <SidebarMenu title="排行榜">
                <SidebarItem
                    isActive={pathname === "/rich_ranking"}
                    title="富豪榜"
                    icon={<FaMoneyBillWave  />}
                    href="rich_ranking"
                />
                <SidebarItem
                    isActive={pathname === "/view"}
                    title="钓鱼佬榜"
                    icon={<GiFishing  />}
                    href="fish_ranking"
                />
                <SidebarItem
                    isActive={pathname === "/kills_ranking"}
                    title="击杀榜"
                    icon={<LuSwords  />}
                    href="kills_ranking"
                />
                <SidebarItem
                    isActive={pathname === "/time_ranking"}
                    title="肝帝榜"
                    icon={<GiLiver  />}
                    href="time_ranking"
                />
              </SidebarMenu>

              <SidebarMenu title="其他功能">
                <SidebarItem
                    isActive={pathname === "/map"}
                    title="卫星地图"
                    icon={<GiTreasureMap />}
                    href="map"
                />
              </SidebarMenu>
            </div>
            {/*<div className={Sidebar.Footer()}>*/}
            {/*  <Tooltip content={"Settings"} color="primary">*/}
            {/*    <div className="max-w-fit">*/}
            {/*      <SettingsIcon />*/}
            {/*    </div>*/}
            {/*  </Tooltip>*/}
            {/*  <Tooltip content={"Adjustments"} color="primary">*/}
            {/*    <div className="max-w-fit">*/}
            {/*      <FilterIcon />*/}
            {/*    </div>*/}
            {/*  </Tooltip>*/}
            {/*  <Tooltip content={"Profile"} color="primary">*/}
            {/*    <Avatar*/}
            {/*        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"*/}
            {/*        size="sm"*/}
            {/*    />*/}
            {/*  </Tooltip>*/}
            {/*</div>*/}
          </div>
        </div>
      </aside>
  );
};
