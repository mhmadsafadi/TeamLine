import Link from "next/link";

const SidebarNavLink = ({ item, isActive, onClick }) => (
  <Link
    href={item.href}
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
      isActive
        ? "bg-gradient-to-r from-main to-secondary text-white shadow-sm shadow-main/20"
        : "text-gray-600 hover:bg-gray-100 hover:text-main"
    }`}
  >
    <span className={isActive ? "text-white" : "text-gray-400 group-hover:text-main"}>
      {item.icon}
    </span>
    <span className="text-sm font-medium">{item.label}</span>
  </Link>
);

export default SidebarNavLink;