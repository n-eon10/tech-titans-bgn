import express from "express";
import { getAllEvents, getOneEvent, createEvent } from "../controllers/event.mjs";

const router = express.Router();

router.get("/getallevents", getAllEvents);

router.get("getevent/:eventid", getOneEvent);

router.post("/createevent", createEvent);

export default router;