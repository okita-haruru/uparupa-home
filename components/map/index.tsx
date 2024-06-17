"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";


export const Map = () => {
    return (
        <div style={{width: '100%', height: '100vh', border: 'none'}}>
            <iframe
                src="http://server.mygooooo.xyz:8124/"
                style={{width: '100%', height: '100%', border: 'none'}}
                title="卫星地图"
            />
        </div>
    );
};
