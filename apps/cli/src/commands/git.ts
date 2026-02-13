import type { Argv, CommandModule } from "yargs";
import branchCommand from "./branch.js";
import commitCommand from "./commit.js";

const gitCommand: CommandModule = {
  command: "git",
  describe: "Git workflow helpers",
  builder: (yargs: Argv) =>
    yargs
      .command(commitCommand)
      .command(branchCommand)
      .demandCommand(1, ""),
  handler: () => {},
};

export default gitCommand;
