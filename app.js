const express = require("express");
const app = express();
const cors = require("cors");

const routeHandler = require("./routes/fetch");

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(routeHandler);

app.listen(process.env.PORT || 4000, () => {
  console.log(`App listening on ${process.env.PORT || 4000} `);
});
