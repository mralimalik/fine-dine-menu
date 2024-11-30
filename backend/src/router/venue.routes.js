import { Router } from "express";
import authenticateToken from "../middleware/auth_token.js";

import {
  getAllVenuesByUser,
  getVenueById,
  updateVenueById,
  createVenue,
  getVenueDataForQr,
} from "../controllers/venue.controller.js";
const venueRouter = Router();

venueRouter.get("/", authenticateToken, getAllVenuesByUser);
venueRouter.get("/:venueId", authenticateToken, getVenueById);
// menuRouter.patch("/update", authenticateToken, updateVenueById);
venueRouter.post("/createVenue", authenticateToken, createVenue);

venueRouter.get("/qr/:venueId", getVenueDataForQr);

export default venueRouter;
