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
  const [workspaceChecked, setWorkspaceChecked] = useState(false);
  const [hasWorkspace, setHasWorkspace] = useState(false);
  const { fetchUser } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const init = async () => {
  await fetchUser();

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  console.log("user.id:", user?.id); // ← موجود

  if (!user) {
    setWorkspaceChecked(true);
    setHasWorkspace(false);
    return;
  }

  const { data, error } = await supabase
    .from("workspaces")
    .select("id, owner_id")
    .eq("owner_id", user.id)
    .limit(1)

  console.log("workspace data:", data);   // ← موجود
  console.log("workspace error:", error); // ← موجود

  setHasWorkspace(data && data.length > 0); // ← array مش objec
  setWorkspaceChecked(true);
};

    init();
  }, []);

  useEffect(() => {
    console.log("workspaceChecked:", workspaceChecked);
    console.log("hasWorkspace:", hasWorkspace);
    console.log("pathname:", pathname);

    if (!workspaceChecked) return;

    const isWorkspacePage = pathname.includes("/workspaces");
    if (!hasWorkspace && !isWorkspacePage) {
      router.replace(`/${locale}/workspaces`);
    }
  }, [workspaceChecked, hasWorkspace, pathname]);

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