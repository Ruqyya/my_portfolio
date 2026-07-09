const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (/\.(tsx|ts|css|json)$/.test(file)) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('#2563EB') || content.includes('#7C3AED')) {
    content = content.replace(/#2563EB/g, '#0EA5E9');
    content = content.replace(/#7C3AED/g, '#0F172A');
    fs.writeFileSync(file, content, 'utf8');
  }
});
