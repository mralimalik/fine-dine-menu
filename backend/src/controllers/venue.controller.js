import { Venue } from "../models/venue.model.js";

const createRandomVenueId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i <= 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const createVenue = async (req, res) => {
  try {
    //get user id from auth jwt and required name and country
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "User id is missing" });
    }
    const { venueName, country } = req.body;
    if (!venueName || !country) {
      return res
        .status(400)
        .json({ message: "venueName and country is required" });
    }

    //create random short venueId
    const venueId = createRandomVenueId();
    const newVenue = new Venue({ venueName, country, venueId, userId });
    await newVenue.save().then((response) => {
      res.status(200).json({ data: response });
    });
  } catch (e) {
    console.log("Error creating venue", e);
    res.status(500).json({ message: "Something went wrong", e });
  }
};

// Function to fetch all venues for a specific user
const getAllVenuesByUser = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Find all venues where userId matches
    const venues = await Venue.find({ userId });

    res.status(200).json({ data: venues });
  } catch (e) {
    console.error("Error fetching venues", e);
    res.status(500).json({ message: "Something went wrong", e });
  }
};

const updateVenueById = async (req, res) => {
  try {
    const userId = req.user?._id; // Extract the user ID
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const { venueId, venueName, country } = req.body;

    if (!venueId) {
      return res.status(400).json({ message: "venueId is required" });
    }
    if (!venueName && !country) {
      return res
        .status(400)
        .json({ message: "Provide venueName or country to update" });
    }

    const updateData = {};
    if (venueName) updateData.venueName = venueName;
    if (country) updateData.country = country;

    const updatedVenue = await Venue.findOneAndUpdate(
      { venueId, userId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedVenue) {
      return res
        .status(404)
        .json({ message: "Venue not found or unauthorized" });
    }

    res
      .status(200)
      .json({ message: "Venue updated successfully", data: updatedVenue });
  } catch (e) {
    console.error("Error updating venue", e);
    res.status(500).json({ message: "Something went wrong", e });
  }
};

// Function to fetch a venue by venueId for the logged-in user
const getVenueById = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const { venueId } = req.params; // Get the venueId from the URL parameters
    if (!venueId) {
      return res.status(400).json({ message: "Venue ID is required" });
    }

    // Find the venue by venueId and userId (to ensure the venue belongs to the user)
    const venue = await Venue.findOne({ venueId, userId });

    if (!venue) {
      return res
        .status(404)
        .json({ message: "Venue not found or unauthorized" });
    }

    // Return the venue data
    res.status(200).json({ data: venue });
  } catch (e) {
    console.error("Error fetching venue by ID", e);
    res.status(500).json({ message: "Something went wrong", e });
  }
};

export { createVenue, getAllVenuesByUser, updateVenueById, getVenueById };
