import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const job = await prisma.job.update({
    where: {
      id: Number(id),
    },
    data: {
      archived: false,
    },
  });

  return Response.json(job);
}