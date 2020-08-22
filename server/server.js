const express = require("express");
const app = express();
const route = require("./routes");

app.use(express.json({ extened: false }));

app.get("/", (req, res) => {
  res.send("API running Working");
});

app.use("/calculateGrade", route);

app.listen(3222, () => {
  console.log("Application is running on port 3222");
});
