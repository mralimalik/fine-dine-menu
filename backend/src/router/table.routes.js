import { Router } from "express";
import authenticateToken from "../middleware/auth_token.js";
import { createCustomTables,createAutomaticTables,createArea,getAllAreaWithTables,updateTable,deleteTables } from "../controllers/table.controller.js";

const tableRouter = Router();

tableRouter.post("/createArea", authenticateToken, createArea);
tableRouter.post("/createCustomTable", authenticateToken, createCustomTables);
tableRouter.post("/createAutomaticTable", authenticateToken, createAutomaticTables);
tableRouter.get("/:venueId", authenticateToken, getAllAreaWithTables);
tableRouter.put("/update/:tableId", authenticateToken, updateTable);
tableRouter.delete("/delete", authenticateToken, deleteTables);






export default tableRouter;
