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
  where: {
    userId: user.id,
    archived: false,
  },
  orderBy: {
    id: "desc",
  },
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
  data: {
    title: body.title,
    description: body.description || null,
    priority: body.priority,
    status: body.status,

    dueDate: body.dueDate
      ? new Date(body.dueDate)
      : null,

    userId: user.id,
  },
});

return Response.json(task);

}