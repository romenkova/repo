import { execSync } from "node:child_process";

export interface GitLogEntry {
  hash: string;
  message: string;
}

export function getBranchName(): string {
  return execSync("git rev-parse --abbrev-ref HEAD", {
    encoding: "utf-8",
  }).trim();
}

export function extractTicket(branch: string): string | null {
  const match = branch.match(/\/([A-Z]+-\d+)/);
  return match ? match[1] : null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLog(count: number): GitLogEntry[] {
  const raw = execSync(`git log --oneline -n ${count} --format="%h %s"`, {
    encoding: "utf-8",
  }).trim();

  if (!raw) return [];

  return raw.split("\n").map((line) => {
    const spaceIndex = line.indexOf(" ");
    return {
      hash: line.substring(0, spaceIndex),
      message: line.substring(spaceIndex + 1),
    };
  });
}
