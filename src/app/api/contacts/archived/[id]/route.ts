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

  const contact = await prisma.contact.update({
    where: {
      id: Number(id),
    },
    data: {
      archived: true,
    },
  });

  return Response.json(contact);
}