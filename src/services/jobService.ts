import { prisma } from "@/lib/prisma";

export async function getJobs() {
  return prisma.job.findMany({
    orderBy: {
      id: "desc",
    },
  });
}

export async function createJob(
userId:string,
data:{
  company:string;
  position:string;
  status:string;
  dateApplied:string;
  url?:string;
  notes?:string;
}
){

return prisma.job.create({

data:{
  ...data,
  userId,
}

});

}

export async function updateJob(
id:number,
userId:string,
data:{
  company:string;
  position:string;
  status:string;
  dateApplied:string;
  url?:string;
  notes?:string;
}
){

return prisma.job.update({

where:{
id,
userId
},

data

});

}

export async function deleteJob(
id:number,
userId:string
){

return prisma.job.delete({

where:{
id,
userId
}

});

}