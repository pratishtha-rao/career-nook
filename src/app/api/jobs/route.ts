import { NextResponse } from "next/server";
import { createJob, getJobs } from "@/services/jobService";


export async function GET(){

const jobs = await getJobs();

return NextResponse.json(jobs);

}



export async function POST(request:Request){

try {

const body = await request.json();

const job = await createJob(body);

return NextResponse.json(job);


} catch(error){

console.error(error);

return NextResponse.json(
{
error:"Failed to create job"
},
{
status:500
}
);

}

}