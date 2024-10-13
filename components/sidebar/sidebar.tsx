import React from "react";
import {Sidebar} from "./sidebar.styles";
import {HomeIcon} from "../icons/sidebar/home-icon";
import {SidebarItem} from "./sidebar-item";
import {LuSwords} from "react-icons/lu";
import {SidebarMenu} from "./sidebar-menu";
import {useSidebarContext} from "../layout/layout-context";
import {GiFishing} from "react-icons/gi";
import {IoDocumentText} from "react-icons/io5";
import {FaMoneyBillWave} from "react-icons/fa";
import {usePathname} from "next/navigation";
import {GiTreasureMap} from "react-icons/gi";
import {GiLiver} from "react-icons/gi";
import {CardTitle} from "@/components/home/card-title";
import {LuFileClock} from "react-icons/lu";

const navigation = [
  {
    title: "服务器信息",
    items: [
      {
        title: "服务器文档",
        icon: <IoDocumentText/>,
        path: 'https://doc.uparupa.town/'
      },
      {
        title: '更新日志',
        icon: <LuFileClock/>,
        path: 'update-log'
      }
    ]
  },
  {
    title: "排行榜",
    items: [
      {
        title: "富豪榜",
        icon: <FaMoneyBillWave/>,
        path: 'treasure-ranking'
      },
      {
        title: '钓鱼佬榜',
        icon: <GiFishing/>,
        path: 'fish_ranking'
      },
      {
        title: '击杀榜',
        icon: <LuSwords/>,
        path: 'kills_ranking'
      },
      {
        title: '肝帝榜',
        icon: <GiLiver/>,
        path: 'time_ranking',
      }
    ]
  },
  {
    title: '其他功能',
    items: [
      {
        title: '卫星地图',
        icon: <GiTreasureMap/>,
        path: 'map'
      }
    ]
  }
];

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const {collapsed, setCollapsed} = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed}/>
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CardTitle/>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="主页"
              icon={<HomeIcon/>}
              isActive={pathname === "/"}
              href="/"
            />
            {
              navigation.map((menu, index) => {
                return (
                  <SidebarMenu key={`menu-${index}`} title={menu.title}>
                    {
                      menu.items.map((menuItem, itemIndex) => (
                        <SidebarItem
                          key={`menu-${index}-${itemIndex}`}
                          title={menuItem.title}
                          icon={menuItem.icon}
                          href={menuItem.path}
                          isActive={pathname.startsWith(`/${menuItem.path}`)}
                        />
                      ))
                    }
                  </SidebarMenu>
                )
              })
            }
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
