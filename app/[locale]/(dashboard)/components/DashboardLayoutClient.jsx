"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { DashboardNavbar } from "./DashboardNavbar";
import Sidebar from "./Sidebar";

const DashboardLayoutClient = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workspace, setWorkspace] = useState(undefined); // ← undefined مش null
  const { fetchUser } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const init = async () => {
      await fetchUser();

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("workspaces")
        .select("id, name")
        .eq("owner_id", user.id)
        .single();

      setWorkspace(data); // null لو ما في، object لو في
    };
    init();
  }, []);

  useEffect(() => {
    // undefined = لسا ما تحمل → لا تعمل redirect
    // null = تحمل ومافي workspace → اعمل redirect
    if (workspace === undefined) return;

    const isWorkspacePage = pathname.includes("/workspaces");
    if (workspace === null && !isWorkspacePage) {
      router.replace(`/${locale}/workspaces`);
    }
  }, [workspace, pathname]);

  return (
    <div className="min-h-screen">
      <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="ltr:sm:ml-64 rtl:sm:mr-64 mt-20 md:mt-16 p-3 md:p-7">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayoutClient;
