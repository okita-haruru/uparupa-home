import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { SERVER_API_BASE } from "@/config/apiconfig";
import { ApiResponse } from "..";

interface PlayerData {
    uuid: string;
    name: string;
    avatar: string;
}

interface WikiSuggestion {
    key: string;
    title: string;
    thumbnail?: {
        url: string;
    }
}

export interface SearchResult {
    text: string;
    type: "player" | "wiki" | "history";
    icon: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<SearchResult[]>>> {
    const keyword = request.nextUrl.searchParams.get("keyword") || "";
    const data = await axios.get(`${SERVER_API_BASE}/players`).then(resp => resp.data.data as PlayerData[]);
    const filteredData = data.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())) || [];
    console.log("Searching", keyword, "Players", filteredData);

    const encodedKeyword = encodeURIComponent(keyword);
    console.log("Url", `https://zh.minecraft.wiki/rest.php/v1/search/title?q=${encodedKeyword}&limit=10`);
    const wikiSuggestion = await axios.get(`https://zh.minecraft.wiki/rest.php/v1/search/title?q=${encodedKeyword}&limit=10`)
        .then(resp => resp.data.pages as WikiSuggestion[]) || [];
    console.log("Wiki", encodedKeyword, "Suggestion", wikiSuggestion);
    return NextResponse.json({
        success: true,
        message: "获取玩家信息成功",
        data: [
            ...filteredData.map(item => {
                return {
                    text: item.name,
                    icon: item.avatar,
                    type: "player" as const
                }
            }),
            ...wikiSuggestion.map(item => {
                return {
                    text: item.title,
                    icon: item.thumbnail?.url || "",
                    type: "wiki" as const
                }
            })
        ]
    });
}
