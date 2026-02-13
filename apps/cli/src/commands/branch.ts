import type { ArgumentsCamelCase, CommandModule } from "yargs";
import { slugify } from "../git.js";
import { prompt, ui } from "../ui.js";
import { execSync } from "node:child_process";

interface BranchArgs {
  name: string;
}

const branchCommand: CommandModule<object, BranchArgs> = {
  command: "branch",
  describe: "Create a branch from a ticket ID",
  builder: {
    name: {
      alias: "n",
      type: "string",
      demandOption: true,
      describe: "Your name (used as branch prefix)",
    },
  },
  handler: async (argv: ArgumentsCamelCase<BranchArgs>) => {
    const author = argv.name;

    ui.header("branch");
    ui.info("author", author);
    ui.separator();

    const ticket = (await prompt("Ticket (e.g. XXX-000): ")).toUpperCase();

    if (!/^[A-Z]+-\d+$/.test(ticket)) {
      ui.fail(`Invalid ticket format: ${ticket}`, "Expected: XXX-000");
      process.exit(1);
    }

    const description = await prompt("Description: ");

    if (!description) {
      ui.fail("Description cannot be empty.");
      process.exit(1);
    }

    const branchName = `${author}/${ticket}-${slugify(description)}`;

    ui.result("branch", branchName);

    try {
      execSync(`git checkout -b ${branchName}`, { stdio: "inherit" });
    } catch {
      ui.fail("Failed to create branch.");
      process.exit(1);
    }

    ui.done();
  },
};

export default branchCommand;
