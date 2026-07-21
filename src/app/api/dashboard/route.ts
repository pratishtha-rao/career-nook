import { getCurrentUser } from "@/lib/getUser";
import { getDashboardStats } from "@/services/dashboardService";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const stats = await getDashboardStats(user.id);

  return Response.json(stats);
}