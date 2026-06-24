import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LangToggle } from "./LangToggle";

export const Navbar = () => {
  const t = useTranslations("Navbar");

  return (
    <nav className="bg-white/5 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-2 sm:px-0">
        <Link href="/" className="flex flex-col items-center">
          <Image
            src="/logo-1.png"
            alt="TeamLine Logo"
            width={130}
            height={100}
            priority
          />
          <span className="text-xs font-semibold tracking-widest text-main">
            {t("Logo")}
          </span>
        </Link>

        <div className="flex gap-3 items-center">
          <LangToggle />
          <Link
            href="/signup"
            className="flex items-center text-sm md:text-base gap-1.5 px-2 md:px-5 py-2 bg-main text-white hover:bg-main/10 hover:text-main rounded-md transition"
          >
            {t("signup")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};
