"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { hasSaveFor } from "@/engine/save";
import type { EpisodeGroup } from "@/engine/registry";

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  es: "Espanol",
};

export default function EpisodeListClient({ groups }: { groups: EpisodeGroup[] }) {
  const t = useTranslations("episodes");
  const tSettings = useTranslations("settings");
  const router = useRouter();

  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const keys = new Set<string>();
    for (const group of groups) {
      for (const lang of group.languages) {
        if (hasSaveFor(group.id, lang)) {
          keys.add(`${group.id}:${lang}`);
        }
      }
    }
    setSavedKeys(keys);
  }, [groups]);

  return (
    <div className="w-full max-w-lg flex flex-col gap-6">
      <ul className="flex flex-col gap-6" role="list">
        {groups.map((group) => (
          <li key={group.id} className="border border-gray-400 p-4">
            <h2 className="text-lg text-yellow-400 mb-1">{group.title}</h2>
            <p className="text-white text-xs mb-4">{group.description}</p>
            <div className="flex gap-3" role="group" aria-label={`${t("play")} ${group.title}`}>
              {group.languages.map((lang) => {
                const hasSave = savedKeys.has(`${group.id}:${lang}`);
                const action = hasSave ? t("continue") : t("play");
                return (
                  <button
                    key={lang}
                    onClick={() => {
                      router.push(`/episode/${group.id}`, { locale: lang });
                    }}
                    className="px-4 py-2 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:outline-2 focus:outline-yellow-400 transition-colors text-xs"
                  >
                    {action} ({LANGUAGE_LABELS[lang] ?? lang.toUpperCase()})
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="block text-center px-6 py-3 border border-gray-400 text-white hover:border-yellow-400 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors text-sm"
      >
        {tSettings("back")}
      </Link>
    </div>
  );
}
