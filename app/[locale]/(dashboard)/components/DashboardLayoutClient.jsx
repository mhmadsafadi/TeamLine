"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { DashboardNavbar } from "./DashboardNavbar";
import Sidebar from "./Sidebar";

const DashboardLayoutClient = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fetchUser, fetchWorkspace, workspace } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      await fetchWorkspace();
    };
    init();
  }, []);

  useEffect(() => {
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