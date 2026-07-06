import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

export const useAuthStore = create((set) => ({
  user: null,
  workspace: null,
  loading: true,

  fetchUser: async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    set({ user, loading: false });
  },

  updateUserMetadata: (metadata) => {
    set((state) => ({
      user: {
        ...state.user,
        user_metadata: {
          ...state.user?.user_metadata,
          ...metadata,
        },
      },
    }));
  },
}));