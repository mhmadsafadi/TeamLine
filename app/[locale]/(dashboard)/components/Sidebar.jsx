"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { getNavItems, getBottomItems } from "@/lib/sidebarConfig";
import SidebarNavLink from "./SidebarNavLink";
import WorkspaceSelector from "./WorkspaceSelector";
import SidebarProfile from "./SidebarProfile";

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Dashboard.sidebar");
  const tw = useTranslations("Workspace");
  const { user, fetchUser } = useAuthStore();

  // مؤقتاً ثابت — لاحقاً يجي من قاعدة البيانات
  const currentWorkspace = { name: tw("defaultWorkspaceName"), id: "1" };

  useEffect(() => { fetchUser(); }, []);

  const fullName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";

  const isActive = (path) => pathname.includes(path);
  const navItems = getNavItems(t, locale);
  const bottomItems = getBottomItems(t, locale);

  const avatarUrl = user?.user_metadata?.avatar_url || null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 sm:hidden" onClick={onClose} />
      )}

      <aside className={`fixed top-18 z-40 w-64 h-[calc(100vh-4rem)] transition-transform duration-300 ltr:left-0 rtl:right-0 ${
        isOpen ? "translate-x-0" : locale === "ar" ? "translate-x-full sm:translate-x-0" : "-translate-x-full sm:translate-x-0"
      }`}>
        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-white border-e border-gray-200">

          <WorkspaceSelector workspace={currentWorkspace} locale={locale} />

          <ul className="space-y-1 flex-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <SidebarNavLink item={item} isActive={isActive(item.href)} onClick={onClose} />
              </li>
            ))}
          </ul>

          <div className="my-3 border-t border-gray-200" />

          <ul className="space-y-1">
            {bottomItems.map((item) => (
              <li key={item.href}>
                <SidebarNavLink item={item} isActive={isActive(item.href)} onClick={onClose} />
              </li>
            ))}

            <li>
              <SidebarProfile
                fullName={fullName}
                email={email}
                avatarUrl={avatarUrl}
                locale={locale}
                onClick={onClose}
              />
            </li>
          </ul>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;