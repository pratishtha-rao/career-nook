import { NextResponse } from "next/server";

import { getDashboardStats } from "@/services/dashboardService";


export async function GET(){

const stats = await getDashboardStats();


return NextResponse.json(stats);

}