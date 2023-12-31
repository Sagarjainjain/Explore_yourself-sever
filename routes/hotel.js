import  express  from "express";
import {getHotel, postHotel, searchHotel, deleteHotel, getHotelId,updateHotel, addReview, getReviews} from "../controllers/hotels.js";
import Uppercasemiddleware from "../middleware/hotel.js";

const router = express.Router()

router.get('/search', Uppercasemiddleware, searchHotel )
router.get('/', getHotel);
router.get("/:id", getHotelId)
router.get("/reviews/:id", getReviews)
router.post('/', postHotel);
router.patch("/:id", updateHotel)
router.patch("/reviews/:id", addReview)
router.delete('/:id', deleteHotel )

export default router