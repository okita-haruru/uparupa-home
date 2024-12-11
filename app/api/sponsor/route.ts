import axios from "axios";
import { NextResponse } from "next/server";

const SPONSORS_JSON_URL = "https://raw.githubusercontent.com/Ave-CRYCHIC/uparupa-sponsors/main/sponsors.json";

export interface SponsorInfo {
  avatar: string;
  name: string;
  amount: string;
  date: string;
}

export interface GetSponsorsResponse {
  sponsors: SponsorInfo[];
  success: boolean;
  error?: string;
}

// 定义 GET 方法
export async function GET(): Promise<NextResponse<GetSponsorsResponse>> {
  try {
    // 获取 sponsors 数据
    const { data } = await axios.get<SponsorInfo[]>(SPONSORS_JSON_URL);

    // 验证是否为数组
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: Expected an array");
    }

    return NextResponse.json({ sponsors: data, success: true });
  } catch (error) {
    console.error("Error fetching sponsors data:", error.message);
    return NextResponse.json({
      sponsors: [],
      success: false,
      error: error.message,
    });
  }
}
