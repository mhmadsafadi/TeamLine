import { Almarai, Poppins } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";


const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const metadata = {
    ar: {
      title: "تيم لاين | منصة إدارة المشاريع",
      description:
        "تيم لاين – منصة احترافية لإدارة المشاريع وتنظيم فرق العمل. تابع مهامك، وزّع الأدوار، وأنجز أكثر.",
      keywords: ["تيم لاين", "تنظيم مهام", "فريق عمل", "إدارة مشاريع"],
      openGraph: {
        title: "تيم لاين | منصة إدارة المشاريع",
        description: "نظّم فريقك وأنجز مشاريعك بكفاءة مع تيم لاين.",
        siteName: "تيم لاين",
        locale: "ar_SA",
        type: "website",
      },
    },
    en: {
      title: "TeamLine | Project Management Platform",
      description:
        "TeamLine – A professional platform for managing projects and organizing teams. Track tasks, assign roles, and accomplish more.",
      keywords: ["TeamLine", "task management", "team work", "project management"],
      openGraph: {
        title: "TeamLine | Project Management Platform",
        description: "Organize your team and manage projects efficiently with TeamLine.",
        siteName: "TeamLine",
        locale: "en_US",
        type: "website",
      },
    },
  };

  return metadata[locale] ?? metadata.en;
}

export default async function RootLayout({ children, params }) {

    const { locale } = await params;
    const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className={`${locale === 'ar' ? almarai.className : poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-linear-to-r from-secondary/20 via-gray-50 to-main/25">
        <NextIntlClientProvider messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
