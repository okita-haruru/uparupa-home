import "@/styles/globals.css";
import type {Metadata} from 'next';
import {Providers} from "./providers";
import {fontSans} from '@/config/fonts';
import clsx from "clsx";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: '乌帕鲁帕！',
  description: '乌帕鲁帕小镇的主页！',
}

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en">
    <body className={clsx("font-sans antialiased", fontSans.className)}>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  )
}
