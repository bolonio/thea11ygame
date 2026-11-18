import { beforeEach, describe, expect, it, vi } from "vitest";
import type * as RegistryModule from "@/engine/registry";
import { makeEpisode } from "../fixtures/episode";

// The registry keeps a module-level Map, so each test re-imports it to start
// from an empty registry. This file deliberately never imports `@/episodes`,
// which means nothing but the fixtures below is ever registered here.
let registry: typeof RegistryModule;

beforeEach(async () => {
  vi.resetModules();
  registry = await import("@/engine/registry");
});

describe("registerEpisode / getEpisode", () => {
  it("stores an episode under its id and language", () => {
    const episode = makeEpisode({ id: "alpha", language: "en" });
    registry.registerEpisode(episode);

    expect(registry.getEpisode("alpha", "en")).toBe(episode);
  });

  it("returns undefined for an unknown id", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en" }));

    expect(registry.getEpisode("beta", "en")).toBeUndefined();
  });

  it("returns undefined for a language that was never registered", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en" }));

    expect(registry.getEpisode("alpha", "es")).toBeUndefined();
  });

  it("keeps the two locales of one episode separate", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en", title: "Alpha" }));
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "es", title: "Alfa" }));

    expect(registry.getEpisode("alpha", "en")?.title).toBe("Alpha");
    expect(registry.getEpisode("alpha", "es")?.title).toBe("Alfa");
  });

  it("overwrites a previous registration of the same id and language", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en", title: "First" }));
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en", title: "Second" }));

    expect(registry.getEpisode("alpha", "en")?.title).toBe("Second");
    expect(registry.getAllEpisodes()).toHaveLength(1);
  });
});

describe("getAllEpisodes", () => {
  it("is empty before anything is registered", () => {
    expect(registry.getAllEpisodes()).toEqual([]);
  });

  it("returns one entry per id/language pair", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en" }));
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "es" }));
    registry.registerEpisode(makeEpisode({ id: "beta", language: "en" }));

    const all = registry.getAllEpisodes();

    expect(all).toHaveLength(3);
    expect(all.map((e) => `${e.id}:${e.language}`).sort()).toEqual([
      "alpha:en",
      "alpha:es",
      "beta:en",
    ]);
  });

  it("returns a copy, so callers cannot corrupt the registry", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en" }));

    const all = registry.getAllEpisodes();
    all.length = 0;

    expect(registry.getAllEpisodes()).toHaveLength(1);
  });
});

describe("getEpisodeGroups", () => {
  it("collapses the locales of one episode into a single group", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en" }));
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "es" }));

    const groups = registry.getEpisodeGroups();

    expect(groups).toHaveLength(1);
    expect(groups[0].id).toBe("alpha");
    expect([...groups[0].languages].sort()).toEqual(["en", "es"]);
  });

  it("uses the requested locale for the group's prose", () => {
    registry.registerEpisode(
      makeEpisode({ id: "alpha", language: "en", title: "Alpha", description: "In English" }),
    );
    registry.registerEpisode(
      makeEpisode({ id: "alpha", language: "es", title: "Alfa", description: "En español" }),
    );

    const [group] = registry.getEpisodeGroups("es");

    expect(group.title).toBe("Alfa");
    expect(group.description).toBe("En español");
  });

  it("falls back to the first registered locale when the requested one is missing", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en", title: "Alpha" }));

    const [group] = registry.getEpisodeGroups("es");

    expect(group.title).toBe("Alpha");
    expect(group.languages).toEqual(["en"]);
  });

  it("falls back to the first registered locale when none is requested", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "es", title: "Alfa" }));
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en", title: "Alpha" }));

    const [group] = registry.getEpisodeGroups();

    expect(group.title).toBe("Alfa");
  });

  it("carries the author and the optional author link", () => {
    registry.registerEpisode(
      makeEpisode({
        id: "alpha",
        language: "en",
        author: "Ada",
        authorLink: "https://ada.example",
      }),
    );
    registry.registerEpisode(
      makeEpisode({ id: "beta", language: "en", author: "Grace", authorLink: undefined }),
    );

    const groups = registry.getEpisodeGroups("en");
    const alpha = groups.find((g) => g.id === "alpha");
    const beta = groups.find((g) => g.id === "beta");

    expect(alpha?.author).toBe("Ada");
    expect(alpha?.authorLink).toBe("https://ada.example");
    expect(beta?.author).toBe("Grace");
    expect(beta?.authorLink).toBeUndefined();
  });

  it("returns one group per distinct episode id", () => {
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "en" }));
    registry.registerEpisode(makeEpisode({ id: "alpha", language: "es" }));
    registry.registerEpisode(makeEpisode({ id: "beta", language: "en" }));

    expect(
      registry
        .getEpisodeGroups("en")
        .map((g) => g.id)
        .sort(),
    ).toEqual(["alpha", "beta"]);
  });

  it("returns an empty list when nothing is registered", () => {
    expect(registry.getEpisodeGroups("en")).toEqual([]);
  });
});
