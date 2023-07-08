import mongoose from "mongoose";
import Hotel from "../model/hotel.js";

export const getHotel = async (req, res) => {
  try {
    const gethotels = await Hotel.find();
    res.status(200).json(gethotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHotelId = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(404).json({ message: error.message});
  }
};
export const searchHotel = async (req, res) => {
  const { hotelplace } = req.query;

  try {
    const HotelBySearch = await Hotel.find({ hotelplace });
    res.status(200).json(HotelBySearch);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postHotel = async (req, res) => {
  const {
    hotelname,
    hotelplace,
    about,
    price,
    rating,
    checkin,
    checkout,
    photos,
  } = req.body;
  const newHotel = new Hotel({
    hotelname,
    hotelplace,
    about,
    price,
    rating,
    checkin,
    checkout,
    photos,
  });
  try {
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const addReview = async (req, res) => {
  const { id } = req.params;
  const review = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "not a valid id" });
    const hotelReview = await Hotel.findById(id);
    hotelReview.reviews.push(review);
    const updatedHotelPost = await Hotel.findByIdAndUpdate(id, hotelReview, {new: true});
    res.json(updatedHotelPost)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getReviews = async ( req, res) => {
  const { id } = req.params;
    try {
      const hotel = await Hotel.findById(id);
      const reviews = hotel.reviews.reverse()
      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}
export const updateHotel = async (req, res) => {
  const { id: _id } = req.params;
  const hotel = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No flight with id: ${id}`);

  const updatedHotel = await Hotel.findByIdAndUpdate(_id, hotel, {
    new: true,
  });
  res.json(updatedHotel);
};
export const deleteHotel = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No hotel with id: ${id}`);

  await Hotel.findByIdAndRemove(_id);
  res.json({ message: "hotel deleted successfully." });
};
