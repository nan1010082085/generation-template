// 所有模板文件名
export const TEMPLATE_FILE = ['template-ts', 'template-element-ts'];

// 获取命令所在位置路径
const argv = process.argv;
export const SOURCE_DIR = argv[1].replace(/(\|\/)?index.mjs/, '');

export const TEMPLATE_DIRECTORY = SOURCE_DIR + 'packages/';

export const YES_OR_NO = ['y', 'yes', 'Y', 'YES'];
