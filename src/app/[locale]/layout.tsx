import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { SettingsProvider } from "@/contexts/SettingsContext";
import Footer from "@/components/Footer";
import SetHtmlLang from "./SetHtmlLang";
import SetBodyFont from "./SetBodyFont";
import SetBodyDisplay from "./SetBodyDisplay";
import FocusOnNavigate from "./FocusOnNavigate";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("title")} - ${t("description")}`,
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlLang locale={locale} />
      <FocusOnNavigate />
      <SettingsProvider>
        <SetBodyFont />
        <SetBodyDisplay />
        {children}
        <Footer />
      </SettingsProvider>
    </NextIntlClientProvider>
  );
}
