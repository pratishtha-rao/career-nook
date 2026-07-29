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

  const material = await prisma.material.update({
    where: {
      id: Number(id),
    },
    data: {
      archived: false,
    },
  });

  return Response.json(material);
}