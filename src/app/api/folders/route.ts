import { getCurrentUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const folders = await prisma.folder.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      order: "asc",
    },
  });

  return Response.json(folders);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const folder = await prisma.folder.create({
    data: {
      userId: user.id,
      name: body.name,
      description: body.description ?? "",
      color: body.color ?? "#2563eb",
      icon: body.icon ?? "Folder",
      order: body.order ?? 0,
    },
  });

  return Response.json(folder);
}