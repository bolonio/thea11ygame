import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { GameProvider } from "@/contexts/GameContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { saveGame } from "@/engine/save";
import type { Episode, GameState, Settings } from "@/engine/types";
import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";

const MESSAGES = { en: enMessages, es: esMessages } as const;

const SETTINGS_STORAGE_KEY = "thea11ygame_settings";

/**
 * Writes settings the way SettingsProvider expects to find them, so a render
 * starts in a known display mode / text speed. SettingsProvider reads this on
 * mount, which is the same path the real app takes.
 */
export function seedSettings(settings: Partial<Settings>): void {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

interface IntlOptions extends Omit<RenderOptions, "wrapper"> {
  locale?: "en" | "es";
}

function IntlWrapper({
  children,
  locale = "en",
}: {
  children: ReactNode;
  locale?: "en" | "es";
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]} timeZone="UTC">
      <SettingsProvider>{children}</SettingsProvider>
    </NextIntlClientProvider>
  );
}

/** Renders a client component with the real `en` (or `es`) message catalogue. */
export function renderWithIntl(ui: ReactElement, options: IntlOptions = {}): RenderResult {
  const { locale = "en", ...rest } = options;
  return render(ui, {
    wrapper: ({ children }) => <IntlWrapper locale={locale}>{children}</IntlWrapper>,
    ...rest,
  });
}

interface GameOptions extends IntlOptions {
  episode: Episode;
  state?: GameState;
}

/**
 * Renders a game component inside the real GameProvider. When `state` is given
 * it is written to localStorage first, because GameProvider seeds its reducer
 * from the saved game — that is the production path, so tests exercise it too.
 */
export function renderGame(ui: ReactElement, options: GameOptions): RenderResult {
  const { episode, state, locale = "en", ...rest } = options;
  if (state) {
    saveGame(state, episode.language);
  }
  return render(ui, {
    wrapper: ({ children }) => (
      <IntlWrapper locale={locale}>
        <GameProvider episode={episode}>{children}</GameProvider>
      </IntlWrapper>
    ),
    ...rest,
  });
}

export { enMessages, esMessages };
