import { NextResponse } from "next/server";

import {
getTasks,
createTask
} from "@/services/taskService";



export async function GET(){

const tasks = await getTasks();

return NextResponse.json(tasks);

}



export async function POST(
request:Request
){

const body = await request.json();


const task = await createTask(body);


return NextResponse.json(task);

}