import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const changeLog = await axios.get("https://raw.githubusercontent.com/Ave-CRYCHIC/uparupa-whatsnew/refs/heads/main/whatsnew.json");
    return NextResponse.json(changeLog.data);
  } catch (error) {
    console.error("获取更新日志失败:", error);
    return NextResponse.json({ error: "获取更新日志失败" }, { status: 500 });
  }
}
