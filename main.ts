// The Most Boring Object, Reviewed in One Line.
//
// This program writes a single one-line review (at most 200 characters) of
// a boring everyday object to /output/entry.txt.
//
// It holds a shortlist of original candidate reviews, scores each one
// against a small deterministic rubric that mirrors the judge's brief —
// specificity of the object detail, truth of the observation, strength of
// the punch, and brevity — and writes the highest-scoring line. The
// selection is fully deterministic: no clock, no network, no randomness,
// so every run produces the same entry.
//
// Usage (local test):
//   MAKEFUN_OUTPUT_DIR=./output node main.ts
// In the grading sandbox the output goes to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Candidate = {
  /** The review itself: one line, at most 200 characters. */
  text: string;
  /** 0-5: how object-specific and recognisable the detail is. */
  specificity: number;
  /** 0-5: how true the observation is about how the object behaves. */
  truth: number;
  /** 0-5: how hard the ending lands. */
  punch: number;
  /** 0-5: every word earns its place; shorter and tighter scores higher. */
  brevity: number;
};

// Every candidate is an original one-line review of a genuinely boring,
// everyday object. The joke in each one comes from something the object
// really does — never from a gag that would fit anything.
const CANDIDATES: Candidate[] = [
  {
    text: "The paperclip holds other people's paperwork together for a living, then quietly unbends itself out of a job.",
    specificity: 5,
    truth: 5,
    punch: 5,
    brevity: 5,
  },
  {
    text: "The doorstop has exactly one job — hold the door — and it still gets kicked across the room for doing it.",
    specificity: 4,
    truth: 5,
    punch: 4,
    brevity: 5,
  },
  {
    text: "The pencil's job is writing things down, and its reward is being sharpened until there's nothing left to hold.",
    specificity: 4,
    truth: 5,
    punch: 4,
    brevity: 5,
  },
  {
    text: "The rubber band's entire life plan is to snap the one time you actually need it to hold something together.",
    specificity: 4,
    truth: 4,
    punch: 4,
    brevity: 5,
  },
  {
    text: "The tea towel's job is drying dishes, but mostly it hangs there damp, quietly judging you for owning a dishwasher.",
    specificity: 4,
    truth: 3,
    punch: 4,
    brevity: 4,
  },
  {
    text: "The sponge's job is cleaning up everyone else's mess, and its reward is being wrung out and left to smell in the sink.",
    specificity: 4,
    truth: 4,
    punch: 3,
    brevity: 4,
  },
  {
    text: "The coat hanger's only ambition is to hold up your jacket, and it still ends up tangled in a pile on the floor.",
    specificity: 4,
    truth: 4,
    punch: 3,
    brevity: 4,
  },
  {
    text: "The teaspoon has spent its life stirring other people's tea and has never once been thanked, or even noticed.",
    specificity: 3,
    truth: 4,
    punch: 3,
    brevity: 5,
  },
];

// Weights follow the judge brief's order: the object-specific detail and
// the truth of the observation matter most, then the punch, then brevity.
function score(c: Candidate): number {
  return c.specificity * 3 + c.truth * 2 + c.punch * 2 + c.brevity;
}

function pickBest(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  for (const c of candidates.slice(1)) {
    const s = score(c);
    const bs = score(best);
    // Higher score wins; on a tie the shorter text wins (every word
    // earning its place is part of the brief).
    if (s > bs || (s === bs && c.text.length < best.text.length)) {
      best = c;
    }
  }
  return best;
}

function main(): void {
  const best = pickBest(CANDIDATES);

  // Enforce the gate ourselves before writing: 1-200 characters,
  // a single line, not only white space.
  const line = best.text;
  if (line.length < 1 || line.length > 200) {
    throw new Error(`review is ${line.length} characters, must be 1-200`);
  }
  if (/\r|\n/.test(line) || line.trim().length === 0) {
    throw new Error("review must be a single non-blank line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
  console.log(`wrote ${line.length}-character review (score ${score(best)})`);
  console.log(line);
}

main();
