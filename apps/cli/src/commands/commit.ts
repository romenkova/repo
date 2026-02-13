import type { CommandModule } from "yargs";
import { extractTicket, getBranchName } from "../git.js";
import { prompt, ui } from "../ui.js";
import { execSync } from "node:child_process";

const commitCommand: CommandModule = {
  command: "commit",
  describe: "Create a commit prefixed with the ticket from the branch name",
  handler: async () => {
    ui.header("commit");

    const branch = getBranchName();
    const ticket = extractTicket(branch);

    if (!ticket) {
      ui.fail(
        `Could not extract ticket from branch: ${branch}`,
        "Expected: name/XXX-000-some-slug",
      );
      process.exit(1);
    }

    ui.info("branch", branch);
    ui.highlight("ticket", ticket);
    ui.separator();

    const message = await prompt("Message: ");

    if (!message) {
      ui.fail("Commit message cannot be empty.");
      process.exit(1);
    }

    const commitMessage = `${ticket}: ${message}`;

    ui.result("commit", `"${commitMessage}"`);

    try {
      execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
    } catch {
      ui.fail("Git commit failed.");
      process.exit(1);
    }

    ui.done();
  },
};

export default commitCommand;
