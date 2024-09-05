import type { Request, Response } from "express";

const empty = async (req: Request, res: Response) => {
    res.send({ response: "successful" });
};

export default empty;
