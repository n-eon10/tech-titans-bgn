import express from "express";
import { createBlackBusiness, getAllBlackBusinesses, trendingBusinesses,getOneBlackBusiness } from "../controllers/bb.mjs";

const router = express.Router();

router.get("/getallblackbusiness", getAllBlackBusinesses);
router.get("/getblackbusiness/:id", getOneBlackBusiness);
router.post("/newblackbussiness", createBlackBusiness);
router.get("/trendingbusinesses", trendingBusinesses);

export default router;
