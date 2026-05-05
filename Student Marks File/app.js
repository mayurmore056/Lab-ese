const fs = require("fs");

// Read file
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const lines = data.trim().split("\n");

  let total = 0;
  let count = 0;

  let highest = { name: "", marks: -Infinity };
  let lowest = { name: "", marks: Infinity };

  lines.forEach((line) => {
    const [name, marksStr] = line.split(",");

    const marks = parseFloat(marksStr);

    if (!name || isNaN(marks)) return; // skip invalid lines

    total += marks;
    count++;

    if (marks > highest.marks) {
      highest = { name, marks };
    }

    if (marks < lowest.marks) {
      lowest = { name, marks };
    }
  });

  const average = (total / count).toFixed(2);

  const report = `
Student Report
-------------------------
Total Students: ${count}
Average Marks: ${average}

Highest Scorer:
${highest.name} (${highest.marks})

Lowest Scorer:
${lowest.name} (${lowest.marks})
`;

  // Write report
  fs.writeFile("report.txt", report, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }

    console.log("Report generated successfully!");
  });
});
