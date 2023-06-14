import mongoose from "mongoose";
import Flights from "../model/flight.js";

export const getFlights = async (req, res) => {
  try {
    const flights = await Flights.find();

    res.status(200).json(flights);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFLight = async (req, res) => {
  const { id } = req.params;

  try {
    const flight = await Flights.findById(id);
    res.status(200).json(flight);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const flightbySearch = async (req, res) => {
  const { departure, arrival } = req.query;

  try {
    const flights = await Flights.find({ departure, arrival });
    res.status(200).json(flights);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postFlights = async (req, res) => {
  const {
    departure,
    arrival,
    departuretime,
    arrivaltime,
    distancehr,
    distancemin,
    money,
    flightdetails,
  } = req.body;

  const newFlight = new Flights({
    departure,
    arrival,
    departuretime,
    arrivaltime,
    distancehr,
    distancemin,
    money,
    flightdetails,
  });
  try {
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateFlight = async (req, res) => {
  const { id: _id } = req.params;
  const flight = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No flight with id: ${id}`);

  const updatedFlight = await Flights.findByIdAndUpdate(_id, flight, {
    new: true,
  });
  res.json(updatedFlight);
};

export const deleteFlight = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No flight with id: ${id}`);

  await Flights.findByIdAndRemove(_id);
  res.json({ message: "flight deleted successfully." });
};
