import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, PlayerInfo } from "..";
import axios from "axios";
import { SERVER_API_BASE } from "@/config/apiconfig";

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<PlayerInfo>>> {
    try {
        const username = request.nextUrl.searchParams.get("username");

        const data = await axios.get(`${SERVER_API_BASE}/playerInfo?username=${username}`).then(resp => resp.data)

        console.log(`Player info of ${username}`, data);

        return NextResponse.json({
            success: true,
            message: "获取玩家信息成功",
            data
        });
    } catch (e) {
        return NextResponse.json({ 
            success: false,
            message: `获取玩家信息失败, ${JSON.stringify(e)}`,
        });
    }
}
