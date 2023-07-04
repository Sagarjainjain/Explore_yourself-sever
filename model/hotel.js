import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  hotelname: String,
  hotelplace: String,
  about: String,
  price: Number,
  rating: Number,
  checkin: Number,
  checkout: Number,
  photos: [String],
  reviews: []
});

const Hotel = mongoose.model('Hotel', postSchema);

export default Hotel;