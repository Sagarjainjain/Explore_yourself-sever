import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    cityname: String
})

const Cities = mongoose.model("Cities", postSchema)

export default Cities;