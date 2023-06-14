import mongoose from "mongoose"

const postSchema = ({
    id: {type: String},
    username: { type: String, required: true},
    email: { type: String, required: true},
    gender: { type: String, required: true},
    password: { type: String, required: true},
    birthyear: { type:Number, required: true},
    flightbookings: [],
    hotelBooking: [],
    searchhistory: [],
})

const User = mongoose.model("Users", postSchema)
export default User;
