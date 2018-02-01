const fs = require('fs');
const path = require('path');

const file = path.resolve('./node_modules/babel-preset-react-app/index.js');
let text = fs.readFileSync(file, 'utf8');

console.log('Initialize setup');

// Living on the edge. Don't use in production.

if (!text.includes('babel-plugin-relay')) {
  if (text.includes('const plugins = [')) {
    text = text.replace(
      'const plugins = [',
      "const plugins = [\n  require.resolve('babel-plugin-relay'),"
    );
    fs.writeFileSync(file, text, 'utf8');
    console.log(`Injected babel-plugin-relay in ${file}`);
  } else {
    throw new Error(`Failed to inject babel-plugin-relay in ${file}`);
  }
}
