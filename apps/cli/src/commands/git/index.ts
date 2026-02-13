import type { Argv, CommandModule } from "yargs";
import branchCommand from "./branch.js";
import commitCommand from "./commit.js";
import rebaseCommand from "./rebase.js";

const gitCommand: CommandModule = {
  command: "git",
  describe: "Git workflow helpers",
  builder: (yargs: Argv) =>
    yargs
      .command(commitCommand)
      .command(branchCommand)
      .command(rebaseCommand)
      .demandCommand(1, ""),
  handler: () => {},
};

export default gitCommand;
