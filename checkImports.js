import fs from 'fs';
import path from 'path';

const projectDir = path.resolve('./src'); // adjust if your source folder is different

function checkImports(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      checkImports(fullPath); // recurse into folders
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const importRegex = /import\s+.*?\s+from\s+['"](.*)['"]/g;
      let match;

      while ((match = importRegex.exec(content)) !== null) {
        let importPath = match[1];
        if (!importPath.startsWith('.')) continue; // skip packages

        const resolvedPath = path.resolve(path.dirname(fullPath), importPath);
        const possibleExtensions = ['', '.js', '.jsx', '.ts', '.tsx'];

        const found = possibleExtensions.some(ext =>
          fs.existsSync(resolvedPath + ext)
        );

        if (!found) {
          console.log(`⚠️  Broken import in ${fullPath} → "${importPath}"`);
        }
      }
    }
  });
}

checkImports(projectDir);
