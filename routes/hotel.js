import  express  from "express";
import {getHotel, postHotel, searchHotel, deleteHotel, getHotelId,updateHotel} from "../controllers/hotels.js";
import Uppercasemiddleware from "../middleware/hotel.js";

const router = express.Router()

router.get('/search', Uppercasemiddleware, searchHotel )
router.get('/', getHotel);
router.get("/:id", getHotelId)
router.post('/', postHotel);
router.patch("/:id", updateHotel)
router.delete('/:id', deleteHotel )

export default router