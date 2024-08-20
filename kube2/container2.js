const express = require("express");
const app = express();
const fs = require("fs");
const csv = require("csv-parser");
const port = 7070;
app.use(express.json());

app.post("/process", (req, res) => {
  try {
    const { file, product } = req.body;
    console.log("C-2 file", file);
    const filePath = `/shyamal_PV_dir/${file}`;
    const fileStream = fs.createReadStream(filePath);

    const rows = [];
    fileStream
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", () => {
        console.log(rows);
        const sum = CalculateSum(rows, product);
        console.log("sum = ", sum);
        if (
          isNaN(sum) ||
          sum === null ||
          (sum === 0 && file.split(".")[1] !== "csv")
        ) {
          res.json({ file, error: "Input file not in CSV format." });
        } else {
          res.json({ file, sum: sum });
        }
      })
      .on("error", (error) => {
        console.error(error);
        res.json({ file, error: "Input file not in CSV format." });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      file,
      error: "Internal Server Error.",
    });
  }
});

function CalculateSum(rows, product) {
  let sum = 0;
  for (let row of rows) {
    console.log(`Row: ${JSON.stringify(row)}`);
    console.log(`Comparing ${row["product"]} with ${product}`);
    if (row["product"] == product) {
      sum += parseFloat(row[Object.keys(row)[1]]) || 0;
      console.log(`Match found, adding ${row.amount} to sum`);
    }
  }
  return sum;
}

app.listen(port, () => {
  console.log(`API 2 listening at http://localhost:${port}`);
});
