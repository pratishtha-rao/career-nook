"use client";

import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Sign Out
    </button>
  );
}