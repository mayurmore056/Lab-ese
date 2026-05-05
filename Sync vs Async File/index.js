const fs = require("fs");
const fsPromises = require("fs/promises");

console.log("START PROGRAM");

// =========================
// 1. SYNC FILE READ
// =========================
console.log("1. Sync read start");

const data1 = fs.readFileSync("file1.txt", "utf8");
console.log("Sync result:", data1);

console.log("1. Sync read end");

// =========================
// 2. ASYNC CALLBACK READ
// =========================
console.log("2. Async callback start");

fs.readFile("file2.txt", "utf8", (err, data2) => {
  if (err) throw err;
  console.log("Callback result:", data2);
});

console.log("2. Async callback end");

// =========================
// 3. PROMISE + ASYNC/AWAIT
// =========================
console.log("3. Async/Await start");

async function readFile3() {
  const data3 = await fsPromises.readFile("file3.txt", "utf8");
  console.log("Async/Await result:", data3);
}

readFile3();

console.log("3. Async/Await end");

console.log("END PROGRAM");
