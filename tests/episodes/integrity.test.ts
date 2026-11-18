import { describe, expect, it } from "vitest";
import "@/episodes";
import { getAllEpisodes, getEpisode } from "@/engine/registry";
import type { Episode } from "@/engine/types";

const episodes = getAllEpisodes();
const episodeIds = [...new Set(episodes.map((e) => e.id))].sort();

/** Every clue the player can actually end up holding. */
function obtainableClueIds(episode: Episode): Set<string> {
  const ids = new Set<string>();
  for (const room of episode.rooms) {
    for (const object of room.objects) {
      if (object.clueId) ids.add(object.clueId);
    }
  }
  for (const character of episode.characters) {
    for (const node of character.dialogueTree) {
      for (const choice of node.choices ?? []) {
        if (choice.grantClueId) ids.add(choice.grantClueId);
      }
    }
  }
  return ids;
}

/** Rooms the player can walk to, starting from the episode's entry room. */
function reachableRoomIds(episode: Episode): Set<string> {
  const byId = new Map(episode.rooms.map((room) => [room.id, room]));
  const seen = new Set<string>();
  const queue = [episode.startingRoomId];
  while (queue.length > 0) {
    const id = queue.shift() as string;
    if (seen.has(id)) continue;
    seen.add(id);
    for (const exit of byId.get(id)?.exits ?? []) {
      if (!seen.has(exit.roomId)) queue.push(exit.roomId);
    }
  }
  return seen;
}

/** Dialogue nodes the player can reach from a character's entry node. */
function reachableNodeIds(character: Episode["characters"][number]): Set<string> {
  const byId = new Map(character.dialogueTree.map((node) => [node.id, node]));
  const seen = new Set<string>();
  const queue = [character.defaultDialogueNodeId];
  while (queue.length > 0) {
    const id = queue.shift() as string;
    if (seen.has(id)) continue;
    seen.add(id);
    for (const choice of byId.get(id)?.choices ?? []) {
      if (choice.nextNodeId && !seen.has(choice.nextNodeId)) queue.push(choice.nextNodeId);
    }
  }
  return seen;
}

function duplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) dupes.add(value);
    seen.add(value);
  }
  return [...dupes];
}

describe("episode registry", () => {
  it("registers the shipped episodes in both locales", () => {
    expect(episodeIds).toEqual(["earwitness", "the-gathering"]);
    expect(episodes).toHaveLength(episodeIds.length * 2);
  });

  it("stores every episode under a key matching its own language field", () => {
    for (const id of episodeIds) {
      expect(getEpisode(id, "en")?.language).toBe("en");
      expect(getEpisode(id, "es")?.language).toBe("es");
    }
  });
});

describe.each(episodes.map((e) => [`${e.id} (${e.language})`, e] as const))(
  "%s — referential integrity",
  (_name, episode) => {
    const roomIds = new Set(episode.rooms.map((r) => r.id));
    const characterIds = new Set(episode.characters.map((c) => c.id));
    const clueIds = new Set(episode.clues.map((c) => c.id));
    const endingIds = new Set(episode.endings.map((e) => e.id));

    it("has no duplicate ids", () => {
      expect(duplicates(episode.rooms.map((r) => r.id))).toEqual([]);
      expect(duplicates(episode.characters.map((c) => c.id))).toEqual([]);
      expect(duplicates(episode.clues.map((c) => c.id))).toEqual([]);
      expect(duplicates(episode.endings.map((e) => e.id))).toEqual([]);
      expect(
        duplicates(episode.rooms.flatMap((r) => r.objects.map((o) => `${r.id}/${o.id}`))),
      ).toEqual([]);
      for (const character of episode.characters) {
        expect(duplicates(character.dialogueTree.map((n) => n.id))).toEqual([]);
      }
      expect(roomIds.size).toBeGreaterThan(1);
      expect(clueIds.size).toBeGreaterThan(1);
    });

    it("starts in a room that exists", () => {
      expect(roomIds.has(episode.startingRoomId)).toBe(true);
    });

    it("has exits that all lead to real rooms", () => {
      const dangling: string[] = [];
      let checked = 0;
      for (const room of episode.rooms) {
        for (const exit of room.exits) {
          checked++;
          if (!roomIds.has(exit.roomId)) dangling.push(`${room.id} -> ${exit.roomId}`);
        }
      }
      expect(dangling).toEqual([]);
      expect(checked).toBeGreaterThan(0);
    });

    it("never offers an exit back into the same room", () => {
      const selfExits = episode.rooms
        .filter((room) => room.exits.some((exit) => exit.roomId === room.id))
        .map((room) => room.id);

      expect(selfExits).toEqual([]);
    });

    it("places only characters that exist", () => {
      const dangling: string[] = [];
      let checked = 0;
      for (const room of episode.rooms) {
        for (const id of room.characterIds) {
          checked++;
          if (!characterIds.has(id)) dangling.push(`${room.id} -> ${id}`);
        }
      }
      expect(dangling).toEqual([]);
      expect(checked).toBeGreaterThan(0);
    });

    it("attaches only clues that exist to examinable objects", () => {
      const dangling: string[] = [];
      let checked = 0;
      for (const room of episode.rooms) {
        for (const object of room.objects) {
          if (!object.clueId) continue;
          checked++;
          if (!clueIds.has(object.clueId)) dangling.push(`${object.id} -> ${object.clueId}`);
        }
      }
      expect(dangling).toEqual([]);
      expect(checked).toBeGreaterThan(0);
    });

    it("gives every character an entry dialogue node that exists", () => {
      let checked = 0;
      for (const character of episode.characters) {
        checked++;
        const nodeIds = new Set(character.dialogueTree.map((n) => n.id));
        expect(
          nodeIds.has(character.defaultDialogueNodeId),
          `${character.id} entry node ${character.defaultDialogueNodeId}`,
        ).toBe(true);
      }
      expect(checked).toBeGreaterThan(0);
    });

    it("wires every dialogue choice to a node of the same character", () => {
      const dangling: string[] = [];
      let checked = 0;
      for (const character of episode.characters) {
        const nodeIds = new Set(character.dialogueTree.map((n) => n.id));
        for (const node of character.dialogueTree) {
          for (const choice of node.choices ?? []) {
            if (!choice.nextNodeId) continue;
            checked++;
            if (!nodeIds.has(choice.nextNodeId)) {
              dangling.push(`${character.id}:${node.id} -> ${choice.nextNodeId}`);
            }
          }
        }
      }
      expect(dangling).toEqual([]);
      expect(checked).toBeGreaterThan(0);
    });

    it("gates and grants only clues that exist", () => {
      const dangling: string[] = [];
      let checked = 0;
      for (const character of episode.characters) {
        for (const node of character.dialogueTree) {
          for (const choice of node.choices ?? []) {
            for (const required of choice.requiredClueIds ?? []) {
              checked++;
              if (!clueIds.has(required)) {
                dangling.push(`${character.id}:${node.id} requires ${required}`);
              }
            }
            if (choice.grantClueId) {
              checked++;
              if (!clueIds.has(choice.grantClueId)) {
                dangling.push(`${character.id}:${node.id} grants ${choice.grantClueId}`);
              }
            }
          }
        }
      }
      expect(dangling).toEqual([]);
      expect(checked).toBeGreaterThan(0);
    });

    it("accuses only characters that exist", () => {
      let checked = 0;
      for (const suspect of episode.confrontation.suspects) {
        checked++;
        expect(characterIds.has(suspect.characterId), suspect.characterId).toBe(true);
      }
      expect(checked).toBeGreaterThan(0);
    });

    it("points every confrontation outcome at an ending that exists", () => {
      const dangling: string[] = [];
      let checked = 0;
      for (const suspect of episode.confrontation.suspects) {
        checked++;
        if (!endingIds.has(suspect.defaultEndingId)) {
          dangling.push(`${suspect.characterId} default -> ${suspect.defaultEndingId}`);
        }
        for (const outcome of suspect.outcomes) {
          checked++;
          if (!endingIds.has(outcome.endingId)) {
            dangling.push(`${suspect.characterId} -> ${outcome.endingId}`);
          }
        }
      }
      expect(dangling).toEqual([]);
      expect(checked).toBeGreaterThan(0);
    });

    it("requires only clues that exist to unlock an outcome", () => {
      const dangling: string[] = [];
      let checked = 0;
      for (const suspect of episode.confrontation.suspects) {
        for (const outcome of suspect.outcomes) {
          for (const required of outcome.requiredClueIds) {
            checked++;
            if (!clueIds.has(required)) {
              dangling.push(`${suspect.characterId} requires ${required}`);
            }
          }
        }
      }
      expect(dangling).toEqual([]);
      expect(checked).toBeGreaterThan(0);
    });

    it("hides objects only behind flags some dialogue choice can set", () => {
      const settableFlags = new Set(
        episode.characters.flatMap((c) =>
          c.dialogueTree.flatMap((n) => (n.choices ?? []).flatMap((ch) => ch.setFlags ?? [])),
        ),
      );
      const unsettable = episode.rooms.flatMap((room) =>
        room.objects.flatMap((object) =>
          (object.requiredFlags ?? [])
            .filter((flag) => !settableFlags.has(flag))
            .map((flag) => `${object.id} requires ${flag}`),
        ),
      );

      expect(unsettable).toEqual([]);
    });
  },
);

describe.each(episodes.map((e) => [`${e.id} (${e.language})`, e] as const))(
  "%s — reachability",
  (_name, episode) => {
    it("lets the player walk to every room", () => {
      const reachable = reachableRoomIds(episode);
      const unreachable = episode.rooms.map((r) => r.id).filter((id) => !reachable.has(id));

      expect(unreachable).toEqual([]);
      expect(reachable.size).toBe(episode.rooms.length);
    });

    it("lets the player reach every dialogue node", () => {
      const orphans: string[] = [];
      let checked = 0;
      for (const character of episode.characters) {
        const reachable = reachableNodeIds(character);
        checked += character.dialogueTree.length;
        for (const node of character.dialogueTree) {
          if (!reachable.has(node.id)) orphans.push(`${character.id}:${node.id}`);
        }
      }
      expect(orphans).toEqual([]);
      expect(checked).toBeGreaterThan(0);
    });

    it("makes every clue obtainable somewhere", () => {
      const obtainable = obtainableClueIds(episode);
      const unobtainable = episode.clues.map((c) => c.id).filter((id) => !obtainable.has(id));

      expect(unobtainable).toEqual([]);
      expect(obtainable.size).toBeGreaterThan(0);
    });

    it("can be finished: the confrontation threshold is within reach", () => {
      expect(episode.minCluesForConfrontation).toBeGreaterThan(0);
      expect(episode.minCluesForConfrontation).toBeLessThanOrEqual(
        obtainableClueIds(episode).size,
      );
    });

    it("never requires a clue the player cannot get to reach an outcome", () => {
      const obtainable = obtainableClueIds(episode);
      const impossible = episode.confrontation.suspects.flatMap((suspect) =>
        suspect.outcomes.flatMap((outcome) =>
          outcome.requiredClueIds
            .filter((id) => !obtainable.has(id))
            .map((id) => `${suspect.characterId} requires ${id}`),
        ),
      );

      expect(impossible).toEqual([]);
    });

    it("never gates a dialogue choice behind a clue the player cannot get", () => {
      const obtainable = obtainableClueIds(episode);
      const impossible = episode.characters.flatMap((character) =>
        character.dialogueTree.flatMap((node) =>
          (node.choices ?? []).flatMap((choice) =>
            (choice.requiredClueIds ?? [])
              .filter((id) => !obtainable.has(id))
              .map((id) => `${character.id}:${node.id} requires ${id}`),
          ),
        ),
      );

      expect(impossible).toEqual([]);
    });

    it("can reach every ending it defines", () => {
      const referenced = new Set(
        episode.confrontation.suspects.flatMap((s) => [
          s.defaultEndingId,
          ...s.outcomes.map((o) => o.endingId),
        ]),
      );
      const orphans = episode.endings.map((e) => e.id).filter((id) => !referenced.has(id));

      expect(orphans).toEqual([]);
      expect(referenced.size).toBeGreaterThan(1);
    });

    it("has at least one winning ending", () => {
      expect(episode.endings.filter((e) => e.isCorrect).length).toBeGreaterThan(0);
    });
  },
);

describe.each(episodes.map((e) => [`${e.id} (${e.language})`, e] as const))(
  "%s — narration is present",
  (_name, episode) => {
    it("fills in every piece of prose a screen reader will announce", () => {
      const blanks: string[] = [];
      let checked = 0;

      const check = (label: string, value: string) => {
        checked++;
        if (value.trim().length === 0) blanks.push(label);
      };

      check("title", episode.title);
      check("description", episode.description);
      check("author", episode.author);
      check("introNarration", episode.introNarration);
      check("confrontation.introText", episode.confrontation.introText);

      for (const room of episode.rooms) {
        check(`${room.id}.name`, room.name);
        check(`${room.id}.entryAnnouncement`, room.entryAnnouncement);
        check(`${room.id}.description`, room.description);
        for (const object of room.objects) {
          check(`${room.id}/${object.id}.name`, object.name);
          check(`${room.id}/${object.id}.examinationText`, object.examinationText);
        }
        for (const exit of room.exits) {
          check(`${room.id} -> ${exit.roomId}.label`, exit.label);
        }
      }

      for (const character of episode.characters) {
        check(`${character.id}.name`, character.name);
        check(`${character.id}.description`, character.description);
        for (const node of character.dialogueTree) {
          check(`${character.id}:${node.id}.text`, node.text);
          for (const [i, choice] of (node.choices ?? []).entries()) {
            check(`${character.id}:${node.id}.choices[${i}].text`, choice.text);
          }
        }
      }

      for (const clue of episode.clues) {
        check(`${clue.id}.name`, clue.name);
        check(`${clue.id}.description`, clue.description);
      }

      for (const ending of episode.endings) {
        check(`${ending.id}.narration`, ending.narration);
      }

      expect(blanks).toEqual([]);
      expect(checked).toBeGreaterThan(50);
    });
  },
);

describe.each(episodeIds)("%s — locale parity", (id) => {
  const en = getEpisode(id, "en") as Episode;
  const es = getEpisode(id, "es") as Episode;

  it("exists in both locales", () => {
    expect(en).toBeDefined();
    expect(es).toBeDefined();
  });

  it("agrees on the structural settings", () => {
    expect(es.id).toBe(en.id);
    expect(es.startingRoomId).toBe(en.startingRoomId);
    expect(es.minCluesForConfrontation).toBe(en.minCluesForConfrontation);
    expect(es.author).toBe(en.author);
    expect(es.authorLink).toBe(en.authorLink);
  });

  it("has the same room ids in the same order", () => {
    expect(es.rooms.map((r) => r.id)).toEqual(en.rooms.map((r) => r.id));
  });

  it("has the same objects, characters and exits in every room", () => {
    for (const [i, room] of en.rooms.entries()) {
      const other = es.rooms[i];
      expect(other.objects.map((o) => o.id), `${room.id} objects`).toEqual(
        room.objects.map((o) => o.id),
      );
      expect(other.objects.map((o) => o.clueId), `${room.id} object clues`).toEqual(
        room.objects.map((o) => o.clueId),
      );
      expect(other.objects.map((o) => o.requiredFlags), `${room.id} object flags`).toEqual(
        room.objects.map((o) => o.requiredFlags),
      );
      expect(other.characterIds, `${room.id} characters`).toEqual(room.characterIds);
      expect(other.exits.map((e) => e.roomId), `${room.id} exits`).toEqual(
        room.exits.map((e) => e.roomId),
      );
    }
    expect(en.rooms.length).toBeGreaterThan(1);
  });

  it("has the same character ids and dialogue graph", () => {
    expect(es.characters.map((c) => c.id)).toEqual(en.characters.map((c) => c.id));

    for (const [i, character] of en.characters.entries()) {
      const other = es.characters[i];
      expect(other.defaultDialogueNodeId, `${character.id} entry node`).toBe(
        character.defaultDialogueNodeId,
      );
      expect(other.dialogueTree.map((n) => n.id), `${character.id} nodes`).toEqual(
        character.dialogueTree.map((n) => n.id),
      );

      for (const [j, node] of character.dialogueTree.entries()) {
        const otherNode = other.dialogueTree[j];
        const label = `${character.id}:${node.id}`;
        expect((otherNode.choices ?? []).length, `${label} choice count`).toBe(
          (node.choices ?? []).length,
        );
        expect(
          (otherNode.choices ?? []).map((c) => c.nextNodeId),
          `${label} choice targets`,
        ).toEqual((node.choices ?? []).map((c) => c.nextNodeId));
        expect(
          (otherNode.choices ?? []).map((c) => c.grantClueId),
          `${label} granted clues`,
        ).toEqual((node.choices ?? []).map((c) => c.grantClueId));
        expect(
          (otherNode.choices ?? []).map((c) => c.requiredClueIds),
          `${label} required clues`,
        ).toEqual((node.choices ?? []).map((c) => c.requiredClueIds));
        expect(
          (otherNode.choices ?? []).map((c) => c.setFlags),
          `${label} set flags`,
        ).toEqual((node.choices ?? []).map((c) => c.setFlags));
      }
    }
  });

  it("has the same clue ids", () => {
    expect(es.clues.map((c) => c.id)).toEqual(en.clues.map((c) => c.id));
  });

  it("has the same endings with the same win/lose flags", () => {
    expect(es.endings.map((e) => e.id)).toEqual(en.endings.map((e) => e.id));
    expect(es.endings.map((e) => e.isCorrect)).toEqual(en.endings.map((e) => e.isCorrect));
  });

  it("has the same confrontation wiring", () => {
    expect(es.confrontation.suspects.map((s) => s.characterId)).toEqual(
      en.confrontation.suspects.map((s) => s.characterId),
    );

    for (const [i, suspect] of en.confrontation.suspects.entries()) {
      const other = es.confrontation.suspects[i];
      expect(other.defaultEndingId, `${suspect.characterId} default ending`).toBe(
        suspect.defaultEndingId,
      );
      expect(other.outcomes.map((o) => o.endingId), `${suspect.characterId} outcomes`).toEqual(
        suspect.outcomes.map((o) => o.endingId),
      );
      expect(
        other.outcomes.map((o) => o.requiredClueIds),
        `${suspect.characterId} outcome clues`,
      ).toEqual(suspect.outcomes.map((o) => o.requiredClueIds));
    }
    expect(en.confrontation.suspects.length).toBeGreaterThan(1);
  });

  it("is actually translated, not a copy of the English text", () => {
    expect(es.introNarration).not.toBe(en.introNarration);
    expect(es.language).toBe("es");
    expect(en.language).toBe("en");
  });
});
