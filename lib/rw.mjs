import fs from 'fs-extra';
import { red, green, gray, blue } from 'kolorist';
import ora from 'ora';
import Inquirer from 'inquirer';
import { TEMPLATE_DIRECTORY, YES_OR_NO } from './constant.mjs';
import { getPath } from './path.mjs';

const { log, error } = console;
const spinner = ora(`${green('Loading')}`);
let filename = 'my-vue';
let templatename = 'template-element-ts';

// 创建文件
const mkdirFolder = async (path) => await fs.mkdir(path);

/**
 * 创建文件夹 & 拷贝文件
 * @description 检测 ``name`` 是否存在，不存在即创建。 读取 ``name``下文件目录 ``copy``
 * @param {*} name
 * @param {*} sourceSrc
 * @param {*} targetSrc
 */
const readdirPath = async (name, sourceSrc, targetSrc) => {
  if (!fs.existsSync(name)) {
    spinner.text = `${gray(`create folder ${name}`)}`;
    await mkdirFolder(name);
  }
  let files = await fs.readdir(getPath(sourceSrc));
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let source = getPath(`${sourceSrc}/${file}`);
    let target = getPath(`${targetSrc}/${file}`);
    let stat = await fs.stat(source);
    if (stat.isDirectory()) {
      await readdirPath(target, source, target);
    } else {
      if (!fs.existsSync(target)) {
        spinner.text = `${gray(`copy file ${file}`)}`;
        await fs.copy(source, target);
      }
    }
  }
};

/**
 * 运行生成命令
 * @param {*} sPath 模板名
 * @param {*} tPath 目标名
 */
export const run = async (sPath, tPath) => {
  filename = tPath;
  templatename = sPath.match('packages') ? sPath : `${TEMPLATE_DIRECTORY}${sPath}`;
  spinner.start();
  if (fs.existsSync(tPath)) {
    spinner.stop();
    rmdir(tPath);
    return;
  }
  await readdirPath(filename, templatename, filename);
  spinner.stop();
  log(green(`generation '${filename}' sucesss !`));
};

/**
 * 询问并删除指定文件夹
 * @param {*} tPath
 */
const rmdir = (tPath) => {
  Inquirer.prompt({
    type: 'input',
    message: blue(`'${tPath}' already exists! Do you need to delete the folder?`),
    name: 'rmdir'
  })
    .then(async (answers) => {
      if (YES_OR_NO.includes(answers.rmdir)) {
        await fs.rm(getPath(tPath), { recursive: true });
        log(green(`delete '${tPath}' sucesss !`));
        nextGeneration();
      }
    })
    .catch((err) => {
      error(red(err));
    });
};

/**
 * 询问并重新生成
 */
const nextGeneration = () => {
  Inquirer.prompt({
    type: 'input',
    message: green(`Do you need to generate another '${filename}'?`),
    name: 'next'
  })
    .then(async (answers) => {
      if (YES_OR_NO.includes(answers.next)) {
        run(templatename, filename);
      }
    })
    .catch((err) => {
      error(red(err));
    });
};
