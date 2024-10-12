import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config()

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors( {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
} ));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes

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