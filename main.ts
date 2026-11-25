// The Most Boring Object, Reviewed in One Line — entry program.
// Writes one funny, true review line to <MAKEFUN_OUTPUT_DIR>/entry.txt
// and prints it to stdout. Runs its own gate first: the sealed scorer
// needs UTF-8 text of 1-200 characters, exactly one line, not blank.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My doormat spends its whole life being stepped on by strangers and still says WELCOME, which is either loyalty or Stockholm syndrome.";

// Self-checking gate: fail loudly instead of writing a bad entry.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  console.error(`gate failed: entry is ${chars.length} chars (need 1-200)`);
  process.exit(1);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  console.error("gate failed: entry must be exactly one line");
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error("gate failed: entry must not be only whitespace");
  process.exit(1);
}
if (ENTRY !== ENTRY.trim()) {
  console.error("gate failed: entry must not start or end with whitespace");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Round-trip check: what landed on disk must be byte-identical to the entry.
if (readFileSync(outPath, "utf8") !== ENTRY) {
  console.error("gate failed: entry.txt on disk does not match the entry");
  process.exit(1);
}
console.log(ENTRY);
