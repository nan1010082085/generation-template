#!/usr/bin/env node
import { Command } from 'commander';
import { red, gray, blue } from 'kolorist';
import { TEMPLATE_FILE } from './lib/constant.mjs';
import { run } from './lib/rw.mjs';

const { log, error } = console;
const program = new Command('gt');

program.name('gt').description('创建通用项目模板').version('1.0.0').usage('<command> [options]');

// create command
const makeCreateCommand = () => {
  const programCreate = new Command('create');
  programCreate
    .description('Rely on [template] to generate <filename> projects ')
    .argument('<filename>', '文件名')
    .argument('[template]', '模板名')
    .action((filename, template) => {
      // 检测 template 模板名是否存在
      // 调用 run 生成 filename
      let temp = template;
      if (temp === undefined) {
        log(gray('not input template name is [tmeplate-ts] default'))
        temp = 'template-ts';
      }
      let isExist = TEMPLATE_FILE.find((name) => name.match(temp));
      log(gray(`check template: ${isExist}`));
      if (isExist) {
        run(isExist, filename);
      } else {
        error(`${red('template is defined')}`);
      }
    });
  return programCreate;
};

function makeTemplateListCommand() {
  const programTemplateList = new Command('temp-list');
  programTemplateList.description('show template list name').action(() => {
    log(blue(`${TEMPLATE_FILE.join(' ')}`));
  });
  return programTemplateList;
}

program.addCommand(makeCreateCommand()).addCommand(makeTemplateListCommand());

program.parse(process.argv);
