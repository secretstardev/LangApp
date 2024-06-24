// Usage:
// Run in terminal: node backend/migrations/dump/generate_signup_icons.js

const fs = require('fs/promises');
const path =require('path');

async function start() {
    const rootPath = path.normalize(__dirname + '/../../../');
    const list = JSON.parse(await fs.readFile(__dirname + '/languages_to_country.json', 'utf8'));
    // Remove duplicates from country list
    let countryList = Array.from(new Set(Object.values(list)));
    let importList = ``;
    let iconsList = `const iconsList = {\n`;
    for (let country of countryList) {
        if (country) {
            importList += `import ${country}4x3 from '@iconify/icons-flag/${country}-4x3';\n`
            iconsList += `    "${country}-4x3": ${country}4x3,\n`;
        }
    }
    iconsList += `};\n`;

    const generatedVia = "// Generated via `node backend/migrations/dump/generate_signup_icons.js`\n";
    const result = `${generatedVia}\n${importList}\n${iconsList}\nexport default iconsList;`;

    const resultPath = rootPath + 'frontend/src/app/common/icons-flag.ts'
    await fs.writeFile(resultPath, result);
    console.log(`Written updated list to ${resultPath}`)
}

start();