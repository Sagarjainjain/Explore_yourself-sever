import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  departuretime: String,
  arrivaltime: String,
  distancehr: Number,
  distancemin: Number,
  money: Number,
  flightdetails: [
    {
      flightname: String,
      flightlogo: String,
    },
  ],
});

const Flights = mongoose.model("flights", postSchema);

export default Flights;
