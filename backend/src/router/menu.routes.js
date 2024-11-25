import { Router } from "express";
import authenticateToken from '../middleware/auth_token.js'
import { getAllMenues , updateMenu,getMenuItemsWithSections,createMenuWitoutItems,createMenuWithItemsSections} from "../controllers/menu.controller.js";
const menuRouter = Router();

menuRouter.get("/menuitem" ,getMenuItemsWithSections);

menuRouter.get("/:venueId", authenticateToken ,getAllMenues);
menuRouter.patch("/:menuId", authenticateToken, updateMenu);
menuRouter.post("/emptyMenu/:venueId", authenticateToken, createMenuWitoutItems);
menuRouter.post("/sampleMenu/:venueId", authenticateToken, createMenuWithItemsSections);







export default menuRouter;
