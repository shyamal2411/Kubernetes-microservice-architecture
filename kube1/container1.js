const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 6000;

app.use(express.json());

app.post("/calculate", async (req, res) => {
  const { file, product } = req.body;
  console.log("C-1 file", file);
  try {
    if (!file) {
      return res.json({
        error: "Invalid JSON input.",
        file,
      });
    }

    if (!fileExists(file)) {
      return res.status(404).json({
        file,
        error: "File not found.",
      });
    }

    console.log(file);
    const containerURL = `${process.env.CONTAINER2_URL}/process`;
    const response = await axios.post(containerURL, {
      file,
      product,
    });

    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      file,
      error: "Internal server error.",
    });
  }

  function fileExists(file) {
    try {
      const filePath = `/shyamal_PV_dir/${file}`;
      console.log(filePath);
      fs.accessSync(filePath, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }
});

app.post("/store-file", (req, res) => {
  const { file, data } = req.body;

  if (!file || !data) {
    return res.status(400).json({
      file: null,
      error: "Invalid JSON input.",
    });
  }

  // const filePath = path.join("/data", file);
  const filePath = `/shyamal_PV_dir/${file}`;

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        file,
        error: "Error while storing the file to the storage.",
      });
    }

    res.json({
      file,
      message: "Success.",
    });
  });
});

app.listen(port, () => {
  console.log(`API 1 listening at http://localhost:${port}`);
});
