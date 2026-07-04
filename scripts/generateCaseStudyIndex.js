// scripts/generateCaseStudyIndex.js
const fs = require('fs');
const path = require('path');

const contentDir = path.resolve(__dirname, '../src/content/case-studies');
const outputPath = path.join(contentDir, 'index.json');

function isJsonFile(file) {
  return file.endsWith('.json') && file !== 'index.json';
}

function generateIndex() {
  const files = fs.readdirSync(contentDir).filter(isJsonFile);
  const index = files.map((file) => {
    const fullPath = path.join(contentDir, file);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    return data;
  });
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`Generated ${outputPath} with ${index.length} entries`);
}

generateIndex();
