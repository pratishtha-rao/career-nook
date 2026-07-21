import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";


// GET contacts
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


const contacts = await prisma.contact.findMany({

where:{
userId:user.id
},

orderBy:{
id:"desc"
}

});


return Response.json(contacts);

}





// CREATE contact
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


const contact = await prisma.contact.create({

data:{

...body,

userId:user.id

}

});


return Response.json(contact);

}