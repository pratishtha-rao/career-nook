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



const tasks = await prisma.task.findMany({

where:{
userId:user.id
},

orderBy:{
id:"desc"
}

});


return Response.json(tasks);

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



const task = await prisma.task.create({

data:{


...body,


userId:user.id


}

});



return Response.json(task);

}