"use client";

import { useState } from "react";
import { DashboardNavbar } from "./components/DashboardNavbar";
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen mt-3">
      <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="ltr:sm:ml-64 rtl:sm:mr-64 pt-20 p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;