import { execSync } from "node:child_process";

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
