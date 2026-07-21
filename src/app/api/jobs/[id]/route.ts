import {
updateJob,
deleteJob,
} from "@/services/jobService";

import { NextResponse } from "next/server";



export async function PUT(
request:Request,
{params}:{params:Promise<{id:string}>}
){

try {

const {id}=await params;

const body=await request.json();


const job=await updateJob(
Number(id),
body
);


return NextResponse.json(job);


}catch(error){

console.error(error);

return NextResponse.json(
{
error:"Failed to update job"
},
{
status:500
}
);

}

}




export async function DELETE(
request:Request,
{params}:{params:Promise<{id:string}>}
){

try{

const {id}=await params;


await deleteJob(Number(id));


return NextResponse.json({
success:true
});


}catch(error){

console.error(error);

return NextResponse.json(
{
error:"Failed to delete job"
},
{
status:500
}
);

}

}