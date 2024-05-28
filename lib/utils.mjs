import fs from 'fs-extra';
import { getPath } from './path.mjs';
/**
 * 获取版本号
 */
export function pVersion() {
  const packageJson = fs.readJSONSync(getPath('package.json'));
  if (packageJson && packageJson.version) {
    return packageJson.version;
  }
  return '1.0.0';
}
