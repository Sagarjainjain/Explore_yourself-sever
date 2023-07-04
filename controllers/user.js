import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../model/user.js";
import mongoose from "mongoose";

export const getuserdata = async (req, res) => {
  res.json({ message: "Login required" });
};

export const signin = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    gender,
    birthyear,
    password,
    confirmPassword,
  } = req.body;

  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password dosn't match" });

    const hashedpassword = await bcrypt.hash(password, 12);
    const result = await Users.create({
      username: `${firstname} ${lastname}`,
      email,
      password: hashedpassword,
      gender,
      birthyear,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong " });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  

  try {
    const existingUser = await Users.findOne({ email });

    if (!existingUser)
      return res.status(400).json({ message: `This ${email} doesn't exist` });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "InCorrect Password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h"}
    );

    res.status(200).json({  existingUser, token,  });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const getUser = await Users.findById(id);
        res.status(200).json(getUser)
    } catch (error) {
         res.status(404).json({ message: error.message });
    }

}
export const getallUser = async (req, res) => {
  try {
    const getUsers = await Users.find()
    res.status(200).json(getUsers)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
} 

export const FlightBooking = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({message: "not a valid id"})
    const booking = await Users.findById(id)
     booking.flightbookings.push(data)
 
    const updatedPost = await Users.findByIdAndUpdate(id, booking, {new: true});

    res.json(updatedPost)
  } catch (error) {
     res.status(404).json({ message: error.message });
  }
}

export const HotelBooking = async (req, res) => {
    const { id } = req.params;
    const hotelData = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: "not a valid id" });
      const booking = await Users.findById(id);
      booking.hotelBooking.push(hotelData);

      const updatedPost = await Users.findByIdAndUpdate(id, booking, {
        new: true,
      });

      res.json(updatedPost);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}

export const DeleteAccount = async (req, res) => {
  const { id: _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No User with id: ${id} available`);

  await Users.findByIdAndRemove(_id);
  res.json({ message: "User deleted successfully." });
}