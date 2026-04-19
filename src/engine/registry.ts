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

export function getEpisodeGroups(): EpisodeGroup[] {
  const groups = new Map<string, EpisodeGroup>();
  for (const ep of episodes.values()) {
    if (!groups.has(ep.id)) {
      groups.set(ep.id, {
        id: ep.id,
        title: ep.title,
        description: ep.description,
        languages: [],
      });
    }
    const group = groups.get(ep.id)!;
    if (!group.languages.includes(ep.language)) {
      group.languages.push(ep.language);
    }
  }
  return Array.from(groups.values());
}
