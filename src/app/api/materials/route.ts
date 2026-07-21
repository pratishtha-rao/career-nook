import { NextResponse } from "next/server";

import {
getMaterials,
createMaterial
} from "@/services/materialService";


export async function GET(){

const materials = await getMaterials();

return NextResponse.json(materials);

}


export async function POST(
request:Request
){

const body = await request.json();

const material = await createMaterial(body);

return NextResponse.json(material);

}