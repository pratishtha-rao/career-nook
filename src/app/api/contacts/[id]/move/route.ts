import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const { direction } = await request.json();

  const contacts = await prisma.contact.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      order: "asc",
    },
  });

  const index = contacts.findIndex(
    (contact) => contact.id === Number(id)
  );

  if (index === -1) {
    return Response.json(
      { error: "Contact not found" },
      { status: 404 }
    );
  }

  const swapIndex =
    direction === "up"
      ? index - 1
      : index + 1;

  if (
    swapIndex < 0 ||
    swapIndex >= contacts.length
  ) {
    return Response.json({
      success: true,
    });
  }

  const current = contacts[index];
  const other = contacts[swapIndex];

  await prisma.$transaction([
    prisma.contact.update({
      where: {
        id: current.id,
      },
      data: {
        order: other.order,
      },
    }),

    prisma.contact.update({
      where: {
        id: other.id,
      },
      data: {
        order: current.order,
      },
    }),
  ]);

  return Response.json({
    success: true,
  });
}




