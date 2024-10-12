// define the schema for black businesses 
/* 
We must define their:
  Name
  Descriptions 
  Location
  Reviews as a list 
*/ 
import mongoose from "mongoose";

const Schema = mongoose.Schema

const blackBusinessSchema = new Schema({
  // define all the black business stuff in here
  name: {},
  location: {},
  rating: {},
  reviews: {},

}, {timestamps: true});

const BlackBusiness = mongoose.model("BlackBusiness", blackBusinessSchema);

export default Event;