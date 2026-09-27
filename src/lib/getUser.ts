import { createClient } from "./supabaseServer";
import { headers } from "next/headers";

export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    // 1. Try reading the token directly from incoming request headers
    const headerList = await headers();
    const authHeader = headerList.get("authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "").trim();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (!error && user) {
        return user;
      }
    }

    // 2. Fall back to cookie-based session verification
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (err) {
    console.error("Error retrieving user in getCurrentUser:", err);
    return null;
  }
}