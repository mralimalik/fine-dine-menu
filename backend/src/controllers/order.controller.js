import { OrderSetting } from "../models/order.setting.model.js";
import mongoose from "mongoose";
// Fetch order settings by venue ID
const getVenueOrderSettings = async (req, res) => {
  try {
    // Get venueId from request parameters
    const { venueId } = req.params;

    // Validate venueId
    if (!venueId) {
      return res.status(400).json({ message: "Venue _iD is required." });
    }

    // Convert venueId to ObjectId
    const objectId =new mongoose.Types.ObjectId(venueId);

    // Query the database for order settings related to the venueId
    const settings = await OrderSetting.findOne({ venueId: objectId });

    // Return the settings
    return res.status(200).json({ data: settings });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching venue order settings:", error);
    return res
      .status(500)
      .json({
        message: "An error occurred while fetching order settings.",
        error,
      });
  }
};


const updateVenueOrderSettings = async (req, res) => {
  try {
    const { venueId } = req.params; 
    const { type, updateData } = req.body; 

    // Validate venueId
    if (!venueId) {
      return res.status(400).json({ message: "VenueId is required." });
    }

    // Validate type
    const validTypes = ["delivery", "pickup", "dineIn"];
    if (!type || !validTypes.includes(type)) {
      return res.status(400).json({
        message: `Invalid or missing type. Valid types are: ${validTypes.join(", ")}`,
      });
    }

    // Validate updateData
    if (!updateData || typeof updateData !== "object") {
      return res
        .status(400)
        .json({ message: "Update data is required and must be an object." });
    }

    // Convert venueId to ObjectId
    const objectId = new mongoose.Types.ObjectId(venueId);

    // Find the order settings for the venue
    const settings = await OrderSetting.findOne({ venueId: objectId });

    if (!settings) {
      return res
        .status(404)
        .json({ message: "Order settings not found for the given venueId." });
    }

    // Update the specific type settings dynamically
    settings.settings[type] = { ...settings.settings[type], ...updateData };

    // Save the updates back to the database
    const updatedOrderSetting = await settings.save();

    // Respond with the updated document
    return res.status(200).json({
      message: `${type} settings updated successfully.`,
      data: updatedOrderSetting,
    });
  } catch (error) {
    console.error("Error updating order settings:", error);
    return res.status(500).json({
      message: "An error occurred while updating order settings.",
      error,
    });
  }
};


export {getVenueOrderSettings,updateVenueOrderSettings}


