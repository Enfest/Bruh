import express from "express";

import empty from "./api/empty";

const router = express.Router();

router.get("/empty", empty);

export default router;
