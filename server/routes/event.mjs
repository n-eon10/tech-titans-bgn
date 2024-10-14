import express from "express";
import { getAllEvents, getOneEvent, createEvent, upcomingEvents } from "../controllers/event.mjs";

const router = express.Router();

router.get("/getallevents", getAllEvents);

router.get("getevent/:eventid", getOneEvent);

router.post("/createevent", createEvent);

router.get("/upcomingevents", upcomingEvents);

export default router;