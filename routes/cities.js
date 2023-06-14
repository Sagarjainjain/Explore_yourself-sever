import express from "express";
import { getCities, postCities, updateCity, deleteCity} from "../controllers/cities.js"

const router = express.Router();

router.get("/", getCities);
router.post("/", postCities);
router.patch("/:id", updateCity);
router.delete("/:id", deleteCity);

export default router