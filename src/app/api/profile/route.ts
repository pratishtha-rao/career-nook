export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Upsert ensures the user row is created atomically without race conditions
    const profile = await prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {},
      create: {
        id: user.id,
        email: user.email ?? "",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return Response.json(profile);
  } catch (error: unknown) {
    console.error("Profile GET error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: body.name,
      },
    });

    return Response.json(updatedUser);
  } catch (error: unknown) {
    console.error("Profile PUT error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}