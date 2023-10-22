const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

//const sourceDir = 'src/views';  // Source directory
//const outputDir = 'dist/views'; // Output directory

// Read the current version from package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);
let [major, minor, patch] = packageJson.version.split('.').map(Number);

// Logic to increment version parts
if (patch < 1000) {
    patch += 1;
} else if (minor < 100) {
    minor += 1;
    patch = 0;
} else {
    major += 1;
    minor = 0;
    patch = 0;
}

// Update the version in package.json
packageJson.version = `${major}.${minor}.${patch}`;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Increment the version (e.g., by appending a build number)
const buildNumber = new Date().getTime();
const version = `${major}.${minor}.${patch}.${buildNumber}`;

console.log(`Increment framework version to ${version}.`);


// // Function to copy files
// const copyFiles = async () => {
//     try {
//         await fs.ensureDir(outputDir); // Create the output directory if it doesn't exist
//         await fs.copy(sourceDir, outputDir);
//         console.log('Assets copied successfully.');
//         console.log(`Build successful. Version: ${version}`); // Display version after assets are copied
//     } catch (error) {
//         console.error('Error copying assets:', error);
//     }
// };

// // Compile TypeScript files using tsc
// exec('tsc', (error, stdout, stderr) => {
//     if (error) {
//         console.error('Error during TypeScript compilation:', error);
//         return;
//     }
//     console.log('TypeScript compilation completed.');

//     // Run the copyFiles function after TypeScript compilation
//     copyFiles();
// });
