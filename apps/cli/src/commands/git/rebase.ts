import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { execSync } from "node:child_process";
import type { CommandModule } from "yargs";
import { getLog } from "./git.js";
import { ui } from "../../ui.js";

const COMMIT_COUNT = 30;

const rebaseCommand: CommandModule = {
  command: "rebase",
  describe: "Interactive rebase \u2014 pick a commit from the log",
  handler: async () => {
    ui.header("rebase");

    const commits = getLog(COMMIT_COUNT);

    if (commits.length === 0) {
      ui.fail("No commits found.");
      process.exit(1);
    }

    const index = await select({
      message: "Rebase from which commit?",
      loop: false,
      pageSize: 20,
      choices: commits.map((c, i) => ({
        name: `${chalk.yellow(c.hash)} ${c.message}`,
        value: i + 1,
      })),
    });

    ui.result("rebase", `git rebase -i HEAD~${index}`);

    try {
      execSync(`git rebase -i HEAD~${index}`, { stdio: "inherit" });
    } catch {
      ui.fail("Rebase failed or was aborted.");
      process.exit(1);
    }

    ui.done();
  },
};

export default rebaseCommand;
