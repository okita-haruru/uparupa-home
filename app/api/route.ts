import {NextResponse} from "next/server";

export async function ping() {
    return NextResponse.json({message: "pong"});
}
