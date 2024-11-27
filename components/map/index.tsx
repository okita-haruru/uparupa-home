"use client";

import React from "react";

export const Map = () => {
  return (
    <div style={{width: '100%', height: '100vh', border: 'none'}}>
      <iframe src="https://server.uparupa.town:8124/" className='w-full h-full border-none' title="卫星地图"/>
    </div>
  );
};
