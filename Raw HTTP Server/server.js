const fs = require("fs");
const path = require("path");

// Get CLI arguments
const args = process.argv.slice(2);
const command = args[0];
const filename = args[1];

// Helper: current directory
const dir = process.cwd();

switch (command) {
  // ✅ CREATE FILE
  case "--create":
    if (!filename) {
      console.log("Please provide filename");
      break;
    }

    fs.writeFileSync(filename, "");
    console.log(`File created: ${filename}`);
    break;

  // 📖 READ FILE
  case "--read":
    if (!filename) {
      console.log("Please provide filename");
      break;
    }

    try {
      const data = fs.readFileSync(filename, "utf8");
      console.log("File Content:\n", data);
    } catch (err) {
      console.log("File not found");
    }
    break;

  // ❌ DELETE FILE
  case "--delete":
    if (!filename) {
      console.log("Please provide filename");
      break;
    }

    try {
      fs.unlinkSync(filename);
      console.log(`Deleted: ${filename}`);
    } catch (err) {
      console.log("File not found");
    }
    break;

  // 📂 LIST FILES
  case "--list":
    const files = fs.readdirSync(dir);
    console.log("Files in directory:");
    files.forEach((file) => console.log(file));
    break;

  default:
    console.log(`
Invalid command

Usage:
node index.js --create file.txt
node index.js --read file.txt
node index.js --delete file.txt
node index.js --list
    `);
}
