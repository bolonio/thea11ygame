"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSettings } from "@/contexts/SettingsContext";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { deleteAllSaves, hasSave, subscribeToSaves } from "@/engine/save";
import type { DisplayMode, FontStyle, TextSpeed } from "@/engine/types";

/** No saves are visible on the server, so nothing is offered for erasing. */
function getServerHasSave(): boolean {
  return false;
}

export default function SettingsPage() {
  const t = useTranslations("settings");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { settings, setDisplayMode, setFontStyle, setTextSpeed } = useSettings();

  const languages = routing.locales.map((loc) => ({
    value: loc,
    label: loc === "en" ? t("english") : t("spanish"),
  }));

  const displayModes: { value: DisplayMode; label: string }[] = [
    { value: "screenreader", label: t("screenreaderMode") },
    { value: "visual", label: t("visualMode") },
  ];

  const fontStyles: { value: FontStyle; label: string }[] = [
    { value: "pixel", label: t("pixelFont") },
    { value: "inclusive", label: t("accessibleFont") },
  ];

  const textSpeeds: { value: TextSpeed; label: string }[] = [
    { value: "instant", label: t("instant") },
    { value: "typewriter", label: t("typewriter") },
  ];

  // Saves live in localStorage, an external store, so they are read through
  // `useSyncExternalStore` rather than copied into state from an effect.
  // `deleteAllSaves` notifies its subscribers, so erasing re-reads from here.
  const hasProgress = useSyncExternalStore(subscribeToSaves, hasSave, getServerHasSave);
  const [confirming, setConfirming] = useState(false);
  const [justErased, setJustErased] = useState(false);

  useEffect(() => {
    if (!justErased) return;
    const timer = setTimeout(() => setJustErased(false), 2000);
    return () => clearTimeout(timer);
  }, [justErased]);

  const handleEraseClick = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    deleteAllSaves();
    setConfirming(false);
    setJustErased(true);
  };

  return (
    <main className="flex flex-col items-center justify-center flex-1 p-6">
      <h1
        tabIndex={-1}
        className="text-xl sm:text-2xl text-yellow-400 text-center mb-8 focus:outline-none"
      >
        {t("title")}
      </h1>
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Language */}
        <fieldset>
          <legend className="text-cyan-400 text-sm mb-2">{t("language")}</legend>
          <div className="flex flex-col gap-2">
            {languages.map((lang) => {
              const inputId = `settings-language-${lang.value}`;
              return (
                <label
                  key={lang.value}
                  htmlFor={inputId}
                  className={`flex items-center gap-2 px-3 py-2 border cursor-pointer transition-colors text-xs ${
                    locale === lang.value
                      ? "border-yellow-400 text-yellow-400"
                      : "border-gray-400 text-white"
                  }`}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name="language"
                    value={lang.value}
                    checked={locale === lang.value}
                    onChange={() => router.replace(pathname, { locale: lang.value })}
                    className="accent-yellow-400"
                  />
                  {lang.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Display Mode */}
        <fieldset>
          <legend className="text-cyan-400 text-sm mb-2">{t("displayMode")}</legend>
          <div className="flex flex-col gap-2">
            {displayModes.map((mode) => {
              const inputId = `settings-displayMode-${mode.value}`;
              return (
                <label
                  key={mode.value}
                  htmlFor={inputId}
                  className={`flex items-center gap-2 px-3 py-2 border cursor-pointer transition-colors text-xs ${
                    settings.displayMode === mode.value
                      ? "border-yellow-400 text-yellow-400"
                      : "border-gray-400 text-white"
                  }`}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name="displayMode"
                    value={mode.value}
                    checked={settings.displayMode === mode.value}
                    onChange={() => setDisplayMode(mode.value)}
                    className="accent-yellow-400"
                  />
                  {mode.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Text Speed — in Screen Reader mode it's pinned to instant and marked aria-disabled, but stays discoverable and announced */}
        {(() => {
          const speedDisabled = settings.displayMode === "screenreader";
          const displayedSpeed = speedDisabled ? "instant" : settings.textSpeed;
          return (
            <fieldset
              aria-disabled={speedDisabled || undefined}
              aria-describedby={speedDisabled ? "textSpeed-hint" : undefined}
              className={speedDisabled ? "opacity-50" : undefined}
            >
              <legend className="text-cyan-400 text-sm mb-2">{t("textSpeed")}</legend>
              {speedDisabled && (
                <p id="textSpeed-hint" className="text-xs text-gray-400 mb-2">{t("textSpeedLocked")}</p>
              )}
              <div className="flex flex-col gap-2">
                {textSpeeds.map((speed) => {
                  const inputId = `settings-textSpeed-${speed.value}`;
                  return (
                    <label
                      key={speed.value}
                      htmlFor={inputId}
                      className={`flex items-center gap-2 px-3 py-2 border transition-colors text-xs ${
                        speedDisabled ? "cursor-not-allowed" : "cursor-pointer"
                      } ${
                        displayedSpeed === speed.value
                          ? "border-yellow-400 text-yellow-400"
                          : "border-gray-400 text-white"
                      }`}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name="textSpeed"
                        value={speed.value}
                        checked={displayedSpeed === speed.value}
                        aria-disabled={speedDisabled || undefined}
                        onChange={() => {
                          if (speedDisabled) return;
                          setTextSpeed(speed.value);
                        }}
                        className="accent-yellow-400"
                      />
                      {speed.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })()}

        {/* Font Style */}
        <fieldset>
          <legend className="text-cyan-400 text-sm mb-2">{t("fontStyle")}</legend>
          <div className="flex flex-col gap-2">
            {fontStyles.map((font) => {
              const inputId = `settings-fontStyle-${font.value}`;
              return (
                <label
                  key={font.value}
                  htmlFor={inputId}
                  className={`flex items-center gap-2 px-3 py-2 border cursor-pointer transition-colors text-xs ${
                    settings.fontStyle === font.value
                      ? "border-yellow-400 text-yellow-400"
                      : "border-gray-400 text-white"
                  }`}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name="fontStyle"
                    value={font.value}
                    checked={settings.fontStyle === font.value}
                    onChange={() => setFontStyle(font.value)}
                    className="accent-yellow-400"
                  />
                  {font.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Saved Progress */}
        <fieldset>
          <legend className="text-cyan-400 text-sm mb-2">{t("savedProgress")}</legend>
          <div aria-live="polite">
            {justErased ? (
              <p className="px-3 py-2 text-xs text-white">{t("progressErased")}</p>
            ) : !hasProgress ? (
              <p className="px-3 py-2 text-xs text-white">{t("noSavedProgress")}</p>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleEraseClick}
                  className={`px-3 py-2 border text-xs focus:outline-2 focus:outline-red-400 transition-colors ${
                    confirming
                      ? "bg-red-500 border-red-500 text-black"
                      : "border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
                  }`}
                >
                  {confirming ? t("confirmErase") : t("eraseProgress")}
                </button>
                {confirming && (
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    className="px-3 py-2 border border-gray-400 text-white hover:border-yellow-400 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors text-xs"
                  >
                    {t("cancel")}
                  </button>
                )}
              </div>
            )}
          </div>
        </fieldset>

        <Link
          href="/"
          className="block text-center px-6 py-3 border border-gray-400 text-white hover:border-yellow-400 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors text-sm mt-4"
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
