import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
      archived: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return Response.json(tasks);
}