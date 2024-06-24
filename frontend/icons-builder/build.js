const fs = require('fs').promises;
const path = require('path');

const directories = [
  { path: path.join(__dirname, '/icons'), changeColors: true },
  { path: path.join(__dirname, '/icons/original-color'), changeColors: false },
];

let combinedSvgContent = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n';
let iconTypes = [];

(async () => {
  for (const directory of directories) {
    const files = await fs.readdir(directory.path);
    console.log(files);
    for (const file of files) {
      if (path.extname(file) === '.svg') {
        let filePath = path.join(directory.path, file);
        let svgContent = await fs.readFile(filePath, 'utf8');
        console.log(svgContent);

        if (directory.changeColors) {
          svgContent = svgContent.replace(/stroke="#[0-9a-fA-F]+"/g, 'stroke="currentColor"');
          svgContent = svgContent.replace(/fill="#[0-9a-fA-F]+"/g, 'fill="currentColor"');
        }
        // Ensure that only the SVG content inside the <svg> tags is concatenated
        // const svgTagStart = svgContent.indexOf('<svg');
        // const svgTagEnd = svgContent.indexOf('</svg>') + 6;
        // svgContent = svgContent.substring(svgTagStart, svgTagEnd);
        combinedSvgContent += svgContent + '\n';
        let fileName = path.basename(file, '.svg');
        iconTypes.push(`'${fileName}'`);
      }
    }
  }
  combinedSvgContent += '</svg>';

  // Write the types and combined SVG content to files
  const iconTypeContent = `export type IconType = ${iconTypes.join(' | ')};`;
  await fs.writeFile(path.join(__dirname, 'icon.model.ts'), iconTypeContent);
  await fs.writeFile(path.join(__dirname, 'icons.svg'), combinedSvgContent);
  console.log('The SVG icons and types were successfully combined and processed.');
})().catch(console.error);

// function processDirectory(files, changeColors, directory) {
//   files.forEach((file) => {
//     if (path.extname(file) === '.svg') {
//       let filePath = path.join(directory, file);
//       let svgContent = fs.readFileSync(filePath, 'utf8');
//
//       if (changeColors) {
//         svgContent = svgContent.replace(/stroke="#[0-9a-fA-F]+"/g, 'stroke="currentColor"');
//         svgContent = svgContent.replace(/fill="#[0-9a-fA-F]+"/g, 'fill="currentColor"');
//       }
//
//       combinedSvgContent += svgContent + '\n';
//       let fileName = path.basename(file, '.svg');
//       iconTypes.push(`'${fileName}'`);
//     }
//   });
// }

// directories.forEach((directory, index) => {
//   fs.readdir(directory.path, (err, files) => {
//     if (err) {
//       console.error('Error reading directory:', err);
//       return;
//     }
//     processDirectory(files, directory.changeColors, directory.path);
//
//     if (index === directories.length - 1) {
//       console.log(combinedSvgContent);
//       console.log(index);
//       finalizeFiles();
//     }
//   });
// });
//
// function processDirectory(files, changeColors, directory) {
//   files.forEach((file) => {
//     if (path.extname(file) === '.svg') {
//       let filePath = path.join(directory, file);
//       let svgContent = fs.readFileSync(filePath, 'utf8');
//
//       if (changeColors) {
//         svgContent = svgContent.replace(/stroke="#[0-9a-fA-F]+"/g, 'stroke="currentColor"');
//         svgContent = svgContent.replace(/fill="#[0-9a-fA-F]+"/g, 'fill="currentColor"');
//       }
//
//       combinedSvgContent += svgContent + '\n';
//       let fileName = path.basename(file, '.svg');
//       iconTypes.push(`'${fileName}'`);
//     }
//   });
// }
//
// function finalizeFiles() {
//   combinedSvgContent += '</svg>';
//
//   let iconTypeContent = `export type IconType = ${iconTypes.join(' | ')};`;
//
//   fs.writeFileSync(path.join('.', 'icon.model.ts'), iconTypeContent);
//   fs.writeFileSync(path.join('.', 'icons.svg'), combinedSvgContent);
//   console.log('The SVG icons and types were successfully combined and processed.');
// }
