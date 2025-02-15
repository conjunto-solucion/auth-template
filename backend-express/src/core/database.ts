import path from "path";
import pg from "pg";
const {Pool} = pg;
import { configDotenv } from "dotenv";
import fileUpload from "express-fileupload";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_UPLOAD_PATH = path.join(__dirname, "../../../uploads/");


configDotenv({path: path.join(__dirname, "../../.env")});

export const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});


export function uploadFile(file: fileUpload.UploadedFile, fileNamePrefix: string): string {

    if (!fs.existsSync(FILE_UPLOAD_PATH)) {
        console.log("Creando el directorio: " + FILE_UPLOAD_PATH);
        fs.mkdirSync(FILE_UPLOAD_PATH, { recursive: true });
    }
    
    if (!file) {
        throw new Error("No se detectó el archivo subido");
    }

    const fileExtension = path.extname(file.name);
    const fileName = `${fileNamePrefix}_${Date.now()}${fileExtension}`;
    const filePath = path.join(FILE_UPLOAD_PATH, fileName);

    file.mv(filePath, (error) => {
        if (error)
        throw new Error(`Error al guardar el archivo ${filePath}.\n${error.message}`);
    });
    
    return fileName;
}

export function resolveUploadedFilePath(fileName: string): string {
    return path.join(FILE_UPLOAD_PATH, fileName);
}