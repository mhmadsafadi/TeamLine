import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {

  const t = useTranslations("Navbar");
    
  return (
    <Link href="/" className="flex flex-col items-center">
      <Image
        src="/logo-1.png"
        alt="TeamLine Logo"
        width={100}
        height={100}
      />
      <span className="text-md font-semibold tracking-widest text-main">
        {t("Logo")}
      </span>
    </Link>
  );
};

export default Logo;
