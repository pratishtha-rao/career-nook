import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";

export async function PUT(
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

  const body = await request.json();

  const contact = await prisma.contact.findFirst({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  if (!contact) {
    return Response.json(
      { error: "Contact not found" },
      { status: 404 }
    );
  }

  const updated = await prisma.contact.update({
    where: {
      id: contact.id,
    },
    data: body,
  });

  return Response.json(updated);
}



export async function DELETE(
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

  const contact = await prisma.contact.findFirst({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  if (!contact) {
    return Response.json(
      { error: "Contact not found" },
      { status: 404 }
    );
  }

  await prisma.contact.delete({
    where: {
      id: contact.id,
    },
  });

  return Response.json({
    success: true,
  });
}