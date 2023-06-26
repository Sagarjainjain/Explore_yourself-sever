import express from "express";
import {
  signin,
  getuserdata,
  login,
  getUser,
  FlightBooking,
  getallUser,
  HotelBooking,
  DeleteAccount,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/users", auth, getallUser);
router.get("/", getuserdata);
router.get("/login/:id", auth, getUser);
router.delete("/users/:id", DeleteAccount);
router.get("/signin", getuserdata);
router.post("/signin", signin);
router.post("/login", login);
router.patch("/book/:id", FlightBooking);
router.patch("/hotelbook/:id", HotelBooking);

export default router;
