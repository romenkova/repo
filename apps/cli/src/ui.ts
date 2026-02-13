import chalk from "chalk";
import * as readline from "node:readline";

export const log = console.log;

const S = {
  dot: "\u25CF",
  play: "\u25B6",
  ok: "\u2714",
  fail: "\u2718",
  arrow: "\u25B8",
  line: "\u2500",
  to: "\u2192",
} as const;

export const ui = {
  separator: () => log(chalk.dim(S.line.repeat(48))),

  header: (title: string) => {
    log("");
    log(chalk.bold.cyan(`  ${title}`));
    ui.separator();
  },

  info: (label: string, value: string) => {
    log(chalk.dim(`  ${S.dot} ${label.padEnd(8)}`) + chalk.white(value));
  },

  highlight: (label: string, value: string) => {
    log(chalk.dim(`  ${S.play} ${label.padEnd(8)}`) + chalk.bold.yellow(value));
  },

  result: (label: string, value: string) => {
    log("");
    ui.separator();
    log(chalk.dim(`  ${label} ${S.to} `) + chalk.bold.white(value));
    ui.separator();
  },

  done: () => {
    log("");
    log(chalk.green(`  ${S.ok} Done`));
    log("");
  },

  fail: (message: string, hint?: string) => {
    log("");
    log(chalk.red(`  ${S.fail} ${message}`));
    if (hint) log(chalk.yellow(`    ${hint}`));
    log("");
  },
};

export function prompt(label: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(chalk.bold.white(`  ${S.arrow} ${label}`), (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}
