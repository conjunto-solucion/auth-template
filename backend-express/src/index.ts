import express from "express";
import cors from "cors";
import {configDotenv} from "dotenv";
import router from "./core/router.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
configDotenv({path: path.join(__dirname, "../.env")});
const PORT = process.env.PORT;



startApplication();


function startApplication(): void {

    const app = express();

    // Esta línea puede borrarse en producción.
    app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true}));


    app.use(cookieParser());
    app.use("/api", router);

    app.listen(PORT, () => console.log("Aplicación sirviendo en el puerto "+PORT));
}