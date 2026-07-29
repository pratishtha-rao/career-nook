import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
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

  const folder = await prisma.folder.update({
    where: {
      id: Number(id),
      userId: user.id,
    },
    data: body,
  });

  return Response.json(folder);
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  await prisma.folder.delete({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  return Response.json({
    success: true,
  });
}