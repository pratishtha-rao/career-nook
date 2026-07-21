import { prisma } from "@/lib/prisma";

export async function getJobs() {
  return prisma.job.findMany({
    orderBy: {
      id: "desc",
    },
  });
}

export async function createJob(data: {
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  url?: string;
  notes?: string;
}) {
  return prisma.job.create({
    data,
  });
}

export async function updateJob(
  id: number,
data: {
company:string;
position:string;
status:string;
dateApplied:string;
url?:string;
notes?:string;
}
) {
  return prisma.job.update({
    where: { id },
    data,
  });
}

export async function deleteJob(id: number) {
  return prisma.job.delete({
    where: { id },
  });
}