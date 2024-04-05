import fs from 'fs';

export const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

export const readJson = (filePath) => {
  const json = fs.readFileSync(filePath, "utf8");
  return JSON.parse(json);
}