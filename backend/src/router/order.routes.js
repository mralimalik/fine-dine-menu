import { Router } from "express";
import authenticateToken from "../middleware/auth_token.js";


const orderRouter = Router();

// orderRouter.get("/", authenticateToken, getAllVenuesByUser);


export default venueRouter;
