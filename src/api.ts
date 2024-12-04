import { Router, Request, Response } from "express";
import { getAllPrice, averagePrices } from "./price-controller";
export const router: Router = Router();

router.route("/ping").get((_req: Request, res: Response) => res.send(`OK @ ${new Date()}`));

router.route("/prices").get((_req: Request, res: Response) => getAllPrice(_req, res));

router.route("/averagePrices").get((_req: Request, res: Response) => averagePrices(_req, res));

