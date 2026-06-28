import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    set({ user, loading: false });
  },
}));