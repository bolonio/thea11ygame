import type { Episode } from "./types";

// Keyed by "episodeId:locale"
const episodes: Map<string, Episode> = new Map();

export function registerEpisode(episode: Episode): void {
  episodes.set(`${episode.id}:${episode.language}`, episode);
}

export function getEpisode(id: string, locale: string): Episode | undefined {
  return episodes.get(`${id}:${locale}`);
}

export function getAllEpisodes(): Episode[] {
  return Array.from(episodes.values());
}

export interface EpisodeGroup {
  id: string;
  title: string;
  description: string;
  languages: string[];
}

export function getEpisodeGroups(locale?: string): EpisodeGroup[] {
  const byId = new Map<string, Episode[]>();
  for (const ep of episodes.values()) {
    const list = byId.get(ep.id) ?? [];
    list.push(ep);
    byId.set(ep.id, list);
  }

  const groups: EpisodeGroup[] = [];
  for (const [id, eps] of byId) {
    const preferred = (locale && eps.find((e) => e.language === locale)) || eps[0];
    groups.push({
      id,
      title: preferred.title,
      description: preferred.description,
      languages: eps.map((e) => e.language),
    });
  }
  return groups;
}
