import { Router } from "express";

import * as apiController from "../controllers/api.controller";

const apiRouter: Router = Router();

// API routes
apiRouter.get("/ping", apiController.getPing);

export { apiRouter };
