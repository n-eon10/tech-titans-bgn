import express from "express";
import { createBlackBusiness, getAllBlackBusinesses, getOneBlackBusiness } from "../controllers/bb.mjs";

const router = express.Router();

router.get("/getallblackbusiness", getAllBlackBusinesses);
router.get("/getblackbusiness/:id", getOneBlackBusiness);
router.post("/newblackbussiness", createBlackBusiness);
