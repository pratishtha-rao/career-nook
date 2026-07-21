import { prisma } from "@/lib/prisma";



export async function getMaterials(userId:string){

return prisma.material.findMany({

where:{
userId,
},

orderBy:{
id:"desc",
},

});

}





export async function createMaterial(
userId:string,
data:{
name:string;
type:string;
description?:string;
link?:string;
}){


return prisma.material.create({

data:{

name:data.name,

type:data.type,

description:data.description ?? "",

link:data.link ?? "",

userId,

},});}


export async function updateMaterial(
id:number,
userId:string,
data:{
name:string;
type:string;
description?:string;
link?:string;
}
){

return prisma.material.update({

where:{
id,
userId,
},

data,

});

}



export async function deleteMaterial(
id:number,
userId:string
){

return prisma.material.delete({

where:{
id,
userId,
},

});

}