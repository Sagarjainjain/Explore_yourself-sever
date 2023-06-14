import mongoose from "mongoose";
import Cities from "../model/cities.js";

export const getCities = async (req, res) => {
  try {
    const City = await Cities.find();
    res.status(200).json(City);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postCities = async (req, res) => {
  const { cityname } = req.body;

  const newCity = new Cities({
    cityname,
  });
  try {
    await newCity.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCity = async (req, res) => {
  const { id: _id } = req.params;
  const City = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No flight with id: ${_id}`);

  const updatedCity = await Cities.findByIdAndUpdate(_id, City, {
    new: true,
  });
  res.json(updatedCity);
};

export const deleteCity = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No flight with id: ${_id}`);

  await Cities.findByIdAndRemove(_id);
  res.json({ message: "flight deleted successfully." });
};