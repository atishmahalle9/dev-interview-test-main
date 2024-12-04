import * as express from "express";
import * as bodyParser from "body-parser";
import { router as routes } from "./api";

export const app: express.Application = express();

app.use(bodyParser.json());

app.use(routes);
