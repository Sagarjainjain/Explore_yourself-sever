import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Dotenv from "dotenv"
import  flights from "./routes/flight.js"
import Cities from "./routes/cities.js";
import Hotels from "./routes/hotel.js"
import user from "./routes/user.js"

Dotenv.config()

const app = express();

const appdiscription = `It's an flights and hotels reservation application this url is its backend`

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



// routes
app.use("/hotel", Hotels)
app.use("/user", user)
app.use("/cities", Cities)
app.use("/flights" ,flights)
app.use("/", (req, res) => {
  res.json(appdiscription);
});


const PORT = 5000;
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`app running on port ${PORT}`))
  )
  .catch((error) => console.log(error));
