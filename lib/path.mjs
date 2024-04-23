import path from 'node:path';

export const getPath = (fileName) => {
  return path.resolve(fileName);
};
