import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { SettingsProvider } from "@/contexts/SettingsContext";
import SetHtmlLang from "./SetHtmlLang";
import SetBodyFont from "./SetBodyFont";

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
      <SettingsProvider>
        <SetBodyFont />
        {children}
      </SettingsProvider>
    </NextIntlClientProvider>
  );
}
