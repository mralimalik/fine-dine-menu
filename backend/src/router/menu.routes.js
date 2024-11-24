import { Router } from "express";
import authenticateToken from '../middleware/auth_token.js'
import { getAllMenues , updateMenu,getMenuItemsWithSections} from "../controllers/menu.controller.js";
const menuRouter = Router();

menuRouter.get("/menuitem" ,getMenuItemsWithSections);

menuRouter.get("/:venueId", authenticateToken ,getAllMenues);
menuRouter.patch("/:menuId", authenticateToken, updateMenu);





export default menuRouter;
