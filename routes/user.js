import express from "express"
import {signin, getuserdata, login, getUser, FlightBooking, getallUser, HotelBooking} from "../controllers/user.js"
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/users", getallUser )
router.get("/", getuserdata)
router.get("/login/:id", getUser)
router.get("/signin", getuserdata)
router.post("/signin", signin);
router.post("/login", login);
router.patch("/book/:id", FlightBooking)
router.patch("/hotelbook/:id", HotelBooking)

export default router;

