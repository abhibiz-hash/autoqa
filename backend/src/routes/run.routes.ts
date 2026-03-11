import { Router } from "express";
import { runTest } from "../controllers/run.controller";

const router = Router();

router.post("/run", runTest);

export default router;