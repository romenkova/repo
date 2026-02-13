#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import gitCommand from "./commands/git/index.js";

yargs(hideBin(process.argv))
  .scriptName("ri")
  .command(gitCommand)
  .demandCommand(1, "")
  .strict()
  .help()
  .parse();
