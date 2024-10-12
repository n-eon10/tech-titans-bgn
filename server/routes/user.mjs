import express from "express";
import {getUser, createUser} from "../controllers/user.mjs";

const router = express.Router();

router.get("/getuser/:userid", getUser);

router.post("/newuser", createUser);

export default router;