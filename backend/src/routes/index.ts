import express from "express";

import categoryRoute from "./api/category"
import fluRoute from "./api/flu"

import initDB from "./api/initDB";

const router = express.Router();

router.use("/category", categoryRoute);
router.use("/flu", fluRoute);

router.post("/initDB", initDB);

export default router;
