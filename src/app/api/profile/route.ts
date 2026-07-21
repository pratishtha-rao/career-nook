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



const profile = await prisma.user.findUnique({

where:{
id:user.id
},

select:{

id:true,
name:true,
email:true,
createdAt:true

}

});



return Response.json(profile);


}





export async function PUT(request:Request){

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



const updatedUser = await prisma.user.update({

where:{
id:user.id
},

data:{


name: body.name,


}

});



return Response.json(updatedUser);


}