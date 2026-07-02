import Link from "next/link";
import UserAvatar from "./UserAvatar";

const SidebarProfile = ({ fullName, email, avatarUrl, locale, onClick }) => (
  <Link
    href={`/${locale}/settings`}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group"
  >
    <UserAvatar avatarUrl={avatarUrl} fullName={fullName} size="sm" />
    <div className="flex flex-col min-w-0">
      <span className="text-sm font-medium text-gray-700 truncate group-hover:text-main transition">
        {fullName}
      </span>
      <span className="text-xs text-gray-400 truncate">{email}</span>
    </div>
  </Link>
);

export default SidebarProfile;