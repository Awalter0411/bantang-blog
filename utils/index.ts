import matter from "gray-matter"
import fs from 'fs/promises'
import path from "path"

export const parseMarkdown = (mdContent: string) => {
  const { content, data } = matter(mdContent, { excerpt: true })
  return { content, data }
}

export const readDirRecursive = async (res: string[], dir: string) => {
  const files = await fs.readdir(dir);

  for (let file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await readDirRecursive(res, filePath);
    } else {
      res.push(filePath)
    }
  }
  return res
}

export const findFile: any = async (dirPath: string, fileName: string) => {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    console.log(filePath);

    const stats = await fs.lstat(filePath)
    if (stats.isDirectory()) {
      const foundFile = await findFile(filePath, fileName);
      if (foundFile) {
        return foundFile;
      }
    } else {
      if (file === fileName) {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return fileContent;
      }
    }
  }

  return null;
};