import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/getUser";



export async function GET(){


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



const jobs = await prisma.job.findMany({

where:{
userId:user.id
},

orderBy:{
id:"desc"
}

});


return Response.json(jobs);


}





export async function POST(request:Request){


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




const body = await request.json();




const job = await prisma.job.create({

data:{


...body,


userId:user.id


}

});



return Response.json(job);


}