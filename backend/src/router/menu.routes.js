import { Router } from "express";
import authenticateToken from "../middleware/auth_token.js";
import {
  getAllMenues,
  updateMenu,
  getMenuItemsWithSections,
  createMenuWitoutItems,
  createMenuWithItemsSections,
  getMenuData,
  getMenuItemsWithSectionsForQr
} from "../controllers/menu.controller.js";
const menuRouter = Router();

menuRouter.get("/menuitems/:menuId", authenticateToken, getMenuItemsWithSections);
menuRouter.get("/:venueId", authenticateToken, getAllMenues);
menuRouter.patch("/:menuId", authenticateToken, updateMenu);
menuRouter.post("/emptyMenu/:venueId", authenticateToken, createMenuWitoutItems);
menuRouter.post("/sampleMenu/:venueId", authenticateToken, createMenuWithItemsSections);
menuRouter.get("/qr/:venueId/:menuId", getMenuData);

menuRouter.get("/qr/:menuId", getMenuItemsWithSectionsForQr);


export default menuRouter;
