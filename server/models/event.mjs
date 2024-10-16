// define the schema for local events 
/* We must define their:
  Name
  Location
  Description
  Link
  Type e.g. day party, festival, poetry slam etc...
*/
import mongoose from "mongoose";

const Schema = mongoose.Schema

const eventSchema = new Schema({
  // define all the event stuff in here
  name: {
    type: String
  },
  location: {
    type: String
  },
  generalLocation: {
    type: String
  },
  date: {
    type: Date
  },
  description: {
    type: String
  },
  link: {
    type: String
  }

}, {timestamps: true});

const Event = mongoose.model("Event", eventSchema);

export default Event;