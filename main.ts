// The 3AM Fridge Text — a smart fridge texts its owner at 3 a.m.
// The fridge is the actor here: it has watched, it has counted, and
// tonight it finally snaps. One line, no more, no less.

import { writeFileSync } from "node:fs";

const MAX_CHARS = 140;
const OUTPUT_PATH = "/output/entry.txt";

// --- Named parts of the message -------------------------------------------

// How many nights in a row the owner has raided the fridge at 3 a.m.
const NIGHTS_IN_A_ROW = 3;

const opener: string = `It's 3 a.m. — night ${NIGHTS_IN_A_ROW} in a row.`;

const observation: string =
  "The milk expired Tuesday and the pizza is 4 days old.";

const escalation: string = "I'm turning my light off now.";

// --- Assembly -------------------------------------------------------------

function joinParts(parts: string[]): string {
  return parts.filter((part) => part.length > 0).join(" ");
}

function buildEntry(): string {
  const parts: string[] = [opener, observation, escalation];
  return joinParts(parts);
}

// --- Guards ---------------------------------------------------------------

function assertSingleLine(text: string): void {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function assertWithinLimit(text: string): void {
  if (text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, limit is ${MAX_CHARS}`);
  }
}

function assertNonEmpty(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be empty");
  }
}

// --- Main -----------------------------------------------------------------

function main(): void {
  const entry = buildEntry();
  assertNonEmpty(entry);
  assertSingleLine(entry);
  assertWithinLimit(entry);
  writeFileSync(OUTPUT_PATH, entry + "\n", "utf8");
  console.log(entry);
}

main();
