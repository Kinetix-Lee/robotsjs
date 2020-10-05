#!/usr/bin/env node
'use strict'

import commander from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import Generator from './class/generator.js';

const program = new commander.Command();
const gen = new Generator();

// program.version(version);
program
  .option('-i, --in [file]', 'Specify input file. ', 'rules.json')
  .option('-o, --out [file]', 'Specify output file. ', 'robots.txt')
  .parse(process.argv);

switch(program.args[0]) {
  case 'test':
    let rules, generated;
    console.log(chalk.blue('[Robots.js Test]'));

    // 读取规则
    rules = JSON.parse(fs.readFileSync('./config/rules.json', { flag: 'r' }));
    console.log(chalk.blue('[I] Rules loaded'));
    // console.log(chalk.blue('Rules: '));
    // console.log(rules);

    // 生成 robots.txt（但不写出）
    generated = gen.GenerateFromSource(rules);
    console.log(chalk.blue('[I] Robots.txt generated'));
    // console.log(chalk.blue('Generated robots.txt: '));
    // console.log(generated);

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
