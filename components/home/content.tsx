"use client";
import React from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardAgents } from "./card-agents";
import { CardTransactions } from "./card-transactions";
import {Card, Link} from "@nextui-org/react";
import NextLink from "next/link";
import {MyChart} from "@/components/home/mychart";
import {PlayerTable} from "@/components/home/playertable";
import {TotalOnlinePlayers} from "@/components/home/total-online-players";


export const Content = () => (
  <div className="h-full lg:px-6">
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="mt-6 gap-6 flex flex-col w-full">
        {/* Card Section Top */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">公告</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
            <CardBalance1 />
            <CardBalance2 />
            <CardBalance3 />
          </div>
        </div>

        {/* Chart */}
        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">日活跃玩家数</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
            <MyChart />
          </div>
        </div>
      </div>

      {/* Left Section */}
      <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
        <h3 className="text-xl font-semibold">特别鸣谢</h3>
        <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
          <CardAgents />
          <CardTransactions />
        </div>
      </div>
    </div>

    {/* Table Latest Users */}
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
      {/*<div className="flex  flex-wrap justify-between">*/}
      {/*  <TotalOnlinePlayers/>*/}
      {/*</div>*/}
      <div className="flex justify-between">
      <div style={{flex: 1, marginRight: '10px'}}>
          <Card>
            <Card className="bg-primary rounded-xl shadow-md ">
              <h3 className="text-center text-xl font-semibold mt-4 mb-4">大厅世界</h3>
            </Card>
            <PlayerTable type={"lobby"}/>
          </Card>
        </div>

        <div style={{flex: 1, marginRight: '10px'}}>
          <Card>
            <Card className="bg-success rounded-xl shadow-md ">
              <h3 className="text-center text-xl font-semibold mt-4 mb-4">生存世界</h3>
            </Card>
            <PlayerTable type={"survival"}/>
          </Card>
        </div>
      </div>

    </div>
  </div>
);
