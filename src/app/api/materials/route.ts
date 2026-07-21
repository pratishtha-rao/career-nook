import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";
import { createMaterial } from "@/services/materialService";



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



const materials = await prisma.material.findMany({

where:{
userId:user.id,
},

orderBy:{
id:"desc",
},

});



return Response.json(materials);


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



const material = await createMaterial(
user.id,
body
);



return Response.json(material);


}