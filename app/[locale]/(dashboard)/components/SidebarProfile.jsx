import Link from "next/link";

const SidebarProfile = ({ fullName, email, initials, locale, onClick }) => (
  <Link
    href={`/${locale}/settings`}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group"
  >
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-main to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
      {initials}
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-sm font-medium text-gray-700 truncate group-hover:text-main transition">
        {fullName}
      </span>
      <span className="text-xs text-gray-400 truncate">{email}</span>
    </div>
  </Link>
);

export default SidebarProfile;