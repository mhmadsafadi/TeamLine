// import { createClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export const getUser = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};