import { prisma } from "@/lib/prisma";



export async function getMaterials(){

return prisma.material.findMany({

orderBy:{
id:"desc",
},

});

}

export async function createMaterial(data:{
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
},

});


}

export async function updateMaterial(
id:number,
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
},

data:{
  name:data.name,
  type:data.type,
  description:data.description ?? "",
  link:data.link ?? "",
},

});

}

export async function deleteMaterial(id:number){


return prisma.material.delete({

where:{
id,
},

});


}
