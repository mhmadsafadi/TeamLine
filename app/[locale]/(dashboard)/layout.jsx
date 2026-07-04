"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { DashboardNavbar } from "./components/DashboardNavbar";
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fetchUser, fetchWorkspace, workspace } = useAuthStore();
  // const router = useRouter();
  // const locale = useLocale();
  const pathname = usePathname();

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
      // لا يوجد workspace → وجّهه للإنشاء
    }
  }, [workspace, pathname]);

  return (
    <div className="min-h-screen">
      <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="ltr:sm:ml-64 rtl:sm:mr-64 mt-20 md:mt-16 p-3 md:p-7">{children}</main>
    </div>
  );
};

export default DashboardLayout;
