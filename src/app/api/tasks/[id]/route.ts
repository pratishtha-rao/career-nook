import { NextResponse } from "next/server";

import {
updateTask,
deleteTask
} from "@/services/taskService";



export async function PUT(
request:Request,
context:{
params:Promise<{id:string}>
}

){

const {id}=await context.params;


const body=await request.json();


const task=await updateTask(
Number(id),
body
);


return NextResponse.json(task);

}




export async function DELETE(
request:Request,
context:{
params:Promise<{id:string}>
}

){

const {id}=await context.params;


await deleteTask(
Number(id)
);


return NextResponse.json({
success:true
});

}