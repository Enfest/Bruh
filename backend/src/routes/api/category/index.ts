import express from "express";

import getFormPage from "./getFormPage";
import submitFormPage from "./submitFormPage";

const router = express.Router();

// default route is question form
router.get("/getFormPage", getFormPage);
router.post("/submitFormPage", submitFormPage);

export default router;
