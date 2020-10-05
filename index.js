#!/usr/bin/env node
'use strict'

import commander from 'commander';
import chalk from 'chalk';
import fs, { readFileSync } from 'fs';
import Generator from './class/generator.js';

const program = new commander.Command();
const gen = new Generator();
const version = process.env.npm_package_version;

program.version(version);
program
  .option('-i, --in [file]', 'Specify input file. ', 'config/rules.json')
  .option('-o, --out [file]', 'Specify output file. ', 'config/robots.txt')
  .parse(process.argv);

console.log(`Robots.js ${version}`);

let rules, generated;
rules = JSON.parse(fs.readFileSync(program.in, { flag: 'r' }));
console.log(chalk.blue(`[I] Rules loaded from ${program.in}`));
generated = gen.GenerateFromSource(rules);
console.log(chalk.blue('[I] Robots.txt generated'));

switch(program.args[0]) {
  case 'create':
    const output = fs.writeFileSync(program.out, generated);
    console.log(chalk.blue('[Generation succeeded]'));
    process.exit(0);
  case 'test':
    console.log(chalk.blue('[Test]'));

    // 检查 robots.txt 正确性
    console.log(chalk.blue('[I] Performing integrity check'));
    generated = generated.split('\n');
    let generatedAlloweds = generated[0].replace('User-agent:', '').split(',');
    let generatedBlockeds = generated[2].replace('User-agent:', '').split(',');
    let passed = {
      alloweds: true,
      blockeds: true,
    };

    for (const item of generatedAlloweds) {
      if (rules.alloweds.find((el) => el.toLowerCase() === item.toLowerCase()) === undefined) {
        passed.alloweds = false;
        console.error(chalk.red(`[E] ${item} is expected to be allowed, got other`));
      }
    }
    console.log(passed.alloweds ? chalk.green('[OK] Alloweds passed') : chalk.red('[E] Alloweds failed'));

    for (const item of generatedBlockeds) {
      if (rules.blockeds.find((el) => el.toLowerCase() === item.toLowerCase()) === undefined) {
        passed.blockeds = false;
        console.error(chalk.red(`[E] ${item} is expected to be blocked, got other`));
      }
    }
    console.log(passed.blockeds ? chalk.green('[OK] Blockeds passed') : chalk.red('[E] Blockeds failed'));

    // 输出结果
    if (passed.alloweds && passed.blockeds)
      console.log(chalk.blue('[Test passed]'));
    else
      console.log(chalk.blue('[Test failed]'));

    process.exit((passed.alloweds && passed.blockeds) ? 0 : 1);
}
