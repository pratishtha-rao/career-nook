import { NextResponse } from "next/server";

import {updateMaterial, deleteMaterial} from "@/services/materialService";



export async function PUT(
request:Request,
{
params
}:{
params:Promise<{id:string}>
}
){

const {id}=await params;

const body=await request.json();


const material = await updateMaterial(
Number(id),
body
);


return NextResponse.json(material);

}





export async function DELETE(
request:Request,
{
params
}:{
params:Promise<{id:string}>
}
){

const {id}=await params;


await deleteMaterial(Number(id));


return NextResponse.json({
success:true
});

}