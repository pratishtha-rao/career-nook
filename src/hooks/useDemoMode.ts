"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function useDemoMode() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setLoggedIn(!!session);
      setLoading(false);
    }

    load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setLoggedIn(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    loggedIn,
    demoMode: !loggedIn,
    loading,
  };
}