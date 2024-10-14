import Event from "../models/event.mjs";
import mongoose from "mongoose";

//define get all events 
export const getAllEvents = async (req,res) => {
  try {
    const allEvents = await Event.find({});

    res.status(200).json({
      success: true,
      events: allEvents
    });
  } catch (error) {
    console.log(error);

    if (error instanceof mongoose.ValidationError) {
      res.status(400).json({
        success: false,
        error: error.message
      }) 
    } else {
      res.status(500).json({
        success: false,
        error: "Internal Server Error"
      })
    }

  }
}

export const getOneEvent = async (req,res) => {
  const {eventid} = req.params;

  try {
    const event = await Event.findOne({_id: eventid});

    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found"
      })
    }

    res.status(200).json({
      success:true,
      event: event
    });
  } catch (error) {
    console.log(error);

    if (error instanceof mongoose.ValidationError) {
      res.status(400).json({
        success: false,
        error: error.message
      }) 
    } else {
      res.status(500).json({
        success: false,
        error: "Internal Server Error"
      })
    }
  }
}

// define creating event 
export const createEvent = async (req, res) => {
  const {name, description, location, generalLocation, date, link} = req.body; //making sure that the information we need to create the event has been given
  
  try {
    const createEvent = await Event.create({name, description, location, generalLocation, date: new Date(date), link}); // using the info from line 49 to create a new rating in the db
    res.status(200).json({ // 200 indicates the request was succesfull 
        success: true, // 
        events: createEvent
      });    
    
  } catch (error) {
    console.log(error);

    if (error instanceof mongoose.ValidationError) {
      res.status(400).json({
        success: false,
        error: error.message
      }) 
    } else {
      res.status(500).json({
        success: false,
        error: "Internal Server Error"
      })
    }
  }
}

//define getting upcoming events
export const upcomingEvents = async(req, res) => {
  try {
    const upcomingEvents = await Event.find({}).sort({date: -1}).limit(10);

    res.status(200).json({
      success: true,
      upcomingEvents: upcomingEvents
    });
  } catch (error) {
    
  }
}