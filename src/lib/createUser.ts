import { prisma } from "@/lib/prisma";


export async function createUser(data:{
id:string;
email:string;
name?:string;
}){


return prisma.user.upsert({

where:{
email:data.email
},

update:{},

create:{

id:data.id,

email:data.email,

name:data.name

}

});


}