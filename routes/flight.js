import express from "express";
import {getFlights,getFLight, postFlights, updateFlight, deleteFlight, flightbySearch} from "../controllers/flight.js"
import uppercaseMiddleware from "../middleware/search.js";

const router = express.Router();

router.get("/search", uppercaseMiddleware, flightbySearch);
router.get("/", getFlights );
router.get("/:id", getFLight);

router.post("/", postFlights);
router.patch("/:id", updateFlight);
router.delete("/:id", deleteFlight);


export default router;
