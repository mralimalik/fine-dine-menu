import { Router } from "express";
import authenticateToken from "../middleware/auth_token.js";
import {
  createModifier,
  getModifiersByVenue,
  deleteModifier,
} from "../controllers/modifier.controller.js";

const modifierRouter = Router();

modifierRouter.post("/delete", authenticateToken, deleteModifier);

modifierRouter.post("/:venueId", authenticateToken, createModifier);
modifierRouter.get("/:venueId", authenticateToken, getModifiersByVenue);

export default modifierRouter;
