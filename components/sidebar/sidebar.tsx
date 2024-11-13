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
import { CardTitle } from "@/components/home/card-title";
import { LuFileClock } from "react-icons/lu";

const navigation = [
  {
    title: "服务器信息",
    items: [
      {
        title: "服务器文档",
        icon: <IoDocumentText />,
        path: 'https://doc.uparupa.town/'
      },
      {
        title: '更新日志',
        icon: <LuFileClock />,
        path: 'update-log'
      }
    ]
  },
  {
    title: "排行榜",
    items: [
      {
        title: "富豪榜",
        icon: <FaMoneyBillWave />,
        path: 'treasure-ranking'
      },
      {
        title: '钓鱼佬榜',
        icon: <GiFishing />,
        path: 'fish-ranking'
      },
      {
        title: '击杀榜',
        icon: <LuSwords />,
        path: 'kills-ranking'
      },
      {
        title: '肝帝榜',
        icon: <GiLiver />,
        path: 'time-ranking',
      }
    ]
  },
  {
    title: '其他功能',
    items: [
      {
        title: '卫星地图',
        icon: <GiTreasureMap />,
        path: 'map'
      }
    ]
  }
];

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-50 sticky top-0">
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
        <div className="flex flex-col justify-between h-full select-none">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="主页"
              icon={<HomeIcon />}
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
                          href={`/${menuItem.path}`}
                          isActive={pathname.startsWith(`/${menuItem.path}`)}
                        />
                      ))
                    }
                  </SidebarMenu>
                )
              })
            }
          </div>
        </div>
      </div>
    </aside>
  );
};
