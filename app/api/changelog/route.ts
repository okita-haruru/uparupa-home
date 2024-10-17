import {NextResponse} from "next/server";
import axios from "axios";

export async function GET(): Promise<NextResponse<any>> {
  const changeLog = await axios.get("https://raw.githubusercontent.com/Ave-CRYCHIC/uparupa-whatsnew/refs/heads/main/whatsnew.json");
  return NextResponse.json(changeLog.data);
}