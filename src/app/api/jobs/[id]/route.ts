import {
updateJob,
deleteJob,
} from "@/services/jobService";

import { getCurrentUser } from "@/lib/getUser";


export async function PUT(
request:Request,
{
params
}:{
params:Promise<{id:string}>
}
){

const user = await getCurrentUser();


if(!user){

return Response.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}



const {id}=await params;


const body=await request.json();



const job = await updateJob(
Number(id),
user.id,
body
);



return Response.json(job);

}




export async function DELETE(
request:Request,
{
params
}:{
params:Promise<{id:string}>
}
){

const user = await getCurrentUser();


if(!user){

return Response.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}



const {id}=await params;



await deleteJob(
Number(id),
user.id
);



return Response.json({
success:true
});

}