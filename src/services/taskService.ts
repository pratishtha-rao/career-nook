import { prisma } from "@/lib/prisma";


export async function getTasks(){

return prisma.task.findMany();

}



export async function createTask(data:{
title:string;
description:string;
dueDate:string;
priority:string;
status:string;
}){

return prisma.task.create({

data

});

}



export async function updateTask(
id:number,
data:{
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
}
){
    return prisma.task.update({

where:{
id
},

data

});

}



export async function deleteTask(id:number){

return prisma.task.delete({

where:{
id
}

});

}