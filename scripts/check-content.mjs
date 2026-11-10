// Checks the card text limits in src/data (see CONTENT_GUIDE.md, "Card text lengths").
// The data files import images, so they are read as text here instead of being imported.
import { readFileSync } from "node:fs";

// [min, max] in characters (Unicode code points, spaces and punctuation included).
const FILES = {
  "src/data/events.js": { title: [1, 45], body: [90, 110] },
  "src/data/developments.js": { title: [1, 45], summary: [90, 110], label: [1, 40] },
};

const FIELD = /^\s*(\w+): "(.*)",?\s*$/;
const problems = [];

for (const [file, limits] of Object.entries(FILES)) {
  const lines = readFileSync(new URL(`../${file}`, import.meta.url), "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    const match = FIELD.exec(line);
    if (!match || !limits[match[1]]) return;
    const [min, max] = limits[match[1]];
    const length = [...match[2]].length;
    if (length < min || length > max) {
      problems.push(`${file}:${i + 1}  ${match[1]} is ${length} characters (allowed ${min}–${max})`);
    }
  });
}

if (problems.length) {
  console.error(`Card text length check failed:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("Card text lengths OK.");
