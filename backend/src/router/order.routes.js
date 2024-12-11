import { Router } from "express";
import authenticateToken from "../middleware/auth_token.js";
import { getVenueOrderSettings,updateVenueOrderSettings } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.get("/settings/:venueId", getVenueOrderSettings);
orderRouter.put("/settings/:venueId", authenticateToken,updateVenueOrderSettings);



export default orderRouter;
