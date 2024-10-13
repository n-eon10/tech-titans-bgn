import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.mjs";
import blackBusinessRoutes from "./routes/bb.mjs"
import eventRoutes from "./routes/event.mjs"

dotenv.config()

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors( {
  origin: 'http://localhost:8501', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
} ));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/blackbusinesses", blackBusinessRoutes);
app.use("/api/events", eventRoutes);

// start the Express server and connect to database

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });
  })
  .catch((error) => {
    console.log(error);
  })

  